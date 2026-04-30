import { clsx } from "clsx";

type BadgeColor = "saffron" | "navy" | "green" | "gray" | "gold";

interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  saffron: "bg-saffron-50 text-saffron-600",
  navy: "bg-navy-50 text-navy-600",
  green: "bg-india-green-light text-india-green",
  gray: "bg-gray-100 text-gray-600",
  gold: "bg-india-gold-light text-india-gold",
};

export function Badge({ color = "gray", children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        colorClasses[color],
        className
      )}
    >
      {children}
    </span>
  );
}
