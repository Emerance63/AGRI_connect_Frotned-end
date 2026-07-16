export const metadata = { title: "Orders" };

const orders = [
  {
    id: "ORD-001", buyer: "St. Joseph School", product: "Maize Flour · 1 kg", amount: "RWF 15,200",
    date: "Jul 1", status: "Delivered",
    steps: ["Pending", "Accepted", "Preparing", "Dispatched", "Delivered"],
    current: 4,
  },
  {
    id: "ORD-002", buyer: "Kigali Serena Hotel", product: "Mixed Vegetables · 500 kg", amount: "RWF 420,000",
    date: "Jul 29", status: "Dispatched",
    steps: ["Pending", "Accepted", "Preparing", "Dispatched", "Delivered"],
    current: 3,
  },
  {
    id: "ORD-003", buyer: "Rwanda Green Mart", product: "White Rice · 200 kg", amount: "RWF 360,000",
    date: "Aug 1", status: "Preparing",
    steps: ["Pending", "Accepted", "Preparing", "Dispatched", "Delivered"],
    current: 2,
  },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  Dispatched: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  Preparing: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
};

export default function OrdersPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">Track your fulfilment from acceptance to delivery</p>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Orders</h1>
        </div>
        <span className="text-xs text-gray-400 dark:text-green-100/50">Home</span>
      </div>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-white">{o.id}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor[o.status]}`}>{o.status}</span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-green-100/50">{o.buyer} · {o.product}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">{o.amount}</p>
                <p className="text-xs text-gray-400 dark:text-green-100/40">{o.date}</p>
              </div>
            </div>

            {/* Progress steps */}
            <div className="mt-4 flex items-center gap-0">
              {o.steps.map((step, i) => (
                <div key={step} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${i <= o.current ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400 dark:bg-white/10 dark:text-green-100/30"}`}>
                      {i <= o.current ? "✓" : i + 1}
                    </div>
                    <span className="mt-1 text-[10px] text-gray-400 dark:text-green-100/40">{step}</span>
                  </div>
                  {i < o.steps.length - 1 && (
                    <div className={`mb-3 h-0.5 flex-1 ${i < o.current ? "bg-green-600" : "bg-gray-200 dark:bg-white/10"}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-3">
              <button className="text-xs font-medium text-green-600 hover:underline dark:text-green-400">Invoice</button>
              <button className="text-xs font-medium text-green-600 hover:underline dark:text-green-400">Track</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
