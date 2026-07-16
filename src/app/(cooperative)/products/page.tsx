export const metadata = { title: "Products" };

const products = [
  { name: "Premium Beans", tag: "1 kg/pack", price: "RWF 1,990/kg", weight: "850 kg", status: "Healthy", published: true },
  { name: "White Rice", tag: "Grains", price: "RWF 10,830/kg", weight: "420 kg", status: "Healthy", published: true },
  { name: "Sweet Potatoes", tag: "Root Veg", price: "RWF 9,700/kg", weight: "95 kg", status: "Low", published: true },
  { name: "Green Cabbage", tag: "Vegetables", price: "RWF 1,960/kg", weight: "218 kg", status: "Healthy", published: true },
  { name: "Maize Flour", tag: "Grains", price: "RWF 4,150/kg", weight: "18 kg", status: "Low", published: false },
  { name: "Tomatoes", tag: "Vegetables", price: "RWF 4,880/kg", weight: "8 kg", status: "Out", published: true },
];

const statusColor: Record<string, string> = {
  Healthy: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  Low: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  Out: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

export default function ProductsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">Manage and publish your agricultural products</p>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Products</h1>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700">
          + Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.name} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{p.name}</p>
                <p className="text-xs text-gray-400 dark:text-green-100/50">{p.tag}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor[p.status]}`}>
                {p.status}
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{p.price}</p>
                <p className="text-xs text-gray-400 dark:text-green-100/50">{p.weight}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-lg border border-gray-200 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-green-100/70 dark:hover:bg-white/5">
                Preview
              </button>
              <button className={`flex-1 rounded-lg py-1.5 text-xs font-semibold text-white ${p.published ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 hover:bg-gray-500"}`}>
                {p.published ? "Published" : "Publish"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
