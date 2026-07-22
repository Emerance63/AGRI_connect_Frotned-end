"use client";

import { useState } from "react";
import AddProductModal from "@/components/products/AddProductModal";
import ProductItem from "@/components/products/ProductItem";
import ProductPreview from "@/components/products/ProductPreview";

export type ProductItemType = {
  id: number;
  name: string;
  tag: string;
  price: string;
  weight: string;
  description: string;
  status: "Healthy" | "Low" | "Out";
  published: boolean;
};

const initialProducts: ProductItemType[] = [
  {
    id: 1,
    name: "Premium Beans",
    tag: "1 kg/pack",
    price: "RWF 1,990/kg",
    weight: "850 kg",
    description: "Fresh premium beans harvested this season.",
    status: "Healthy",
    published: true,
  },
  {
    id: 2,
    name: "White Rice",
    tag: "Grains",
    price: "RWF 10,830/kg",
    weight: "420 kg",
    description: "High quality white rice.",
    status: "Healthy",
    published: true,
  },
  {
    id: 3,
    name: "Sweet Potatoes",
    tag: "Root Veg",
    price: "RWF 9,700/kg",
    weight: "95 kg",
    description: "Fresh sweet potatoes.",
    status: "Low",
    published: true,
  },
  {
    id: 4,
    name: "Green Cabbage",
    tag: "Vegetables",
    price: "RWF 1,960/kg",
    weight: "218 kg",
    description: "Organic green cabbage.",
    status: "Healthy",
    published: true,
  },
  {
    id: 5,
    name: "Maize Flour",
    tag: "Grains",
    price: "RWF 4,150/kg",
    weight: "18 kg",
    description: "Fine maize flour.",
    status: "Low",
    published: false,
  },
  {
    id: 6,
    name: "Tomatoes",
    tag: "Vegetables",
    price: "RWF 4,880/kg",
    weight: "8 kg",
    description: "Fresh tomatoes.",
    status: "Out",
    published: true,
  },
];

export default function ProductsBoard() {
  const [products, setProducts] = useState<ProductItemType[]>(initialProducts);

  const [selectedProduct, setSelectedProduct] =
    useState<ProductItemType | null>(initialProducts[0]);

  const [openModal, setOpenModal] = useState(false);

  const [message, setMessage] = useState(
    "Preview a product or publish one to see its status update here."
  );

  function handlePreview(product: ProductItemType) {
    setSelectedProduct(product);
    setMessage(`Previewing ${product.name}`);
  }

  function handlePublish(id: number) {
    const updated = products.map((product) =>
      product.id === id
        ? { ...product, published: !product.published }
        : product
    );

    setProducts(updated);

    const current = updated.find((item) => item.id === id);

    if (current) {
      setSelectedProduct(current);
      setMessage(
        `${current.name} is now ${
          current.published ? "Published" : "Draft"
        }.`
      );
    }
  }

  function handleAddProduct(product: ProductItemType) {
    setProducts((prev) => [...prev, product]);
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