export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="max-w-5xl mx-auto px-4 py-6 mt-10 border-t border-gray-200 text-xs text-gray-500 text-center space-y-1"
    >
      <p className="font-semibold text-gray-700">VoteSmart India — Election Education Platform</p>
      <p>Strictly Non-Partisan · Process Education Only · No political content</p>
      <p>
        Official resources:{" "}
        <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:underline">
          eci.gov.in
        </a>{" "}
        ·{" "}
        <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:underline">
          voters.eci.gov.in
        </a>{" "}
        · Voter Helpline:{" "}
        <a href="tel:1950" className="text-navy-600 hover:underline">1950</a>
      </p>
      <p className="text-gray-400 pt-1">
        Powered by Next.js · Firebase · Google Calendar API · Google Maps API · Google Sign-In
      </p>
    </footer>
  );
}
