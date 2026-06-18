import CustomerContextProvider from "@/app/contexts/admin/Customer_Context";

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CustomerContextProvider>{children}</CustomerContextProvider>;
}
