import type { VoterProfile, ChecklistItem } from "@/types";

/**
 * Generates a personalized voter checklist based on the user's profile.
 * This is pure business logic — fully testable without DOM.
 */
export function generateChecklist(profile: VoterProfile): ChecklistItem[] {
  const { state, isFirstTimeVoter, registrationStatus, needsAccessibilityAssistance, isNRI } =
    profile;

  if (!state || !registrationStatus) return [];

  const items: ChecklistItem[] = [];

  // --- Registration status ---
  if (registrationStatus === "registered") {
    items.push({
      id: "reg-confirmed",
      text: "You are registered to vote — great start!",
      status: "done",
      priority: "high",
    });
    items.push({
      id: "reg-verify",
      text: "Verify your name in the electoral roll at voters.eci.gov.in",
      status: "todo",
      link: "https://voters.eci.gov.in",
      linkText: "Verify now",
      priority: "high",
    });
  } else if (registrationStatus === "not_registered") {
    items.push({
      id: "reg-urgent",
      text: `Register as a new voter in ${state} using Form 6`,
      status: "todo",
      link: "https://voters.eci.gov.in",
      linkText: "Register on voters.eci.gov.in",
      priority: "high",
    });
    items.push({
      id: "reg-docs",
      text: "Collect Proof of Age + Proof of Address documents before applying",
      status: "todo",
      priority: "high",
    });
    items.push({
      id: "reg-deadline",
      text: "Check the registration deadline for your constituency — do not wait",
      status: "warning",
      link: "https://eci.gov.in",
      linkText: "Check on eci.gov.in",
      priority: "high",
    });
  } else {
    // unsure
    items.push({
      id: "reg-check",
      text: "Check if your name is on the electoral roll immediately",
      status: "todo",
      link: "https://voters.eci.gov.in",
      linkText: "Search your name",
      priority: "high",
    });
    items.push({
      id: "reg-call",
      text: "Call Voter Helpline 1950 if you need help verifying your registration",
      status: "info",
      priority: "medium",
    });
  }

  // --- First time voter additions ---
  if (isFirstTimeVoter) {
    items.push({
      id: "first-slip",
      text: "Collect your Voter Slip with polling booth address before election day",
      status: "todo",
      priority: "high",
    });
    items.push({
      id: "first-booth",
      text: "Locate your polling booth in advance — visit the area or check on maps",
      status: "info",
      priority: "medium",
    });
    items.push({
      id: "first-evm",
      text: "Familiarise yourself with how EVM and VVPAT work before polling day",
      status: "info",
      link: "/voting",
      linkText: "Watch EVM guide",
      priority: "medium",
    });
  }

  // --- Universal steps ---
  if (isNRI) {
    items.push({
      id: "nri-form",
      text: "Register as an Overseas Voter using Form 6A at voters.eci.gov.in",
      status: "todo",
      link: "https://voters.eci.gov.in",
      linkText: "Form 6A",
      priority: "high",
    });
    items.push({
      id: "nri-travel",
      text: "Plan travel to India — you must vote in person at your registered constituency booth",
      status: "info",
      priority: "medium",
    });
  }

  items.push({
    id: "id-ready",
    text: "Keep EPIC (Voter ID) or an approved alternate photo ID ready for polling day",
    status: "todo",
    priority: "high",
  });

  items.push({
    id: "date-note",
    text: `Note the official polling date for ${state} — check on eci.gov.in`,
    status: "todo",
    link: "https://eci.gov.in",
    linkText: "eci.gov.in",
    priority: "high",
  });

  // --- Accessibility ---
  if (needsAccessibilityAssistance) {
    items.push({
      id: "a11y-blo",
      text: "Contact your Booth Level Officer (BLO) or ERO to arrange wheelchair / companion assistance",
      status: "info",
      priority: "high",
    });
    items.push({
      id: "a11y-postal",
      text: "If you are 80+ or have a qualifying disability, enquire about postal ballot eligibility with your ERO",
      status: "info",
      link: "https://eci.gov.in",
      linkText: "SAKSHAM initiative",
      priority: "medium",
    });
    items.push({
      id: "a11y-transport",
      text: "Check availability of free voter transport (SAKSHAM) in your constituency",
      status: "info",
      priority: "low",
    });
  }

  items.push({
    id: "official-check",
    text: "Always confirm election information on eci.gov.in — not social media",
    status: "info",
    priority: "low",
  });

  return items;
}

/**
 * Returns true if the profile has all required fields filled.
 */
export function isProfileComplete(profile: VoterProfile): boolean {
  return (
    profile.state !== "" &&
    profile.isFirstTimeVoter !== null &&
    profile.registrationStatus !== null &&
    profile.needsAccessibilityAssistance !== null
  );
}

/**
 * Returns the count of high-priority todo items.
 */
export function countCriticalItems(items: ChecklistItem[]): number {
  return items.filter((i) => i.priority === "high" && i.status === "todo").length;
}
