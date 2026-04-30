import { Card, CardTitle } from "@/components/ui/Card";
import { MISINFO_TIPS, OFFICIAL_RESOURCES } from "@/lib/data/accessibility";

export function MisinfoSection() {
  return (
    <div className="space-y-4">
      <Card>
        <CardTitle icon="🔍">Misinformation Awareness</CardTitle>
        <p className="text-gray-500 text-sm mb-4">
          Fake news and misinformation can affect voter turnout and public trust. Here is how to
          stay informed and protect yourself.
        </p>

        <div className="space-y-3">
          {MISINFO_TIPS.map((tip) => (
            <div
              key={tip.id}
              className="flex gap-4 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
            >
              <span
                className="text-2xl font-black text-saffron-600 leading-none flex-shrink-0 pt-0.5"
                aria-hidden="true"
              >
                {tip.number}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{tip.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Official resources */}
        <div className="mt-5 bg-india-green-light border border-green-200 rounded-xl p-4">
          <h3 className="font-bold text-india-green text-sm mb-2">
            ✅ Official Election Resources
          </h3>
          <div className="flex flex-wrap gap-2">
            {OFFICIAL_RESOURCES.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target={r.url.startsWith("http") ? "_blank" : undefined}
                rel={r.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-xs bg-white text-india-green border border-green-300 px-3 py-1.5 rounded-full font-semibold hover:bg-india-green hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                aria-label={`${r.name} (official)`}
              >
                {r.label}
              </a>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
