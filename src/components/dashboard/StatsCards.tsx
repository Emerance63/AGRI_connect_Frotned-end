"use client";

const stats = [
  {
    label: "Total Products",
    value: "24",
    trend: "+3 this week",
    trendUp: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 7 12 3 4 7v10l8 4 8-4V7z" /><path d="M4 7l8 4 8-4" /><path d="M12 11v10" />
      </svg>
    ),
  },
  {
    label: "Inventory Available",
    value: "18.4 t",
    trend: "In stock",
    trendUp: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 8v13H3V8" /><path d="M1 3h22v5H1z" /><path d="M10 12h4" />
      </svg>
    ),
  },
  {
    label: "New Requests",
    value: "7",
    trend: "3 pending",
    trendUp: false,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    label: "Monthly Revenue",
    value: "RWF 11.2M",
    trend: "+8% vs last month",
    trendUp: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
      </svg>
    ),
  },
  {
    label: "Pending Deliveries",
    value: "3",
    trend: "+1 scheduled",
    trendUp: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-green-100/60">{s.label}</span>
            <span className="text-green-600 dark:text-green-400">{s.icon}</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
          <p className={`mt-1 flex items-center gap-1 text-xs font-medium ${s.trendUp ? "text-green-600 dark:text-green-400" : "text-amber-500"}`}>
            {s.trendUp ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 15l-6-6-6 6" /></svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg>
            )}
            {s.trend}
          </p>
        </div>
      ))}
    </div>
  );
}
