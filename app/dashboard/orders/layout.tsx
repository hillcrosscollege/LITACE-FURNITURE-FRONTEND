import OrderContextProvider from "@/app/contexts/admin/Orders_Context";

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <OrderContextProvider>{children}</OrderContextProvider>;
}
