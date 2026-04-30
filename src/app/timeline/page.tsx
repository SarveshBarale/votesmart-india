import type { Metadata } from "next";
import { Disclaimer } from "@/components/layout/Disclaimer";
import { Card, CardTitle } from "@/components/ui/Card";
import { TimelineView } from "@/components/features/timeline/TimelineView";
import { TIMELINE_DATA } from "@/lib/data/timeline";

export const metadata: Metadata = {
  title: "Election Timeline",
  description:
    "Interactive step-by-step timeline of Indian elections — announcement, nominations, campaign, polling, counting, and result declaration.",
};

export default function TimelinePage() {
  return (
    <>
      <Disclaimer />
      <div className="mt-2 space-y-4">
        <Card>
          <CardTitle icon="📅">Indian Election Timeline</CardTitle>
          <p className="text-gray-500 text-sm mb-5">
            Every Indian election follows a legally mandated sequence of events. Click each stage
            to expand and understand what happens. Timelines are indicative — exact dates are
            notified by the ECI for each election.
          </p>
          <TimelineView items={TIMELINE_DATA} />
        </Card>

        {/* MCC callout */}
        <Card variant="info">
          <CardTitle icon="📋" as="h3">
            Model Code of Conduct (MCC) — Quick Reference
          </CardTitle>
          <p className="text-sm text-gray-600 mb-3">
            The MCC comes into force the moment the election schedule is announced and stays until
            a government is formed. It applies to all parties, candidates, and the government.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                heading: "What is NOT allowed",
                items: [
                  "Use of government vehicles / staff for campaign",
                  "New policy announcements by ruling government",
                  "Appeals to caste, religion, or community",
                  "Distributing money, gifts, or liquor",
                  "Defacing public/private property",
                ],
                color: "text-red-600",
                bg: "bg-red-50 border-red-100",
              },
              {
                heading: "What IS allowed",
                items: [
                  "Public rallies with 48h advance notice",
                  "Door-to-door canvassing",
                  "Print and broadcast ads (pre-certified)",
                  "Digital outreach within expenditure limits",
                  "Polling agents at booths on polling day",
                ],
                color: "text-india-green",
                bg: "bg-india-green-light border-green-200",
              },
            ].map(({ heading, items, color, bg }) => (
              <div
                key={heading}
                className={`border rounded-xl p-3 ${bg}`}
              >
                <h4 className={`text-xs font-bold uppercase tracking-wide mb-2 ${color}`}>
                  {heading}
                </h4>
                <ul className="space-y-1">
                  {items.map((item) => (
                    <li key={item} className="text-xs text-gray-700 flex gap-1.5">
                      <span className={`flex-shrink-0 mt-0.5 ${color}`} aria-hidden="true">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            MCC violations can be reported to the ECI or via the cVIGIL app. For the full MCC
            text, visit{" "}
            <a
              href="https://eci.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-600 underline"
            >
              eci.gov.in
            </a>
            .
          </p>
        </Card>
      </div>
    </>
  );
}
