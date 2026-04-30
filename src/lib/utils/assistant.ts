import type { AssistantResponse } from "@/types";

interface KBEntry {
  keywords: string[];
  topic: string;
  answer: string;
  relatedTopics?: string[];
}

const KNOWLEDGE_BASE: KBEntry[] = [
  {
    keywords: ["register", "registration", "form 6", "new voter", "sign up", "enroll"],
    topic: "Voter Registration",
    answer:
      "To register as a new voter in India:\n\n1. Confirm you are 18+ years old and an Indian citizen.\n2. Go to voters.eci.gov.in or use the Voter Helpline App.\n3. Fill Form 6 — provide your name, address, date of birth.\n4. Upload Proof of Age (birth certificate, Class 10 marksheet, Passport) and Proof of Address (Aadhaar, Passport, utility bill, rental agreement).\n5. Submit online — you will receive a reference number.\n6. A Booth Level Officer (BLO) may visit to verify your address.\n7. Once approved, your name is added to the electoral roll and your EPIC (Voter ID) card is issued.\n\nHelpline: 1950 | Official: voters.eci.gov.in",
    relatedTopics: ["Documents needed", "What is EPIC?"],
  },
  {
    keywords: ["document", "id", "identity", "proof", "carry", "bring", "need"],
    topic: "Documents Needed",
    answer:
      "For Registration (Form 6), you need:\n• Proof of Age: Birth certificate, Class 10 marksheet, Aadhaar (with DOB), Passport, or Driving Licence.\n• Proof of Address: Aadhaar, Passport, Driving Licence, Utility bill (not older than 3 months), Rental agreement, or Bank passbook.\n\nOn Polling Day, carry your EPIC (Voter ID). If not available, ECI approves alternate IDs:\n• Aadhaar card\n• Passport\n• Driving Licence\n• MGNREGS Job Card\n• Passbook with photo (bank/post office)\n\nAlways verify the current approved alternate ID list at eci.gov.in before polling day, as it may be updated.",
    relatedTopics: ["What is EPIC?", "How do I register?"],
  },
  {
    keywords: ["nota", "none of the above", "reject all", "reject", "disapprove"],
    topic: "NOTA",
    answer:
      "NOTA (None of the Above) is an option on the EVM introduced by the Supreme Court in October 2013.\n\n• It is always the LAST button on the Balloting Unit.\n• Pressing NOTA is a valid vote — it is counted in the total.\n• It means you disapprove of all contesting candidates.\n• However, NOTA cannot nullify an election under current law — the candidate with the highest non-NOTA votes still wins.\n• Some states (e.g., Haryana) have introduced laws for local body elections where NOTA winning can trigger a re-election — check state-specific rules.\n\nNOTA was designed to let voters formally express dissatisfaction rather than staying home.",
    relatedTopics: ["How does EVM work?"],
  },
  {
    keywords: ["evm", "electronic voting", "machine", "voting machine", "ballot unit"],
    topic: "EVM",
    answer:
      "An Electronic Voting Machine (EVM) consists of two units:\n\n1. Control Unit — with the Presiding Officer. Controls the voting process; can enable/disable voting.\n2. Balloting Unit — in the voter's private compartment. Has buttons for each candidate.\n\nHow it works:\n• Presiding Officer enables the machine for the next voter.\n• Voter presses the blue button next to their chosen candidate.\n• A long beep confirms the vote is recorded.\n• The machine is tamper-resistant and standalone — works without electricity.\n\nEVMs are manufactured by BEL (Bengaluru) and ECIL (Hyderabad) under ECI specifications. They have been used in all constituencies since 2004.",
    relatedTopics: ["What is VVPAT?", "What is NOTA?"],
  },
  {
    keywords: ["vvpat", "paper", "audit", "slip", "verify vote", "paper trail"],
    topic: "VVPAT",
    answer:
      "VVPAT (Voter Verified Paper Audit Trail) is a machine connected to the EVM:\n\n• After you press a button on the EVM, the VVPAT prints a paper slip.\n• The slip shows the party symbol and candidate name you voted for.\n• It is visible through a transparent window for exactly 7 seconds.\n• Then it drops automatically into a sealed VVPAT box.\n• You CANNOT take the slip — it is only for visual verification.\n\nVVPAT was first used in Noksen, Nagaland (2013) and deployed nationally in 2019 Lok Sabha elections. It provides a physical paper audit trail for election verification.",
    relatedTopics: ["How does EVM work?"],
  },
  {
    keywords: ["count", "counting", "result", "declare", "winner", "after voting"],
    topic: "Counting & Results",
    answer:
      "After polling ends:\n\n1. EVMs are sealed, signed by candidates' agents, and stored in secure strong rooms under CCTV surveillance.\n\nOn Counting Day (date notified by ECI):\n2. postal ballots are counted first.\n3. EVM counting proceeds in rounds — each round covers a set of polling stations.\n4. Candidates' counting agents are present and can demand recounts.\n5. Live trends appear on results.eci.gov.in throughout the day.\n6. After all rounds, the Returning Officer formally declares the winning candidate.\n\nIndia uses First Past the Post (FPTP) — the candidate with the most votes wins, even without an absolute majority.",
    relatedTopics: ["What is FPTP?"],
  },
  {
    keywords: ["ink", "indelible", "finger", "mark", "purple", "violet"],
    topic: "Indelible Ink",
    answer:
      "indelible ink is applied on the left index finger (or another finger if needed) after you cast your vote.\n\n• It is a semi-permanent violet dye — cannot be washed off.\n• Purpose: prevents the same voter from voting more than once.\n• Lasts several days (usually one to two weeks).\n• Manufactured exclusively by Mysore Paints and Varnish Limited (MPVL), a Government of Karnataka undertaking.\n• It proves you voted — but NOT for whom you voted (your vote remains completely secret).",
    relatedTopics: ["Is my vote secret?"],
  },
  {
    keywords: ["epic", "voter id", "voter card", "id card"],
    topic: "EPIC (Voter ID)",
    answer:
      "EPIC (Electors Photo Identity Card) is the official Voter ID card issued by the Election Commission of India.\n\nIt contains:\n• Your photograph\n• Your name and father/husband/mother's name\n• Your unique EPIC number\n• Your constituency and part number\n\nEPIC also serves as a widely accepted government photo identity document in India — for banking, travel, and other purposes.\n\nYou can apply for EPIC after successful voter registration. You can also download an e-EPIC (digital version) from voters.eci.gov.in.",
    relatedTopics: ["How do I register?"],
  },
  {
    keywords: ["eligible", "eligibility", "who can vote", "age", "18", "citizenship", "qualify"],
    topic: "Voter Eligibility",
    answer:
      "You are eligible to vote in India if ALL of the following apply:\n\n1. Age: 18 years or above on the qualifying date (usually 1 January of the revision year).\n2. Citizenship: You are an Indian citizen. NRIs with valid Indian passports may also register.\n3. Not disqualified: You have not been declared of unsound mind by a competent court, and are not disqualified under any election law.\n4. Enrolled: Your name is in the electoral roll of the constituency where you ordinarily reside.\n\nIf you meet all four criteria, you have the right to vote!",
    relatedTopics: ["How do I register?", "Can NRIs vote?"],
  },
  {
    keywords: ["booth", "polling station", "where", "find", "locate", "address"],
    topic: "Finding Your Polling Booth",
    answer:
      "To find your assigned polling booth:\n\n1. Voter Slip: Your booth number and address are printed on your Voter Slip, distributed before elections by BLOs.\n2. Online: Visit voters.eci.gov.in > Search Your Name > Your booth details will appear.\n3. App: Use the Voter Helpline App — enter your EPIC number to see your booth.\n4. Helpline: Call 1950 for assisted search.\n\nImportant: You can ONLY vote at your assigned booth — not any other polling station in the constituency.",
    relatedTopics: ["What documents do I need?"],
  },
  {
    keywords: ["postal", "post", "service voter", "army", "forces", "overseas", "absentee"],
    topic: "Postal Ballot",
    answer:
      "Postal ballot allows certain voters to vote by post instead of visiting a polling booth.\n\nEligible categories include:\n• Armed Forces personnel (Army, Navy, Air Force)\n• Central Police Organisation (CPO) personnel\n• State police posted on election duty outside their home constituency\n• Government employees posted outside their home constituency\n• Persons with Disabilities (in applicable elections — check ECI notification)\n• Senior citizens aged 80 or above (in applicable elections)\n\nThe ballot is sent to the registered address, marked secretly in the presence of a specified authority, and returned to the Returning Officer before counting day.",
    relatedTopics: ["Accessibility for voters"],
  },
  {
    keywords: ["secret", "privacy", "anonymous", "who know", "can see", "confidential"],
    topic: "Ballot Secrecy",
    answer:
      "Your vote is completely secret and protected by law in India.\n\n• The EVM is placed in a screened compartment — no one can see you voting.\n• The EVM does not link your voter ID to your vote choice in any retrievable way.\n• The indelible ink only shows you voted — not for whom.\n• Election officials, candidates' agents, family members, or employers cannot determine how you voted.\n\nIf anyone pressures, coerces, or bribes you on how to vote — or claims they can check your vote — that is false and is an electoral offence. Report it to the Presiding Officer, police, or call 1950.",
    relatedTopics: ["What is indelible ink?", "How does EVM work?"],
  },
  {
    keywords: ["mcc", "model code", "conduct", "rules during election", "campaign rules"],
    topic: "Model Code of Conduct",
    answer:
      "The Model Code of Conduct (MCC) is a set of guidelines — evolved through consensus among political parties — governing behaviour during elections.\n\nKey provisions:\n• No use of government resources (vehicles, officials, etc.) for campaign activities.\n• The ruling government cannot announce new policies or schemes after the MCC comes into force.\n• Restrictions on public meetings, rallies, and processions.\n• No appeals to caste, communal, linguistic, or regional sentiments.\n• No distribution of money, gifts, or liquor to voters (bribery is an offence).\n\nThe MCC comes into force on the date of election announcement and remains until a new government is formed. Violations can be reported to the ECI or via the cVIGIL app.",
    relatedTopics: ["What is the election timeline?"],
  },
];

const FALLBACK_RESPONSE =
  "Thank you for your question. For specific information on this topic, please visit the official Election Commission of India website at eci.gov.in or call the Voter Helpline at 1950. This assistant provides general process education only and does not have information about specific elections, candidates, parties, or real-time data.";

/**
 * Finds the best matching knowledge base entry for a query.
 * Uses keyword matching — no external API, fully offline.
 */
export function getAssistantAnswer(query: string): AssistantResponse {
  const normalized = query.toLowerCase().trim();

  // Score each entry
  const scored = KNOWLEDGE_BASE.map((entry) => {
    const hits = entry.keywords.filter((kw) => normalized.includes(kw)).length;
    return { entry, hits };
  });

  const best = scored.sort((a, b) => b.hits - a.hits)[0];

  if (best.hits === 0) {
    return {
      answer: FALLBACK_RESPONSE,
      sources: ["https://eci.gov.in", "Voter Helpline: 1950"],
    };
  }

  return {
    answer: best.entry.answer,
    relatedTopics: best.entry.relatedTopics,
    sources: ["Election Commission of India — eci.gov.in"],
  };
}

export const QUICK_QUESTIONS = [
  "How do I register as a new voter?",
  "What documents do I need to vote?",
  "What is NOTA?",
  "How does the EVM work?",
  "What is VVPAT?",
  "What happens on counting day?",
  "Is my vote secret?",
  "Can NRIs vote in India?",
];
