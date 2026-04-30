import type { RegistrationFormInfo } from "@/types";

export const REGISTRATION_FORMS: RegistrationFormInfo[] = [
  {
    id: "form6",
    label: "New Registration (Form 6)",
    purpose: "Register as a new voter in an assembly constituency",
    steps: [
      {
        step: 1,
        title: "Check your eligibility",
        description: "Must be 18+ years old and an Indian citizen residing in the constituency",
        details:
          "The qualifying date is 1 January of the year of revision. If you turn 18 on or before 1 January of the revision year, you are eligible.",
      },
      {
        step: 2,
        title: "Gather required documents",
        description: "Proof of Age and Proof of Address are mandatory",
        details:
          "Proof of Age: Birth certificate, Class 10 marksheet, Passport, PAN card, Aadhaar card (if DOB present). Proof of Address: Aadhaar, Passport, Bank/Post Office passbook, Latest utility bill (electricity, water, gas), Rental agreement.",
      },
      {
        step: 3,
        title: "Fill Form 6",
        description: "Available online at voters.eci.gov.in or via the Voter Helpline App",
        details:
          "Online (recommended): Visit voters.eci.gov.in > Register as New Voter > Fill Form 6. Offline: Collect from your Booth Level Officer (BLO), Electoral Registration Office, or District Election Office.",
      },
      {
        step: 4,
        title: "Submit with documents",
        description: "Upload scanned copies online or submit at ERO/BLO office",
        details:
          "Online: Upload clear scanned copies or photos of documents. You will receive a reference number for tracking. Offline: Submit the filled form and attested photocopies to the ERO/BLO.",
      },
      {
        step: 5,
        title: "BLO verification",
        description: "A Booth Level Officer may visit to verify address and identity",
        details:
          "After submission, the BLO assigned to your polling area will conduct a field verification, checking that you genuinely reside at the stated address. Be available for this verification.",
      },
      {
        step: 6,
        title: "EPIC card issued",
        description: "Upon approval, your name is added to the electoral roll and EPIC is issued",
        details:
          "After successful verification, the ERO approves your application, adds your name to the electoral roll, and your EPIC (Voter ID) card is generated. You can download an e-EPIC from voters.eci.gov.in.",
      },
    ],
    note:
      "Important: Apply well before the roll revision deadline. Do not wait until an election is announced — it will be too late. Track your application status on voters.eci.gov.in using your reference number.",
  },
  {
    id: "form8",
    label: "Correction / Update (Form 8)",
    purpose: "Correct or update entries in the electoral roll",
    steps: [
      {
        step: 1,
        title: "Identify what needs correction",
        description: "Name spelling, photo, date of birth, address within constituency",
        details:
          "Form 8 covers: correction of entries (name, DOB, photo), shifting of residence within the same constituency, and deletion of entries. For address change to a different constituency, submit Form 6 for the new constituency.",
      },
      {
        step: 2,
        title: "Fill Form 8",
        description: "Available on voters.eci.gov.in or Voter Helpline App",
        details:
          "Select the specific correction needed and fill in only the fields that require change. Provide your existing EPIC number.",
      },
      {
        step: 3,
        title: "Attach supporting documents",
        description: "Documents supporting the correction",
        details:
          "Name correction: Gazette notification or school certificate. Date of birth: Birth certificate, school certificate. Address change: Proof of new address. Photo update: Recent passport photograph.",
      },
      {
        step: 4,
        title: "Submit and track",
        description: "Reference number provided for online tracking",
        details:
          "Submit online and note your reference number. Track status at voters.eci.gov.in. Changes take effect from the next electoral roll revision unless a special revision is in progress.",
      },
    ],
    note:
      "For change of constituency (shifting to a new area), you must first apply for deletion from the old constituency's roll and then register in the new constituency using Form 6.",
  },
  {
    id: "form6a",
    label: "NRI Voters (Form 6A)",
    purpose: "Register as an overseas (NRI) voter",
    steps: [
      {
        step: 1,
        title: "Check NRI eligibility",
        description: "Indian citizen residing abroad, holding a valid Indian Passport",
        details:
          "You must hold a valid Indian passport. You should not have acquired citizenship of any other country. Your permanent address in India (as in your passport) determines your constituency.",
      },
      {
        step: 2,
        title: "Fill Form 6A online",
        description: "Available exclusively online at voters.eci.gov.in",
        details:
          "Go to voters.eci.gov.in > Overseas Voter > Register. You must register in the constituency corresponding to your permanent address in India as mentioned in your Indian passport.",
      },
      {
        step: 3,
        title: "Attach passport copy",
        description: "Valid Indian passport with relevant pages",
        details:
          "Upload clear copies of: (1) First and last pages of your Indian passport showing your name and address. (2) Page showing validity dates. All document upload must be self-attested.",
      },
      {
        step: 4,
        title: "Vote in person on polling day",
        description: "NRI voters must be physically present in India to vote",
        details:
          "Under current law, NRI voters must travel to their registered constituency and vote in person at their designated polling booth on election day. Proxy voting and postal voting are not available for NRI voters.",
      },
    ],
    note:
      "Proxy and postal voting are NOT available for NRI voters under current law. For the most up-to-date NRI voting provisions, visit eci.gov.in or contact the Indian Embassy/Consulate in your country.",
  },
  {
    id: "verify",
    label: "Verify Registration",
    purpose: "Check if your name is on the electoral roll",
    steps: [
      {
        step: 1,
        title: "Visit voters.eci.gov.in",
        description: "Use the 'Search Your Name in Electoral Roll' tool",
        details:
          "Go to voters.eci.gov.in and click 'Search Your Name in Electoral Roll'. This is the most reliable official method.",
      },
      {
        step: 2,
        title: "Search by EPIC number",
        description: "Enter your Voter ID card number for exact match",
        details:
          "Enter the EPIC number printed on your Voter ID card. This gives you the most precise result, showing your entry, booth number, and constituency.",
      },
      {
        step: 3,
        title: "Or search by details",
        description: "Enter name, relative's name, and address",
        details:
          "If you don't have your EPIC number, search by name + father/husband name + state + district + assembly constituency. Check for spelling variations.",
      },
      {
        step: 4,
        title: "Voter Helpline 1950",
        description: "Call for assisted search or to report issues",
        details:
          "The national Voter Helpline (1950) is available in multiple languages and can help verify your registration, report missing entries, or guide you through the registration process.",
      },
    ],
    note:
      "Always verify your registration well before polling day, as last-minute corrections may not be possible. The electoral roll for an election is finalised before polling day.",
  },
];

export const DOCUMENTS_ACCEPTED = {
  proofOfAge: [
    "Birth certificate issued by Municipal Authority or notified authority",
    "Class X / Matriculation certificate (showing date of birth)",
    "Indian Passport (if date of birth is mentioned)",
    "PAN card (if date of birth is mentioned)",
    "Aadhaar card (if date of birth is mentioned)",
    "Driving licence (if date of birth is mentioned)",
    "Certificate of birth from school last attended",
  ],
  proofOfAddress: [
    "Aadhaar card",
    "Indian Passport",
    "Driving licence",
    "Bank/Kisan/Post Office passbook with photograph and current address",
    "Registered rental/lease agreement",
    "Latest electricity, water, gas, or telephone bill (not older than 3 months)",
    "Latest Income Tax Assessment Order",
    "Letter from BLO/ERO confirming address",
    "MGNREGS (Job card) with photo issued by Ministry of Rural Development",
  ],
};
