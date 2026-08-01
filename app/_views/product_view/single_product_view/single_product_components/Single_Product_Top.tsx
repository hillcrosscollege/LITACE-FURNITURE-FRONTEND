"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Heart, ChevronDown, ChevronUp } from "lucide-react";
import App_Text from "@/components/app_ui/App_Text";
import App_Button from "@/components/app_ui/App_Button";
import { useGlobal } from "@/app/contexts/Global_Context";

const product = {
  name: "Theodore Accent Chair",
  regularPrice: 995,
  memberPrice: 846,
  memberSaving: 209,
  description:
    "Taking cues from mid-century designs at Soho House 40 Greek Street, our Theodore chair remains a House favourite. Handcrafted with a tapered, solid birch frame allows for a comfortable deep sit with down and feather-wrapped cushions, while brass detail arms add a vintage touch.",
  dimensions: {
    "Product dimensions": 'H84.5 x W64 x D75cm / H33.3 x W25.2 x D29.5"',
    "Product weight": "15.6kg / 34.4lbs",
    "Packaged or boxed weight": "23.6kg / 52lbs",
  },
};

const images = [
  "/tmp/images/diamond_black_1.jpg",
  "/tmp/images/Full_Back_Conference_Chair_blue_1.jpg",
];

type AccordionKey = "dimensions" | "fabric" | "delivery";

const Single_Product_Top = () => {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWish] = useState(false);
  const [open, setOpen] = useState<AccordionKey | null>("dimensions");

  const toggle = (key: AccordionKey) =>
    setOpen((prev) => (prev === key ? null : key));

  return (
    <section className="containerclass my-10">
      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-start">
        {/* ── Left: gallery ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full lg:w-1/2 flex flex-col gap-4"
        >
          {/* Main image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-linear-to-br from-primary/15 via-secondary/10 to-transparent rounded-2xl overflow-hidden flex items-center justify-center py-8 px-6 aspect-square"
            >
              <Image
                src={images[active]}
                alt="Product"
                width={460}
                height={460}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </AnimatePresence>

          {/* Thumbnails */}
          <div className="grid grid-cols-2 gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-xl overflow-hidden border-2 transition-all bg-linear-to-br from-primary/10 to-transparent p-2 ${
                  active === i
                    ? "border-primary shadow-md"
                    : "border-transparent hover:border-primary/30"
                }`}
              >
                <Image
                  src={img}
                  alt={`View ${i + 1}`}
                  width={160}
                  height={160}
                  className="object-cover w-full aspect-square"
                />
              </button>
            ))}
          </div>

          {/* CTA — only visible on mobile, sits right below gallery */}
          <div className="lg:hidden">
            <CTABlock wishlisted qty={qty} setQty={setQty} setWish={setWish} />
          </div>
        </motion.div>

        {/* ── Right: details ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col gap-6"
        >
          <div className="pb-4 border-b border-muted">
            <App_Text variant="body" className="leading-tight max-w-md">
              OFFICE COLLECTION
            </App_Text>
          </div>

          <App_Text variant="heading" className="leading-tight max-w-md">
            {product.name}
          </App_Text>

          <App_Text
            variant="heading"
            className="leading-tight max-w-md text-primary font-accent font-semibold text-base lg:text-lg"
          >
            R {product.regularPrice}
          </App_Text>

          {/* CTA — only visible on desktop, inside right column */}
          <div className="hidden lg:block">
            <CTABlock
              wishlisted={wishlisted}
              qty={qty}
              setQty={setQty}
              setWish={setWish}
            />
          </div>

          {/* Description */}
          <div className="my-2">
            <App_Text
              variant="subheading"
              className="text-xs tracking-widest font-semibold pb-4"
            >
              DESCRIPTION
            </App_Text>
            <App_Text variant="body">{product.description}</App_Text>
          </div>

          {/* Accordions */}
          <div className="bg-white border border-[#ede8e2] rounded-2xl p-5 shadow-sm flex flex-col gap-0 divide-y divide-gray-100">
            <AccordionRow
              label="DIMENSIONS"
              isOpen={open === "dimensions"}
              onToggle={() => toggle("dimensions")}
            >
              <div className="flex flex-col gap-2">
                {Object.entries(product.dimensions).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between">
                    <App_Text
                      variant="sectionLabel"
                      className="text-muted-foreground"
                    >
                      {key}
                    </App_Text>
                    <App_Text
                      variant="sectionLabel"
                      className="font-semibold text-right"
                    >
                      {val}
                    </App_Text>
                  </div>
                ))}
              </div>
            </AccordionRow>

            <AccordionRow
              label="FABRIC DETAILS"
              isOpen={open === "fabric"}
              onToggle={() => toggle("fabric")}
            >
              <App_Text
                variant="body"
                className="text-sm text-muted-foreground"
              >
                Premium feather-wrapped cushions with a velvet upholstery
                finish. Available in sage green, charcoal, and warm ivory.
              </App_Text>
            </AccordionRow>

            <AccordionRow
              label="LARGE ITEM DELIVERY & RETURNS"
              isOpen={open === "delivery"}
              onToggle={() => toggle("delivery")}
            >
              <App_Text
                variant="body"
                className="text-sm text-muted-foreground"
              >
                Large items are delivered by our specialist two-person team.
                Free returns within 28 days of delivery.
              </App_Text>
            </AccordionRow>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AccordionRow = ({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="py-4">
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left"
    >
      <App_Text
        variant="subheading"
        className="text-xs tracking-widest font-semibold"
      >
        {label}
      </App_Text>
      {isOpen ? (
        <ChevronUp size={16} className="text-muted-foreground shrink-0" />
      ) : (
        <ChevronDown size={16} className="text-muted-foreground shrink-0" />
      )}
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-3">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default Single_Product_Top;
{
  /* ── Shared CTA block — shown below gallery on mobile ── */
}
const CTABlock = ({
  wishlisted,
  setQty,
  qty,
  setWish,
}: {
  wishlisted: boolean;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  qty: number;
  setWish: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { updateQty, addToCart, items } = useGlobal();
  const item = items.find((item) => item.id == "2");
  console.log({ item, items });

  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2">
        <App_Button
          text=""
          icon={<Minus size={14} />}
          onPress={() => setQty((q) => Math.max(1, q - 1))}
          btnStyle="p-0 h-auto bg-transparent border-0 shadow-none text-muted-foreground hover:text-primary"
        />
        <span className="text-sm font-medium w-5 text-center">{qty}</span>
        <App_Button
          text=""
          icon={<Plus size={14} />}
          onPress={() => setQty((q) => q + 1)}
          btnStyle="p-0 h-auto bg-transparent border-0 shadow-none text-muted-foreground hover:text-primary"
        />
      </div>
      <button
        type="button"
        onClick={() => setWish((w) => !w)}
        className={`p-2.5 rounded-full border transition-colors ${
          wishlisted
            ? "border-primary bg-primary/10 text-primary"
            : "border-gray-200 text-muted-foreground hover:border-primary/40 hover:text-primary"
        }`}
      >
        <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
      </button>
    </div> */}
      <div className="flex gap-3 w-full">
        {item ? (
          <div className="flex items-center gap-2 border border-[#e0dbd4] rounded-lg w-fit px-2 py-1">
            <button
              onClick={() => updateQty(item.id, -1)}
              className="text-muted-foreground hover:text-[text] transition-colors"
              type="button"
            >
              <Minus size={13} />
            </button>
            <span className="text-xs font-medium w-4 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQty(item.id, 1)}
              className="text-muted-foreground hover:text-[text] transition-colors"
              type="button"
            >
              <Plus size={13} />
            </button>
          </div>
        ) : (
          <App_Button
            onPress={() =>
              addToCart({
                id: (items.length + 1).toString(),
                name: "Accent Chair",
                image: "/conference_chair-2.png",
                price: 200,
                category: "",
                quantity: 1,
              })
            }
            text="Add to cart"
            btnStyle="flex-1 py-3 h-auto rounded-full border border-gray-300 bg-white text-black hover:bg-gray-50 text-sm font-medium"
          />
        )}

        <App_Button
          text="Buy Now"
          btnStyle="flex-1 py-3 h-auto rounded-full bg-primary text-white hover:bg-primary/85 text-sm font-medium"
        />
      </div>
    </div>
  );
};
