import type { GlossaryTerm } from "@/types";

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "evm",
    acronym: "EVM",
    term: "Electronic Voting Machine",
    definition:
      "A tamper-resistant, battery-operated electronic device used to record votes in Indian elections. Consists of a Control Unit (operated by the Presiding Officer) and a Balloting Unit (in the voter's compartment). Manufactured by Bharat Electronics Limited (BEL) and Electronics Corporation of India Limited (ECIL) under ECI supervision. One EVM can record up to 2,000 votes and accommodate up to 64 candidates.",
    relatedTerms: ["vvpat", "nota", "ballot_unit"],
    officialSource: "eci.gov.in/evm",
  },
  {
    id: "vvpat",
    acronym: "VVPAT",
    term: "Voter Verified Paper Audit Trail",
    definition:
      "A device connected to the EVM that prints a paper slip showing the party symbol and candidate name after each vote is cast. The slip is visible through a transparent window for 7 seconds, then drops into a sealed VVPAT box. Introduced nationally in 2019 Lok Sabha elections. Allows the voter to verify their vote and provides a physical paper trail for audit purposes.",
    relatedTerms: ["evm"],
    officialSource: "eci.gov.in/vvpat",
  },
  {
    id: "epic",
    acronym: "EPIC",
    term: "Electors Photo Identity Card",
    definition:
      "The Voter ID card issued by the Election Commission of India as proof of voter registration. Contains the voter's photograph, name, father/husband/mother's name, unique EPIC number, and constituency details. Serves as both proof of voter registration and a widely accepted photo identity document across India.",
    relatedTerms: ["electoral_roll", "blo"],
    officialSource: "voters.eci.gov.in",
  },
  {
    id: "nota",
    acronym: "NOTA",
    term: "None of the Above",
    definition:
      "An option on the EVM introduced following a Supreme Court directive in October 2013 (People's Union for Civil Liberties vs. Union of India). It is the last button on the Balloting Unit. Pressing NOTA expresses that the voter disapproves of all candidates. NOTA votes are valid and counted, but even if NOTA receives the highest votes, the candidate with the next highest votes still wins — NOTA cannot nullify an election under current law.",
    relatedTerms: ["evm"],
    officialSource: "eci.gov.in",
  },
  {
    id: "electoral_roll",
    term: "Electoral Roll",
    definition:
      "The official list (also called Voters' List) of all registered voters in a constituency, maintained and periodically revised by the Electoral Registration Officer (ERO) under ECI supervision. Only those whose names appear on the electoral roll can vote in that constituency. Revised annually; a Special Summary Revision is held each year with 1 January as the qualifying date.",
    relatedTerms: ["ero", "blo", "epic"],
    officialSource: "voters.eci.gov.in",
  },
  {
    id: "constituency",
    term: "Constituency",
    definition:
      "A defined geographic area that elects one representative. India has 543 Lok Sabha constituencies, delimited by the Delimitation Commission. Each state has its own set of Vidhan Sabha constituencies. The boundaries are redrawn periodically through a delimitation exercise to reflect population changes.",
    relatedTerms: ["electoral_roll", "ro"],
    officialSource: "eci.gov.in",
  },
  {
    id: "blo",
    acronym: "BLO",
    term: "Booth Level Officer",
    definition:
      "A government official (usually a government schoolteacher or low-level official) assigned to each polling booth. Responsible for maintaining the accuracy of the electoral roll in their area, conducting house-to-house verification, and assisting voters with registration. The BLO is the first point of contact for a voter.",
    relatedTerms: ["ero", "electoral_roll"],
  },
  {
    id: "ero",
    acronym: "ERO",
    term: "Electoral Registration Officer",
    definition:
      "An officer (usually a Sub-Divisional Magistrate or Tehsildar) responsible for the preparation, revision, and maintenance of the electoral roll for an Assembly constituency. All registration applications (Form 6, Form 8, etc.) are addressed to and decided by the ERO.",
    relatedTerms: ["blo", "electoral_roll"],
  },
  {
    id: "ro",
    acronym: "RO",
    term: "Returning Officer",
    definition:
      "An officer responsible for the conduct of the election process in a constituency — from receiving nomination papers to declaring the final result. Usually a senior district official (Collector/DM for Lok Sabha; Sub-Divisional Magistrate for Vidhan Sabha). The RO scrutinises nominations, accepts or rejects them, and formally declares the winning candidate.",
    relatedTerms: ["ero"],
  },
  {
    id: "mcc",
    acronym: "MCC",
    term: "Model Code of Conduct",
    definition:
      "A set of guidelines issued by the ECI — evolved through consensus among political parties — governing the conduct of political parties, candidates, and the government during elections. Comes into effect on the date of election announcement and remains in force until results. Covers conduct at public meetings, campaign propaganda, use of government machinery, and polling day behaviour. It is not a statutory instrument but violations are taken seriously by the ECI.",
    relatedTerms: [],
    officialSource: "eci.gov.in/mcc",
  },
  {
    id: "fptp",
    acronym: "FPTP",
    term: "First Past the Post",
    definition:
      "The voting system used in Indian Lok Sabha and Vidhan Sabha elections. The candidate who receives the most votes in a constituency wins the seat, regardless of whether they have an absolute majority. Simple plurality is sufficient. Also called the 'plurality system'.",
    relatedTerms: ["constituency"],
  },
  {
    id: "indelible_ink",
    term: "Indelible Ink",
    definition:
      "A semi-permanent violet ink applied to the left index finger (or another finger if the index is absent) of a voter immediately after they cast their vote. It prevents a voter from voting more than once. It is manufactured exclusively by Mysore Paints and Varnish Limited (MPVL), a Government of Karnataka undertaking, and supplied to the ECI for each election.",
    relatedTerms: ["evm"],
  },
];
