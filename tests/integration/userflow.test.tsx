import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// We test the pure logic integration (no Firebase) using the utils directly
import { generateChecklist, isProfileComplete } from "@/lib/utils/journey";
import { getAssistantAnswer } from "@/lib/utils/assistant";
import type { VoterProfile } from "@/types";

/**
 * Integration tests simulate complete user flows:
 * 1. First-time unregistered voter from Maharashtra
 * 2. Returning registered voter needing accessibility
 * 3. NRI voter journey
 * 4. Full assistant conversation flow
 */

describe("User Flow: First-time unregistered voter (Maharashtra)", () => {
  const profile: VoterProfile = {
    state: "Maharashtra",
    isFirstTimeVoter: true,
    registrationStatus: "not_registered",
    needsAccessibilityAssistance: false,
    isNRI: false,
  };

  it("profile is complete", () => {
    expect(isProfileComplete(profile)).toBe(true);
  });

  it("generates checklist with registration steps", () => {
    const items = generateChecklist(profile);
    expect(items.length).toBeGreaterThan(0);
    expect(items.some((i) => i.id === "reg-urgent")).toBe(true);
    expect(items.some((i) => i.id === "reg-docs")).toBe(true);
  });

  it("includes first-time voter guidance", () => {
    const items = generateChecklist(profile);
    expect(items.some((i) => i.id === "first-slip")).toBe(true);
    expect(items.some((i) => i.id === "first-evm")).toBe(true);
  });

  it("has multiple high-priority items", () => {
    const items = generateChecklist(profile);
    const high = items.filter((i) => i.priority === "high");
    expect(high.length).toBeGreaterThanOrEqual(3);
  });

  it("includes the official website link in registration step", () => {
    const items = generateChecklist(profile);
    const regStep = items.find((i) => i.id === "reg-urgent");
    expect(regStep?.link).toContain("voters.eci.gov.in");
  });
});

describe("User Flow: Returning voter needing accessibility (Karnataka)", () => {
  const profile: VoterProfile = {
    state: "Karnataka",
    isFirstTimeVoter: false,
    registrationStatus: "registered",
    needsAccessibilityAssistance: true,
    isNRI: false,
  };

  it("shows registration as done", () => {
    const items = generateChecklist(profile);
    const confirmed = items.find((i) => i.id === "reg-confirmed");
    expect(confirmed?.status).toBe("done");
  });

  it("includes accessibility assistance items", () => {
    const items = generateChecklist(profile);
    expect(items.some((i) => i.id === "a11y-blo")).toBe(true);
    expect(items.some((i) => i.id === "a11y-postal")).toBe(true);
    expect(items.some((i) => i.id === "a11y-transport")).toBe(true);
  });

  it("does NOT include first-time voter items", () => {
    const items = generateChecklist(profile);
    expect(items.some((i) => i.id === "first-slip")).toBe(false);
  });

  it("contains state name in date-note", () => {
    const items = generateChecklist(profile);
    const note = items.find((i) => i.id === "date-note");
    expect(note?.text).toContain("Karnataka");
  });
});

describe("User Flow: NRI voter (Delhi)", () => {
  const profile: VoterProfile = {
    state: "Delhi (NCT)",
    isFirstTimeVoter: false,
    registrationStatus: "not_registered",
    needsAccessibilityAssistance: false,
    isNRI: true,
  };

  it("includes NRI registration guidance", () => {
    const items = generateChecklist(profile);
    expect(items.some((i) => i.id === "nri-form")).toBe(true);
    expect(items.some((i) => i.id === "nri-travel")).toBe(true);
  });

  it("NRI form link points to voters portal", () => {
    const items = generateChecklist(profile);
    const nriForm = items.find((i) => i.id === "nri-form");
    expect(nriForm?.link).toContain("voters.eci.gov.in");
  });
});

describe("User Flow: Unsure registration status", () => {
  const profile: VoterProfile = {
    state: "Tamil Nadu",
    isFirstTimeVoter: false,
    registrationStatus: "unsure",
    needsAccessibilityAssistance: false,
    isNRI: false,
  };

  it("prompts to verify rather than register", () => {
    const items = generateChecklist(profile);
    expect(items.some((i) => i.id === "reg-check")).toBe(true);
    expect(items.some((i) => i.id === "reg-call")).toBe(true);
    // Should NOT have the urgent register step
    expect(items.some((i) => i.id === "reg-urgent")).toBe(false);
  });

  it("includes helpline number in text", () => {
    const items = generateChecklist(profile);
    const callItem = items.find((i) => i.id === "reg-call");
    expect(callItem?.text).toContain("1950");
  });
});

describe("User Flow: Incomplete profile handling", () => {
  it("returns empty checklist for empty state", () => {
    const items = generateChecklist({
      state: "",
      isFirstTimeVoter: true,
      registrationStatus: "registered",
      needsAccessibilityAssistance: false,
      isNRI: false,
    });
    expect(items).toHaveLength(0);
  });

  it("isProfileComplete returns false for partial profile", () => {
    expect(
      isProfileComplete({
        state: "Goa",
        isFirstTimeVoter: null,
        registrationStatus: null,
        needsAccessibilityAssistance: null,
        isNRI: null,
      })
    ).toBe(false);
  });
});

describe("User Flow: Assistant conversation", () => {
  it("handles sequential questions correctly", () => {
    const q1 = getAssistantAnswer("How do I register?");
    expect(q1.answer).toContain("Form 6");

    const q2 = getAssistantAnswer("What is NOTA?");
    expect(q2.answer).toContain("None of the Above");

    const q3 = getAssistantAnswer("What is the EVM?");
    expect(q3.answer).toContain("Control Unit");
  });

  it("never returns a blank answer", () => {
    const queries = [
      "register",
      "documents",
      "nota",
      "evm",
      "vvpat",
      "booth",
      "counting",
      "ink",
      "eligible",
      "secret",
      "postal",
    ];
    queries.forEach((q) => {
      const res = getAssistantAnswer(q);
      expect(res.answer.trim().length).toBeGreaterThan(0);
    });
  });

  it("always includes ECI reference for unknown queries", () => {
    const res = getAssistantAnswer("asdkfjalsdkfj");
    expect(res.answer).toContain("eci.gov.in");
  });

  it("returns related topics for known queries", () => {
    const res = getAssistantAnswer("How do I register as a new voter?");
    expect(res.relatedTopics).toBeDefined();
    expect(Array.isArray(res.relatedTopics)).toBe(true);
  });
});

describe("Data integrity checks", () => {
  it("all election types have required fields", async () => {
    const { ELECTIONS_DATA } = await import("@/lib/data/elections");
    ELECTIONS_DATA.forEach((election) => {
      expect(election.id).toBeTruthy();
      expect(election.title).toBeTruthy();
      expect(election.icon).toBeTruthy();
      expect(election.details.length).toBeGreaterThan(0);
    });
  });

  it("all timeline items have 7 stages", async () => {
    const { TIMELINE_DATA } = await import("@/lib/data/timeline");
    expect(TIMELINE_DATA).toHaveLength(7);
    const steps = TIMELINE_DATA.map((t) => t.step);
    expect(steps).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("all glossary terms have term and definition", async () => {
    const { GLOSSARY_TERMS } = await import("@/lib/data/glossary");
    GLOSSARY_TERMS.forEach((term) => {
      expect(term.id).toBeTruthy();
      expect(term.term).toBeTruthy();
      expect(term.definition.length).toBeGreaterThan(20);
    });
  });

  it("all registration forms have steps", async () => {
    const { REGISTRATION_FORMS } = await import("@/lib/data/registration");
    REGISTRATION_FORMS.forEach((form) => {
      expect(form.steps.length).toBeGreaterThan(0);
      form.steps.forEach((step) => {
        expect(step.title).toBeTruthy();
        expect(step.description).toBeTruthy();
      });
    });
  });

  it("all FAQs have question and answer", async () => {
    const { FAQS } = await import("@/lib/data/voting");
    FAQS.forEach((faq) => {
      expect(faq.question.length).toBeGreaterThan(5);
      expect(faq.answer.length).toBeGreaterThan(10);
    });
  });
});
