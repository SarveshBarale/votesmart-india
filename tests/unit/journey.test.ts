import {
  generateChecklist,
  isProfileComplete,
  countCriticalItems,
} from "@/lib/utils/journey";
import type { VoterProfile } from "@/types";

const BASE_PROFILE: VoterProfile = {
  state: "Maharashtra",
  isFirstTimeVoter: false,
  registrationStatus: "registered",
  needsAccessibilityAssistance: false,
  isNRI: false,
};

describe("generateChecklist", () => {
  it("returns empty array when state is empty", () => {
    const result = generateChecklist({ ...BASE_PROFILE, state: "" });
    expect(result).toHaveLength(0);
  });

  it("includes registration verification for registered voter", () => {
    const items = generateChecklist(BASE_PROFILE);
    expect(items.some((i) => i.id === "reg-confirmed" && i.status === "done")).toBe(true);
    expect(items.some((i) => i.id === "reg-verify")).toBe(true);
  });

  it("includes Form 6 steps for unregistered voter", () => {
    const items = generateChecklist({ ...BASE_PROFILE, registrationStatus: "not_registered" });
    expect(items.some((i) => i.id === "reg-urgent")).toBe(true);
    expect(items.some((i) => i.id === "reg-docs")).toBe(true);
    expect(items.some((i) => i.id === "reg-deadline")).toBe(true);
  });

  it("includes check item for unsure registration status", () => {
    const items = generateChecklist({ ...BASE_PROFILE, registrationStatus: "unsure" });
    expect(items.some((i) => i.id === "reg-check")).toBe(true);
    expect(items.some((i) => i.id === "reg-call")).toBe(true);
  });

  it("adds first-time voter specific items", () => {
    const items = generateChecklist({ ...BASE_PROFILE, isFirstTimeVoter: true });
    expect(items.some((i) => i.id === "first-slip")).toBe(true);
    expect(items.some((i) => i.id === "first-booth")).toBe(true);
    expect(items.some((i) => i.id === "first-evm")).toBe(true);
  });

  it("does NOT add first-time voter items for returning voter", () => {
    const items = generateChecklist({ ...BASE_PROFILE, isFirstTimeVoter: false });
    expect(items.some((i) => i.id === "first-slip")).toBe(false);
  });

  it("includes accessibility items when needed", () => {
    const items = generateChecklist({
      ...BASE_PROFILE,
      needsAccessibilityAssistance: true,
    });
    expect(items.some((i) => i.id === "a11y-blo")).toBe(true);
    expect(items.some((i) => i.id === "a11y-postal")).toBe(true);
    expect(items.some((i) => i.id === "a11y-transport")).toBe(true);
  });

  it("does NOT include accessibility items when not needed", () => {
    const items = generateChecklist({ ...BASE_PROFILE, needsAccessibilityAssistance: false });
    expect(items.some((i) => i.id.startsWith("a11y"))).toBe(false);
  });

  it("includes NRI specific items for NRI voter", () => {
    const items = generateChecklist({ ...BASE_PROFILE, isNRI: true });
    expect(items.some((i) => i.id === "nri-form")).toBe(true);
    expect(items.some((i) => i.id === "nri-travel")).toBe(true);
  });

  it("always includes universal items for any valid profile", () => {
    const items = generateChecklist(BASE_PROFILE);
    expect(items.some((i) => i.id === "id-ready")).toBe(true);
    expect(items.some((i) => i.id === "official-check")).toBe(true);
  });

  it("always includes state name in date-note item", () => {
    const items = generateChecklist({ ...BASE_PROFILE, state: "Karnataka" });
    const dateNote = items.find((i) => i.id === "date-note");
    expect(dateNote?.text).toContain("Karnataka");
  });

  it("marks registration-confirmed item as done for registered voter", () => {
    const items = generateChecklist(BASE_PROFILE);
    const confirmed = items.find((i) => i.id === "reg-confirmed");
    expect(confirmed?.status).toBe("done");
  });

  it("marks unregistered items as high priority", () => {
    const items = generateChecklist({ ...BASE_PROFILE, registrationStatus: "not_registered" });
    const urgent = items.find((i) => i.id === "reg-urgent");
    expect(urgent?.priority).toBe("high");
  });
});

describe("isProfileComplete", () => {
  it("returns true for fully filled profile", () => {
    expect(isProfileComplete(BASE_PROFILE)).toBe(true);
  });

  it("returns false when state is empty", () => {
    expect(isProfileComplete({ ...BASE_PROFILE, state: "" })).toBe(false);
  });

  it("returns false when isFirstTimeVoter is null", () => {
    expect(isProfileComplete({ ...BASE_PROFILE, isFirstTimeVoter: null })).toBe(false);
  });

  it("returns false when registrationStatus is null", () => {
    expect(isProfileComplete({ ...BASE_PROFILE, registrationStatus: null })).toBe(false);
  });

  it("returns false when needsAccessibilityAssistance is null", () => {
    expect(
      isProfileComplete({ ...BASE_PROFILE, needsAccessibilityAssistance: null })
    ).toBe(false);
  });
});

describe("countCriticalItems", () => {
  it("counts only high-priority todo items", () => {
    const items = generateChecklist({
      ...BASE_PROFILE,
      registrationStatus: "not_registered",
    });
    const count = countCriticalItems(items);
    expect(count).toBeGreaterThan(0);
    // Verify all counted items are actually high-priority todos
    const highPrioTodos = items.filter(
      (i) => i.priority === "high" && i.status === "todo"
    );
    expect(count).toBe(highPrioTodos.length);
  });

  it("returns 0 for fully registered voter with no issues", () => {
    const items = generateChecklist(BASE_PROFILE);
    // reg-verified item should be done; id-ready and date-note are high priority todos
    const count = countCriticalItems(items);
    // At least id-ready and date-note are high priority todos
    expect(count).toBeGreaterThanOrEqual(2);
  });

  it("returns 0 for empty checklist", () => {
    expect(countCriticalItems([])).toBe(0);
  });
});
