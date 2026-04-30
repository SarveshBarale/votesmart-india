import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/layout/Disclaimer";
import { Card, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "VoteSmart India — Election Education Platform",
};

const FEATURE_CARDS = [
  {
    href: "/journey",
    icon: "🗺️",
    title: "My Voter Journey",
    desc: "Get a personalized checklist and next steps based on your state and registration status.",
    badge: "Personalized",
    badgeColor: "bg-saffron-50 text-saffron-600",
  },
  {
    href: "/registration",
    icon: "📝",
    title: "Voter Registration",
    desc: "Complete guide to Form 6, Form 8, NRI registration and document requirements.",
    badge: "Step-by-step",
    badgeColor: "bg-navy-50 text-navy-600",
  },
  {
    href: "/voting",
    icon: "🗳️",
    title: "Polling Day Guide",
    desc: "What happens from the queue to casting your vote — EVM, VVPAT, indelible ink and more.",
    badge: "Detailed",
    badgeColor: "bg-india-green-light text-india-green",
  },
  {
    href: "/timeline",
    icon: "📅",
    title: "Election Timeline",
    desc: "From announcement to result declaration — understand every stage of an Indian election.",
    badge: "Interactive",
    badgeColor: "bg-saffron-50 text-saffron-600",
  },
  {
    href: "/elections",
    icon: "🏛️",
    title: "Election Types",
    desc: "Lok Sabha, Rajya Sabha, Vidhan Sabha, Local Body — know the difference.",
    badge: "All types",
    badgeColor: "bg-navy-50 text-navy-600",
  },
  {
    href: "/glossary",
    icon: "📖",
    title: "Glossary",
    desc: "Searchable definitions for EVM, VVPAT, EPIC, NOTA, BLO, ERO and more.",
    badge: "Searchable",
    badgeColor: "bg-india-green-light text-india-green",
  },
  {
    href: "/accessibility",
    icon: "♿",
    title: "Voter Accessibility",
    desc: "SAKSHAM initiative, Braille EVMs, companion voting, and support for elderly & PwD voters.",
    badge: "SAKSHAM",
    badgeColor: "bg-india-green-light text-india-green",
  },
  {
    href: "/misinfo",
    icon: "🔍",
    title: "Fact Check",
    desc: "How to verify election information, avoid fake news, and report violations via cVIGIL.",
    badge: "Stay safe",
    badgeColor: "bg-amber-50 text-amber-700",
  },
] as const;

const STATS = [
  { value: "543", label: "Lok Sabha Constituencies", color: "text-saffron-600" },
  { value: "90cr+", label: "Registered Voters", color: "text-navy-600" },
  { value: "10.5L+", label: "Polling Stations", color: "text-india-green" },
  { value: "100%", label: "Non-Partisan Content", color: "text-india-gold" },
];

export default function HomePage() {
  return (
    <>
      <Disclaimer />

      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="bg-gradient-to-br from-navy-600 to-[#0D2B5E] rounded-2xl px-6 py-10 mb-5 text-white"
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-3xl"
              aria-hidden="true"
            >
              🇮🇳
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Election Education Platform
            </span>
          </div>
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3"
          >
            Understand Your Vote.{" "}
            <span className="text-saffron-400">Exercise Your Right.</span>
          </h1>
          <p className="text-white/80 text-base leading-relaxed mb-6 max-w-xl">
            An interactive, non-partisan guide to the complete Indian election process —
            from voter registration to result declaration. Aligned with{" "}
            <strong className="text-white">Election Commission of India</strong> guidelines.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/journey"
              className="bg-saffron-600 hover:bg-saffron-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Start your personalized voter journey"
            >
              Start My Journey →
            </Link>
            <Link
              href="/registration"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Learn how to register to vote"
            >
              How to Register
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Indian election statistics" className="mb-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map(({ value, label, color }) => (
            <div
              key={label}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-center shadow-sm"
            >
              <div className={`text-2xl font-extrabold ${color}`}>{value}</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section aria-labelledby="features-heading">
        <Card>
          <CardTitle icon="🧭" id="features-heading" as="h2">
            Explore VoteSmart India
          </CardTitle>
          <div
            className="grid sm:grid-cols-2 gap-3"
            role="list"
            aria-label="Platform features"
          >
            {FEATURE_CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                role="listitem"
                className="flex gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-navy-300 hover:shadow-sm bg-white transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
                aria-label={`${card.title} — ${card.desc}`}
              >
                <span className="text-3xl flex-shrink-0" aria-hidden="true">
                  {card.icon}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h3 className="font-bold text-navy-600 text-sm group-hover:text-saffron-600 transition-colors">
                      {card.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </section>

      {/* Official notice */}
      <section
        aria-label="Official Election Commission notice"
        className="mt-5 bg-india-green-light border border-green-200 rounded-xl px-5 py-4"
      >
        <h2 className="font-bold text-india-green text-sm mb-1.5">
          ✅ Always use official ECI resources
        </h2>
        <p className="text-xs text-gray-700 leading-relaxed mb-2">
          For registration, polling booth search, results, and official notifications — use only
          official ECI channels.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "eci.gov.in", href: "https://eci.gov.in" },
            { label: "voters.eci.gov.in", href: "https://voters.eci.gov.in" },
            { label: "1950 Helpline", href: "tel:1950" },
            { label: "cVIGIL App", href: "https://cvigil.eci.gov.in" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-xs bg-white text-india-green border border-green-300 px-3 py-1 rounded-full font-semibold hover:bg-india-green hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
            >
              {label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
