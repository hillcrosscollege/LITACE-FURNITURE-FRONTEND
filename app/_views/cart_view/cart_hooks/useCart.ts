import { useState } from "react";
import { CartItem } from "../cart_types";
// import { cartItems } from "../cart_data/cart_data";

const useCart = () => {
  const SHIPPING = 15000;
  const TAX_RATE = 0.075;

  const [items, setItems] = useState<CartItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const addToCart = (item: CartItem) => {
    console.log({ item, items });

    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [...prev, item];
    });
    setShowSuccess(true);
  };

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
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + SHIPPING + tax;

  return {
    items,
    addToCart,
    updateQty,
    removeItem,
    subtotal,
    tax,
    shipping: SHIPPING,
    total,
    showSuccess,
    setShowSuccess,
  };
};

export default useCart;
