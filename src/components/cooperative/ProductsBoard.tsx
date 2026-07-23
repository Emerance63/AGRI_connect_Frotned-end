"use client";

import { useState } from "react";
import { useCooperativeData, type ProductItemType } from "@/lib/cooperative-data";
import AddProductModal from "@/components/products/AddProductModal";
import ProductItem from "@/components/products/ProductItem";
import ProductPreview from "@/components/products/ProductPreview";

export default function ProductsBoard() {
  const { products, addProduct, toggleProductPublish } = useCooperativeData();

  const [selectedProduct, setSelectedProduct] =
    useState<ProductItemType | null>(products[0] ?? null);

  const [openModal, setOpenModal] = useState(false);

  const [message, setMessage] = useState(
    "Preview a product or publish one to see its status update here."
  );

  function handlePreview(product: ProductItemType) {
    setSelectedProduct(product);
    setMessage(`Previewing ${product.name}`);
  }

  function handlePublish(id: number) {
    const current = products.find((item) => item.id === id);
    toggleProductPublish(id);

    if (current) {
      const next = { ...current, published: !current.published };
      setSelectedProduct(next);
      setMessage(
        `${current.name} is now ${
          next.published ? "Published" : "Draft"
        }.`
      );
    }
  }

  function handleAddProduct(product: ProductItemType) {
    addProduct(product);
    setSelectedProduct(product);
    setMessage(`${product.name} added successfully.`);
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">
            Manage and publish your agricultural products
          </p>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Products
          </h1>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
        >
          + Add Product
        </button>

      </div>

      <div className="rounded-xl border border-green-100 bg-green-50/80 px-4 py-3 text-sm text-green-900 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-100">
        {message}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {products.map((product) => (

          <ProductItem
            key={product.id}
            product={product}
            onPreview={() => handlePreview(product)}
            onPublish={() => handlePublish(product.id)}
          />

        ))}

      </div>

      {selectedProduct && <ProductPreview product={selectedProduct} />}

      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={(product) => {
          handleAddProduct(product);
          setOpenModal(false);
        }}
      />

    </div>
  );
}