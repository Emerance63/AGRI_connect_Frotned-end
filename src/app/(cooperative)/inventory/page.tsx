export const metadata = { title: "Inventory" };

const items = [
  { name: "Premium Beans", category: "Legumes", stock: "850 kg", available: "680 kg", status: "Healthy", updated: "2 hrs ago" },
  { name: "White Rice", category: "Grains", stock: "428 kg", available: "350 kg", status: "Healthy", updated: "1 hrs ago" },
  { name: "Sweet Potatoes", category: "Root Veg", stock: "95 kg", available: "50 kg", status: "Low", updated: "1 hrs ago" },
  { name: "Green Cabbage", category: "Vegetables", stock: "218 kg", available: "190 kg", status: "Healthy", updated: "1 hrs ago" },
  { name: "Maize Flour", category: "Grains", stock: "18 kg", available: "18 kg", status: "Low", updated: "1 hrs ago" },
  { name: "Tomatoes", category: "Vegetables", stock: "8 kg", available: "8 kg", status: "Out", updated: "1 hrs ago" },
];

const statusColor: Record<string, string> = {
  Healthy: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  Low: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  Out: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

export default function InventoryPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">Manage your product catalog</p>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Inventory</h1>
        </div>
        <span className="text-xs text-gray-400 dark:text-green-100/50">Home</span>
      </div>

      {/* Summary badges */}
      <div className="flex gap-2 text-xs font-medium">
        <span className="rounded-full bg-green-100 px-3 py-1 text-green-700 dark:bg-green-500/20 dark:text-green-400">4 Healthy</span>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">2 Low Stock</span>
        <span className="rounded-full bg-red-100 px-3 py-1 text-red-700 dark:bg-red-500/20 dark:text-red-400">1 Out</span>
      </div>

      <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-white/10 text-xs text-gray-500 dark:text-green-100/50">
              <th className="px-5 py-3 text-left font-medium">Product</th>
              <th className="px-5 py-3 text-left font-medium">Category</th>
              <th className="px-5 py-3 text-left font-medium">Current Stock</th>
              <th className="px-5 py-3 text-left font-medium">Available</th>
              <th className="px-5 py-3 text-left font-medium">Status</th>
              <th className="px-5 py-3 text-left font-medium">Last Updated</th>
              <th className="px-5 py-3 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{item.name}</td>
                <td className="px-5 py-3 text-gray-500 dark:text-green-100/60">{item.category}</td>
                <td className="px-5 py-3 text-gray-700 dark:text-green-100/80">{item.stock}</td>
                <td className="px-5 py-3 text-gray-700 dark:text-green-100/80">{item.available}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[item.status]}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-400 dark:text-green-100/40">{item.updated}</td>
                <td className="px-5 py-3">
                  <button className="text-xs font-medium text-green-600 hover:underline dark:text-green-400">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
