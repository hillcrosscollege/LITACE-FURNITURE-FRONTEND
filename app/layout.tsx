import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "./contexts/Global_Context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   variable: "--font-heading",
//   weight: ["500", "600", "700"],
// });
// _Garamond

// const cormorant = Cormorant_Garamond({
//   subsets: ["latin"],
//   variable: "--font-heading",
//   style: ["italic"],
//   weight: ["400", "500", "600", "700"],
// });

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-heading",
  // style: ["italic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Litace Furniture",
  description: "Premium furniture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
