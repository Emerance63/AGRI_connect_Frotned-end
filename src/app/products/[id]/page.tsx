import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetail from "@/components/products/ProductDetail";
import Link from "next/link";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}