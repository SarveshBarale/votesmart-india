"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/journey", label: "My Journey" },
  { href: "/elections", label: "Elections" },
  { href: "/registration", label: "Registration" },
  { href: "/voting", label: "Voting Day" },
  { href: "/timeline", label: "Timeline" },
  { href: "/glossary", label: "Glossary" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/misinfo", label: "Fact Check" },
] as const;

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-5xl mx-auto px-2">
        <ul
          className="flex gap-0.5 overflow-x-auto scrollbar-hide py-0"
          role="list"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href} role="listitem">
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "whitespace-nowrap px-3 py-3 text-xs font-medium block border-b-2 transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-600",
                    isActive
                      ? "border-saffron-600 text-navy-600 font-semibold"
                      : "border-transparent text-gray-500 hover:text-navy-600 hover:bg-gray-50"
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
