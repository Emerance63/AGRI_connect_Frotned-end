interface InventoryStatsProps {
  healthy: number;
  low: number;
  out: number;
}

export default function InventoryStats({
  healthy,
  low,
  out,
}: InventoryStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-700 dark:bg-green-900/20">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Healthy Products
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-700 dark:text-green-400">
          {healthy}
        </h2>
      </div>

      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5 dark:border-yellow-700 dark:bg-yellow-900/20">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Low Stock
        </p>

        <h2 className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
          {low}
        </h2>
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-700 dark:bg-red-900/20">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Out of Stock
        </p>

        <h2 className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
          {out}
        </h2>
      </div>
    </div>
  );
}