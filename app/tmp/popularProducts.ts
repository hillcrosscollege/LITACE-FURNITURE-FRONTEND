import { IProduct } from "../_views/home_view/home_types";

export const popularProducts: IProduct[] = [
  {
    id: "popular-001",
    name: "Diamond Back Chair",
    category: "Conference Chairs",
    price: 290,
    originalPrice: 350,
    rating: 4.8,
    reviews: 124,
    image: "/tmp/images/diamond_black_1.jpg",
    badge: "Best Seller",
    description:
      "Stackable conference chair with durable powder-coated steel frame.",
    tags: ["church", "conference", "events"],
  },

  {
    id: "popular-002",
    name: "Full Back Conference Chair",
    category: "Conference Chairs",
    price: 559,
    originalPrice: 599,
    rating: 4.9,
    reviews: 98,
    image: "/tmp/images/Full_Back_Conference_Chair_blue_1.jpg",
    badge: "Premium",
    description:
      "Heavy-duty full back chair designed for churches, hotels and boardrooms.",
    tags: ["hotel", "church", "premium"],
  },

  {
    id: "popular-003",
    name: "Marval Chair",
    category: "Conference Chairs",
    price: 699,
    rating: 4.7,
    reviews: 77,
    image: "/tmp/images/Marval_Chair_blue_1.png",
    badge: "Comfort",
    description:
      "Highly comfortable wide stacker chair with reinforced steel frame.",
    tags: ["events", "conference", "comfort"],
  },

  {
    id: "popular-004",
    name: "Single Combination Desk",
    category: "School Furniture",
    price: 1090,
    rating: 4.8,
    reviews: 65,
    image: "/tmp/images/single_combination_primary.jpg",
    badge: "Popular",
    description:
      "Compact all-in-one student desk ideal for classrooms and training centers.",
    tags: ["school", "desk", "education"],
  },

  {
    id: "popular-005",
    name: "Rectangular Melamine Desk",
    category: "School Furniture",
    price: 850,
    originalPrice: 999,
    rating: 4.6,
    reviews: 53,
    image: "/tmp/images/Rectangular_Melamine_Desk_1.jpg",
    badge: "Durable",
    description:
      "Modern melamine desk with stackable steel frame for schools and offices.",
    tags: ["desk", "training-room", "school"],
  },

  {
    id: "popular-006",
    name: "Colour Polyprop Chair",
    category: "School Furniture",
    price: 220,
    rating: 4.7,
    reviews: 88,
    image: "/tmp/images/Colour_Polyprop_Chair.jpg",
    badge: "Trending",
    description:
      "Colorful polypropylene classroom chair available in multiple sizes.",
    tags: ["school", "chair", "stackable"],
  },

  {
    id: "popular-007",
    name: "Single Combination Desk",
    category: "School Furniture",
    price: 1150,
    rating: 4.8,
    reviews: 65,
    image: "/tmp/images/single_combination_primary.jpg",
    badge: "Popular",
    description:
      "Compact all-in-one student desk ideal for classrooms and training centers.",
    tags: ["school", "desk", "education"],
  },

  {
    id: "popular-008",
    name: "Diamond Back Chair",
    category: "Conference Chairs",
    price: 290,
    originalPrice: 350,
    rating: 4.8,
    reviews: 124,
    image: "/tmp/images/diamond_black_2.jpg",
    badge: "Best Seller",
    description:
      "Stackable conference chair with durable powder-coated steel frame.",
    tags: ["church", "conference", "events"],
  },
];

export const newArrivals: IProduct[] = [
  {
    id: "new-001",
    name: "Luxury Diamond Chair",
    description:
      "Modern conference chair with premium cushioning and reinforced steel frame.",
    category: "conference-chairs",
    subCategory: "diamond-back",
    price: 399,
    originalPrice: 450,
    currency: "ZAR",
    image: "/tmp/images/Full_Back_Conference_Chair_blue_1.jpg",
    badge: "New Arrival",
    featured: true,
    inStock: true,
    rating: 4.9,
    tag: "NEW",
    reviews: 18,
    colors: ["black", "navy", "burgundy"],
    tags: ["church", "conference", "premium"],
    specs: {
      material: "Fabric + Steel",
      weightCapacity: "180kg",
      stackable: true,
    },
  },

  {
    id: "new-002",
    name: "Ergo Executive Office Chair",
    description:
      "Ergonomic office chair with adjustable headrest and lumbar support.",
    category: "office-furniture",
    subCategory: "office-chairs",
    price: 3299,
    originalPrice: 3599,
    currency: "ZAR",
    image: "/tmp/images/Rectangular_Melamine_Desk_1.jpg",
    badge: "Hot",
    featured: true,
    inStock: true,
    rating: 5,

    tag: "NEW",
    reviews: 24,
    colors: ["black", "grey"],
    tags: ["office", "executive", "ergonomic"],
    specs: {
      material: "Mesh + Leather",
      adjustable: true,
      swivel: true,
    },
  },

  {
    id: "new-003",
    name: "Premium Wooden Podium",
    description:
      "Elegant wooden podium ideal for churches, conferences and events.",
    category: "pulpits",
    price: 4200,
    currency: "ZAR",
    image: "/tmp/images/single_combination_primary.jpg",
    badge: "New",
    inStock: true,
    rating: 4.8,
    tag: "NEW",
    reviews: 7,
    tags: ["church", "podium", "conference"],
    specs: {
      material: "Wood",
    },
  },

  {
    id: "new-004",
    name: "Foldable Banquet Table",
    description:
      "Portable folding table for weddings, conferences and outdoor events.",
    category: "decor",
    subCategory: "event-furniture",
    price: 1450,
    currency: "ZAR",
    image: "/tmp/images/Marval_Chair_blue_1.png",
    badge: "Event Favorite",
    inStock: true,
    rating: 4.6,
    tag: "NEW",
    reviews: 15,
    tags: ["events", "portable", "table"],
    specs: {
      material: "Plastic + Steel",
      foldable: true,
    },
  },
];

const images = [
  "/tmp/images/diamond_black_1.jpg",
  "/tmp/images/Full_Back_Conference_Chair_blue_1.jpg",
  "/tmp/images/Marval_Chair_blue_1.png",
  "/tmp/images/single_combination_primary.jpg",
  "/tmp/images/Rectangular_Melamine_Desk_1.jpg",
  "/tmp/images/Colour_Polyprop_Chair.jpg",
  "/tmp/images/single_combination_primary.jpg",
  "/tmp/images/diamond_black_2.jpg",
];

// export const categories = [
//   "conference-chairs",
//   "school-furniture",
//   "office-furniture",
//   "decor-events",
// ];

export const categories = [
  {
    name: "Conference Chairs",
    image: "/tmp/images/conference_chair.jpg",
  },
  {
    name: "School Furniture",
    image: "/tmp/images/conference_chair.jpg",
  },
  {
    name: "Office Furniture",
    image: "/tmp/images/conference_chair.jpg",
  },
  {
    name: "Decor Events",
    image: "/tmp/images/conference_chair.jpg",
  },
];

const subCategories = [
  "diamond-back",
  "full-back",
  "student-desks",
  "office-chairs",
  "event-furniture",
];

const names = [
  "Diamond Back Chair",
  "Full Back Conference Chair",
  "Marval Chair",
  "Single Combination Desk",
  "Rectangular Melamine Desk",
  "Colour Polyprop Chair",
  "Executive Office Chair",
  "Foldable Banquet Table",
  "Visitor Chair",
  "Training Desk",
];

const descriptions = [
  "Premium furniture product designed for comfort and durability.",
  "Modern and elegant furniture suitable for schools and offices.",
  "Heavy-duty stackable chair perfect for events and conferences.",
  "High-quality craftsmanship with durable steel construction.",
  "Stylish and functional furniture for contemporary spaces.",
];

export const productsData: IProduct[] = Array.from({ length: 70 }, (_, i) => {
  const id = i + 1;

  return {
    id: `prod-${id}`,

    name: `${names[i % names.length]} ${id}`,

    description: descriptions[i % descriptions.length],

    category: categories[i % categories.length].name,

    subCategory: subCategories[i % subCategories.length],

    // Stable values
    price: 200 + id * 15,

    originalPrice: id % 3 === 0 ? 300 + id * 20 : undefined,

    currency: "ZAR",

    image: images[i % images.length],

    images: [images[i % images.length], images[(i + 1) % images.length]],

    tag: id % 7 === 0 ? "NEW" : undefined,

    inStock: true,

    featured: id % 5 === 0,

    badge: id % 6 === 0 ? "Best Seller" : undefined,

    rating: Number((4 + (id % 10) * 0.1).toFixed(1)),

    reviews: 10 + id * 3,

    colors: ["Black", "Blue", "Red"],

    tags: ["furniture", "litace"],

    specs: {
      material: "Steel + Fabric",
      frame: "Powder Coated Steel",
      weightCapacity: "200kg",
      stackable: id % 2 === 0,
      adjustable: id % 4 === 0,
      swivel: id % 5 === 0,
      foldable: id % 6 === 0,
    },

    variants: [
      {
        label: "Standard",
        price: 200 + id * 15,
      },
      {
        label: "Premium",
        price: 400 + id * 20,
      },
    ],

    createdAt: "2026-01-01T00:00:00.000Z",

    updatedAt: "2026-01-01T00:00:00.000Z",
  };
});
