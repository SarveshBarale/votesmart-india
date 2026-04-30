import type { Metadata } from "next";
import { Disclaimer } from "@/components/layout/Disclaimer";
import { JourneyForm } from "@/components/features/journey/JourneyForm";
import { ChecklistResult } from "@/components/features/journey/ChecklistResult";

export const metadata: Metadata = {
  title: "My Voter Journey",
  description:
    "Get a personalized voter checklist based on your state, registration status, and needs.",
};

export default function JourneyPage() {
  return (
    <>
      <Disclaimer />
      <div className="space-y-0 mt-2">
        <JourneyForm />
        <ChecklistResult />
      </div>
    </>
  );
}
