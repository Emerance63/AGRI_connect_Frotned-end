"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { month: "Aug", revenue: 6.8 }, { month: "Sep", revenue: 7.4 },
  { month: "Oct", revenue: 8.1 }, { month: "Nov", revenue: 9.6 },
  { month: "Dec", revenue: 10.2 }, { month: "Jan", revenue: 11.2 },
];

const topProducts = [
  { name: "Beans", value: 38, color: "#16a34a" },
  { name: "Rice", value: 27, color: "#22c55e" },
  { name: "Vegetables", value: 21, color: "#4ade80" },
  { name: "Maize", value: 9, color: "#86efac" },
  { name: "Other", value: 5, color: "#bbf7d0" },
];

const buyers = [
  { name: "ABC Restaurant", location: "Kigali", orders: 12, spend: "RWF 1,148,000", reliability: 96 },
  { name: "Kigali Serena Hotel", location: "Kigali", orders: 8, spend: "RWF 960,000", reliability: 88 },
  { name: "St. Joseph School", location: "Musanze", orders: 5, spend: "RWF 400,000", reliability: 91 },
  { name: "Rwanda Green Mart", location: "Huye", orders: 21, spend: "RWF 2,120,000", reliability: 76 },
];

type Action = "preview" | "export" | "share";

export default function ReportsBoard() {
  const [action, setAction] = useState<Action>("preview");

  const actionCopy: Record<Action, { title: string; body: string }> = {
    preview: {
      title: "Preview PDF",
      body: "This panel now shows the report summary a user expects after pressing Preview PDF.",
    },
    export: {
      title: "Export Excel",
      body: "This panel can hold the spreadsheet export summary or a download trigger later.",
    },
    share: {
      title: "Share Report",
      body: "This panel shows the report sharing state and the key metrics to be shared.",
    },
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">Export and share cooperative performance reports</p>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Reports</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setAction("preview")} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-green-100/70 dark:hover:bg-white/5">Preview PDF</button>
          <button type="button" onClick={() => setAction("export")} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-green-100/70 dark:hover:bg-white/5">Export Excel</button>
          <button type="button" onClick={() => setAction("share")} className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700">↑ Share Report</button>
        </div>
      </div>

      <div className="rounded-xl border border-green-100 bg-green-50/80 px-4 py-3 text-sm text-green-900 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-100">
        {actionCopy[action].title} is active. The button now switches the reporting context instead of doing nothing.
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5 dark:bg-[#112d1a] dark:ring-white/10">
          <h2 className="mb-4 text-sm font-semibold text-gray-800 dark:text-white">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} unit="M" />
              <Tooltip formatter={(v: number) => [`RWF ${v}M`, "Revenue"]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4, fill: "#16a34a" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5 dark:bg-[#112d1a] dark:ring-white/10">
          <h2 className="mb-4 text-sm font-semibold text-gray-800 dark:text-white">Top Selling Products</h2>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={topProducts} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {topProducts.map((product, index) => <Cell key={index} fill={product.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <ul className="w-full space-y-2 text-xs sm:w-auto">
              {topProducts.map((product) => (
                <li key={product.name} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: product.color }} />
                  <span className="text-gray-600 dark:text-green-100/70">{product.name}</span>
                  <span className="ml-auto font-semibold text-gray-900 dark:text-white">{product.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white">{actionCopy[action].title}</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-green-100/60">{actionCopy[action].body}</p>
        <div className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <p className="text-gray-400 dark:text-green-100/50">Best buyer</p>
            <p className="font-semibold text-gray-900 dark:text-white">ABC Restaurant</p>
          </div>
          <div>
            <p className="text-gray-400 dark:text-green-100/50">Top revenue</p>
            <p className="font-semibold text-gray-900 dark:text-white">RWF 11.2M</p>
          </div>
          <div>
            <p className="text-gray-400 dark:text-green-100/50">Active buyers</p>
            <p className="font-semibold text-gray-900 dark:text-white">4</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {buyers.map((buyer) => (
          <article key={buyer.name} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{buyer.name}</p>
                <p className="text-xs text-gray-400 dark:text-green-100/60">{buyer.location}</p>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-500/20 dark:text-green-400">Active</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-gray-400 dark:text-green-100/50">Orders</p>
                <p className="font-semibold text-gray-900 dark:text-white">{buyer.orders}</p>
              </div>
              <div>
                <p className="text-gray-400 dark:text-green-100/50">Spend</p>
                <p className="font-semibold text-gray-900 dark:text-white">{buyer.spend}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400 dark:text-green-100/50">Reliability</p>
                <p className="font-semibold text-gray-900 dark:text-white">{buyer.reliability}%</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10 md:block">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-white/10">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Best Buyers Report</h2>
        </div>
        <table className="min-w-[820px] w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-500 dark:text-green-100/50 border-b border-gray-100 dark:border-white/10">
              <th className="px-5 py-3 text-left font-medium">Buyer</th>
              <th className="px-5 py-3 text-left font-medium">Location</th>
              <th className="px-5 py-3 text-left font-medium">Total Orders</th>
              <th className="px-5 py-3 text-left font-medium">Total Spend</th>
              <th className="px-5 py-3 text-left font-medium">Reliability</th>
              <th className="px-5 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer) => (
              <tr key={buyer.name} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{buyer.name}</td>
                <td className="px-5 py-3 text-gray-500 dark:text-green-100/60">{buyer.location}</td>
                <td className="px-5 py-3 text-gray-700 dark:text-green-100/80">{buyer.orders}</td>
                <td className="px-5 py-3 text-gray-700 dark:text-green-100/80">{buyer.spend}</td>
                <td className="px-5 py-3 w-36">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-white/10">
                      <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${buyer.reliability}%` }} />
                    </div>
                    <span className="text-xs text-gray-600 dark:text-green-100/70">{buyer.reliability}%</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-500/20 dark:text-green-400">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}