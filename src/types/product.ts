export interface Product {
  id: string;
  name: string;
  cooperative: string;
  district: string;
  price: number;
  unit: string; // "kg" | "bunch" | "L"
  rating: number;
  reviewCount: number;
  imageUrl: string;
  badge?: "organic" | "premium" | "fresh" | "seasonal";
}
