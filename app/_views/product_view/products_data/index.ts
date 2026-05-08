export const categories = [
  { id: 1, name: "Electronics", slug: "electronics" },
  { id: 2, name: "Office", slug: "office" },
  { id: 3, name: "Gaming", slug: "gaming" },
  { id: 4, name: "Home & Living", slug: "home-living" },
  { id: 5, name: "Accessories", slug: "accessories" },
];

const names = [
  "Ergonomic Chair",
  "Wireless Headphones",
  "Smart Watch",
  "Gaming Mouse",
  "Mechanical Keyboard",
  "4K Monitor",
  "Bluetooth Speaker",
  "Laptop Stand",
  "USB-C Hub",
  "Office Desk",
];

const descriptions = [
  "High-quality and durable product designed for everyday use.",
  "Built with premium materials for long-lasting performance.",
  "Perfect blend of style, comfort, and functionality.",
  "Engineered for efficiency and modern lifestyle needs.",
  "A must-have accessory for productivity and gaming.",
];

export const productsData = Array.from({ length: 70 }).map((_, i) => {
  const id = i + 1;

  const category = categories[i % categories.length]; // rotate categories
  const name = names[i % names.length];

  return {
    id,
    name: `${name} ${id}`,
    description: descriptions[i % descriptions.length],
    price: Math.floor(Math.random() * 900) + 50,
    image: `https://picsum.photos/300/300?random=${id}`,

    category: {
      id: category.id,
      name: category.name,
      slug: category.slug,
    },

    isNew: id % 7 === 0, // every 7th product is new arrival

    reviews:
      id % 4 === 0
        ? [
            {
              user: "John",
              rating: 4,
              comment: "Very good product!",
            },
            {
              user: "Sarah",
              rating: 5,
              comment: "Exceeded expectations!",
            },
          ]
        : [],
  };
});
