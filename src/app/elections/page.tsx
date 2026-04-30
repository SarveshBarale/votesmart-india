import type { Metadata } from "next";
import { Disclaimer } from "@/components/layout/Disclaimer";
import { Card, CardTitle } from "@/components/ui/Card";
import { ElectionCard } from "@/components/features/elections/ElectionCard";
import { ELECTIONS_DATA, VOTER_ELIGIBILITY_CRITERIA } from "@/lib/data/elections";
import { StepList } from "@/components/ui/StepList";

export const metadata: Metadata = {
  title: "Types of Elections in India",
  description:
    "Learn about Lok Sabha, Rajya Sabha, Vidhan Sabha, Local Body, and Presidential elections in India.",
};

export default function ElectionsPage() {
  return (
    <>
      <Disclaimer />
      <div className="mt-2 space-y-4">
        <Card>
          <CardTitle icon="🏛️">Types of Elections in India</CardTitle>
          <p className="text-gray-500 text-sm mb-4">
            India conducts elections at multiple levels of government. Click any card to explore
            details.
          </p>
          <div
            className="grid sm:grid-cols-2 gap-3"
            role="list"
            aria-label="Types of elections in India"
          >
            {ELECTIONS_DATA.map((election) => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle icon="✅">Voter Eligibility Criteria</CardTitle>
          <p className="text-gray-500 text-sm mb-4">
            You are eligible to vote in India if you meet{" "}
            <strong>all four</strong> of the following criteria:
          </p>
          <StepList
            steps={VOTER_ELIGIBILITY_CRITERIA}
            accentColor="navy"
          />
          <div className="mt-4 bg-india-green-light border border-green-200 rounded-xl px-4 py-3 text-xs text-gray-700">
            <strong className="text-india-green">Tip:</strong> Verify your eligibility and
            registration status at{" "}
            <a
              href="https://voters.eci.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-600 underline"
            >
              voters.eci.gov.in
            </a>{" "}
            or call <strong>1950</strong>.
          </div>
        </Card>
      </div>
    </>
  );
}
