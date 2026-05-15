"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Logo } from "@/assets/img";
import Image from "next/image";

const App_Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="top-0 sticky z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="bg-black p-2">
        <p className="text-[10px] uppercase text-white text-center">
          LITACE INTERIORS - Furnitures - SouthAfrica
        </p>
      </div>
      <div className=" border-b border-purple-100">
        <nav className="containerclass flex justify-between items-center py-3 max-w-screen-2xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              alt="Litace Logo"
              className="w-32"
              src={Logo.src}
              width={400}
              height={400}
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link className="text-sm font-medium hover:text-primary" href="/">
              Home
            </Link>

            <Link
              className="text-sm font-medium hover:text-primary"
              href="/about"
            >
              About
            </Link>

            <Link
              className="text-sm font-medium hover:text-primary"
              href="/products"
            >
              Products
            </Link>

            <Link
              className="text-sm font-medium hover:text-primary"
              href="/contact"
            >
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button className="hover:text-primary transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </button>

            {/* Signup Button */}
            <Link href="/sign-up">
              <button className="hidden md:block bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90">
                Sign Up
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setOpen(!open)} className="md:hidden">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t bg-white">
            <div className="flex flex-col px-6 py-4 space-y-4">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/products">Products</Link>
              <Link href="/contact">Contact</Link>

              <button className="bg-primary text-white py-2 rounded-lg">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default App_Nav;

// import React from "react";

// const App_Nav = () => {
//   return (
//     <header className=" top-0 sticky z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-purple-100">
//       <nav className="containerclass flex justify-between items-center py-4 max-w-screen-2xl mx-auto">
//         <div className="flex items-center gap-2">
//           <img
//             alt="Litace Logo"
//             className="h-10 w-auto"
//             src="https://lh3.googleusercontent.com/aida/ADBb0ug5RF2MTOsgKopI55QUn-vPiv21ok2lbZgiOnkX48ogdPjfOYk67sSTYYFPX6cFmx4rgQEWYf9YsocmIwEMOsCGWm6QNy500zdsF-KN7a0iae1et6TvuEqB_e0k-jk7N6NWNMjQTS4zB2gTX6n12DXP3NbhlPOU0_-zgSy0dH7NlFX7170Nc-35o8RJhkujxTWSYAWAIcJgVKF2xxa3UrG1f3U0Nt4jQJiqvYb2QuZY0TaUgX6nGKwaayHJ-kwK1x_1vKL11Y5xOQ"
//           />
//         </div>
//         <div className="hidden md:flex items-center space-x-8">
//           <a
//             className="font-headline text-sm italic text-primary border-b-2 border-primary font-bold"
//             href="#"
//           >
//             Churches
//           </a>
//           <a
//             className="font-headline text-sm italic text-slate-600 hover:text-primary transition-colors duration-300"
//             href="#"
//           >
//             Schools
//           </a>
//           <a
//             className="font-headline text-sm italic text-slate-600 hover:text-primary transition-colors duration-300"
//             href="#"
//           >
//             Offices
//           </a>
//           <a
//             className="font-headline text-sm italic text-slate-600 hover:text-primary transition-colors duration-300"
//             href="#"
//           >
//             Events
//           </a>
//         </div>
//         <div className="flex items-center space-x-6">
//           <button className="material-symbols-outlined text-slate-900 text-2xl hover:text-primary transition-colors">
//             shopping_cart
//           </button>
//           <button className="material-symbols-outlined text-slate-900 text-2xl hover:text-primary transition-colors">
//             person
//           </button>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default App_Nav;
