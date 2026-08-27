"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { flagships } from "@/lib/companies";
import { CompanyLogo } from "./company-logo";
import { buttonVariants } from "@/components/ui/button";
import { getLenis } from "@/components/smooth-scroll";

/**
 * Scroll-stacked company cards, on phones as well as desktop. The card
 * layout switches from side-by-side (image + text) to stacked (image over
 * text) below `md` via `flex-col-reverse`/`md:flex-row`, and the description
 * is line-clamped on mobile so a card's total height stays short enough that
 * its CTAs never end up pinned off-screen.
 */
export default function Stacking() {
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLLIElement>(".stack-item"),
    );
    if (!items.length) return;

    let cardHeight = items[0]?.offsetHeight || 440;
    let stickyTop = 80;
    let tabGap = 36;
    let stepDistance = 460;
    let animationFrame: number | null = null;

    const setup = () => {
      cardHeight = items[0]?.offsetHeight || 440;
      const vh = window.innerHeight;

      // Generous tab reveal gap ensuring full logo, title, and clear margin are always exposed
      tabGap = vh < 800 ? 56 : 64;
      const totalStackHeight = cardHeight + (items.length - 1) * tabGap;

      // Calculate vertical center so the entire stack sits right in the middle of the viewport
      stickyTop = Math.max(76, Math.floor((vh - totalStackHeight) / 2));
      stepDistance = cardHeight;

      // Tight buffer for smooth finish into next section
      container.style.paddingBottom = `${tabGap * (items.length - 1) + 120}px`;
      getLenis()?.resize();

      items.forEach((item, i) => {
        item.style.top = `${stickyTop}px`;
        item.style.transform = `translateY(${tabGap * i}px)`;
      });
    };

    const animate = () => {
      const containerTop = container.getBoundingClientRect().top;
      const scrollOffset = stickyTop - containerTop;

      items.forEach((item, i) => {
        // How many cards have stacked above card i
        const rawProgress = (scrollOffset - i * stepDistance) / stepDistance;
        const clampedProgress = Math.min(items.length - 1 - i, Math.max(0, rawProgress));

        // Smooth Hermite interpolation (3x^2 - 2x^3) to ensure zero-jerk deceleration when cards land
        const wholeSteps = Math.floor(clampedProgress);
        const fraction = clampedProgress - wholeSteps;
        const smoothFraction = fraction * fraction * (3 - 2 * fraction);
        const smoothDepth = wholeSteps + smoothFraction;

        const scale = 1 - smoothDepth * 0.022;

        item.style.transform = `translateY(${tabGap * i}px) scale(${scale})`;
      });
    };

    const onScroll = () => {
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(() => {
          animate();
          animationFrame = null;
        });
      }
    };

    let resizeObserver: ResizeObserver | null = null;

    const disableStacking = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setup);
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      animationFrame = null;
      container.style.paddingBottom = "";
      getLenis()?.resize();
      items.forEach((item) => {
        item.style.transform = "";
        item.style.top = "";
      });
    };

    const enableStacking = () => {
      setup();
      animate();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", setup);

      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => {
          setup();
          animate();
        });
        resizeObserver.observe(container);
        if (items[0]) resizeObserver.observe(items[0]);
      }
    };

    enableStacking();

    return () => {
      disableStacking();
    };
  }, []);

  // NB: this <section> must NOT get `overflow-hidden` — that would make it the
  // nearest scroll container and silently kill the sticky stacking below.
  return (
    <section className="relative flex justify-center bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
      <div className="relative w-full max-w-5xl px-4 lg:px-8">
        {/* SECTION HEADING */}
        <div className="mb-12 text-center lg:mb-16">
          <p className="sg-eyebrow sg-eyebrow-xl justify-center text-sg-red">
            The flagships
          </p>
        </div>

        {/* STACKING CARDS */}
        <ul ref={containerRef} className="relative">
          {flagships.map((company, i) => (
            <li
              key={company.slug}
              style={{ zIndex: i + 1 }}
              className="stack-item sticky origin-top transform-gpu overflow-hidden rounded-3xl border border-sg-line-light bg-white shadow-2xl"
            >
              <div className="flex w-full flex-col-reverse md:flex-row transition-all duration-500">
                {/* TEXT PANEL — Consistent left placement for aligned stacked tabs */}
                <div className="flex w-full flex-col justify-between p-4 pt-3.5 sm:p-5 sm:pt-4 md:w-[42%] md:p-5 md:pt-4 lg:p-6 lg:pt-4.5">
                  {/* LOGO + TITLE */}
                  <div className="mb-1.5 flex items-center gap-2.5 sm:gap-3 md:mb-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9 md:h-9.5 md:w-9.5">
                      <CompanyLogo company={company} className="h-full w-full" />
                    </div>
                    <h3 className="font-display text-base font-bold tracking-tight text-sg-dark-ink sm:text-lg md:text-xl">
                      {company.name}
                    </h3>
                  </div>

                  <p className="mb-2 font-display text-xs italic text-sg-red sm:text-sm md:text-base">
                    {company.tagline}
                  </p>

                  {/* Description with gradient fade for overflow. Clamped on
                      mobile so a card's total height (image stacked above
                      text) never grows tall enough to pin its CTAs off-screen. */}
                  <div className="relative min-h-0 flex-1 overflow-hidden">
                    <p className="line-clamp-4 whitespace-pre-line text-xs leading-relaxed text-sg-dark-muted sm:text-sm md:line-clamp-none md:text-[0.92rem]">
                      {company.summary}
                      {"\n\n"}
                      {company.services
                        .slice(0, 3)
                        .map((s) => `• ${s.title}`)
                        .join("\n")}
                    </p>
                    <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-full bg-linear-to-t from-white via-white/80 to-transparent md:hidden" />
                    <div className="pointer-events-none absolute bottom-0 left-0 hidden h-8 w-full bg-linear-to-t from-white/40 to-transparent md:block" />
                  </div>

                  {/* CTAs — aligned right */}
                  <div className="mt-auto flex flex-nowrap items-center justify-end gap-2 pt-4">
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/site inline-flex whitespace-nowrap items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-sg-dark-muted transition-colors hover:text-sg-red"
                      >
                        Visit site
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/site:translate-x-0.5 group-hover/site:-translate-y-0.5" />
                      </a>
                    )}
                    <Link
                      href={`/companies/${company.slug}`}
                      className={buttonVariants({
                        variant: "light",
                        className:
                          "group/btn whitespace-nowrap rounded-full px-6 font-medium transition-all hover:pr-5",
                      })}
                    >
                      Explore
                      <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* VISUAL PANEL — 16:9 widescreen showcase on right */}
                <div className="flex w-full items-center justify-center p-3.5 sm:p-5 md:w-[58%] md:p-5 lg:p-6">
                  <div className="relative w-full aspect-[2/1] overflow-hidden rounded-2xl border border-sg-line-light bg-white md:aspect-video">
                    {company.stackingImage ? (
                      <Image
                        src={company.stackingImage}
                        alt={`${company.name} showcase`}
                        fill
                        className="object-cover object-center transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 58vw"
                        priority={i === 0}
                      />
                    ) : (
                      <>
                        <div
                          aria-hidden="true"
                          className="absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(circle at 50% 45%, rgba(224,20,44,0.28), transparent 62%)",
                          }}
                        />
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 400 400"
                          className="absolute inset-0 h-full w-full opacity-40"
                        >
                          {[70, 115, 160].map((r) => (
                            <circle
                              key={r}
                              cx="200"
                              cy="200"
                              r={r}
                              fill="none"
                              stroke="#e0142c"
                              strokeWidth="0.6"
                              strokeDasharray="3 7"
                              opacity="0.55"
                            />
                          ))}
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                          <CompanyLogo
                            company={company}
                            className="max-h-24 w-auto rounded-2xl bg-white p-3 shadow-lg sm:max-h-32 md:max-h-40"
                          />
                        </div>
                        <span className="absolute bottom-4 left-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-sg-muted">
                          {company.sector}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
