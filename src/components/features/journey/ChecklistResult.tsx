"use client";

import { clsx } from "clsx";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useVoterJourney } from "@/lib/hooks/useVoterJourney";
import { useCalendar, DEFAULT_ELECTION_EVENTS } from "@/lib/hooks/useCalendar";
import type { ChecklistItem } from "@/types";

const statusConfig: Record<
  ChecklistItem["status"],
  { icon: string; bg: string; text: string; label: string }
> = {
  done: { icon: "✓", bg: "bg-green-100", text: "text-green-700", label: "Completed" },
  todo: { icon: "○", bg: "bg-amber-100", text: "text-amber-700", label: "To do" },
  info: { icon: "ℹ", bg: "bg-navy-50", text: "text-navy-600", label: "Information" },
  warning: { icon: "!", bg: "bg-red-100", text: "text-red-700", label: "Important" },
};

function ChecklistItemRow({ item }: { item: ChecklistItem }) {
  const cfg = statusConfig[item.status];
  return (
    <li className="flex gap-3 py-3 border-b border-gray-100 last:border-0 items-start">
      <span
        className={clsx(
          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5",
          cfg.bg,
          cfg.text
        )}
        aria-label={cfg.label}
        aria-hidden="true"
      >
        {cfg.icon}
      </span>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{item.text}</p>
        {item.link && item.linkText && (
          <a
            href={item.link}
            target={item.link.startsWith("http") ? "_blank" : undefined}
            rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-xs text-navy-600 underline mt-0.5 inline-block hover:text-saffron-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-navy-600 rounded"
          >
            {item.linkText} →
          </a>
        )}
      </div>
      {item.priority === "high" && item.status === "todo" && (
        <span className="text-xs bg-red-50 text-red-600 border border-red-100 px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5">
          Priority
        </span>
      )}
    </li>
  );
}

export function ChecklistResult() {
  const { checklist, hasGenerated, reset, profile } = useVoterJourney();
  const { openGoogleCalendarUrl, success, loading } = useCalendar();

  if (!hasGenerated) return null;

  const highPriority = checklist.filter(
    (i) => i.priority === "high" && i.status === "todo"
  ).length;

  return (
    <div id="journey-result" aria-live="polite" aria-atomic="true" className="mt-4 space-y-4">
      <Card>
        <CardTitle icon="✅">
          Your Voter Checklist — {profile.state}
        </CardTitle>

        {highPriority > 0 && (
          <div className="mb-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 text-sm text-amber-800 flex gap-2">
            <span aria-hidden="true">⚠️</span>
            <span>
              You have <strong>{highPriority} priority action{highPriority > 1 ? "s" : ""}</strong> to
              complete before the next election.
            </span>
          </div>
        )}

        <ul className="mt-1" aria-label="Personalized voter checklist">
          {checklist.map((item) => (
            <ChecklistItemRow key={item.id} item={item} />
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant="green"
            size="sm"
            onClick={() => openGoogleCalendarUrl(DEFAULT_ELECTION_EVENTS[0])}
            loading={loading}
            aria-label="Add voter registration reminder to Google Calendar"
          >
            {success ? "✓ Added!" : "📅 Add to Google Calendar"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={reset}
            aria-label="Start over with a new profile"
          >
            ↺ Start Over
          </Button>
        </div>
      </Card>

      {/* Maps placeholder */}
      <Card variant="info">
        <CardTitle icon="📍" as="h3">
          Find Your Polling Booth
        </CardTitle>
        <p className="text-sm text-gray-600 mb-3">
          Google Maps integration locates your assigned polling booth. Search by your EPIC number
          on the official portal, or use the map below once enabled.
        </p>
        <div
          className="rounded-xl bg-navy-50 border border-navy-100 h-40 flex items-center justify-center text-gray-400 text-sm"
          role="img"
          aria-label="Google Maps polling booth locator (requires API key configuration)"
        >
          <span>🗺️ Google Maps — configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable</span>
        </div>
        <a
          href="https://voters.eci.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-navy-600 underline mt-2 inline-block"
        >
          Search your booth on voters.eci.gov.in →
        </a>
      </Card>
    </div>
  );
}
