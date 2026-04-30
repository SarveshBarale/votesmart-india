"use client";

import { useState, useCallback, useEffect } from "react";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { VoterProfile, ChecklistItem } from "@/types";
import { generateChecklist, isProfileComplete } from "@/lib/utils/journey";
import { useAuth } from "./useAuth";

const EMPTY_PROFILE: VoterProfile = {
  state: "",
  isFirstTimeVoter: null,
  registrationStatus: null,
  needsAccessibilityAssistance: false,
  isNRI: false,
};

export function useVoterJourney() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<VoterProfile>(EMPTY_PROFILE);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load saved profile from Firestore if user is signed in
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const ref = doc(db, "users", user.uid, "journey", "profile");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as VoterProfile;
          setProfile(data);
          if (isProfileComplete(data)) {
            setChecklist(generateChecklist(data));
            setHasGenerated(true);
          }
        }
      } catch {
        // Non-critical — continue without saved data
      }
    };
    load();
  }, [user]);

  const updateProfile = useCallback((updates: Partial<VoterProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const generate = useCallback(async () => {
    if (!isProfileComplete(profile)) return false;
    const items = generateChecklist(profile);
    setChecklist(items);
    setHasGenerated(true);

    // Persist to Firestore if authenticated
    if (user) {
      setSaving(true);
      try {
        const ref = doc(db, "users", user.uid, "journey", "profile");
        await setDoc(ref, { ...profile, updatedAt: serverTimestamp() });
      } catch {
        // Non-critical
      } finally {
        setSaving(false);
      }
    }
    return true;
  }, [profile, user]);

  const reset = useCallback(() => {
    setProfile(EMPTY_PROFILE);
    setChecklist([]);
    setHasGenerated(false);
  }, []);

  const markItemDone = useCallback((id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "done" as const } : item))
    );
  }, []);

  return {
    profile,
    checklist,
    hasGenerated,
    saving,
    isComplete: isProfileComplete(profile),
    updateProfile,
    generate,
    reset,
    markItemDone,
  };
}
