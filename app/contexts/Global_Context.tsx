"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import useCart from "../_views/cart_view/cart_hooks/useCart";
import { CartItem } from "../_views/cart_view/cart_types";

type GlobalContextType = {
  // user: any | null;
  // isUserLoading: boolean;
  items: ReturnType<typeof useCart>["items"];
  addToCart: ReturnType<typeof useCart>["addToCart"];
  updateQty: ReturnType<typeof useCart>["updateQty"];
  removeItem: ReturnType<typeof useCart>["removeItem"];
  subtotal: number;
  tax: number;
  // shipping: number;
  total: number;
  showSuccess: boolean;
  setShowSuccess: (val: boolean) => void;
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const {
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
  } = useCart();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider
        value={{
          items,
          addToCart,
          updateQty,
          removeItem,
          subtotal,
          tax,
          total,
          showSuccess,
          setShowSuccess,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
};

export const useGlobal = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobal must be used within GlobalProvider");
  return ctx;
};
