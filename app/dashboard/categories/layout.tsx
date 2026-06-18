import CategoryContextProvider from "@/app/contexts/admin/Category_Context";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CategoryContextProvider>{children}</CategoryContextProvider>;
}
