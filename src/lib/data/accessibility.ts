import type { AccessibilityFeature, MisinfoTip } from "@/types";

export const ACCESSIBILITY_FEATURES: AccessibilityFeature[] = [
  {
    id: "wheelchair",
    icon: "♿",
    title: "Wheelchair & Ramp Access",
    description:
      "All polling stations must have ramp access or equivalent arrangement for wheelchair users and voters with mobility challenges. The ECI's guidelines mandate ground-floor locations or ramp access for all booths.",
    initiative: "SAKSHAM",
  },
  {
    id: "braille",
    icon: "⠿",
    title: "Braille-Enabled EVMs",
    description:
      "The Balloting Unit of the EVM is equipped with Braille script alongside each candidate button, enabling visually impaired voters to identify candidates independently and cast their vote without assistance.",
  },
  {
    id: "companion",
    icon: "🤝",
    title: "Companion Voting",
    description:
      "A voter who is blind or has a physical disability preventing them from operating the EVM may take a companion of their choice (must be 18+ years old) to assist in casting the vote. The companion must declare they have not assisted any other voter in the same polling station during the same election.",
  },
  {
    id: "transport",
    icon: "🚗",
    title: "Free Voter Transport",
    description:
      "The ECI's SAKSHAM initiative includes free transportation to and from polling booths for elderly voters (80+ years) and Persons with Disabilities (PwD) in many constituencies. Arrangements are coordinated through the district administration.",
    initiative: "SAKSHAM",
  },
  {
    id: "postal_pwd",
    icon: "📮",
    title: "Postal Ballot for PwD & Elderly",
    description:
      "Persons with specified disabilities and senior citizens aged 80 or above may be eligible for the postal ballot facility in applicable elections, allowing them to cast their vote from home. Eligibility and process are notified by the ECI for each election.",
    initiative: "SAKSHAM",
  },
  {
    id: "separate_queues",
    icon: "👴",
    title: "Dedicated Queues & Officers",
    description:
      "Separate queues and dedicated polling officers are arranged at polling stations for senior citizens (80+), Persons with Disabilities, and pregnant women. They are given priority and do not need to wait in the general queue.",
    initiative: "SAKSHAM",
  },
  {
    id: "magnifier",
    icon: "🔍",
    title: "Magnifiers & Assistance",
    description:
      "Magnifying glasses are made available at polling booths to assist visually impaired voters in reading the ballot. Voters may also request assistance from a polling officer for reasons of physical disability.",
  },
  {
    id: "sign_language",
    icon: "🤟",
    title: "Voter Awareness for PwD",
    description:
      "ECI's voter awareness campaigns include content in sign language and accessible formats for hearing-impaired and visually impaired voters. The Voter Helpline App and website aim to be screen-reader compatible.",
    initiative: "SAKSHAM",
  },
];

export const MISINFO_TIPS: MisinfoTip[] = [
  {
    id: "tip-1",
    number: 1,
    title: "Always verify with official sources",
    description:
      "Election dates, polling booth locations, eligibility rules, and procedures should be verified only on eci.gov.in, voters.eci.gov.in, or by calling the Voter Helpline at 1950. Do not rely on WhatsApp forwards, social media posts, or unverified news sites.",
  },
  {
    id: "tip-2",
    number: 2,
    title: "Check for official ECI announcements",
    description:
      "The ECI issues official press releases and Gazette notifications for all election-related announcements. These are published on eci.gov.in and are the only authoritative source. Any election schedule or rule change not reflected on the ECI website should be treated with caution.",
  },
  {
    id: "tip-3",
    number: 3,
    title: "Report misinformation via cVIGIL",
    description:
      "Voters can report fake news, voter intimidation, bribery, or MCC violations through the cVIGIL app (developed by ECI). Reports are geo-tagged, timestamped, and actioned within 100 minutes. Also available: the 1950 Voter Helpline.",
  },
  {
    id: "tip-4",
    number: 4,
    title: "Your vote is completely secret",
    description:
      "Voting is completely secret by law. No one can determine how you voted — not the EVM, not election officials, not your employer or family. If anyone pressures you on how to vote or claims they can check your vote, that is false. Report such attempts to polling staff or call 1950.",
  },
  {
    id: "tip-5",
    number: 5,
    title: "Beware of fake voter slips and fake booths",
    description:
      "Always obtain your voter slip from official sources and verify your booth on voters.eci.gov.in. Fraudulent voter slips or fake polling agents have been used to mislead voters. When in doubt, call 1950 or ask the nearest police officer.",
  },
  {
    id: "tip-6",
    number: 6,
    title: "Bribery is an electoral offence",
    description:
      "Accepting cash, gifts, or any benefit in exchange for your vote is an electoral offence — for both the giver and receiver. Report bribery immediately to election authorities, police, or via the cVIGIL app. You can report anonymously.",
  },
];

export const OFFICIAL_RESOURCES = [
  { name: "Election Commission of India", url: "https://eci.gov.in", label: "eci.gov.in" },
  { name: "Voter Registration Portal", url: "https://voters.eci.gov.in", label: "voters.eci.gov.in" },
  { name: "Election Results", url: "https://results.eci.gov.in", label: "results.eci.gov.in" },
  { name: "National Voter Helpline", url: "tel:1950", label: "1950 (Helpline)" },
  { name: "cVIGIL App", url: "https://cvigil.eci.gov.in", label: "cVIGIL App" },
  { name: "Voter Helpline App", url: "https://play.google.com/store/apps/details?id=com.eci.citizen", label: "Voter Helpline App" },
];
