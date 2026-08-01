// components/settings/payment-methods/Payment_Method_Row.tsx
"use client";

import {
  MoreHorizontal,
  CreditCard,
  Zap,
  Building,
  Truck,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import App_Text from "@/components/app_ui/App_Text";
import {
  useTogglePaymentMethod,
  useDeletePaymentMethod,
} from "../payments_hooks/usePaymentMutation";
import { PaymentMethod } from "../payments_types";

const iconMap: Record<string, React.ElementType> = {
  "credit-card": CreditCard,
  zap: Zap,
  building: Building,
  truck: Truck,
};

const Payment_Method_Row = ({ method }: { method: PaymentMethod }) => {
  const Icon = iconMap[method.icon] ?? CreditCard;
  const { mutate: toggleStatus } = useTogglePaymentMethod();
  const { mutate: deleteMethod } = useDeletePaymentMethod();

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-[#ede8e2] hover:bg-[#faf9f7] transition-colors">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${method.status ? "bg-primary/10" : "bg-[#f5f2ee]"}`}
      >
        <Icon
          size={17}
          className={method.status ? "text-primary" : "text-muted-foreground"}
        />
      </div>

      <div className="flex-1 min-w-0">
        <App_Text variant="tableCell" className="font-medium">
          {method.displayName}
        </App_Text>
        <App_Text variant="tableCellMuted">{method.description}</App_Text>
      </div>

      <span
        className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${
          method.status
            ? "bg-[#e8fdf0] text-[#157a45]"
            : "bg-[#fdecea] text-[#a32020]"
        }`}
      >
        {method.status ? "Active" : "Inactive"}
      </span>

      <button
        type="button"
        onClick={() => toggleStatus({ id: method.id, status: !method.status })}
        className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${method.status ? "bg-primary" : "bg-gray-200"}`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${method.status ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-[#f5f2ee] text-muted-foreground transition-colors flex-shrink-0"
          >
            <MoreHorizontal size={15} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem className="gap-2 cursor-pointer text-xs">
            <Pencil size={13} /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2 cursor-pointer text-xs text-[#c0392b] focus:text-[#c0392b] focus:bg-[#fdecea]"
            onClick={() => deleteMethod(method.id)}
          >
            <Trash2 size={13} /> Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Payment_Method_Row;
