import ProductContextProvider from "@/app/contexts/admin/Product_Context";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProductContextProvider>{children}</ProductContextProvider>;
}
