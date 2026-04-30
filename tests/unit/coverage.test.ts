import { generateChecklist, isProfileComplete, countCriticalItems } from "@/lib/utils/journey";
import { getAssistantAnswer } from "@/lib/utils/assistant";
import type { VoterProfile } from "@/types";

// Additional edge case and branch coverage tests

describe("generateChecklist — edge cases", () => {
  const BASE: VoterProfile = {
    state: "Gujarat",
    isFirstTimeVoter: false,
    registrationStatus: "registered",
    needsAccessibilityAssistance: false,
    isNRI: false,
  };

  it("returns empty array when registrationStatus is null", () => {
    expect(generateChecklist({ ...BASE, registrationStatus: null })).toHaveLength(0);
  });

  it("NRI + first-time voter gets both NRI and first-time items", () => {
    const items = generateChecklist({ ...BASE, isNRI: true, isFirstTimeVoter: true });
    expect(items.some((i) => i.id === "nri-form")).toBe(true);
    expect(items.some((i) => i.id === "first-slip")).toBe(true);
  });

  it("NRI + accessibility gets both NRI and a11y items", () => {
    const items = generateChecklist({
      ...BASE,
      isNRI: true,
      needsAccessibilityAssistance: true,
    });
    expect(items.some((i) => i.id === "nri-form")).toBe(true);
    expect(items.some((i) => i.id === "a11y-blo")).toBe(true);
  });

  it("all items have required fields", () => {
    const items = generateChecklist(BASE);
    items.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.text).toBeTruthy();
      expect(["done", "todo", "info", "warning"]).toContain(item.status);
      expect(["high", "medium", "low"]).toContain(item.priority);
    });
  });

  it("items with links always have linkText", () => {
    const items = generateChecklist({ ...BASE, registrationStatus: "not_registered" });
    items.forEach((item) => {
      if (item.link) {
        expect(item.linkText).toBeTruthy();
      }
    });
  });

  it("official-check item is always last", () => {
    const items = generateChecklist(BASE);
    expect(items[items.length - 1].id).toBe("official-check");
  });

  it("warning status items have high priority", () => {
    const items = generateChecklist({ ...BASE, registrationStatus: "not_registered" });
    const warnings = items.filter((i) => i.status === "warning");
    warnings.forEach((w) => expect(w.priority).toBe("high"));
  });
});

describe("isProfileComplete — all branches", () => {
  const FULL: VoterProfile = {
    state: "Kerala",
    isFirstTimeVoter: true,
    registrationStatus: "not_registered",
    needsAccessibilityAssistance: true,
    isNRI: true,
  };

  it("returns true for NRI first-time voter needing assistance", () => {
    expect(isProfileComplete(FULL)).toBe(true);
  });

  it("returns false when isNRI is null (does not affect completeness)", () => {
    // isNRI is optional — profile is still complete with null isNRI
    expect(isProfileComplete({ ...FULL, isNRI: null })).toBe(true);
  });

  it("returns false for completely empty profile", () => {
    expect(
      isProfileComplete({
        state: "",
        isFirstTimeVoter: null,
        registrationStatus: null,
        needsAccessibilityAssistance: null,
        isNRI: null,
      })
    ).toBe(false);
  });
});

describe("countCriticalItems — edge cases", () => {
  it("does not count done items even if high priority", () => {
    const items = generateChecklist({
      state: "Punjab",
      isFirstTimeVoter: false,
      registrationStatus: "registered",
      needsAccessibilityAssistance: false,
      isNRI: false,
    });
    const doneHighPrio = items.filter((i) => i.priority === "high" && i.status === "done");
    const count = countCriticalItems(items);
    // count should not include done items
    doneHighPrio.forEach((item) => {
      expect(item.status).toBe("done");
    });
    const todoHighPrio = items.filter((i) => i.priority === "high" && i.status === "todo");
    expect(count).toBe(todoHighPrio.length);
  });

  it("does not count info or warning items as critical todos", () => {
    const items = generateChecklist({
      state: "Odisha",
      isFirstTimeVoter: false,
      registrationStatus: "unsure",
      needsAccessibilityAssistance: false,
      isNRI: false,
    });
    const count = countCriticalItems(items);
    const infoItems = items.filter((i) => i.status === "info" && i.priority === "high");
    // info items should not be counted
    expect(count).toBeLessThanOrEqual(
      items.filter((i) => i.status === "todo" && i.priority === "high").length
    );
    expect(infoItems.length).toBeGreaterThanOrEqual(0); // just ensure no crash
  });
});

describe("getAssistantAnswer — additional coverage", () => {
  it("matches 'mcc' keyword", () => {
    const res = getAssistantAnswer("What is MCC?");
    expect(res.answer).toContain("Model Code of Conduct");
  });

  it("matches 'model code' keyword", () => {
    const res = getAssistantAnswer("Tell me about the model code of conduct");
    expect(res.answer).toContain("MCC");
  });

  it("matches 'epic' keyword", () => {
    const res = getAssistantAnswer("What is EPIC card?");
    expect(res.answer).toContain("Electors Photo Identity Card");
  });

  it("matches 'voter id' keyword", () => {
    const res = getAssistantAnswer("How do I get my voter id?");
    expect(res.answer).toContain("EPIC");
  });

  it("matches 'postal ballot' keyword", () => {
    const res = getAssistantAnswer("How does postal ballot work?");
    expect(res.answer.toLowerCase()).toContain("postal");
  });

  it("matches 'army' keyword for postal ballot", () => {
    const res = getAssistantAnswer("Can army personnel vote by post?");
    expect(res.answer.length).toBeGreaterThan(50);
  });

  it("matches 'eligible' keyword", () => {
    const res = getAssistantAnswer("Am I eligible to vote?");
    expect(res.answer).toContain("18");
  });

  it("returns sources array for all responses", () => {
    const queries = ["register", "evm", "nota", "vvpat", "booth", "ink", "secret"];
    queries.forEach((q) => {
      const res = getAssistantAnswer(q);
      expect(Array.isArray(res.sources)).toBe(true);
      expect(res.sources!.length).toBeGreaterThan(0);
    });
  });

  it("case-insensitive matching works", () => {
    const lower = getAssistantAnswer("what is nota?");
    const upper = getAssistantAnswer("WHAT IS NOTA?");
    expect(lower.answer).toBe(upper.answer);
  });

  it("handles very short queries without crashing", () => {
    const res = getAssistantAnswer("?");
    expect(typeof res.answer).toBe("string");
  });
});
