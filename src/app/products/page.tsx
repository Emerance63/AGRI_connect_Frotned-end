"use client";

import { useMemo, useState } from "react";
import { products, categories } from "@/data/products";
import SearchBar from "@/components/products/SearchBar";
import CategoryFilter from "@/components/products/CategoryFilter";
import ProductGrid from "@/components/products/ProductGrid";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "All Categories" ||
        product.category === category;

      const matchesSearch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.cooperative.name.toLowerCase().includes(query) ||
        product.district.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-green-50 px-6 py-12 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-4xl font-extrabold text-gray-900 dark:text-white">
            All Products
          </h1>

          <p className="text-gray-600 dark:text-gray-300">
            Certified produce from cooperatives here in Rwanda  across 30 districts.
          </p>
        </div>
      </section>

      {/* Filters + Products */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <SearchBar value={search} onChange={setSearch} />

          <CategoryFilter
            categories={categories}
            value={category}
            onChange={setCategory}
          />
        </div>

        <ProductGrid products={filteredProducts} />
      </section>
    </main>
  );
}