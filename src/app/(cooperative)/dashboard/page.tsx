import StatsCards from "@/components/dashboard/StatsCards";
import RevenueChart from "@/components/dashboard/RevenueChart";
import BuyerMatchCard from "@/components/dashboard/BuyerMatchCard";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">AgriConnect Cooperative Portal</p>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Dashboard</h1>
        </div>
        <span className="text-xs text-gray-400 dark:text-green-100/50">Home</span>
      </div>

      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-xl bg-[#0d2818] px-6 py-5 text-white shadow-lg">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-green-700/20" />
        <div className="pointer-events-none absolute -bottom-8 right-24 h-32 w-32 rounded-full bg-green-600/10" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-green-700/40 px-3 py-1 text-xs font-medium text-green-300">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              WELCOME BACK
            </div>
            <h2 className="mt-2 text-2xl font-bold">Green Valley Cooperative</h2>
            <p className="mt-1 text-sm text-green-100/70">
              You have <span className="font-semibold text-amber-400">4 urgent</span> requests pending review today.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs text-green-100/60">August 2025</p>
            <p className="text-4xl font-extrabold tracking-tight text-white">RWF 11.2M</p>
            <p className="mt-0.5 text-xs text-green-300">Monthly Revenue</p>
          </div>
        </div>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2"><RevenueChart /></div>
        <BuyerMatchCard />
      </div>
    </div>
  );
}
