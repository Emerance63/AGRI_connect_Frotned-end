"use client";

import type { ProductItemType } from "@/components/cooperative/ProductsBoard";

interface ProductPreviewProps {
  product: ProductItemType;
}

const statusColor = {
  Healthy:
    "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  Low:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  Out:
    "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

export default function ProductPreview({
  product,
}: ProductPreviewProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Live Preview
          </h2>

          <p className="text-sm text-gray-500 dark:text-green-100/60">
            Preview of the selected product before publishing.
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
            statusColor[product.status]
          }`}
        >
          {product.status}
        </span>

      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <div className="space-y-5">

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-green-100/50">
              Product Name
            </p>

            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
              {product.name}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-green-100/50">
              Category
            </p>

            <p className="mt-1 text-gray-800 dark:text-white">
              {product.tag}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-green-100/50">
              Description
            </p>

            <p className="mt-1 text-gray-700 dark:text-green-100/80">
              {product.description || "No description available."}
            </p>
          </div>

        </div>

        <div className="space-y-5">

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-green-100/50">
              Price
            </p>

            <p className="mt-1 text-lg font-bold text-green-700 dark:text-green-400">
              {product.price}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-green-100/50">
              Available Quantity
            </p>

            <p className="mt-1 text-gray-800 dark:text-white">
              {product.weight}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-green-100/50">
              Publishing Status
            </p>

            <span
              className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                product.published
                  ? "bg-green-600 text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              {product.published ? "Published" : "Draft"}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}