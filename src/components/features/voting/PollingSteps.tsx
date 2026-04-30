"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Card, CardTitle } from "@/components/ui/Card";
import { StepList } from "@/components/ui/StepList";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import {
  POLLING_STEPS,
  VOTING_METHODS,
  AFTER_VOTING_STEPS,
  FAQS,
} from "@/lib/data/voting";
import type { VotingMethod } from "@/types";

export function PollingStepsCard() {
  return (
    <Card>
      <CardTitle icon="🗳️">Polling Day — Step by Step</CardTitle>
      <p className="text-gray-500 text-sm mb-4">
        Here is exactly what happens when you go to cast your vote on election day.
      </p>
      <StepList steps={POLLING_STEPS} accentColor="saffron" />
    </Card>
  );
}

export function VotingMethodsCard() {
  const [selected, setSelected] = useState<VotingMethod | null>(null);

  const current = VOTING_METHODS.find((m) => m.id === selected);

  return (
    <Card>
      <CardTitle icon="⚙️">Voting Methods in India</CardTitle>
      <p className="text-gray-500 text-sm mb-4">
        Click any method to learn how it works.
      </p>

      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        role="group"
        aria-label="Voting methods"
      >
        {VOTING_METHODS.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() =>
              setSelected((prev) => (prev === method.id ? null : method.id))
            }
            aria-expanded={selected === method.id}
            aria-controls={`method-detail-${method.id}`}
            className={clsx(
              "border-2 rounded-xl p-3 text-center transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600",
              selected === method.id
                ? "border-saffron-600 bg-saffron-50 shadow-sm"
                : "border-gray-200 bg-white hover:border-navy-300 hover:bg-gray-50"
            )}
          >
            <div className="text-2xl mb-1" aria-hidden="true">
              {method.icon}
            </div>
            <div className="text-xs font-bold text-navy-600">{method.name}</div>
            <div className="text-xs text-gray-400 mt-0.5 leading-tight">
              {method.shortDesc}
            </div>
          </button>
        ))}
      </div>

      {current && (
        <div
          id={`method-detail-${current.id}`}
          role="region"
          aria-label={`${current.name} details`}
          className="mt-4 bg-navy-50 border border-navy-100 rounded-xl px-4 py-3 animate-fade-in"
        >
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-lg" aria-hidden="true">
              {current.icon}
            </span>
            <h3 className="font-bold text-navy-600 text-sm">{current.fullName}</h3>
            {current.introducedYear && (
              <Badge color="gray">Since {current.introducedYear}</Badge>
            )}
          </div>
          <ul className="space-y-1.5">
            {current.details.map((d, i) => (
              <li
                key={i}
                className="text-xs text-gray-700 flex gap-2 leading-relaxed"
              >
                <span className="text-navy-400 flex-shrink-0 mt-0.5" aria-hidden="true">
                  •
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

export function AfterVotingCard() {
  return (
    <Card>
      <CardTitle icon="📊">After Voting — Count & Results</CardTitle>
      <StepList steps={AFTER_VOTING_STEPS} accentColor="navy" />
    </Card>
  );
}

export function VotingFAQCard() {
  const accordionItems = FAQS.map((faq) => ({
    id: faq.id,
    trigger: faq.question,
    content: <p className="leading-relaxed">{faq.answer}</p>,
  }));

  return (
    <Card>
      <CardTitle icon="❓">Frequently Asked Questions</CardTitle>
      <Accordion items={accordionItems} allowMultiple />
    </Card>
  );
}
