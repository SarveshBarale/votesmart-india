import type { ElectionInfo } from "@/types";

export const ELECTIONS_DATA: ElectionInfo[] = [
  {
    id: "lok_sabha",
    title: "Lok Sabha",
    titleHindi: "लोक सभा",
    icon: "🏛️",
    shortDesc: "Lower house of Parliament — the People's House",
    conductedBy: "ECI",
    frequency: "Every 5 years",
    seats: 543,
    details: [
      "543 directly elected constituencies across India (plus 2 nominated Anglo-Indian seats, now discontinued)",
      "Citizens aged 18+ registered in the constituency vote for their local candidate",
      "Candidate with the most votes wins (First Past the Post — FPTP system)",
      "Forms the basis of the Union Government; the party or coalition with majority forms government",
      "Conducted by the Election Commission of India (ECI)",
      "The Prime Minister must command the confidence of the Lok Sabha",
      "Can be dissolved before 5 years by the President on advice of the Council of Ministers",
    ],
  },
  {
    id: "rajya_sabha",
    title: "Rajya Sabha",
    titleHindi: "राज्य सभा",
    icon: "🏢",
    shortDesc: "Upper house — Council of States",
    conductedBy: "ECI",
    frequency: "Biennial (1/3 retire every 2 years)",
    seats: 245,
    details: [
      "238 elected members + up to 12 nominated by the President for expertise in arts, science, etc.",
      "Members are NOT directly elected by citizens — they are elected by State Legislative Assembly MLAs",
      "Proportional representation by single transferable vote in each state",
      "Members serve 6-year terms; one-third retire every 2 years (permanent house — never fully dissolved)",
      "Represents states and union territories at the national level",
      "Jointly elected positions: President, Vice-President",
    ],
  },
  {
    id: "vidhan_sabha",
    title: "Vidhan Sabha",
    titleHindi: "विधान सभा",
    icon: "🗺️",
    shortDesc: "State Legislative Assembly elections",
    conductedBy: "ECI",
    frequency: "Every 5 years per state",
    details: [
      "Each state has its own Legislative Assembly with varying seat counts",
      "Citizens vote for their local MLA (Member of Legislative Assembly)",
      "FPTP system — candidate with most votes in constituency wins",
      "Determines the state government; Chief Minister commands majority",
      "Maharashtra: 288 seats | Uttar Pradesh: 403 seats (largest) | Goa: 40 seats (smallest)",
      "Can be dissolved by the Governor on advice of the Chief Minister or by court orders",
      "Some states also have a Vidhan Parishad (upper house)",
    ],
  },
  {
    id: "local_body",
    title: "Local Body Elections",
    titleHindi: "स्थानीय निकाय",
    icon: "🏘️",
    shortDesc: "Municipal corporations, Panchayats",
    conductedBy: "State Election Commission",
    frequency: "Every 5 years",
    details: [
      "Urban bodies: Municipal Corporations, Municipalities, Nagar Panchayats",
      "Rural bodies: Gram Panchayats, Panchayat Samitis, Zila Parishads",
      "Conducted by State Election Commissions (NOT the ECI)",
      "Elects Councillors, Ward Members, Sarpanchs, Mayors, Pradhans",
      "73rd Amendment (rural) and 74th Amendment (urban) to the Constitution mandated local body elections",
      "Reservation for SC, ST, OBC, and women varies by state rules",
    ],
  },
  {
    id: "presidential",
    title: "Presidential & VP",
    titleHindi: "राष्ट्रपति चुनाव",
    icon: "🏅",
    shortDesc: "President & Vice-President elections",
    conductedBy: "ECI",
    frequency: "Every 5 years",
    details: [
      "NOT a direct public vote — elected by an Electoral College",
      "Electoral College = elected MPs (Lok Sabha + Rajya Sabha) + elected MLAs of all states",
      "Each vote is weighted based on state population and number of MLAs",
      "Proportional representation with single transferable vote",
      "Vice-President is elected by members of both Houses of Parliament only",
      "Conducted by the Election Commission of India",
      "President serves a 5-year term and can be re-elected",
    ],
  },
  {
    id: "by_election",
    title: "By-Elections",
    titleHindi: "उप-चुनाव",
    icon: "🗳️",
    shortDesc: "Held when a seat falls vacant mid-term",
    conductedBy: "ECI",
    frequency: "As required",
    details: [
      "Held when a sitting member vacates a seat due to death, resignation, disqualification, or court order",
      "Only the specific constituency votes — not the entire state or country",
      "Same process as a general election for that constituency",
      "Must be held within 6 months of a vacancy (with some exceptions)",
      "Winner serves only the remaining term of the original member",
      "Conducted by the Election Commission of India",
    ],
  },
];

export const VOTER_ELIGIBILITY_CRITERIA = [
  {
    step: 1,
    title: "Age: 18 years or above",
    description:
      "Must be 18 years of age on the qualifying date. The qualifying date is 1st January of the year of revision (or 1 April, 1 July, 1 October for special summary revisions).",
  },
  {
    step: 2,
    title: "Indian Citizenship",
    description:
      "Only citizens of India are eligible to vote in Indian elections. NRIs holding a valid Indian passport may register under special NRI voter provisions.",
  },
  {
    step: 3,
    title: "Not disqualified under law",
    description:
      "Must not be of unsound mind as declared by a competent court, and must not be disqualified under any law relating to corrupt practices or election offences.",
  },
  {
    step: 4,
    title: "Enrolled in Electoral Roll",
    description:
      "Must be registered in the electoral roll of the constituency where you ordinarily reside. Registration is done via Form 6 at voters.eci.gov.in.",
  },
];
