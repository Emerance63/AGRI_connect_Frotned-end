"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { useBuyers } from "@/lib/buyers";

export default function BuyerMatchCard() {
  const { t } = useLanguage();
  const { buyers } = useBuyers();
  const matchedBuyers = buyers
    .filter((buyer) => buyer.active)
    .slice(0, 3);

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5 dark:bg-[#112d1a] dark:ring-white/10">
      <h2 className="mb-4 text-sm font-semibold text-gray-800 dark:text-white">
        {t.dashboard.smartBuyerMatching}
      </h2>
      <ul className="space-y-3 sm:space-y-4">
        {matchedBuyers.map((buyer) => (
          <li key={buyer.name}>
            <Link href="/buyers" className="block rounded-lg p-2 -m-2 transition hover:bg-green-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 dark:hover:bg-white/5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{buyer.name}</p>
                <p className="truncate text-xs text-gray-400 dark:text-green-100/50">{buyer.location}</p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-green-600 dark:text-green-400">
                {buyer.reliability}%
              </span>
            </div>
            {/* Reliability progress bar */}
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-gray-100 dark:bg-white/10">
              <div
                className="h-1.5 rounded-full bg-green-500"
                style={{ width: `${buyer.reliability}%` }}
              />
            </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/buyers"
        className="mt-5 block text-center text-xs font-medium text-green-600 hover:underline dark:text-green-400"
      >
        {t.dashboard.viewAllMatches}
      </Link>
    </div>
  );
}
