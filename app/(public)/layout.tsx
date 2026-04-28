import App_Nav from "@/components/shared/App_Nav";
import App_Footer from "@/components/shared/App_Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <App_Nav />
      {children}
      <App_Footer />
    </>
  );
}
