"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Badge } from "@/components/ui/Badge";
import type { TimelineItem } from "@/types";

interface TimelineViewProps {
  items: TimelineItem[];
}

const colorMap = {
  saffron: {
    dot: "bg-saffron-600",
    ring: "ring-saffron-200",
    line: "from-saffron-600",
  },
  navy: {
    dot: "bg-navy-600",
    ring: "ring-navy-200",
    line: "from-navy-600",
  },
  green: {
    dot: "bg-india-green",
    ring: "ring-green-200",
    line: "from-india-green",
  },
};

export function TimelineView({ items }: TimelineViewProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="relative" role="list" aria-label="Election timeline stages">
      {/* Vertical line */}
      <div
        className="absolute left-4 top-5 bottom-5 w-0.5 bg-gradient-to-b from-saffron-600 via-navy-600 to-india-green"
        aria-hidden="true"
      />

      <div className="space-y-4 pl-10">
        {items.map((item) => {
          const isOpen = openId === item.id;
          const colors = colorMap[item.color];

          return (
            <div key={item.id} className="relative" role="listitem">
              {/* Dot */}
              <div
                className={clsx(
                  "absolute -left-[26px] top-3 w-4 h-4 rounded-full ring-2 ring-white ring-offset-1",
                  colors.dot,
                  isOpen && `ring-2 ${colors.ring}`
                )}
                aria-hidden="true"
              />

              {/* Card */}
              <div
                className={clsx(
                  "border rounded-xl overflow-hidden transition-all",
                  isOpen ? "border-navy-200 shadow-sm" : "border-gray-200 hover:border-gray-300"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`tl-content-${item.id}`}
                  id={`tl-trigger-${item.id}`}
                  className={clsx(
                    "w-full text-left px-4 py-3 flex items-start gap-3 bg-white",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-600",
                    "hover:bg-gray-50 transition-colors"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        Step {item.step}
                      </span>
                      <Badge color={item.badgeColor}>{item.badge}</Badge>
                      {item.duration && (
                        <span className="text-xs text-gray-400">{item.duration}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mt-0.5">{item.title}</h3>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.subtitle}</p>
                  </div>
                  <svg
                    className={clsx(
                      "w-4 h-4 flex-shrink-0 text-gray-400 transition-transform mt-1",
                      isOpen && "rotate-180"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  id={`tl-content-${item.id}`}
                  role="region"
                  aria-labelledby={`tl-trigger-${item.id}`}
                  hidden={!isOpen}
                  className={clsx(
                    "border-t border-gray-100 bg-gray-50 text-sm text-gray-700 leading-relaxed",
                    isOpen && "px-4 py-3 animate-fade-in"
                  )}
                >
                  {isOpen && <p>{item.details}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
