"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useCallback } from "react";

type Slide = { src: string; alt: string; href?: string; newTab?: boolean };

export default function Carousel({
  slides,
  autoScroll = true,
  speed = 1, // Adjust speed as needed (pixels per frame)
  direction = "forward", // "forward" or "backward"
  // adjust these to resize the container
  slideClassName = "aspect-[21/9] h-[260px] sm:h-[360px] lg:h-[520px]",
  imageFit = "cover", // "contain" or "cover"
  bgClassName = "bg-neutral-100",
}: {
  slides: Slide[];
  autoScroll?: boolean;
  speed?: number;
  direction?: "forward" | "backward";
  slideClassName?: string;
  imageFit?: "contain" | "cover";
  bgClassName?: string;
}) {
  const plugins = autoScroll ? [AutoScroll({ speed, direction, stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: false })] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true }, plugins); // Added dragFree for smoother interaction

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      {/* Viewport */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        {/* Track */}
        <div className="flex">
          {slides.map((s, i) => {
            const content = (
              <div className={`relative w-full ${slideClassName} ${bgClassName}`}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  // inline style guarantees no cropping
                  style={{ objectFit: imageFit, objectPosition: "center" }}
                  sizes="100vw"
                  priority={i === 0}
                />
              </div>
            );

            const isExternal = s.href && /^https?:\/\//i.test(s.href);
            return (
              <div className="min-w-0 flex-[0_0_100%]" key={i}>
                {s.href
                  ? isExternal ? (
                      <a
                        href={s.href}
                        target={s.newTab ? "_blank" : undefined}
                        rel={s.newTab ? "noopener noreferrer" : undefined}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link href={s.href}>{content}</Link>
                    )
                  : content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls - Optional, you can remove if not needed for continuous scroll */}
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