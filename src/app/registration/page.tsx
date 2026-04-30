import type { Metadata } from "next";
import { Disclaimer } from "@/components/layout/Disclaimer";
import { RegistrationTabs, DocumentsCard } from "@/components/features/registration/RegistrationTabs";
import { Card, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Voter Registration Guide",
  description:
    "Complete guide to voter registration in India — Form 6, Form 8, NRI Form 6A, documents required, and verification.",
};

export default function RegistrationPage() {
  return (
    <>
      <Disclaimer />
      <div className="mt-2 space-y-4">
        <RegistrationTabs />
        <DocumentsCard />

        {/* EPIC Card info */}
        <Card>
          <CardTitle icon="🪪">EPIC — Electors Photo Identity Card</CardTitle>
          <p className="text-gray-600 text-sm mb-4">
            The <strong>Electors Photo Identity Card (EPIC)</strong> is issued by the Election
            Commission of India as official proof of voter registration. It is also widely
            accepted as a photo identity document across India.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-saffron-50 border border-saffron-100 rounded-xl p-4">
              <h3 className="font-bold text-saffron-600 text-xs uppercase tracking-wide mb-2">
                What EPIC Contains
              </h3>
              <ul className="space-y-1 text-xs text-gray-700">
                {[
                  "Your photograph",
                  "Unique EPIC number",
                  "Name and father/husband/mother name",
                  "Date of birth",
                  "Constituency and polling part number",
                ].map((item) => (
                  <li key={item} className="flex gap-1.5">
                    <span className="text-saffron-400" aria-hidden="true">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-navy-50 border border-navy-100 rounded-xl p-4">
              <h3 className="font-bold text-navy-600 text-xs uppercase tracking-wide mb-2">
                Approved Alternate IDs (if EPIC unavailable)
              </h3>
              <ul className="space-y-1 text-xs text-gray-700">
                {[
                  "Aadhaar card",
                  "Indian Passport",
                  "Driving Licence",
                  "MGNREGS Job Card",
                  "Bank/Post Office Passbook with photo",
                ].map((item) => (
                  <li key={item} className="flex gap-1.5">
                    <span className="text-navy-400" aria-hidden="true">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-2">
                Always verify the current approved list at eci.gov.in before polling day.
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-2 flex-wrap">
            <a
              href="https://voters.eci.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-saffron-50 text-saffron-600 border border-saffron-200 px-3 py-1.5 rounded-lg hover:bg-saffron-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-600"
            >
              Download e-EPIC →
            </a>
            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-lg">
              Helpline: 1950
            </span>
          </div>
        </Card>
      </div>
    </>
  );
}
