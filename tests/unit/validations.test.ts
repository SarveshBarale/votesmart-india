import {
  VoterProfileSchema,
  ChatMessageSchema,
  CalendarEventSchema,
} from "@/lib/validations/journey";

describe("VoterProfileSchema", () => {
  const validProfile = {
    state: "Maharashtra",
    isFirstTimeVoter: true,
    registrationStatus: "registered",
    needsAccessibilityAssistance: false,
    isNRI: false,
  };

  it("accepts a valid complete profile", () => {
    expect(VoterProfileSchema.safeParse(validProfile).success).toBe(true);
  });

  it("rejects invalid state", () => {
    const result = VoterProfileSchema.safeParse({
      ...validProfile,
      state: "InvalidState",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing isFirstTimeVoter", () => {
    const { isFirstTimeVoter: _, ...rest } = validProfile;
    const result = VoterProfileSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects invalid registrationStatus", () => {
    const result = VoterProfileSchema.safeParse({
      ...validProfile,
      registrationStatus: "maybe",
    });
    expect(result.success).toBe(false);
  });

  it("accepts all valid registrationStatus values", () => {
    ["registered", "not_registered", "unsure"].forEach((status) => {
      expect(
        VoterProfileSchema.safeParse({ ...validProfile, registrationStatus: status }).success
      ).toBe(true);
    });
  });

  it("defaults isNRI to false when not provided", () => {
    const { isNRI: _, ...rest } = validProfile;
    const result = VoterProfileSchema.safeParse(rest);
    if (result.success) {
      expect(result.data.isNRI).toBe(false);
    }
  });

  it("accepts all valid Indian states", () => {
    const validStates = ["Karnataka", "Tamil Nadu", "Delhi (NCT)", "Jammu & Kashmir"];
    validStates.forEach((state) => {
      expect(
        VoterProfileSchema.safeParse({ ...validProfile, state }).success
      ).toBe(true);
    });
  });
});

describe("ChatMessageSchema", () => {
  it("accepts a valid message", () => {
    expect(ChatMessageSchema.safeParse({ content: "How do I register?" }).success).toBe(true);
  });

  it("rejects empty message", () => {
    expect(ChatMessageSchema.safeParse({ content: "" }).success).toBe(false);
  });

  it("rejects message over 500 chars", () => {
    expect(
      ChatMessageSchema.safeParse({ content: "a".repeat(501) }).success
    ).toBe(false);
  });

  it("accepts exactly 500 chars", () => {
    expect(
      ChatMessageSchema.safeParse({ content: "a".repeat(500) }).success
    ).toBe(true);
  });

  it("trims whitespace", () => {
    const result = ChatMessageSchema.safeParse({ content: "  hello  " });
    if (result.success) {
      expect(result.data.content).toBe("hello");
    }
  });

  it("rejects whitespace-only message after trim", () => {
    expect(ChatMessageSchema.safeParse({ content: "   " }).success).toBe(false);
  });
});

describe("CalendarEventSchema", () => {
  const validEvent = {
    title: "Vote Registration Deadline",
    description: "Last day to register",
    startDate: "2025-01-01",
    endDate: "2025-01-01",
    reminderMinutes: 1440,
  };

  it("accepts a valid event", () => {
    expect(CalendarEventSchema.safeParse(validEvent).success).toBe(true);
  });

  it("rejects invalid date format", () => {
    expect(
      CalendarEventSchema.safeParse({ ...validEvent, startDate: "01/01/2025" }).success
    ).toBe(false);
  });

  it("rejects empty title", () => {
    expect(
      CalendarEventSchema.safeParse({ ...validEvent, title: "" }).success
    ).toBe(false);
  });

  it("rejects title over 100 chars", () => {
    expect(
      CalendarEventSchema.safeParse({ ...validEvent, title: "a".repeat(101) }).success
    ).toBe(false);
  });

  it("rejects negative reminderMinutes", () => {
    expect(
      CalendarEventSchema.safeParse({ ...validEvent, reminderMinutes: -1 }).success
    ).toBe(false);
  });

  it("accepts event without optional fields", () => {
    const { description: _, reminderMinutes: __, ...minimal } = validEvent;
    expect(CalendarEventSchema.safeParse(minimal).success).toBe(true);
  });

  it("rejects reminder over 10080 minutes (1 week)", () => {
    expect(
      CalendarEventSchema.safeParse({ ...validEvent, reminderMinutes: 10081 }).success
    ).toBe(false);
  });
});
