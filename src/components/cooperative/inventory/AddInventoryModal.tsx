"use client";

import { useEffect, useState } from "react";
import type { InventoryItem } from "./UpdateStockModal";

type Props = { open: boolean; onClose: () => void; onSave: (item: InventoryItem) => boolean };

export default function AddInventoryModal({ open, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Grains");
  const [stock, setStock] = useState("");
  const [available, setAvailable] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) { setName(""); setCategory("Grains"); setStock(""); setAvailable(""); setError(""); }
  }, [open]);

  if (!open) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const total = Number(stock);
    const remaining = Number(available);
    if (!name.trim() || !stock.trim() || !available.trim()) return setError("Enter a product name, total stock, and available stock.");
    if (!Number.isFinite(total) || !Number.isFinite(remaining) || total < 0 || remaining < 0) return setError("Stock values must be valid positive numbers.");
    if (remaining > total) return setError("Available stock cannot exceed total stock.");
    if (onSave({ name: name.trim(), category, stock: `${total} kg`, available: `${remaining} kg`, status: remaining === 0 ? "Out" : remaining <= 100 ? "Low" : "Healthy", updated: "Just now" })) onClose();
  }

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="add-inventory-title"><form onSubmit={handleSubmit} className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-[#112d1a]"><div className="flex items-center justify-between"><h2 id="add-inventory-title" className="text-xl font-bold text-gray-900 dark:text-white">Add inventory product</h2><button type="button" onClick={onClose} aria-label="Close add inventory dialog" className="text-2xl text-gray-400 hover:text-red-500">×</button></div><div className="mt-6 space-y-4"><label className="block text-sm font-medium">Product name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-white/10 dark:bg-[#1b3a26]" /></label><label className="block text-sm font-medium">Category<select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-white/10 dark:bg-[#1b3a26]"><option>Grains</option><option>Vegetables</option><option>Legumes</option><option>Root Veg</option></select></label><div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium">Total stock (kg)<input required min="0" step="any" type="number" value={stock} onChange={(event) => setStock(event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-white/10 dark:bg-[#1b3a26]" /></label><label className="block text-sm font-medium">Available stock (kg)<input required min="0" step="any" type="number" value={available} onChange={(event) => setAvailable(event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-white/10 dark:bg-[#1b3a26]" /></label></div>{error && <p role="alert" className="rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">{error}</p>}</div><div className="mt-8 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-5 py-2 font-medium">Cancel</button><button type="submit" className="rounded-lg bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700">Add product</button></div></form></div>;
}
