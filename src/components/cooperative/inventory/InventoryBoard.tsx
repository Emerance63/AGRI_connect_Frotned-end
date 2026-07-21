"use client";

import { useMemo, useState } from "react";

import InventoryCard from "./InventoryCard";
import InventoryStats from "./InventoryStats";
import SearchInventory from "./SearchInventory";
import AddProductModal from "../AddProductModal";
import UpdateStockModal, {
  InventoryItem,
} from "./UpdateStockModal";

const initialItems: InventoryItem[] = [
  {
    name: "Premium Beans",
    category: "Legumes",
    stock: "850 kg",
    available: "680 kg",
    status: "Healthy",
    updated: "2 hrs ago",
  },
  {
    name: "White Rice",
    category: "Grains",
    stock: "428 kg",
    available: "350 kg",
    status: "Healthy",
    updated: "1 hr ago",
  },
  {
    name: "Sweet Potatoes",
    category: "Root Veg",
    stock: "95 kg",
    available: "50 kg",
    status: "Low",
    updated: "1 hr ago",
  },
  {
    name: "Green Cabbage",
    category: "Vegetables",
    stock: "218 kg",
    available: "190 kg",
    status: "Healthy",
    updated: "1 hr ago",
  },
  {
    name: "Maize Flour",
    category: "Grains",
    stock: "18 kg",
    available: "18 kg",
    status: "Low",
    updated: "40 mins ago",
  },
  {
    name: "Tomatoes",
    category: "Vegetables",
    stock: "0 kg",
    available: "0 kg",
    status: "Out",
    updated: "20 mins ago",
  },
];

const statusColor = {
  Healthy:
    "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  Low:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
  Out:
    "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

export default function InventoryBoard() {
  const [items, setItems] = useState(initialItems);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [selectedItem, setSelectedItem] =
    useState<InventoryItem | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [category, setCategory] = useState("All");

 const filteredItems = useMemo(() => {
  return items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filter === "All" || item.status === filter;

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesStatus && matchesCategory;
  });
}, [items, search, filter, category]);

 const healthy = items.filter(
  (item) => item.status === "Healthy"
).length;

const low = items.filter(
  (item) => item.status === "Low"
).length;

const out = items.filter(
  (item) => item.status === "Out"
).length;

function handleAdd(item: InventoryItem) {
  setItems((current) => [...current, item]);
}

  function handleOpen(item: InventoryItem) {
    setSelectedItem(item);
    setOpenModal(true);
  }
  

  function handleSave(updated: InventoryItem) {
    setItems((current) =>
      current.map((item) =>
        item.name === updated.name ? updated : item
      )
    );

    setOpenModal(false);
  }

  function handleDelete(name: string) {
  if (!confirm("Delete this product?")) return;

  setItems((current) =>
    current.filter((item) => item.name !== name)
  );
}
  function refreshItem(item: InventoryItem) {
    setItems((current) =>
      current.map((i) =>
        i.name === item.name
          ? {
              ...i,
              updated: "Just now",
            }
          : i
      )
    );
  }

  return (
    <div className="space-y-6">

     <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

  <div>

    <p className="text-sm text-gray-400 dark:text-green-100/50">
      Manage your cooperative inventory
    </p>

    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
      Inventory
    </h1>

  </div>

  <button
    onClick={() => setOpenAddModal(true)}
    className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
  >
    + Add Product
  </button>

</div>

      <InventoryStats
        healthy={healthy}
        low={low}
        out={out}
      />

   <SearchInventory
  search={search}
  onSearchChange={setSearch}
  filter={filter}
  onFilterChange={setFilter}
  category={category}
  onCategoryChange={setCategory}
/>
            {/* Mobile Cards */}

      <div className="grid gap-4 lg:hidden">

        {filteredItems.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm dark:bg-[#112d1a]">
            <p className="text-gray-500 dark:text-green-100/60">
              No inventory found.
            </p>
          </div>
        )}

        {filteredItems.map((item) => (
       <InventoryCard
  key={item.name}
  item={item}
  onEdit={() => handleOpen(item)}
  onUpdate={() => refreshItem(item)}
  onDelete={() => handleDelete(item.name)}
/>
        ))}

      </div>

      {/* Desktop Table */}

      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10 lg:block">

        <table className="min-w-full">

          <thead>

            <tr className="border-b border-gray-100 text-left text-sm dark:border-white/10">

              <th className="px-6 py-4 font-semibold">
                Product
              </th>

              <th className="px-6 py-4 font-semibold">
                Category
              </th>

              <th className="px-6 py-4 font-semibold">
                Stock
              </th>

              <th className="px-6 py-4 font-semibold">
                Available
              </th>

              <th className="px-6 py-4 font-semibold">
                Status
              </th>

              <th className="px-6 py-4 font-semibold">
                Updated
              </th>

              <th className="px-6 py-4 font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredItems.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500 dark:text-green-100/60"
                >
                  No inventory found.
                </td>

              </tr>

            )}

            {filteredItems.map((item) => (

              <tr
                key={item.name}
                className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5"
              >

                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </td>

                <td className="px-6 py-4">
                  {item.category}
                </td>

                <td className="px-6 py-4">
                  {item.stock}
                </td>

                <td className="px-6 py-4">
                  {item.available}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[item.status]}`}
                  >
                    {item.status}
                  </span>

                </td>

                <td className="px-6 py-4">
                  {item.updated}
                </td>

                <td className="px-6 py-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => handleOpen(item)}
                      className="rounded-lg border border-green-600 px-3 py-1 text-sm font-semibold text-green-600 transition hover:bg-green-50 dark:hover:bg-green-500/10"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => refreshItem(item)}
                      className="rounded-lg bg-green-600 px-3 py-1 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      Update
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
            <UpdateStockModal
        open={openModal}
        item={selectedItem}
        onClose={() => {
          setOpenModal(false);
          setSelectedItem(null);
        }}
        onSave={handleSave}
      />
      {/* <AddProductModal
  open={openAddModal}
  onClose={() => setOpenAddModal(false)}
  onAdd={handleAdd}
/> */}

      {selectedItem && (
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Selected Product
              </h2>

              <p className="text-sm text-gray-500 dark:text-green-100/60">
                Information about the selected inventory item.
              </p>

            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[selectedItem.status]}`}
            >
              {selectedItem.status}
            </span>

          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <div>

              <p className="text-sm text-gray-400 dark:text-green-100/50">
                Product
              </p>

              <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">
                {selectedItem.name}
              </h3>

            </div>

            <div>

              <p className="text-sm text-gray-400 dark:text-green-100/50">
                Category
              </p>

              <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">
                {selectedItem.category}
              </h3>

            </div>

            <div>

              <p className="text-sm text-gray-400 dark:text-green-100/50">
                Stock
              </p>

              <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">
                {selectedItem.stock}
              </h3>

            </div>

            <div>

              <p className="text-sm text-gray-400 dark:text-green-100/50">
                Available
              </p>

              <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">
                {selectedItem.available}
              </h3>

            </div>

          </div>

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={() => handleOpen(selectedItem)}
              className="rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Edit Stock
            </button>

            <button
              onClick={() => refreshItem(selectedItem)}
              className="rounded-lg border border-green-600 px-5 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-50 dark:hover:bg-green-500/10"
            >
              Refresh
            </button>

          </div>

        </div>
      )}

    </div>
  );
}