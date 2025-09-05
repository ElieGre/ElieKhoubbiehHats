"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { DEMO_PRODUCTS } from "@/lib/demo";
import SiteHeader from "@/components/site-header";

type Product = (typeof DEMO_PRODUCTS)[number];

export default function ProductsPage() {
  const { data = DEMO_PRODUCTS, isLoading } = useQuery<Product[]>({
    queryKey: ["products", "demo"],
    queryFn: async () => DEMO_PRODUCTS,
    initialData: DEMO_PRODUCTS,
  });

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">All Products</h1>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((p) => (
              <Link key={p.id} href={`/product/${p.handle}`} className="group">
                <div className="relative aspect-square w-full">
                  <Image
                    src={p.featuredImage.url}
                    alt={p.featuredImage.altText}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  />
                </div>
                <div className="mt-2 font-medium group-hover:underline">{p.title}</div>
                <div className="text-sm opacity-70">
                  {p.priceRange.minVariantPrice.amount} {p.priceRange.minVariantPrice.currencyCode}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
