"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/20 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Use your actual logo path */}
          <Image src="./images/ekhatslogo.svg" alt="EK Hats" width={28} height={28} />
          <span className="font-semibold tracking-tight">Elie Khoubbieh</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/products" className="hover:underline underline-offset-4">Shop</Link>
          <Link href="/about" className="hover:underline underline-offset-4">About</Link>
          <Link href="/contact" className="hover:underline underline-offset-4">Contact</Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="text-2xl leading-none">☰</span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t">
          <nav className="mx-auto max-w-6xl px-4 py-3 grid gap-3 text-sm">
            <Link href="/products" onClick={() => setOpen(false)}>Shop</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
