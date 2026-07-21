"use client";

import { useState, useEffect } from "react";
import type { ProductItemType } from "@/components/cooperative/ProductsBoard";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: ProductItemType) => void;
}

export default function AddProductModal({
  open,
  onClose,
  onSave,
}: AddProductModalProps) {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Healthy" | "Low" | "Out">("Healthy");

  useEffect(() => {
    if (!open) {
      setName("");
      setTag("");
      setPrice("");
      setWeight("");
      setDescription("");
      setStatus("Healthy");
    }
  }, [open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !name.trim() ||
      !tag.trim() ||
      !price.trim() ||
      !weight.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    onSave({
      id: Date.now(),
      name,
      tag,
      price,
      weight,
      description,
      status,
      published: false,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl dark:bg-[#112d1a]">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Add Product
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Product Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-600"
                placeholder="Premium Beans"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-600"
                placeholder="Vegetables"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Price
              </label>

              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-600"
                placeholder="RWF 5000/kg"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Quantity
              </label>

              <input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-600"
                placeholder="250 kg"
              />
            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "Healthy" | "Low" | "Out"
                )
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-600"
            >
              <option>Healthy</option>
              <option>Low</option>
              <option>Out</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-600"
              placeholder="Write a short description..."
            />

          </div>

          <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-5 py-2 font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700"
            >
              Save Product
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}