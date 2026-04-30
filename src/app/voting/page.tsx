import type { Metadata } from "next";
import { Disclaimer } from "@/components/layout/Disclaimer";
import {
  PollingStepsCard,
  VotingMethodsCard,
  AfterVotingCard,
  VotingFAQCard,
} from "@/components/features/voting/PollingSteps";

export const metadata: Metadata = {
  title: "Polling Day Guide — How to Vote in India",
  description:
    "Complete step-by-step guide to voting day in India — polling booth, EVM, VVPAT, indelible ink, NOTA, and result declaration.",
};

export default function VotingPage() {
  return (
    <>
      <Disclaimer />
      <div className="mt-2 space-y-4">
        <PollingStepsCard />
        <VotingMethodsCard />
        <AfterVotingCard />
        <VotingFAQCard />
      </div>
    </>
  );
}
