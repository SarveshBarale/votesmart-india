// ============================================================
// VoteSmart India — Shared TypeScript Types
// ============================================================

// --- Election Types ---

export type ElectionType =
  | "lok_sabha"
  | "rajya_sabha"
  | "vidhan_sabha"
  | "local_body"
  | "presidential"
  | "by_election";

export interface ElectionInfo {
  id: ElectionType;
  title: string;
  titleHindi: string;
  icon: string;
  shortDesc: string;
  details: string[];
  conductedBy: "ECI" | "State Election Commission" | "Parliament";
  frequency: string;
  seats?: number;
}

// --- Voter Journey ---

export type IndianState =
  | "Andhra Pradesh"
  | "Arunachal Pradesh"
  | "Assam"
  | "Bihar"
  | "Chhattisgarh"
  | "Goa"
  | "Gujarat"
  | "Haryana"
  | "Himachal Pradesh"
  | "Jharkhand"
  | "Karnataka"
  | "Kerala"
  | "Madhya Pradesh"
  | "Maharashtra"
  | "Manipur"
  | "Meghalaya"
  | "Mizoram"
  | "Nagaland"
  | "Odisha"
  | "Punjab"
  | "Rajasthan"
  | "Sikkim"
  | "Tamil Nadu"
  | "Telangana"
  | "Tripura"
  | "Uttar Pradesh"
  | "Uttarakhand"
  | "West Bengal"
  | "Delhi (NCT)"
  | "Jammu & Kashmir"
  | "Puducherry"
  | "Chandigarh"
  | "Ladakh";

export interface VoterProfile {
  state: IndianState | "";
  isFirstTimeVoter: boolean | null;
  registrationStatus: "registered" | "not_registered" | "unsure" | null;
  needsAccessibilityAssistance: boolean | null;
  isNRI: boolean | null;
}

export interface ChecklistItem {
  id: string;
  text: string;
  status: "done" | "todo" | "info" | "warning";
  link?: string;
  linkText?: string;
  priority: "high" | "medium" | "low";
}

// --- Timeline ---

export type TimelineStage =
  | "announcement"
  | "mcc"
  | "nominations"
  | "campaign"
  | "polling"
  | "counting"
  | "results";

export interface TimelineItem {
  id: TimelineStage;
  step: number;
  title: string;
  subtitle: string;
  color: "saffron" | "navy" | "green";
  badge: string;
  badgeColor: "saffron" | "navy" | "green";
  details: string;
  duration?: string;
}

// --- Voting Methods ---

export type VotingMethod = "evm" | "vvpat" | "postal" | "nota";

export interface VotingMethodInfo {
  id: VotingMethod;
  icon: string;
  name: string;
  fullName: string;
  shortDesc: string;
  details: string[];
  introducedYear?: number;
}

// --- Registration ---

export type RegistrationForm = "form6" | "form8" | "form6a" | "verify";

export interface RegistrationStep {
  step: number;
  title: string;
  description: string;
  details?: string;
}

export interface RegistrationFormInfo {
  id: RegistrationForm;
  label: string;
  purpose: string;
  steps: RegistrationStep[];
  note?: string;
}

// --- Glossary ---

export interface GlossaryTerm {
  id: string;
  term: string;
  acronym?: string;
  definition: string;
  relatedTerms?: string[];
  officialSource?: string;
}

// --- FAQ ---

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "registration" | "voting" | "general" | "eligibility" | "results";
}

// --- Accessibility ---

export interface AccessibilityFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  initiative?: string;
}

// --- Assistant ---

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface AssistantResponse {
  answer: string;
  sources?: string[];
  relatedTopics?: string[];
}

// --- Polling Steps ---

export interface PollingStep {
  step: number;
  title: string;
  description: string;
  tip?: string;
}

// --- Misinformation Tips ---

export interface MisinfoTip {
  id: string;
  number: number;
  title: string;
  description: string;
}

// --- Google Calendar ---

export interface CalendarEvent {
  title: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string;
  reminderMinutes?: number;
}

// --- Firebase User ---

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  voterProfile?: Partial<VoterProfile>;
  createdAt: Date;
  updatedAt: Date;
}

// --- API Response ---

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
