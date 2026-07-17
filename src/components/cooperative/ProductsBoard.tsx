"use client";

import { useState } from "react";

type ProductItem = {
  name: string;
  tag: string;
  price: string;
  weight: string;
  status: "Healthy" | "Low" | "Out";
  published: boolean;
};

const initialProducts: ProductItem[] = [
  { name: "Premium Beans", tag: "1 kg/pack", price: "RWF 1,990/kg", weight: "850 kg", status: "Healthy", published: true },
  { name: "White Rice", tag: "Grains", price: "RWF 10,830/kg", weight: "420 kg", status: "Healthy", published: true },
  { name: "Sweet Potatoes", tag: "Root Veg", price: "RWF 9,700/kg", weight: "95 kg", status: "Low", published: true },
  { name: "Green Cabbage", tag: "Vegetables", price: "RWF 1,960/kg", weight: "218 kg", status: "Healthy", published: true },
  { name: "Maize Flour", tag: "Grains", price: "RWF 4,150/kg", weight: "18 kg", status: "Low", published: false },
  { name: "Tomatoes", tag: "Vegetables", price: "RWF 4,880/kg", weight: "8 kg", status: "Out", published: true },
];

const statusColor: Record<ProductItem["status"], string> = {
  Healthy: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  Low: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  Out: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

export default function ProductsBoard() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [message, setMessage] = useState("Preview a product or publish one to see its status update here.");

  const selectedProduct = products[selectedIndex];

  function handlePreview(index: number) {
    setSelectedIndex(index);
    setMessage(`Previewing ${products[index].name} with live pricing and stock information.`);
  }

  function handlePublish(index: number) {
    setProducts((current) =>
      current.map((product, productIndex) =>
        productIndex === index
          ? { ...product, published: !product.published }
          : product
      )
    );

    const nextPublished = !products[index].published;
    setSelectedIndex(index);
    setMessage(
      `${products[index].name} is now ${nextPublished ? "published" : "unpublished"} for the cooperative catalog.`
    );
  }

  function handleAddProduct() {
    setSelectedIndex(-1);
    setMessage("Add Product opens a draft workspace for a new product listing.");
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">Manage and publish your agricultural products</p>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Products</h1>
        </div>
        <button
          type="button"
          onClick={handleAddProduct}
          className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700"
        >
          + Add Product
        </button>
      </div>

      <div className="rounded-xl border border-green-100 bg-green-50/80 px-4 py-3 text-sm text-green-900 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-100">
        {message}
      </div>

      {selectedIndex === -1 ? (
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-white">New Product Draft</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-green-100/60">
            This is where a new product form can open. For now, the button clearly switches the page into draft mode.
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <div key={product.name} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{product.name}</p>
                <p className="text-xs text-gray-400 dark:text-green-100/50">{product.tag}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor[product.status]}`}>
                {product.status}
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{product.price}</p>
                <p className="text-xs text-gray-400 dark:text-green-100/50">{product.weight}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => handlePreview(index)}
                className="flex-1 rounded-lg border border-gray-200 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-green-100/70 dark:hover:bg-white/5"
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => handlePublish(index)}
                className={`flex-1 rounded-lg py-1.5 text-xs font-semibold text-white ${product.published ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 hover:bg-gray-500"}`}
              >
                {product.published ? "Published" : "Publish"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct ? (
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Live Preview</h2>
              <p className="text-xs text-gray-500 dark:text-green-100/50">Showing what the Preview button is meant to surface.</p>
            </div>
            <span className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[selectedProduct.status]}`}>{selectedProduct.status}</span>
          </div>
          <div className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <p className="text-gray-400 dark:text-green-100/50">Product</p>
              <p className="font-semibold text-gray-900 dark:text-white">{selectedProduct.name}</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-green-100/50">Price</p>
              <p className="font-semibold text-gray-900 dark:text-white">{selectedProduct.price}</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-green-100/50">Publishing</p>
              <p className="font-semibold text-gray-900 dark:text-white">{selectedProduct.published ? "Published" : "Draft"}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}