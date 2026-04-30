import type { Metadata } from "next";
import { Disclaimer } from "@/components/layout/Disclaimer";
import { GlossaryGrid } from "@/components/features/glossary/GlossaryGrid";

export const metadata: Metadata = {
  title: "Election Glossary",
  description:
    "Searchable glossary of key Indian election terms — EVM, VVPAT, EPIC, NOTA, BLO, ERO, FPTP, Model Code of Conduct and more.",
};

export default function GlossaryPage() {
  return (
    <>
      <Disclaimer />
      <div className="mt-2">
        <GlossaryGrid />
      </div>
    </>
  );
}
