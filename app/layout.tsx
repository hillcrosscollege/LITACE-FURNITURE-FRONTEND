import type { Metadata } from "next";
import { Inter, Montserrat, Cormorant } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-accent",
  style: ["italic"],
  weight: ["400", "500"],
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
      className={`${inter.variable} ${montserrat.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
