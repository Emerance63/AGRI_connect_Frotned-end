export type BadgeType = "Organic" | "Premium" | "Fresh" | "Seasonal";

export type Product = {
  id: string;
  name: string;
  category: string;
imageUrl: string;

  description: string;

  availableQuantity: number;
  unit: string;

  unitPrice: number;

  district: string;

  postedOn: string;

  cooperative: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
};

export const categories = ["All Categories", "Vegetables", "Fruits", "Coffee", "Grains", "Dairy"] as const;

export const products: Product[] = [
  {
    id: "1",
    name: "Irish Potatoes",
    category: "Vegetables",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",

    description:
      "Grade A potatoes, freshly harvested and sorted, ready for bulk pickup.",

    availableQuantity: 500,
    unit: "kg",

    unitPrice: 350,

    district: "Musanze",

    postedOn: "02 Jul 2026",

    cooperative: {
      name: "Musanze Growers Cooperative",
      phone: "+250 788 123 456",
      email: "musanzegrowers@coop.rw",
      address: "Musanze District, Northern Province",
    },
  },
];