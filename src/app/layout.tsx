import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/Header";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VoteSmart India — Election Education Platform",
    template: "%s | VoteSmart India",
  },
  description:
    "An interactive, non-partisan platform to understand the complete Indian election process — voter registration, polling day, EVM, VVPAT, and more. Aligned with Election Commission of India guidelines.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  keywords: [
    "Indian elections",
    "voter registration",
    "ECI",
    "how to vote in India",
    "Form 6",
    "EPIC voter ID",
    "EVM",
    "VVPAT",
    "NOTA",
    "election process India",
  ],
  authors: [{ name: "VoteSmart India" }],
  creator: "VoteSmart India",
  robots: { index: true, follow: true },
  openGraph: {
    title: "VoteSmart India — Election Education Platform",
    description:
      "Understand the complete Indian election process — non-partisan, interactive, and ECI-aligned.",
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://votesmart.india",
    siteName: "VoteSmart India",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoteSmart India",
    description: "Interactive election education for Indian voters.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#003580",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-gray-50 min-h-screen flex flex-col text-gray-900 antialiased">
        {/* Skip navigation for keyboard/screen-reader users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header />
        <NavBar />

        <div className="flex-1 max-w-5xl mx-auto w-full px-4 pb-6">
          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>
        </div>

        <Footer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: { fontSize: "13px", maxWidth: "380px" },
          }}
        />
      </body>
    </html>
  );
}
