"use client";

type InventoryItem = {
  name: string;
  category: string;
  stock: string;
  available: string;
  status: "Healthy" | "Low" | "Out";
  updated: string;
};

interface InventoryCardProps {
  item: InventoryItem;
  onUpdate: () => void;
  onEdit: () => void;
}

const statusColor = {
  Healthy:
    "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  Low:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  Out:
    "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

export default function InventoryCard({
  item,
  onUpdate,
  onEdit,
}: InventoryCardProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {item.name}
          </h3>

          <p className="text-xs text-gray-400 dark:text-green-100/50">
            {item.category}
          </p>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[item.status]}`}
        >
          {item.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">

        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">
            Stock
          </p>

          <h4 className="font-semibold text-gray-900 dark:text-white">
            {item.stock}
          </h4>
        </div>

        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">
            Available
          </p>

          <h4 className="font-semibold text-gray-900 dark:text-white">
            {item.available}
          </h4>
        </div>

      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-400 dark:text-green-100/50">
          Last Updated
        </p>

        <p className="font-medium text-gray-700 dark:text-green-100">
          {item.updated}
        </p>
      </div>

      <div className="mt-5 flex gap-2">

        <button
          onClick={onEdit}
          className="flex-1 rounded-lg border border-green-600 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-50 dark:hover:bg-green-500/10"
        >
          Edit
        </button>

        <button
          onClick={onUpdate}
          className="flex-1 rounded-lg bg-green-600 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Update
        </button>

      </div>

    </div>
  );
}