"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Logo } from "@/assets/img";
import Image from "next/image";

const App_Nav = () => {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

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
          {/* <div className="hidden md:flex items-center space-x-8">
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
          </div> */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className=" text-base font-medium relative transition-colors duration-300 hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart">
              <button className="hover:text-primary transition-colors">
                <ShoppingCart className="w-6 h-6" />
              </button>
            </Link>

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
