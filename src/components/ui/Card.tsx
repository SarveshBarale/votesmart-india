import { type HTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "info" | "warning" | "success";
  noPadding?: boolean;
}

const variantClasses = {
  default: "bg-white border border-gray-200",
  info: "bg-navy-50 border border-navy-100",
  warning: "bg-india-gold-light border-l-4 border-india-gold",
  success: "bg-india-green-light border border-green-200",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", noPadding = false, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "rounded-xl shadow-sm",
        variantClasses[variant],
        !noPadding && "p-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
  icon?: string;
}

export function CardTitle({ as: Tag = "h2", icon, className, children, ...props }: CardTitleProps) {
  return (
    <Tag
      className={clsx(
        "flex items-center gap-2 text-navy-600 font-semibold text-lg mb-3",
        className
      )}
      {...props}
    >
      {icon && <span aria-hidden="true" className="text-xl">{icon}</span>}
      {children}
    </Tag>
  );
}
