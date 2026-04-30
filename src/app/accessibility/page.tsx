import type { Metadata } from "next";
import { Disclaimer } from "@/components/layout/Disclaimer";
import { AccessibilitySection } from "@/components/features/accessibility/AccessibilitySection";

export const metadata: Metadata = {
  title: "Voter Accessibility — SAKSHAM Initiative",
  description:
    "How India's elections accommodate elderly voters, Persons with Disabilities, and others — Braille EVMs, companion voting, SAKSHAM, postal ballot, and more.",
};

export default function AccessibilityPage() {
  return (
    <>
      <Disclaimer />
      <div className="mt-2">
        <AccessibilitySection />
      </div>
    </>
  );
}
