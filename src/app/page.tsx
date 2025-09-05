"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import SiteHeader from "@/components/site-header";
import Carousel from "@/components/carousel";
import { DEMO_PRODUCTS } from "@/lib/demo";

type Product = (typeof DEMO_PRODUCTS)[number];

// Use local images in /public/slides or swap to remote URLs (see note below)
const slides = [
  { src: "/slides/sample1.jpg", alt: "Streetwear cap", href: "/products"},
  { src: "/slides/sample2.jpg", alt: "Corduroy hat", href: "/products"},
  { src: "/slides/sample3.jpg", alt: "Beanie drop", href: "/products" },
];

export default function Home() {
  const { data = DEMO_PRODUCTS, isLoading } = useQuery<Product[]>({
    queryKey: ["products", "demo"],
    queryFn: async () => DEMO_PRODUCTS,
    initialData: DEMO_PRODUCTS,
  });

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
        {/* HERO */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Find your next conversation starter
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simple Caps or Fancy Fedoras we've got it all.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/products"
              className="rounded-xl bg-black text-white px-6 py-3 text-base hover:opacity-90"
            >
              Shop hats →
            </Link>
            <Link
              href="/about"
              className="rounded-xl border px-6 py-3 text-base hover:bg-gray-50"
            >
              Learn more
            </Link>
          </div>
        </section>

        {/* CAROUSEL */}
        <Carousel slides={slides} />

        {/* FEATURED PRODUCTS */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Featured</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-xl animate-pulse"
                  />
                ))
              : data.map((p) => (
                
                  <Link key={p.id} href={`/product/${p.handle}`} className="group">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={p.featuredImage.url}
                        alt={p.featuredImage.altText}
                        fill
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="object-cover rounded-xl"
                      />
                    </div>
                    <div className="mt-2 font-medium group-hover:underline">
                      {p.title}
                    </div>
                    <div className="text-sm opacity-70">
                      {p.priceRange.minVariantPrice.amount}{" "}
                      {p.priceRange.minVariantPrice.currencyCode}
                    </div>
                  </Link>
                ))}
          </div>
        </section>
      </main>
    </>
  );
}
