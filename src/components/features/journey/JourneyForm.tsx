"use client";

import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { useVoterJourney } from "@/lib/hooks/useVoterJourney";
import { INDIAN_STATES } from "@/lib/data/states";
import type { VoterProfile } from "@/types";

interface RadioCardProps {
  name: string;
  value: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

function RadioCard({ name, value, label, selected, onSelect }: RadioCardProps) {
  return (
    <label
      className={clsx(
        "flex items-center gap-2 border-2 rounded-xl p-3 cursor-pointer text-sm transition-all",
        "focus-within:ring-2 focus-within:ring-navy-600 focus-within:ring-offset-1",
        selected
          ? "border-navy-600 bg-navy-50 text-navy-600 font-semibold"
          : "border-gray-200 bg-white text-gray-700 hover:border-navy-300 hover:bg-gray-50"
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
        aria-label={label}
      />
      <span
        className={clsx(
          "w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
          selected ? "border-navy-600" : "border-gray-300"
        )}
        aria-hidden="true"
      >
        {selected && <span className="w-2 h-2 rounded-full bg-navy-600" />}
      </span>
      {label}
    </label>
  );
}

export function JourneyForm() {
  const { profile, updateProfile, generate, isComplete } = useVoterJourney();

  const handleGenerate = async () => {
    await generate();
    // Scroll to result
    document.getElementById("journey-result")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Card>
      <CardTitle icon="🗺️">Your Personalized Voter Journey</CardTitle>
      <p className="text-gray-500 text-sm mb-5">
        Answer a few questions to get a personalized checklist and next steps tailored to your
        situation.
      </p>

      {/* State */}
      <div className="mb-5">
        <label
          htmlFor="state-select"
          className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5"
        >
          Your State / Union Territory <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <select
          id="state-select"
          value={profile.state}
          onChange={(e) =>
            updateProfile({ state: e.target.value as VoterProfile["state"] })
          }
          required
          className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
          aria-required="true"
        >
          <option value="">— Select your state —</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* First-time voter */}
      <fieldset className="mb-5">
        <legend className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
          Are you a first-time voter? <span className="text-red-500" aria-hidden="true">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <RadioCard
            name="firstVoter"
            value="yes"
            label="Yes, first time"
            selected={profile.isFirstTimeVoter === true}
            onSelect={() => updateProfile({ isFirstTimeVoter: true })}
          />
          <RadioCard
            name="firstVoter"
            value="no"
            label="Voted before"
            selected={profile.isFirstTimeVoter === false}
            onSelect={() => updateProfile({ isFirstTimeVoter: false })}
          />
        </div>
      </fieldset>

      {/* Registration status */}
      <fieldset className="mb-5">
        <legend className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
          Registration status <span className="text-red-500" aria-hidden="true">*</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <RadioCard
            name="regStatus"
            value="registered"
            label="Registered"
            selected={profile.registrationStatus === "registered"}
            onSelect={() => updateProfile({ registrationStatus: "registered" })}
          />
          <RadioCard
            name="regStatus"
            value="not_registered"
            label="Not registered"
            selected={profile.registrationStatus === "not_registered"}
            onSelect={() => updateProfile({ registrationStatus: "not_registered" })}
          />
          <RadioCard
            name="regStatus"
            value="unsure"
            label="Not sure"
            selected={profile.registrationStatus === "unsure"}
            onSelect={() => updateProfile({ registrationStatus: "unsure" })}
          />
        </div>
      </fieldset>

      {/* NRI */}
      <fieldset className="mb-5">
        <legend className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
          Are you an Overseas / NRI voter?
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <RadioCard
            name="nri"
            value="no"
            label="No, resident in India"
            selected={profile.isNRI === false}
            onSelect={() => updateProfile({ isNRI: false })}
          />
          <RadioCard
            name="nri"
            value="yes"
            label="Yes, NRI / Overseas"
            selected={profile.isNRI === true}
            onSelect={() => updateProfile({ isNRI: true })}
          />
        </div>
      </fieldset>

      {/* Accessibility */}
      <fieldset className="mb-6">
        <legend className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
          Do you need special assistance at the polling booth?{" "}
          <span className="text-red-500" aria-hidden="true">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <RadioCard
            name="assistance"
            value="no"
            label="No"
            selected={profile.needsAccessibilityAssistance === false}
            onSelect={() => updateProfile({ needsAccessibilityAssistance: false })}
          />
          <RadioCard
            name="assistance"
            value="yes"
            label="Yes (elderly / PwD)"
            selected={profile.needsAccessibilityAssistance === true}
            onSelect={() => updateProfile({ needsAccessibilityAssistance: true })}
          />
        </div>
      </fieldset>

      <Button
        onClick={handleGenerate}
        disabled={!isComplete}
        fullWidth
        aria-label="Generate my personalized voter checklist"
      >
        Generate My Checklist →
      </Button>
      {!isComplete && (
        <p className="text-xs text-gray-400 mt-2 text-center" role="status" aria-live="polite">
          Please complete all required fields above
        </p>
      )}
    </Card>
  );
}
