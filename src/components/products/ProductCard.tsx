import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      {/* Product Image */}
      <div className="relative h-44 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover"
        />

        {/* Category */}
        <span className="absolute left-3 top-3 rounded-md bg-green-800 px-2 py-1 text-xs font-semibold text-white">
          {product.category}
        </span>

        {/* District */}
        <span className="absolute right-3 top-3 rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-700">
          {product.district}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="mb-1 text-sm font-medium text-green-700 dark:text-green-400">
          {product.cooperative.name}
        </p>

        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
          {product.name}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-green-800 dark:text-green-400">
            {product.unitPrice.toLocaleString()} RWF
            <span className="text-sm font-normal text-gray-500">
              {" / "}
              {product.unit}
            </span>
          </p>

          <Link
            href={`/products/${product.id}`}
            className="rounded-md bg-green-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-900"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}