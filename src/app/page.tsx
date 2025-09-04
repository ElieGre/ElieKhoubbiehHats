"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { DEMO_PRODUCTS } from "@/lib/demo";

type Product = (typeof DEMO_PRODUCTS)[number];

export default function ProductsPage() {
  const { data = DEMO_PRODUCTS, isLoading } = useQuery<Product[]>({
    queryKey: ["products", "demo"],
    queryFn: async () => DEMO_PRODUCTS,
    initialData: DEMO_PRODUCTS,
  });

  if (isLoading) return <div className="p-6">Loading…</div>;

  return (
    <main className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
      {data.map((p) => (
        <Link key={p.id} href={`/product/${p.handle}`} className="group">
          <Image
            src={p.featuredImage.url}
            alt={p.featuredImage.altText}
            width={600}
            height={600}
            className="aspect-square object-cover rounded-xl"
          />
          <div className="mt-2 font-medium group-hover:underline">{p.title}</div>
          <div className="text-sm opacity-70">
            {p.priceRange.minVariantPrice.amount} {p.priceRange.minVariantPrice.currencyCode}
          </div>
        </Link>
      ))}
    </main>
  );
}
