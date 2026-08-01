import InventoryContextProvider from "@/app/contexts/admin/Inventory_Context";

export default function InventoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <InventoryContextProvider>{children}</InventoryContextProvider>;
}
