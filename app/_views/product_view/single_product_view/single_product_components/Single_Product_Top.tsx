import App_Paragraph from "@/components/app_ui/App_Paragraph";
import App_Slider from "@/components/app_ui/App_Slider";
import App_Text from "@/components/app_ui/App_Text";
import App_Full_Text from "@/components/shared/App_Full_Text";
import Image from "next/image";

const Single_Product_Top = () => {
  return (
    <section className="bg-white p-6 rounded-xl containerclass my-10 gap-x-8 flex justify-between">
      <div className="w-[40%]">
        <Image
          src="/conference_chair-2.png"
          alt="product"
          width={100}
          height={100}
          className="w-full h-full block"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <App_Full_Text
          className="flex-col gap-y-0"
          text={{
            className: "gap-y-0",
            header: {
              children: product.name,
              variant: "cardTitle",
              className: "font-semibold",
            },
            para: {
              children: `$ ${product.price}`,
            },
          }}
          extra={<div></div>}
        />
        <App_Text children={product.description} className="text-base" />
        <App_Slider
          images={[
            "/conference_chair-2.png",
            "/conference_chair-2.png",
            "/conference_chair-2.png",
            "/conference_chair-2.png",
            "/conference_chair-2.png",
          ]}
          btn={true}
        />
      </div>
    </section>
  );
};

export default Single_Product_Top;

const product = {
  id: "prod_001",

  name: "Ergonomic Luxe Office Chair",

  description:
    "A premium ergonomic office chair designed for long hours of comfort. Features breathable mesh, adjustable lumbar support, and a sleek modern design perfect for home or office use.",

  price: 185000, // in kobo if using Paystack OR just ₦185,000
  currency: "NGN",

  discountPrice: 150000,

  inStock: true,
  stockCount: 23,

  sku: "LIT-CHAIR-001",

  category: {
    id: "cat_furniture",
    name: "Furniture",
  },

  brand: "Litace",

  rating: 4.6,
  reviewCount: 128,

  reviews: [
    {
      id: "rev1",
      user: "John D.",
      rating: 5,
      comment: "Super comfortable, worth every naira!",
      date: "2026-04-12",
    },
    {
      id: "rev2",
      user: "Ada K.",
      rating: 4,
      comment: "Great chair but delivery took a bit long.",
      date: "2026-04-10",
    },
  ],

  images: [
    "/products/chair-1.jpg",
    "/products/chair-2.jpg",
    "/products/chair-3.jpg",
    "/products/chair-4.jpg",
  ],

  sizes: ["Standard", "Large"],

  colors: ["Black", "Gray", "White"],

  tags: ["office", "ergonomic", "chair", "furniture"],

  features: [
    "Adjustable lumbar support",
    "Breathable mesh back",
    "360° swivel",
    "Height adjustable",
    "Durable metal base",
  ],

  specifications: {
    material: "Mesh + Steel Frame",
    weightCapacity: "120kg",
    dimensions: "120 x 60 x 60 cm",
    warranty: "1 Year",
  },

  shipping: {
    freeShipping: true,
    estimatedDelivery: "3-5 business days",
  },

  createdAt: "2026-04-01",
};
