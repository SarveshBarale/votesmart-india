"use client";

import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function Header() {
  const { user, signInWithGoogle, signOut, loading, error } = useAuth();

  return (
    <header role="banner" className="bg-gradient-to-r from-navy-600 via-navy-400 to-[#0D2B5E]">
      {/* Tricolor bar */}
      <div
        className="h-1"
        style={{
          background: "linear-gradient(90deg, #FF6200 33.3%, #fff 33.3% 66.6%, #138808 66.6%)",
        }}
        role="presentation"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg"
          aria-label="VoteSmart India — Home"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #FF6200, #138808)" }}
            aria-hidden="true"
          >
            🗳️
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-tight">VoteSmart India</p>
            <p className="text-white/70 text-xs">Election Education Platform</p>
          </div>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Non-partisan badge */}
        <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium">
          Non-Partisan · ECI Aligned
        </span>

        {/* Auth */}
        {!loading && (
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                {user.photoURL && (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName ?? "User"}
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white/30"
                  />
                )}
                <span className="text-white text-xs hidden md:block max-w-[120px] truncate">
                  {user.displayName}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-white/80 hover:text-white hover:bg-white/10 text-xs"
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <>
                {error && (
                  <span className="text-red-300 text-xs hidden sm:block max-w-[160px] truncate" role="alert">
                    {error}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signInWithGoogle}
                  className="text-white border border-white/30 hover:bg-white/10 text-xs gap-1.5"
                  aria-label="Sign in with Google to save your progress"
                >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
