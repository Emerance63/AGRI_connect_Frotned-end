/**
 * Reads cooperative products from localStorage and returns only the published
 * ones converted into the public `Product` shape that ProductCard expects.
 */

import type { Product } from "@/data/products";
import type { ProductItemType } from "@/lib/cooperative-data";

const STORAGE_KEY = "agriconnect.cooperativeData";

/** Parse "RWF 5,000/kg" → { unitPrice: 5000, unit: "kg" } */
function parsePrice(priceStr: string): { unitPrice: number; unit: string } {
  const match = priceStr.replace(/,/g, "").match(/[\d.]+/g);
  const unitMatch = priceStr.match(/\/(\S+)$/);
  return {
    unitPrice: match ? Number(match[0]) : 0,
    unit: unitMatch ? unitMatch[1] : "kg",
  };
}

/** Parse "850 kg" → 850 */
function parseWeight(weightStr: string): number {
  const match = weightStr.replace(/,/g, "").match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

/** Map tag/category to a known public category */
function normaliseCategory(tag: string): string {
  const lower = tag.toLowerCase();
  if (lower.includes("vegetable") || lower.includes("veggie")) return "Vegetables";
  if (lower.includes("fruit")) return "Fruits";
  if (lower.includes("coffee") || lower.includes("kafe")) return "Coffee";
  if (lower.includes("grain") || lower.includes("rice") || lower.includes("maize") || lower.includes("flour") || lower.includes("sorghum")) return "Grains";
  if (lower.includes("dairy") || lower.includes("milk")) return "Dairy";
  return "Vegetables";
}

export function getPublishedCooperativeProducts(): Product[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const data = JSON.parse(raw) as { products?: ProductItemType[] };
    const items: ProductItemType[] = data.products ?? [];

    return items
      .filter((p) => p.published)
      .map((p): Product => {
        const { unitPrice, unit } = parsePrice(p.price);
        const availableQuantity = parseWeight(p.weight);

        return {
          id: `coop-${p.id}`,
          name: p.name,
          category: normaliseCategory(p.tag),
          imageUrl: p.imageUrl ?? "/images/products/famers.jpeg",
          description: p.description || `${p.name} — available from cooperative.`,
          availableQuantity,
          unit,
          unitPrice,
          district: "Rwanda",
          postedOn: new Date().toLocaleDateString("en-GB", {
            day: "2-digit", month: "short", year: "numeric",
          }),
          cooperative: {
            name: "Green Valley Cooperative",
            phone: "+250 788 000 000",
            email: "info@coop.rw",
            address: "Rwanda",
          },
        };
      });
  } catch {
    return [];
  }
}
