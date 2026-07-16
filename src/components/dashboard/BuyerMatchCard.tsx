import Link from "next/link";

const buyers = [
  { id: 1, name: "School A — St. Joseph", location: "Kigali, 5 km", reliability: 96 },
  { id: 2, name: "School B — Kigali Serena", location: "Kigali, 12 km", reliability: 87 },
  { id: 3, name: "School C — Chue Lands", location: "Musanze, 38 km", reliability: 91 },
];

export default function BuyerMatchCard() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5 dark:bg-[#112d1a] dark:ring-white/10">
      <h2 className="mb-4 text-sm font-semibold text-gray-800 dark:text-white">
        Smart Buyer Matching
      </h2>
      <ul className="space-y-3 sm:space-y-4">
        {buyers.map((b) => (
          <li key={b.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{b.name}</p>
                <p className="truncate text-xs text-gray-400 dark:text-green-100/50">{b.location}</p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-green-600 dark:text-green-400">
                {b.reliability}%
              </span>
            </div>
            {/* Reliability progress bar */}
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-gray-100 dark:bg-white/10">
              <div
                className="h-1.5 rounded-full bg-green-500"
                style={{ width: `${b.reliability}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <Link
        href="/buyers"
        className="mt-5 block text-center text-xs font-medium text-green-600 hover:underline dark:text-green-400"
      >
        View all matches →
      </Link>
    </div>
  );
}
