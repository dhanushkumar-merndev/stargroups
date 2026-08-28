"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

type ProjectImage = {
  src: string;
  alt: string;
};

export function ProjectCarousel({ images }: { images: ProjectImage[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollBy({
      left: direction * Math.round(scroller.clientWidth * 0.82),
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        aria-label="Project image carousel"
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:-mx-10 lg:px-10"
      >
        {images.map((image, i) => (
          <a
            key={image.src}
            href={image.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${image.alt} at full size`}
            className="group relative aspect-[3508/2480] w-[min(82vw,22rem)] shrink-0 snap-start overflow-hidden rounded-lg bg-white shadow-[0_12px_30px_-24px_rgba(32,31,29,0.35)] transition-shadow duration-700 ease-out hover:shadow-[0_18px_42px_-24px_rgba(224,20,44,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sg-red motion-reduce:transition-none sm:w-[24rem]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={3508}
              height={2480}
              sizes="(max-width: 640px) 82vw, 384px"
              className="block h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:brightness-[0.98] motion-reduce:transition-none"
              priority={i === 0}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-sg-dark-ink opacity-0 shadow-lg transition-opacity duration-700 ease-out group-hover:opacity-100 motion-reduce:transition-none"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-1 flex items-center justify-between">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sg-dark-muted">
          Swipe to explore
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous project image"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-sg-line-light bg-white text-sg-dark-ink shadow-xs transition-all duration-300 hover:border-sg-red/40 hover:bg-sg-red-tint hover:text-sg-red hover:shadow-[0_4px_12px_-2px_rgba(224,20,44,0.15)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sg-red"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next project image"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-sg-line-light bg-white text-sg-dark-ink shadow-xs transition-all duration-300 hover:border-sg-red/40 hover:bg-sg-red-tint hover:text-sg-red hover:shadow-[0_4px_12px_-2px_rgba(224,20,44,0.15)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sg-red"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
