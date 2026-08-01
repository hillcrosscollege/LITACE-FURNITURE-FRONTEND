"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { CustomerDetail, CustomerAddress } from "../../customers_types";

const Tab_Cust_Addresses = ({ customer }: { customer: CustomerDetail }) => {
  const [addresses, setAddresses] = useState<CustomerAddress[]>(
    customer.addresses,
  );

  const setDefault = (id: string, type: "shipping" | "billing") => {
    setAddresses((prev) =>
      prev.map((a) => (a.type === type ? { ...a, isDefault: a.id === id } : a)),
    );
  };

  const remove = (id: string) =>
    setAddresses((prev) => prev.filter((a) => a.id !== id));

  const shipping = addresses.filter((a) => a.type === "shipping");
  const billing = addresses.filter((a) => a.type === "billing");

  const AddressCard = ({ address }: { address: CustomerAddress }) => (
    <div
      className={`bg-white rounded-xl border p-4 space-y-2 ${
        address.isDefault ? "border-primary" : "border-[#ede8e2]"
      }`}
    >
      {address.isDefault && (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
          Default {address.type === "shipping" ? "Shipping" : "Billing"} Address
        </span>
      )}
      <App_Text variant="tableCell" className="font-semibold">
        {address.fullName}
      </App_Text>
      <App_Text variant="tableCellMuted">{address.address}</App_Text>
      <App_Text variant="tableCellMuted">
        {address.city}, {address.state}
      </App_Text>
      <App_Text variant="tableCellMuted">{address.postalCode}</App_Text>
      {address.landmark && (
        <App_Text variant="tableCellMuted">{address.landmark}</App_Text>
      )}
      <App_Text variant="tableCellMuted">{address.phone}</App_Text>

      <div className="flex items-center gap-2 pt-2 border-t border-[#f5f2ee] flex-wrap">
        {!address.isDefault && (
          <App_Button
            text="Set as Default"
            type="button"
            onPress={() => setDefault(address.id, address.type)}
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-1.5 h-auto"
          />
        )}
        <App_Button
          text="Edit"
          icon={<Pencil size={12} />}
          type="button"
          btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-1.5 h-auto"
        />
        <App_Button
          text="Delete"
          icon={<Trash2 size={12} />}
          type="button"
          onPress={() => remove(address.id)}
          btnStyle="text-xs border border-[#f5c6c6] bg-white text-[#c0392b] hover:bg-[#fdecea] rounded-lg px-3 py-1.5 h-auto"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <App_Text variant="cardHeading">Addresses</App_Text>
        <App_Button
          text="Add Address"
          icon={<Plus size={13} />}
          type="button"
          btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-3 py-2 h-auto"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <App_Text
            variant="tableCell"
            className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider"
          >
            Shipping Addresses
          </App_Text>
          {shipping.map((a) => (
            <AddressCard key={a.id} address={a} />
          ))}
        </div>
        <div className="space-y-3">
          <App_Text
            variant="tableCell"
            className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider"
          >
            Billing Addresses
          </App_Text>
          {billing.map((a) => (
            <AddressCard key={a.id} address={a} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tab_Cust_Addresses;
