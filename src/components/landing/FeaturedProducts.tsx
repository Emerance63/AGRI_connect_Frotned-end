import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

export default function FeaturedProducts() {
  // Get the first 8 products for the landing page showcase
  const featured = products.slice(0, 8);

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Fresh from the Farms
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Handpicked quality produce from our trusted cooperatives.
            </p>
          </div>
          
          <Link
            href="/products"
            className="hidden rounded-full border border-green-600 px-6 py-2.5 text-sm font-semibold text-green-600 transition-colors hover:bg-green-600 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white sm:block"
          >
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/products"
            className="rounded-full border border-green-600 px-8 py-3 text-sm font-semibold text-green-600 transition-colors hover:bg-green-600 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
