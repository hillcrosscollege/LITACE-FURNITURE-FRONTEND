// components/products/details/Product_Quick_Actions.tsx
"use client";

import App_Text from "@/components/app_ui/App_Text";
import {
  Archive,
  Layers,
  ImagePlus,
  Star,
  Copy,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { quickActions } from "../product_detail_data";

const iconMap: Record<string, React.ReactNode> = {
  Archive: <Archive size={15} />,
  Layers: <Layers size={15} />,
  ImagePlus: <ImagePlus size={15} />,
  Star: <Star size={15} />,
  Copy: <Copy size={15} />,
  Trash2: <Trash2 size={15} />,
};

type Props = {
  onDelete: () => void;
};

const Product_Quick_Actions = ({ onDelete }: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4">
      <App_Text variant="cardHeading" className="mb-3">
        Quick Actions
      </App_Text>

      <div className="flex flex-col gap-1">
        {quickActions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.label === "Delete Product" ? onDelete : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors w-full group ${
              action.danger ? "hover:bg-[#fdecea]" : "hover:bg-[#f5f2ee]"
            }`}
          >
            <span
              className={`shrink-0 transition-colors ${
                action.danger
                  ? "text-[#c0392b]"
                  : "text-muted-foreground group-hover:text-primary"
              }`}
            >
              {iconMap[action.icon]}
            </span>
            <App_Text
              variant="tableCell"
              className={`flex-1 ${action.danger ? "text-[#c0392b]" : ""}`}
            >
              {action.label}
            </App_Text>
            <ChevronRight
              size={13}
              className={`shrink-0 transition-colors ${
                action.danger
                  ? "text-[#c0392b]"
                  : "text-muted-foreground group-hover:text-primary"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Product_Quick_Actions;
