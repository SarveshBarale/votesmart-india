import { getAssistantAnswer, QUICK_QUESTIONS } from "@/lib/utils/assistant";

describe("getAssistantAnswer", () => {
  describe("registration queries", () => {
    it("matches 'how do I register' query", () => {
      const res = getAssistantAnswer("How do I register as a new voter?");
      expect(res.answer).toContain("Form 6");
      expect(res.answer).toContain("voters.eci.gov.in");
    });

    it("matches 'form 6' keyword", () => {
      const res = getAssistantAnswer("Tell me about Form 6");
      expect(res.answer).toContain("Form 6");
    });

    it("matches 'enroll' keyword", () => {
      const res = getAssistantAnswer("How do I enroll as a voter?");
      expect(res.answer.length).toBeGreaterThan(50);
    });
  });

  describe("documents queries", () => {
    it("returns document info for proof query", () => {
      const res = getAssistantAnswer("What proof documents do I need?");
      expect(res.answer).toContain("Aadhaar");
    });

    it("matches 'carry' keyword", () => {
      const res = getAssistantAnswer("What should I carry on polling day?");
      expect(res.answer.length).toBeGreaterThan(50);
    });
  });

  describe("NOTA queries", () => {
    it("returns NOTA explanation", () => {
      const res = getAssistantAnswer("What is NOTA?");
      expect(res.answer).toContain("None of the Above");
      expect(res.answer).toContain("2013");
    });

    it("matches 'reject all' keyword", () => {
      const res = getAssistantAnswer("Can I reject all candidates?");
      expect(res.answer).toContain("NOTA");
    });
  });

  describe("EVM queries", () => {
    it("returns EVM explanation", () => {
      const res = getAssistantAnswer("How does the EVM work?");
      expect(res.answer).toContain("Control Unit");
      expect(res.answer).toContain("Balloting Unit");
    });

    it("matches 'electronic voting machine' keyword", () => {
      const res = getAssistantAnswer("Tell me about electronic voting machine");
      expect(res.answer).toContain("EVM");
    });
  });

  describe("VVPAT queries", () => {
    it("returns VVPAT explanation", () => {
      const res = getAssistantAnswer("What is VVPAT?");
      expect(res.answer).toContain("paper slip");
      expect(res.answer).toContain("7 seconds");
    });

    it("matches 'paper trail' keyword", () => {
      const res = getAssistantAnswer("Is there a paper trail for my vote?");
      expect(res.answer).toContain("VVPAT");
    });
  });

  describe("counting queries", () => {
    it("returns counting explanation", () => {
      const res = getAssistantAnswer("What happens on counting day?");
      expect(res.answer).toContain("postal ballots");
      expect(res.answer).toContain("rounds");
    });

    it("matches 'result' keyword", () => {
      const res = getAssistantAnswer("How is the result declared?");
      expect(res.answer.length).toBeGreaterThan(50);
    });
  });

  describe("eligibility queries", () => {
    it("returns eligibility criteria", () => {
      const res = getAssistantAnswer("Who is eligible to vote?");
      expect(res.answer).toContain("18");
      expect(res.answer).toContain("Indian citizen");
    });

    it("matches '18' keyword", () => {
      const res = getAssistantAnswer("Is the age limit 18 for voting?");
      expect(res.answer).toContain("18");
    });
  });

  describe("booth queries", () => {
    it("returns booth finding guidance", () => {
      const res = getAssistantAnswer("Where is my polling booth?");
      expect(res.answer).toContain("voters.eci.gov.in");
      expect(res.answer).toContain("1950");
    });
  });

  describe("ink queries", () => {
    it("returns indelible ink explanation", () => {
      const res = getAssistantAnswer("What is the ink on my finger?");
      expect(res.answer).toContain("indelible");
      expect(res.answer).toContain("Mysore");
    });
  });

  describe("secret ballot queries", () => {
    it("returns ballot secrecy info", () => {
      const res = getAssistantAnswer("Is my vote secret?");
      expect(res.answer).toContain("secret");
    });

    it("matches 'anonymous' keyword", () => {
      const res = getAssistantAnswer("Is voting anonymous?");
      expect(res.answer.length).toBeGreaterThan(50);
    });
  });

  describe("fallback", () => {
    it("returns fallback for unknown query", () => {
      const res = getAssistantAnswer("xyzzy gibberish unknown topic");
      expect(res.answer).toContain("eci.gov.in");
      expect(res.sources).toBeDefined();
    });

    it("fallback includes helpline number", () => {
      const res = getAssistantAnswer("completely unrelated question");
      expect(res.answer).toContain("1950");
    });
  });

  describe("response structure", () => {
    it("always returns an answer string", () => {
      const res = getAssistantAnswer("anything");
      expect(typeof res.answer).toBe("string");
      expect(res.answer.length).toBeGreaterThan(0);
    });

    it("returns relatedTopics array when match found", () => {
      const res = getAssistantAnswer("How do I register?");
      expect(Array.isArray(res.relatedTopics)).toBe(true);
    });
  });
});

describe("QUICK_QUESTIONS", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(QUICK_QUESTIONS)).toBe(true);
    expect(QUICK_QUESTIONS.length).toBeGreaterThan(0);
  });

  it("all quick questions return non-empty answers", () => {
    QUICK_QUESTIONS.forEach((q) => {
      const res = getAssistantAnswer(q);
      expect(res.answer.length).toBeGreaterThan(10);
    });
  });
});
