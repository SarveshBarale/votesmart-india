import { Card, CardTitle } from "@/components/ui/Card";
import { ACCESSIBILITY_FEATURES } from "@/lib/data/accessibility";

export function AccessibilitySection() {
  return (
    <Card>
      <CardTitle icon="♿">Accessibility in Indian Elections</CardTitle>
      <p className="text-gray-500 text-sm mb-4">
        The Election Commission of India has introduced several measures to ensure every eligible
        voter can exercise their right to vote.
      </p>

      <div
        className="grid sm:grid-cols-2 gap-3"
        role="list"
        aria-label="Accessibility features in Indian elections"
      >
        {ACCESSIBILITY_FEATURES.map((feature) => (
          <div
            key={feature.id}
            className="border border-gray-200 rounded-xl p-3.5 bg-white hover:border-green-200 hover:shadow-sm transition-all"
            role="listitem"
          >
            <div className="flex items-start gap-3">
              <span
                className="text-2xl flex-shrink-0"
                aria-hidden="true"
              >
                {feature.icon}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                {feature.initiative && (
                  <span className="mt-1.5 inline-block text-xs bg-india-green-light text-india-green border border-green-200 px-2 py-0.5 rounded-full font-semibold">
                    {feature.initiative}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-navy-50 border border-navy-100 rounded-xl px-4 py-3">
        <h3 className="font-bold text-navy-600 text-sm mb-1">SAKSHAM Initiative</h3>
        <p className="text-xs text-gray-700 leading-relaxed">
          SAKSHAM (Systematic Voters&rsquo; Education and Electoral Participation for Accessible
          Knowledge) is the ECI&rsquo;s flagship programme to make elections accessible for all,
          with special focus on Persons with Disabilities (PwD) and elderly voters. Features
          include accessible polling stations, voter awareness campaigns in accessible formats,
          and free transport assistance.
        </p>
        <a
          href="https://eci.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-navy-600 underline mt-1.5 inline-block"
        >
          Learn more at eci.gov.in →
        </a>
      </div>
    </Card>
  );
}
