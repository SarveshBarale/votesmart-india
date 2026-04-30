"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Card, CardTitle } from "@/components/ui/Card";
import { StepList } from "@/components/ui/StepList";
import { REGISTRATION_FORMS, DOCUMENTS_ACCEPTED } from "@/lib/data/registration";
import type { RegistrationForm } from "@/types";

const TAB_LABELS: Record<RegistrationForm, string> = {
  form6: "New Registration",
  form8: "Correction",
  form6a: "NRI Voters",
  verify: "Verify",
};

export function RegistrationTabs() {
  const [activeTab, setActiveTab] = useState<RegistrationForm>("form6");

  const current = REGISTRATION_FORMS.find((f) => f.id === activeTab)!;

  return (
    <Card>
      <CardTitle icon="📝">Voter Registration Guide</CardTitle>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Registration form types"
        className="flex flex-wrap gap-1.5 mb-5"
      >
        {REGISTRATION_FORMS.map((form) => (
          <button
            key={form.id}
            role="tab"
            aria-selected={activeTab === form.id}
            aria-controls={`tab-panel-${form.id}`}
            id={`tab-btn-${form.id}`}
            onClick={() => setActiveTab(form.id)}
            className={clsx(
              "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600",
              activeTab === form.id
                ? "bg-saffron-600 text-white border-saffron-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-navy-300 hover:text-navy-600"
            )}
          >
            {TAB_LABELS[form.id]}
          </button>
        ))}
      </div>

      {/* Panel */}
      {REGISTRATION_FORMS.map((form) => (
        <div
          key={form.id}
          id={`tab-panel-${form.id}`}
          role="tabpanel"
          aria-labelledby={`tab-btn-${form.id}`}
          hidden={activeTab !== form.id}
          className="animate-fade-in"
        >
          {activeTab === form.id && (
            <>
              <div className="mb-3">
                <h3 className="font-bold text-navy-600 text-sm">{current.label}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{current.purpose}</p>
              </div>

              <StepList steps={current.steps} accentColor="saffron" />

              {current.note && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 text-xs text-amber-800 flex gap-2">
                  <span aria-hidden="true">💡</span>
                  <span>{current.note}</span>
                </div>
              )}

              {/* Quick links */}
              <div className="mt-4 flex gap-2 flex-wrap">
                <a
                  href="https://voters.eci.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-navy-50 text-navy-600 border border-navy-100 px-3 py-1.5 rounded-lg hover:bg-navy-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
                >
                  voters.eci.gov.in →
                </a>
                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">
                  Helpline: 1950
                </span>
              </div>
            </>
          )}
        </div>
      ))}
    </Card>
  );
}

export function DocumentsCard() {
  return (
    <Card>
      <CardTitle icon="📄" as="h3">Accepted Documents</CardTitle>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wide text-saffron-600 mb-2">
            Proof of Age
          </h4>
          <ul className="space-y-1">
            {DOCUMENTS_ACCEPTED.proofOfAge.map((doc) => (
              <li key={doc} className="text-xs text-gray-600 flex gap-1.5">
                <span className="text-saffron-400 mt-0.5" aria-hidden="true">•</span>
                {doc}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wide text-navy-600 mb-2">
            Proof of Address
          </h4>
          <ul className="space-y-1">
            {DOCUMENTS_ACCEPTED.proofOfAddress.map((doc) => (
              <li key={doc} className="text-xs text-gray-600 flex gap-1.5">
                <span className="text-navy-400 mt-0.5" aria-hidden="true">•</span>
                {doc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
