import type { PollingStep, VotingMethodInfo, FAQItem } from "@/types";

export const POLLING_STEPS: PollingStep[] = [
  {
    step: 1,
    title: "Find your polling booth",
    description:
      "Your booth number and address are printed on your Voter Slip distributed before the election. Also searchable on voters.eci.gov.in and the Voter Helpline App.",
    tip: "Locate your booth a day before to avoid confusion on polling day.",
  },
  {
    step: 2,
    title: "Carry your identity document",
    description:
      "Bring your EPIC (Voter ID card) or any ECI-approved alternate identity document (Aadhaar, Passport, Driving Licence, etc.).",
    tip: "Check the ECI-approved list of alternate IDs before election day at eci.gov.in.",
  },
  {
    step: 3,
    title: "Join the queue",
    description:
      "Separate queues are arranged for general voters, senior citizens (80+), and Persons with Disabilities. All voters in queue when the booth closes are permitted to vote.",
    tip: "Arriving in the morning generally means shorter queues.",
  },
  {
    step: 4,
    title: "Identity verification",
    description:
      "The Polling Officer verifies your name in the electoral roll register and checks your photo identity document. Your entry is marked in the register.",
    tip: "If you find your name is missing, approach the Presiding Officer — but this cannot be rectified on polling day itself.",
  },
  {
    step: 5,
    title: "Indelible ink marking",
    description:
      "The indelible violet ink is applied to your left index finger (or another finger). This prevents double voting. The ink lasts several days.",
    tip: "The ink cannot be washed off — this is intentional. It is your proof of having voted.",
  },
  {
    step: 6,
    title: "Enter the voting compartment",
    description:
      "You are directed to the Balloting Unit (EVM) placed inside a screened compartment for complete privacy. No one else can see how you vote.",
    tip: "Take your time — there is no rush inside the compartment.",
  },
  {
    step: 7,
    title: "Cast your vote on the EVM",
    description:
      "Press the blue button next to your chosen candidate's name and party symbol. A long beep sound confirms your vote has been recorded.",
    tip: "The last button is always NOTA (None of the Above) if you wish to reject all candidates.",
  },
  {
    step: 8,
    title: "Verify via VVPAT",
    description:
      "The VVPAT machine displays a printed paper slip for 7 seconds showing the party symbol and candidate name you voted for, visible through a transparent window.",
    tip: "The VVPAT slip drops automatically into a sealed box — you cannot take it. It is only for visual verification.",
  },
];

export const VOTING_METHODS: VotingMethodInfo[] = [
  {
    id: "evm",
    icon: "🖥️",
    name: "EVM",
    fullName: "Electronic Voting Machine",
    shortDesc: "The main voting device at every booth",
    introducedYear: 1982,
    details: [
      "A standalone, battery-operated device — works without electricity",
      "Has two units: Control Unit (with Presiding Officer) and Balloting Unit (with voter)",
      "Can accommodate up to 64 candidates per constituency",
      "Records a maximum of 3,840 votes per hour",
      "Each EVM has a unique ID; sealed and tamper-evident",
      "Manufactured by BEL (Bengaluru) and ECIL (Hyderabad) under ECI specification",
      "First used in Paravur constituency, Kerala in 1982; national rollout completed in 2004",
    ],
  },
  {
    id: "vvpat",
    icon: "🧾",
    name: "VVPAT",
    fullName: "Voter Verified Paper Audit Trail",
    shortDesc: "Paper verification connected to EVM",
    introducedYear: 2013,
    details: [
      "Introduced in Noksen, Nagaland by-election in 2013",
      "Deployed nationally in all constituencies from 2019 Lok Sabha elections",
      "Prints a slip showing party symbol + candidate name for exactly 7 seconds",
      "Slip then drops into a sealed, tamper-proof VVPAT box",
      "The slip is NOT given to the voter — only for visual verification",
      "ECI may order random VVPAT slip counting for audit purposes",
      "Powered by internal battery — works even without electricity connection",
    ],
  },
  {
    id: "postal",
    icon: "✉️",
    name: "Postal Ballot",
    fullName: "Postal Ballot (Service & Absentee Voter)",
    shortDesc: "Vote by post for eligible categories",
    details: [
      "Eligible categories: Armed Forces personnel, Central Police Organisation (CPO) personnel",
      "State police personnel posted on election duty outside their constituency",
      "Persons with Disabilities and senior citizens (80+) in applicable elections — check ECI notification",
      "Government employees posted outside their constituency",
      "The ballot paper is sent by post to the registered address of the eligible voter",
      "The voter marks their choice secretly in the presence of a specified authority",
      "The sealed ballot is returned to the Returning Officer before counting day",
    ],
  },
  {
    id: "nota",
    icon: "✖️",
    name: "NOTA",
    fullName: "None of the Above",
    shortDesc: "Reject all candidates on the ballot",
    introducedYear: 2013,
    details: [
      "Introduced by Supreme Court order in October 2013 (PUCL case)",
      "Always the last button on the Balloting Unit",
      "Pressing NOTA is a valid vote and is counted in the total vote count",
      "NOTA does not invalidate the election — the candidate with the most non-NOTA votes wins",
      "Under current law, even if NOTA gets the majority, the leading candidate wins",
      "States like Haryana have introduced laws requiring fresh elections if NOTA wins — check state-specific rules",
    ],
  },
];

export const AFTER_VOTING_STEPS = [
  {
    step: 1,
    title: "EVMs sealed and secured",
    description:
      "After polling ends, the Control Unit is sealed in the presence of all candidates' polling agents, who can affix their own seals. EVMs are stored in strong rooms at a secure government facility under 24/7 CCTV surveillance and multi-layer security until counting day.",
  },
  {
    step: 2,
    title: "Postal ballot counting first",
    description:
      "On counting day (date notified by ECI), counting begins at the designated counting centre. Postal ballots received by the Returning Officer are counted before EVM counting begins.",
  },
  {
    step: 3,
    title: "EVM counting by rounds",
    description:
      "EVM counting proceeds in rounds — one round covers EVMs from a set of polling stations. Candidates' counting agents are present throughout and can demand recounts. Running totals are updated live on results.eci.gov.in.",
  },
  {
    step: 4,
    title: "Candidate with most votes wins (FPTP)",
    description:
      "India follows the First Past the Post system. The candidate with the highest number of votes in a constituency wins — no absolute majority is required. Ties are resolved by a draw of lots by the Returning Officer.",
  },
  {
    step: 5,
    title: "Formal result declaration",
    description:
      "The Returning Officer formally declares the winning candidate, who is issued a Certificate of Election. Full results are published on eci.gov.in and results.eci.gov.in.",
  },
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "voting",
    question: "Can I vote if I forget my Voter ID (EPIC)?",
    answer:
      "Yes, in most cases. The ECI approves alternate identity documents each election cycle. Generally accepted alternates include: Aadhaar card, Passport, Driving Licence, MGNREGS Job Card, Passbook with photo issued by bank/post office. The official approved list is published on eci.gov.in before each election. Always confirm the current list before polling day.",
  },
  {
    id: "faq-2",
    category: "registration",
    question: "What if my name is missing from the electoral roll?",
    answer:
      "If your name is not in the electoral roll, you cannot vote in that election — it is not possible to add names on polling day. For future elections: register using Form 6 at voters.eci.gov.in. If you believe your name was wrongly deleted, contact the ERO or call 1950. Always verify your registration well before the polling date.",
  },
  {
    id: "faq-3",
    category: "general",
    question: "Is voting compulsory in India?",
    answer:
      "No, voting is not compulsory under central law in India. It is a constitutional right and a civic duty, but not a legal obligation at the national level. The state of Gujarat has enacted a law requiring compulsory voting in local body elections — this is an exception.",
  },
  {
    id: "faq-4",
    category: "voting",
    question: "Can I vote from any polling booth?",
    answer:
      "No. You must vote at the specific polling booth assigned to your registered address in the electoral roll. Your assigned booth is printed on your Voter Slip and is searchable at voters.eci.gov.in using your EPIC number. You cannot vote at a different booth.",
  },
  {
    id: "faq-5",
    category: "voting",
    question: "What is the indelible ink on my finger?",
    answer:
      "It is a semi-permanent violet ink applied to prevent double voting. Applied to the left index finger (or another finger if needed). It cannot be washed off with soap or chemicals — this is intentional. It is manufactured exclusively by Mysore Paints and Varnish Limited (MPVL), a Government of Karnataka undertaking.",
  },
  {
    id: "faq-6",
    category: "eligibility",
    question: "Can NRI (overseas) Indians vote?",
    answer:
      "Yes. Indian citizens residing abroad who hold valid Indian passports can register as Overseas Voters using Form 6A at voters.eci.gov.in. They must register in the constituency of their permanent Indian address. Under current law, NRI voters must be physically present in India at their designated polling booth on polling day. Proxy or postal voting is not available for NRI voters.",
  },
  {
    id: "faq-7",
    category: "voting",
    question: "Is my vote secret?",
    answer:
      "Yes, completely. The secret ballot is a fundamental principle of Indian elections, protected by law. The EVM is placed in a screened compartment. No one — including election officials, candidates' agents, or family members — can see how you voted. The indelible ink only proves you voted, not whom you voted for.",
  },
  {
    id: "faq-8",
    category: "general",
    question: "What is the Model Code of Conduct?",
    answer:
      "The Model Code of Conduct (MCC) is a set of guidelines, evolved through consensus among political parties, governing conduct during elections. It comes into force when the ECI announces the election schedule and remains until a government is formed. It restricts use of government resources for campaigning, new policy announcements by the ruling government, and regulates public meetings and propaganda.",
  },
];
