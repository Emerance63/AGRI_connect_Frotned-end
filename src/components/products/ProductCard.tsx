import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import type { Product, BadgeType } from "@/data/products";
import { useLanguage } from "@/lib/LanguageContext";

const badgeColors: Record<BadgeType, string> = {
  Organic: "bg-green-500 text-white",
  Premium: "bg-orange-500 text-white",
  Fresh: "bg-emerald-500 text-white",
  Seasonal: "bg-yellow-400 text-black",
};

export default function ProductCard({ product }: { product: Product }) {
  const { t } = useLanguage();
  // Default values if data is missing
  const rating = product.rating || 4.5;
  const reviewsCount = product.reviewsCount || 100;
  
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-[#111811]">
      {/* Product Image */}
      <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover"
        />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeColors[product.badge]}`}>
            {product.badge}
          </span>
        )}

        {/* Heart Placeholder */}
        <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/80 text-gray-400 shadow-sm backdrop-blur-sm transition-colors hover:text-red-500 dark:bg-black/40">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 pb-5">
        <p className="mb-1 text-xs font-semibold text-green-600 dark:text-green-500">
          {product.cooperative.name}
        </p>

        <h3 className="mb-1 text-base font-bold text-gray-900 dark:text-white">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mb-4 flex items-center gap-1.5">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${star <= Math.round(rating) ? "fill-current" : "text-gray-300 dark:text-gray-600"}`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {rating} ({reviewsCount})
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between">
          <p className="text-xl font-bold text-green-700 dark:text-green-500">
            {product.unitPrice.toLocaleString()}{" "}
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              RWF/{product.unit}
            </span>
          </p>

          <Link
            href={`/products/${product.id}`}
            className="rounded-full bg-green-500 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-green-600"
          >
            {t.productGrid.viewDetails}
          </Link>
        </div>
      </div>
    </div>
  );
}