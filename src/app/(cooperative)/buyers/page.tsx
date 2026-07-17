export const metadata = { title: "Buyers" };

const buyers = [
  { initials: "AR", name: "ABC Restaurant", location: "Kigali", orders: 12, spend: "RWF 1,148,000", reliability: 96, active: true },
  { initials: "KS", name: "Kigali Serena Hotel", location: "Kigali", orders: 8, spend: "RWF 960,000", reliability: 88, active: true },
  { initials: "SJ", name: "St. Joseph School", location: "Musanze", orders: 5, spend: "RWF 400,000", reliability: 91, active: true },
  { initials: "RG", name: "Rwanda Green Mart", location: "Huye", orders: 21, spend: "RWF 2,120,000", reliability: 76, active: true },
  { initials: "MH", name: "Horizon Hotel", location: "Rubavu", orders: 3, spend: "RWF 280,000", reliability: 61, active: false },
];

export default function BuyersPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">Track your buyer relationships and history</p>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Buyers</h1>
        </div>
        <span className="text-xs text-gray-400 dark:text-green-100/50">Home</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {buyers.map((b) => (
          <div key={b.name} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                  {b.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{b.name}</p>
                  <p className="text-xs text-gray-400 dark:text-green-100/50">{b.location}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${b.active ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-green-100/40"}`}>
                {b.active ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-400 dark:text-green-100/50">Total orders</p>
                <p className="font-semibold text-gray-900 dark:text-white">{b.orders}</p>
              </div>
              <div>
                <p className="text-gray-400 dark:text-green-100/50">Total spend</p>
                <p className="font-semibold text-gray-900 dark:text-white">{b.spend}</p>
              </div>
            </div>

            {/* Reliability bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 dark:text-green-100/50">Reliability</span>
                <span className="font-semibold text-gray-700 dark:text-green-100/80">{b.reliability}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100 dark:bg-white/10">
                <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${b.reliability}%` }} />
              </div>
            </div>

            <div className="mt-4 flex gap-3 border-t border-gray-100 pt-3 dark:border-white/10">
              <button className="flex-1 text-xs font-medium text-green-600 hover:underline dark:text-green-400">Message</button>
              <button className="flex-1 text-xs font-medium text-green-600 hover:underline dark:text-green-400">History</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
