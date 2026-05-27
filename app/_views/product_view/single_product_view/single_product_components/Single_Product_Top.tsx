"use client";
import App_Double_Btn from "@/components/app_ui/App_Double_Btn";
import App_Slider from "@/components/app_ui/App_Slider";
import App_Text from "@/components/app_ui/App_Text";
import App_Full_Text from "@/components/shared/App_Full_Text";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const Single_Product_Top = () => {
  const images = [
    "/conference_chair-2.png",
    "/home_sofa.png",
    "/conference_chair-2.png",
  ];
  const [active, setActive] = useState(0);
  return (
    <section className="containerclass my-10 gap-x-8 flex justify-between">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-[50%] flex flex-col gap-8"
      >
        {/* <App_Slider
          images={[
            "/conference_chair-2.png",
            "/home_sofa.png",
            "/conference_chair-2.png",
            "/home_sofa.png",
          ]}
          imgContainerStyle="flex-[0_0_100%] bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent h-fit"
          loop={true}
          fade
        /> */}
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="bg-linear-to-br from-primary/20 via-secondary/10 to-transparent flex justify-center items-center rounded-lg py-8"
        >
          <Image
            src={images[active]}
            alt={"Product"}
            className=" object-cover rounded cursor-pointer"
            width={400}
            height={400}
          />
        </motion.div>
        <div className=" flex gap-4 justify-between">
          {images.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex justify-between items-center bg-linear-to-br from-primary/20 via-secondary/10 to-transparent rounded cursor-pointer"
              onClick={() => setActive(index)}
            >
              <Image
                key={item}
                src={item}
                alt={"Product"}
                className=" object-cover rounded cursor-pointer"
                width={400}
                height={400}
              />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-[50%] flex flex-col gap-8 justify-center"
      >
        <App_Full_Text
          className="flex-col-reverse gap-y-10"
          text={{
            className: "gap-y-4",
            header: {
              children: product.name,
              variant: "heading",
              className: "font-semibold max-w-md leading-tight",
            },
            para: {
              children: `$ ${product.price}`,
              className: "text-primary font-bold font-accent lg:text-2xl",
            },
          }}
          extra={
            <App_Text
              children={product.description}
              className="text-base max-w-xl"
            />
          }
        />
        <App_Double_Btn
          className="w-[80%] gap-2"
          btn1={{ text: "Add to Cart", btnStyle: "text-white flex-1 py-5" }}
          btn2={{
            text: "Buy Now",
            btnStyle:
              "text-primary bg-transparent border border-primary flex-1 py-5",
          }}
        />
      </motion.div>
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
