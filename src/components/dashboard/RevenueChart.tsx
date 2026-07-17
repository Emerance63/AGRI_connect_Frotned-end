"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Aug 2024", revenue: 6.8 },
  { month: "Sep 2024", revenue: 7.4 },
  { month: "Oct 2024", revenue: 8.1 },
  { month: "Nov 2024", revenue: 9.6 },
  { month: "Dec 2024", revenue: 10.2 },
  { month: "Jan 2025", revenue: 11.2 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5 dark:bg-[#112d1a] dark:ring-white/10">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Monthly Revenue (RWF)</h2>
        <span className="w-fit rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-500 dark:bg-white/10 dark:text-green-100/60">
          Aug 2024 — Jan 2025
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={24} margin={{ top: 4, right: 4, left: -14, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} unit="M" />
          <Tooltip
            cursor={{ fill: "rgba(22,163,74,0.08)" }}
            formatter={(v: number) => [`RWF ${v}M`, "Revenue"]}
            contentStyle={{ borderRadius: 8, fontSize: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          />
          <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
