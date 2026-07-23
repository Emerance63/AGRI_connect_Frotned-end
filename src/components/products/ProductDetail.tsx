"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/data/products";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProductDetail({
  product,
}: {
  product: Product;
}) {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-green-50 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-10">

        {/* Back to Products */}
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
        >
          <ArrowLeft size={18} />
          {t.productDetail.backToProducts}
        </Link>

        {/* Product Details */}
        <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900 lg:grid-cols-2">

          {/* Image */}
          <div className="relative h-[500px] overflow-hidden rounded-xl">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side */}
          <div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900 dark:text-green-300">
              {(t.categories as Record<string, string>)?.[product.category] || product.category}
            </span>

            <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {product.description}
            </p>

            <div className="mt-8 divide-y divide-gray-200 rounded-lg border dark:divide-gray-700 dark:border-gray-700">

              <div className="flex justify-between p-4">
                <span className="text-gray-500">{t.productDetail.availableQuantity}</span>
                <span className="font-semibold dark:text-white">
                  {product.availableQuantity} {product.unit}
                </span>
              </div>

              <div className="flex justify-between p-4">
                <span className="text-gray-500">{t.productDetail.unitPrice}</span>
                <span className="font-semibold dark:text-white">
                  {product.unitPrice.toLocaleString()} RWF/{product.unit}
                </span>
              </div>

              <div className="flex justify-between p-4">
                <span className="text-gray-500">{t.productDetail.district}</span>
                <span className="font-semibold dark:text-white">
                  {product.district}
                </span>
              </div>

              <div className="flex justify-between p-4">
                <span className="text-gray-500">{t.productDetail.postedOn}</span>
                <span className="font-semibold dark:text-white">
                  {product.postedOn}
                </span>
              </div>

            </div>

            <div className="mt-8 rounded-xl bg-green-900 p-6 text-white">

              <h2 className="text-2xl font-bold">
                {product.cooperative.name}
              </h2>

              <div className="mt-5 space-y-3 text-green-100">
                <p>{product.cooperative.phone}</p>
                <p>{product.cooperative.email}</p>
                <p>{product.cooperative.address}</p>
              </div>

              <button className="mt-8 w-full rounded-lg bg-orange-400 py-3 font-semibold text-gray-900 hover:bg-orange-500">
                {t.productDetail.contactCooperative}
              </button>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

