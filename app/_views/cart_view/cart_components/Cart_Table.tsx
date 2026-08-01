import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Cart_Table = ({
  removeItem,
  items,
  updateQty,
}: {
  removeItem: (id: string) => void;
  items: any[];
  updateQty: (id: string, delta: number) => void;
}) => {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-[#ede8e2] shadow-sm overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b border-[#ede8e2]">
        <App_Text variant="tableHeader">Product</App_Text>
        <App_Text variant="tableHeader">Price</App_Text>
        <App_Text variant="tableHeader">Quantity</App_Text>
        <App_Text variant="tableHeader">Total</App_Text>
        <App_Text variant="tableHeader">Action</App_Text>
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <App_Text variant="tableCell">Your cart is empty.</App_Text>
        </div>
      ) : (
        items.map((item, i) => (
          <div
            key={item.id}
            className={`grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-4 ${
              i < items.length - 1 ? "border-b border-[#f5f2ee]" : ""
            }`}
          >
            {/* Product */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-[#f0e8df] shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <App_Text variant="cardHeading" className="font-medium">
                  {item.name}
                </App_Text>
                <App_Text variant="tableCell" className="mt-0.5">
                  {item.category}
                </App_Text>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#2e7d52]" />
                  <App_Text variant="tableCell" className="text-[#2e7d52]">
                    In Stock
                  </App_Text>
                </div>
              </div>
            </div>

            {/* Price */}
            <App_Text variant="cardHeading">
              R {item.price.toLocaleString()}
            </App_Text>

            {/* Quantity */}
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

            {/* Total */}
            <App_Text variant="cardHeading" className="font-semibold">
              R {(item.price * item.quantity).toLocaleString()}
            </App_Text>

            {/* Delete */}
            <button
              onClick={() => removeItem(item.id)}
              className="p-2 rounded-lg border border-[#e0dbd4] text-muted-foreground hover:text-[#8f3d90] hover:border-[#d4a0d5] hover:bg-[#f5eaf5] transition-colors"
              type="button"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))
      )}

      {/* Continue shopping */}
      <div className="px-6 py-4 border-t border-[#ede8e2]">
        <Link href="/products">
          <App_Button
            text="Continue Shopping"
            icon={<ArrowLeft size={14} />}
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
          />
        </Link>
      </div>
    </div>
  );
};

export default Cart_Table;
