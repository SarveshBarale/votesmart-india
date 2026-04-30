import { z } from "zod";

export const IndianStateSchema = z.enum([
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi (NCT)",
  "Jammu & Kashmir",
  "Puducherry",
  "Chandigarh",
  "Ladakh",
]);

export const VoterProfileSchema = z.object({
  state: IndianStateSchema,
  isFirstTimeVoter: z.boolean({ required_error: "Please indicate if this is your first time voting" }),
  registrationStatus: z.enum(["registered", "not_registered", "unsure"], {
    required_error: "Please select your registration status",
  }),
  needsAccessibilityAssistance: z.boolean({
    required_error: "Please indicate if you need accessibility assistance",
  }),
  isNRI: z.boolean().default(false),
});

export type VoterProfileInput = z.infer<typeof VoterProfileSchema>;

export const ChatMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(500, "Message too long — please keep it under 500 characters"),
});

export type ChatMessageInput = z.infer<typeof ChatMessageSchema>;

export const CalendarEventSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  reminderMinutes: z.number().int().min(0).max(10080).optional(),
});

export type CalendarEventInput = z.infer<typeof CalendarEventSchema>;
