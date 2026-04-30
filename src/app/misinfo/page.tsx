import type { Metadata } from "next";
import { Disclaimer } from "@/components/layout/Disclaimer";
import { MisinfoSection } from "@/components/features/misinfo/MisinfoSection";
import { VotingFAQCard } from "@/components/features/voting/PollingSteps";

export const metadata: Metadata = {
  title: "Fact Check & Misinformation Awareness",
  description:
    "How to verify election information, avoid fake news, report via cVIGIL, and access official ECI resources.",
};

export default function MisinfoPage() {
  return (
    <>
      <Disclaimer />
      <div className="mt-2 space-y-4">
        <MisinfoSection />
        <VotingFAQCard />
      </div>
    </>
  );
}
