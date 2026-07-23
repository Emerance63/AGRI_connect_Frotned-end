"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useCooperativeData, type InventoryItem } from "@/lib/cooperative-data";

const statusColor: Record<InventoryItem["status"], string> = {
  Healthy: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  Low: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  Out: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

export default function InventoryBoard() {
  const { inventory: items, refreshInventoryItem } = useCooperativeData();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedItem = items[selectedIndex];
  const { t } = useLanguage();

  // Map internal status keys to translated labels
  const statusLabel: Record<InventoryItem["status"], string> = {
    Healthy: t.inventory.healthy,
    Low: t.inventory.lowStock,
    Out: t.inventory.out,
  };

  function handleUpdate(index: number) {
    setSelectedIndex(index);
    refreshInventoryItem(items[index]?.name ?? "");
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">{t.inventory.subtitle}</p>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">{t.inventory.title}</h1>
        </div>
        <span className="text-xs text-gray-400 dark:text-green-100/50">{t.inventory.home}</span>
      </div>

      <div className="flex flex-wrap gap-2 text-xs font-medium">
        <span className="rounded-full bg-green-100 px-3 py-1 text-green-700 dark:bg-green-500/20 dark:text-green-400">4 {t.inventory.healthy}</span>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">2 {t.inventory.lowStock}</span>
        <span className="rounded-full bg-red-100 px-3 py-1 text-red-700 dark:bg-red-500/20 dark:text-red-400">1 {t.inventory.out}</span>
      </div>

      <div className="rounded-xl border border-green-100 bg-green-50/80 px-4 py-3 text-sm text-green-900 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-100">
        {t.inventory.infoBanner}
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 sm:hidden">
        {items.map((item, index) => (
          <article key={item.name} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                <p className="text-xs text-gray-400 dark:text-green-100/50">{item.category}</p>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[item.status]}`}>
                {statusLabel[item.status]}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-gray-400 dark:text-green-100/50">{t.inventory.currentStock}</p>
                <p className="font-semibold text-gray-900 dark:text-white">{item.stock}</p>
              </div>
              <div>
                <p className="text-gray-400 dark:text-green-100/50">{t.inventory.available}</p>
                <p className="font-semibold text-gray-900 dark:text-white">{item.available}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400 dark:text-green-100/50">{t.inventory.lastUpdated}</p>
                <p className="font-semibold text-gray-900 dark:text-white">{item.updated}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => handleUpdate(index)}
                className="text-xs font-medium text-green-600 hover:underline dark:text-green-400"
              >
                {t.inventory.update}
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10 sm:block">
        <table className="min-w-[760px] w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-500 dark:border-white/10 dark:text-green-100/50">
              <th className="px-5 py-3 text-left font-medium">{t.inventory.product}</th>
              <th className="px-5 py-3 text-left font-medium">{t.inventory.category}</th>
              <th className="px-5 py-3 text-left font-medium">{t.inventory.currentStock}</th>
              <th className="px-5 py-3 text-left font-medium">{t.inventory.available}</th>
              <th className="px-5 py-3 text-left font-medium">{t.inventory.status}</th>
              <th className="px-5 py-3 text-left font-medium">{t.inventory.lastUpdated}</th>
              <th className="px-5 py-3 text-left font-medium">{t.inventory.action}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.name} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{item.name}</td>
                <td className="px-5 py-3 text-gray-500 dark:text-green-100/60">{item.category}</td>
                <td className="px-5 py-3 text-gray-700 dark:text-green-100/80">{item.stock}</td>
                <td className="px-5 py-3 text-gray-700 dark:text-green-100/80">{item.available}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[item.status]}`}>{statusLabel[item.status]}</span>
                </td>
                <td className="px-5 py-3 text-gray-400 dark:text-green-100/40">{item.updated}</td>
                <td className="px-5 py-3">
                  <button
                    type="button"
                    onClick={() => handleUpdate(index)}
                    className="text-xs font-medium text-green-600 hover:underline dark:text-green-400"
                  >
                    {t.inventory.update}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedItem ? (
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-white">{t.inventory.selectedStockItem}</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-green-100/60">{t.inventory.selectedDescription}</p>
          <div className="mt-4 grid gap-4 text-sm sm:grid-cols-4">
            <div>
              <p className="text-gray-400 dark:text-green-100/50">{t.inventory.product}</p>
              <p className="font-semibold text-gray-900 dark:text-white">{selectedItem.name}</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-green-100/50">{t.inventory.currentStock}</p>
              <p className="font-semibold text-gray-900 dark:text-white">{selectedItem.stock}</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-green-100/50">{t.inventory.available}</p>
              <p className="font-semibold text-gray-900 dark:text-white">{selectedItem.available}</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-green-100/50">{t.inventory.lastUpdated}</p>
              <p className="font-semibold text-gray-900 dark:text-white">{selectedItem.updated}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}