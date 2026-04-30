"use client";

import { useState } from "react";
import { clsx } from "clsx";

interface AccordionItem {
  id: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(items.filter((i) => i.defaultOpen).map((i) => i.id))
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={clsx("space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              className={clsx(
                "w-full text-left flex items-center justify-between gap-3 px-4 py-3.5",
                "text-sm font-semibold bg-white hover:bg-gray-50",
                "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-600",
                isOpen && "bg-gray-50"
              )}
            >
              <span>{item.trigger}</span>
              <svg
                className={clsx(
                  "w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-200",
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
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              hidden={!isOpen}
              className={clsx(
                "border-t border-gray-100 bg-gray-50 px-4 text-sm text-gray-700 leading-relaxed",
                isOpen ? "py-3 animate-fade-in" : ""
              )}
            >
              {isOpen && item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
