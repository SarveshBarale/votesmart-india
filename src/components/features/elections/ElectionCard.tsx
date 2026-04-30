"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Badge } from "@/components/ui/Badge";
import type { ElectionInfo } from "@/types";

interface ElectionCardProps {
  election: ElectionInfo;
}

export function ElectionCard({ election }: ElectionCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all hover:border-navy-300 hover:shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={`election-detail-${election.id}`}
        className={clsx(
          "w-full text-left p-4 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-600",
          "hover:bg-gray-50 transition-colors"
        )}
      >
        <div className="flex items-start gap-3">
          <span className="text-3xl flex-shrink-0" aria-hidden="true">
            {election.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-navy-600 text-sm">{election.title}</h3>
              <span className="text-gray-400 text-xs">{election.titleHindi}</span>
            </div>
            <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{election.shortDesc}</p>
            <div className="flex gap-1.5 mt-2 flex-wrap">
              <Badge color="gray">{election.frequency}</Badge>
              <Badge color={election.conductedBy === "ECI" ? "navy" : "saffron"}>
                {election.conductedBy}
              </Badge>
              {election.seats && <Badge color="green">{election.seats} seats</Badge>}
            </div>
          </div>
          <svg
            className={clsx(
              "w-4 h-4 flex-shrink-0 text-gray-400 transition-transform mt-1",
              expanded && "rotate-180"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div
        id={`election-detail-${election.id}`}
        role="region"
        aria-label={`${election.title} details`}
        hidden={!expanded}
        className={clsx(
          "border-t border-gray-100 bg-navy-50 px-4",
          expanded ? "py-3 animate-fade-in" : ""
        )}
      >
        {expanded && (
          <ul className="space-y-1.5" aria-label={`${election.title} key facts`}>
            {election.details.map((detail, i) => (
              <li key={i} className="flex gap-2 text-xs text-gray-700 leading-relaxed">
                <span className="text-navy-400 flex-shrink-0 mt-0.5" aria-hidden="true">•</span>
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
