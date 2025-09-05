"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";

type Slide = {
  src: string;
  alt: string;
  href?: string;      // internal or external link
  newTab?: boolean;   // open in new tab (for external)
};

export default function Carousel({
  slides,
  autoplay = true,
  delay = 4000,
}: {
  slides: Slide[];
  autoplay?: boolean;
  delay?: number;
}) {
  const plugins = autoplay ? [Autoplay({ delay })] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      {/* Viewport */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        {/* Container */}
        <div className="flex">
          {slides.map((s, i) => {
            const content = (
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            );

            // If href provided, wrap in a link. Use <Link> for internal, <a> for external.
            const isExternal = s.href && /^https?:\/\//i.test(s.href);
            const wrapped = s.href
              ? isExternal ? (
                  <a href={s.href} target={s.newTab ? "_blank" : undefined}
                     rel={s.newTab ? "noopener noreferrer" : undefined}>
                    {content}
                  </a>
                ) : (
                  <Link href={s.href}>{content}</Link>
                )
              : content;

            return (
              <div className="min-w-0 flex-[0_0_100%]" key={i}>
                {wrapped}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-2xl leading-none hover:bg-white"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-2xl leading-none hover:bg-white"
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  );
}
