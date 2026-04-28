import Auth_Layout from "@/components/layouts/Auth_Layout";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Auth_Layout>{children}</Auth_Layout>
    </>
  );
}
