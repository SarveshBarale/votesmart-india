import type { TimelineItem } from "@/types";

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "announcement",
    step: 1,
    title: "Election Announcement",
    subtitle: "ECI issues notification; Model Code of Conduct takes effect",
    color: "saffron",
    badge: "ECI announces",
    badgeColor: "saffron",
    duration: "Day 0",
    details:
      "The Election Commission of India issues a formal Press Note and Gazette notification announcing the complete election schedule. This includes: the date(s) of polling, the last date for filing nominations, the date of scrutiny, the last date for withdrawal of candidature, the date of counting, and the date before which the election shall be completed. The moment the notification is issued, the Model Code of Conduct (MCC) automatically comes into force for all political parties and candidates.",
  },
  {
    id: "mcc",
    step: 2,
    title: "Model Code of Conduct",
    subtitle: "Voluntary code governing parties, candidates, and government",
    color: "navy",
    badge: "Continuous",
    badgeColor: "navy",
    details:
      "The Model Code of Conduct (MCC) is a set of guidelines evolved through consensus among political parties to ensure free and fair elections. Key provisions include: (1) No use of government machinery or resources for election campaigns. (2) The ruling government must not make new policy announcements that could influence voters after the MCC comes into force. (3) Regulations on public meetings, processions, and rallies. (4) Ban on appeals to caste, communal, or linguistic sentiments. The MCC remains in force until results are declared and a new government is formed. Violations can be reported to the ECI.",
  },
  {
    id: "nominations",
    step: 3,
    title: "Candidate Nominations",
    subtitle: "Filing, scrutiny, and withdrawal of nomination papers",
    color: "saffron",
    badge: "~2 weeks",
    badgeColor: "saffron",
    details:
      "Candidates file nomination papers with the Returning Officer (RO) of the constituency. Along with the nomination, candidates must submit: (1) A security deposit (₹25,000 for Lok Sabha; ₹10,000 for Vidhan Sabha; half for SC/ST candidates). (2) A sworn affidavit declaring assets, liabilities, criminal antecedents (if any), and educational qualifications — this is public information. (3) Proof of party affiliation or independent status. On the date of scrutiny, the RO examines all nominations for validity. Candidates may withdraw their nominations voluntarily until the last date for withdrawal. After withdrawal, the final list of contesting candidates is published.",
  },
  {
    id: "campaign",
    step: 4,
    title: "Campaign Period",
    subtitle: "Regulated canvassing; 48-hour silence before polling",
    color: "navy",
    badge: "2–3 weeks",
    badgeColor: "navy",
    details:
      "Between the last date of withdrawal and polling day, candidates and parties campaign across constituencies. Permissible campaign activities include public rallies, door-to-door canvassing, print/broadcast advertisements (pre-certified by MCMC), and digital outreach. All election expenditure is subject to limits set by the ECI (e.g., ₹95 lakhs per candidate for Lok Sabha in larger states). A mandatory 48-hour 'campaign silence period' (also called Section 126 period) begins 48 hours before polling closes in that constituency, during which no election propaganda is permitted.",
  },
  {
    id: "polling",
    step: 5,
    title: "Polling Day",
    subtitle: "EVM voting at designated booths — your vote counts",
    color: "green",
    badge: "Your vote!",
    badgeColor: "green",
    details:
      "Polling stations typically open at 7:00 AM and close at 6:00 PM (exact timings are notified per constituency). All voters already in the queue by closing time are permitted to cast their vote. The booth is staffed by a Presiding Officer and Polling Officers, and is monitored by Polling Agents appointed by candidates. Central Armed Police Forces and/or state police are deployed for security. Live webcasting from polling stations is increasingly mandated by the ECI to ensure transparency.",
  },
  {
    id: "counting",
    step: 6,
    title: "Counting Day",
    subtitle: "Postal ballots first, then EVM counting by rounds",
    color: "saffron",
    badge: "After polling",
    badgeColor: "saffron",
    details:
      "Counting takes place at a designated counting centre (usually a large government building or indoor stadium). Strong rooms holding EVMs are opened only on counting day in the presence of candidates' counting agents and security personnel. The sequence: (1) Postal ballots are counted first. (2) EVM counting proceeds in 'rounds' — each round counts EVMs from a set of polling stations. (3) After each round, the cumulative tally is displayed. Live trends are updated on the ECI results portal (results.eci.gov.in) and Voter Helpline App. Candidates' counting agents have the right to demand recounts.",
  },
  {
    id: "results",
    step: 7,
    title: "Result Declaration",
    subtitle: "Returning Officer declares winner; results on eci.gov.in",
    color: "green",
    badge: "Final",
    badgeColor: "green",
    details:
      "After all rounds of counting, the Returning Officer formally declares the winning candidate and issues a Certificate of Election. Full results for all constituencies are published on eci.gov.in and results.eci.gov.in. The Model Code of Conduct remains in effect until a new government is formed. Losers or any voter can file an Election Petition before the relevant High Court within 45 days of the result to challenge the election on grounds of corrupt practices, booth capturing, or other violations.",
  },
];
