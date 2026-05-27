"use client";

import { useState } from "react";
import { CartItem } from "./cart_types";
import { cartItems } from "./cart_data/cart_data";
import Cart_Table from "./cart_components/Cart_Table";
import App_Full_Text from "@/components/shared/App_Full_Text";
import Cart_Order_Summary from "./cart_components/Cart_Order_Summary";

const SHIPPING = 15000;
const TAX_RATE = 0.075;

const Cart_View = () => {
  const [items, setItems] = useState<CartItem[]>(cartItems);
  const [showSuccess, setShowSuccess] = useState(true);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setShowSuccess(true);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + SHIPPING + tax;

  return (
    <div className="min-h-screen">
      <section className="w-full bg-linear-to-b from-primary/20 via-secondary/10 to-transparent py-16">
        <App_Full_Text
          className="flex-col items-start containerclass"
          text={{
            className: "gap-y-4  text-white",
            header: {
              children: "Shopping Cart",
              variant: "heading",
              className: "max-w-3xl mx-auto text-primary",
            },
          }}
          //   extra={
          //     <div className="px-4 py-1 rounded-lg border-2 border-primary w-fit mx-auto uppercase tracking-widest text-primary font-bold text-sm">
          //       <p>Our Products</p>
          //     </div>
          //   }
        />
      </section>
      <div className="containerclass space-y-4">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <Cart_Table
            removeItem={removeItem}
            items={items}
            updateQty={updateQty}
          />
          <Cart_Order_Summary
            subtotal={subtotal}
            tax={tax}
            shipping={SHIPPING}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart_View;
