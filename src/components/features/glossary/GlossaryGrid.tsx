"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Card, CardTitle } from "@/components/ui/Card";
import { GLOSSARY_TERMS } from "@/lib/data/glossary";

export function GlossaryGrid() {
  const [query, setQuery] = useState("");

  const filtered = GLOSSARY_TERMS.filter((t) => {
    const q = query.toLowerCase();
    return (
      t.term.toLowerCase().includes(q) ||
      t.acronym?.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q)
    );
  });

  return (
    <Card>
      <CardTitle icon="📖">Election Glossary</CardTitle>
      <p className="text-gray-500 text-sm mb-4">
        Key terms used in the Indian election process.
      </p>

      {/* Search */}
      <div className="mb-4 relative">
        <label htmlFor="glossary-search" className="sr-only">
          Search glossary terms
        </label>
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
          aria-hidden="true"
        >
          🔍
        </span>
        <input
          id="glossary-search"
          type="search"
          placeholder="Search terms — e.g. EVM, NOTA, BLO..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100"
          aria-label="Search glossary terms"
          aria-controls="glossary-list"
          role="searchbox"
        />
      </div>

      {/* Results count for screen readers */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {filtered.length} term{filtered.length !== 1 ? "s" : ""} found
      </p>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-8" role="status">
          No terms match &ldquo;{query}&rdquo;. Try a different search.
        </p>
      ) : (
        <div
          id="glossary-list"
          className="grid sm:grid-cols-2 gap-3"
          role="list"
          aria-label="Glossary terms"
        >
          {filtered.map((term) => (
            <div
              key={term.id}
              className="border border-gray-200 rounded-xl p-3.5 bg-white hover:border-navy-200 hover:shadow-sm transition-all"
              role="listitem"
            >
              <div className="flex items-start gap-2 mb-1.5">
                {term.acronym && (
                  <span className="bg-navy-50 text-navy-600 text-xs font-bold px-2 py-0.5 rounded flex-shrink-0">
                    {term.acronym}
                  </span>
                )}
                <h3
                  className={clsx(
                    "text-sm font-semibold text-gray-900",
                    term.acronym && "mt-0.5"
                  )}
                >
                  {term.term}
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{term.definition}</p>
              {term.officialSource && (
                <a
                  href={`https://${term.officialSource}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-navy-600 underline mt-1.5 inline-block hover:text-saffron-600"
                  aria-label={`Official source for ${term.term}: ${term.officialSource}`}
                >
                  {term.officialSource} →
                </a>
              )}
              {term.relatedTerms && term.relatedTerms.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {term.relatedTerms.map((r) => {
                    const rel = GLOSSARY_TERMS.find((t) => t.id === r);
                    return rel ? (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setQuery(rel.acronym ?? rel.term)}
                        className="text-xs text-gray-400 hover:text-navy-600 underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-navy-600 rounded"
                        aria-label={`Search for related term: ${rel.acronym ?? rel.term}`}
                      >
                        {rel.acronym ?? rel.term}
                      </button>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
