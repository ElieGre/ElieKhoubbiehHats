"use client";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import SiteHeader from "@/components/site-header";
import Carousel from "@/components/carousel"; // Assuming this is the path to your Carousel component
import { DEMO_PRODUCTS } from "@/lib/demo";

type Product = (typeof DEMO_PRODUCTS)[number];

const slides = [
  { src: "/slides/sample1.jpg", alt: "Streetwear cap", href: "/products" },
  { src: "/slides/sample2.jpg", alt: "Corduroy hat", href: "/products" },
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
        <section className="relative -mx-4 h-screen md:h-[90vh] w-screen md:w-full overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/slides/sample3.jpg" // Replace with your actual image path; later replace with <video> tag for video background
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 flex flex-col items-start justify-center h-full px-4 md:px-8 space-y-4">
            <Image
              src="/images/ekhatslogo.svg" // Replace with your actual logo path
              alt="Company Logo"
              width={200} // Adjust width as needed
              height={200} // Adjust height as needed
              className="max-w-xs"
            />
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">Elie Khoubbieh</h1> {/* Replace with actual company name */}
            <p className="text-xl text-white max-w-md">Find your next conversation starter.</p> {/* Replace with actual phrase */}
          </div>
        </section>

        {/* BEST SELLERS CAROUSEL */}
        <h2 className="text-xl font-semibold mb-4">Best Sellers</h2>
        <Carousel
          slides={slides}
          autoScroll={true}
          speed={1.7} // Adjust speed as needed
          direction="forward"
          imageFit="cover"
          slideClassName="aspect-[4/3] h-[300px] sm:h-[340px] lg:h-[200px]"
          bgClassName="bg-black"
        />
        <div className="flex justify-center">
          <Link
            href="/products"
            className="mt-2 rounded-xl bg-black text-white px-6 py-3 text-base hover:opacity-90"
          >
            Browse all products
          </Link>
        </div>

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
                        className="object-contain rounded-xl"
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