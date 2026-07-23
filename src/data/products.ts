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
  badge?: BadgeType;
  rating?: number;
  reviewsCount?: number;
};

export const categories = ["All Categories", "Vegetables", "Fruits", "Coffee", "Grains", "Dairy"] as const;

export const products: Product[] = [
  {
    id: "1",
    name: "Sweet Potatoes",
    category: "Vegetables",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    description: "Freshly harvested organic sweet potatoes.",
    availableQuantity: 500,
    unit: "kg",
    unitPrice: 850,
    district: "Musanze",
    postedOn: "02 Jul 2026",
    badge: "Organic",
    rating: 4.8,
    reviewsCount: 142,
    cooperative: {
      name: "Musanze Coop",
      phone: "+250 788 123 456",
      email: "musanzecoop@coop.rw",
      address: "Musanze District",
    },
  },
  {
    id: "2",
    name: "Arabica Coffee Beans",
    category: "Coffee",
    imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7",
    description: "Premium Arabica coffee beans directly from Nyamasheke.",
    availableQuantity: 200,
    unit: "kg",
    unitPrice: 4200,
    district: "Nyamasheke",
    postedOn: "03 Jul 2026",
    badge: "Premium",
    rating: 4.9,
    reviewsCount: 387,
    cooperative: {
      name: "Nyamasheke Coffee Coop",
      phone: "+250 788 987 654",
      email: "nyamasheke@coop.rw",
      address: "Nyamasheke District",
    },
  },
  {
    id: "3",
    name: "Fresh Tomatoes",
    category: "Vegetables",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
    description: "Ripe, juicy red tomatoes.",
    availableQuantity: 300,
    unit: "kg",
    unitPrice: 600,
    district: "Rwamagana",
    postedOn: "04 Jul 2026",
    badge: "Fresh",
    rating: 4.6,
    reviewsCount: 98,
    cooperative: {
      name: "Rwamagana Farm Coop",
      phone: "+250 788 111 222",
      email: "rwamagana@coop.rw",
      address: "Rwamagana District",
    },
  },
  {
    id: "4",
    name: "Banana Bunches",
    category: "Fruits",
    imageUrl: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    description: "Fresh banana bunches ready for market.",
    availableQuantity: 150,
    unit: "bunch",
    unitPrice: 1200,
    district: "Kayonza",
    postedOn: "05 Jul 2026",
    badge: "Seasonal",
    rating: 4.7,
    reviewsCount: 211,
    cooperative: {
      name: "Kayonza Farmers Coop",
      phone: "+250 788 333 444",
      email: "kayonza@coop.rw",
      address: "Kayonza District",
    },
  },
  {
    id: "5",
    name: "Irish Potatoes",
    category: "Vegetables",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    description: "Grade A potatoes, freshly harvested and sorted.",
    availableQuantity: 500,
    unit: "kg",
    unitPrice: 480,
    district: "Rubavu",
    postedOn: "06 Jul 2026",
    badge: "Organic",
    rating: 4.5,
    reviewsCount: 176,
    cooperative: {
      name: "Rubavu Highland Coop",
      phone: "+250 788 123 456",
      email: "rubavu@coop.rw",
      address: "Rubavu District",
    },
  },
  {
    id: "6",
    name: "Green Beans",
    category: "Vegetables",
    imageUrl: "https://images.unsplash.com/photo-1533228876352-a56fdddb5829",
    description: "Crispy and fresh green beans.",
    availableQuantity: 250,
    unit: "kg",
    unitPrice: 720,
    district: "Huye",
    postedOn: "07 Jul 2026",
    badge: "Fresh",
    rating: 4.4,
    reviewsCount: 63,
    cooperative: {
      name: "Huye Valley Coop",
      phone: "+250 788 444 555",
      email: "huye@coop.rw",
      address: "Huye District",
    },
  },
  {
    id: "7",
    name: "Sorghum",
    category: "Grains",
    imageUrl: "https://images.unsplash.com/photo-1596046162383-75b2ddce561c",
    description: "High quality dried sorghum.",
    availableQuantity: 1000,
    unit: "kg",
    unitPrice: 550,
    district: "Kirehe",
    postedOn: "08 Jul 2026",
    badge: "Fresh",
    rating: 4.6,
    reviewsCount: 89,
    cooperative: {
      name: "Kirehe Grain Coop",
      phone: "+250 788 555 666",
      email: "kirehe@coop.rw",
      address: "Kirehe District",
    },
  },
  {
    id: "8",
    name: "Fresh Milk",
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
    description: "Pure and fresh cow milk.",
    availableQuantity: 200,
    unit: "L",
    unitPrice: 650,
    district: "Nyagatare",
    postedOn: "09 Jul 2026",
    badge: "Premium",
    rating: 4.9,
    reviewsCount: 304,
    cooperative: {
      name: "Nyagatare Dairy Coop",
      phone: "+250 788 777 888",
      email: "nyagatare@coop.rw",
      address: "Nyagatare District",
    },
  },
  {
    id: "9",
    name: "Mangoes",
    category: "Fruits",
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fd81ce",
    description: "Sweet and juicy seasonal mangoes.",
    availableQuantity: 150,
    unit: "kg",
    unitPrice: 1500,
    district: "Bugesera",
    postedOn: "10 Jul 2026",
    badge: "Seasonal",
    rating: 4.8,
    reviewsCount: 112,
    cooperative: {
      name: "Bugesera Fruit Coop",
      phone: "+250 788 999 000",
      email: "bugesera@coop.rw",
      address: "Bugesera District",
    },
  }
];