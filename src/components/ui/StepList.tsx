import { clsx } from "clsx";

interface Step {
  step: number;
  title: string;
  description: string;
  details?: string;
  tip?: string;
}

interface StepListProps {
  steps: Step[];
  className?: string;
  accentColor?: "saffron" | "navy" | "green";
}

const accentMap = {
  saffron: "bg-gradient-to-br from-saffron-600 to-saffron-400 text-white",
  navy: "bg-gradient-to-br from-navy-600 to-navy-400 text-white",
  green: "bg-india-green text-white",
};

export function StepList({ steps, className, accentColor = "saffron" }: StepListProps) {
  return (
    <ol className={clsx("space-y-0", className)} aria-label="Steps">
      {steps.map((s, idx) => (
        <li key={s.step} className="flex gap-4 group">
          {/* Left: number + connecting line */}
          <div className="flex flex-col items-center">
            <div
              className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5",
                accentMap[accentColor]
              )}
              aria-hidden="true"
            >
              {s.step}
            </div>
            {idx < steps.length - 1 && (
              <div className="w-0.5 bg-gray-200 flex-1 my-1" aria-hidden="true" />
            )}
          </div>
          {/* Right: content */}
          <div className={clsx("pb-5 flex-1", idx === steps.length - 1 && "pb-0")}>
            <p className="font-semibold text-gray-900 text-sm">{s.title}</p>
            <p className="text-gray-600 text-sm mt-0.5 leading-relaxed">{s.description}</p>
            {s.details && (
              <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">{s.details}</p>
            )}
            {s.tip && (
              <div className="mt-2 flex gap-1.5 items-start bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                <span className="text-amber-500 text-xs mt-0.5" aria-hidden="true">💡</span>
                <p className="text-amber-800 text-xs leading-relaxed">{s.tip}</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
