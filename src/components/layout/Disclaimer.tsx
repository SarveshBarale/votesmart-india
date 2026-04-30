export function Disclaimer() {
  return (
    <aside
      role="note"
      aria-label="Official source disclaimer"
      className="bg-india-gold-light border-l-4 border-india-gold px-4 py-2.5 text-xs text-yellow-900 max-w-5xl mx-auto my-3 rounded-r-lg flex gap-2 items-start"
    >
      <span aria-hidden="true" className="mt-0.5 flex-shrink-0">ℹ️</span>
      <span>
        <strong>For official and authoritative information, always refer to the{" "}
        <a
          href="https://eci.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold hover:text-navy-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-navy-600 rounded"
          aria-label="Election Commission of India official website (opens in new tab)"
        >
          Election Commission of India (ECI)
        </a>{" "}
        at eci.gov.in.</strong>{" "}
        VoteSmart India is an independent educational platform and is strictly non-partisan.
        No political party, candidate, or ideology is promoted.
      </span>
    </aside>
  );
}
