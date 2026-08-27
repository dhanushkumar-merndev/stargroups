"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { flagships } from "@/lib/companies";
import { CompanyLogo } from "./company-logo";
import { buttonVariants } from "@/components/ui/button";

/**
 * Scroll-stacked company cards. The heading pins under the nav, then slides
 * itself up out of view as the third card approaches — so it clears the way
 * for the stack rather than sitting on top of it. Each card below scales down
 * slightly as the next one collects on top, so the stack reads as depth.
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

    const gap = 80;
    let cardHeight = items[0]?.offsetHeight || 0;
    // Read the sticky offset straight off the CSS so the JS can never drift
    // out of sync with the responsive `top-*` classes on the cards.
    let stickyTop = 128;
    let ticking = false;

    const setup = () => {
      cardHeight = items[0]?.offsetHeight || 0;
      stickyTop = parseFloat(getComputedStyle(items[0]).top) || 128;
      container.style.paddingBottom = `${gap * (items.length - 1)}px`;
      items.forEach((item, i) => {
        item.style.transform = `translateY(${gap * i}px)`;
      });
    };

    const animate = () => {
      const containerTop = container.getBoundingClientRect().top;

      items.forEach((item, i) => {
        const scroll = stickyTop - containerTop - i * (cardHeight + gap);
        if (scroll > 0) {
          const scale =
            i === items.length - 1 ? 1 : (cardHeight - scroll * 0.045) / cardHeight;
          item.style.transform = `translateY(${gap * i}px) scale(${Math.max(scale, 0.86)})`;
        } else {
          item.style.transform = `translateY(${gap * i}px)`;
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(animate);
      }
    };

    setup();
    animate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setup);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setup);
    };
  }, []);

  // NB: this <section> must NOT get `overflow-hidden` — that would make it the
  // nearest scroll container and silently kill the sticky stacking below.
  return (
    <section className="relative flex justify-center bg-white pt-20 pb-28 lg:pt-28 lg:pb-36">
      <div className="relative w-full max-w-5xl px-4 lg:px-8">
        {/* SECTION HEADING */}
        <div className="mb-16 text-center lg:mb-20">
          <p className="sg-eyebrow sg-eyebrow-xl justify-center text-sg-red">
            The flagships
          </p>
        </div>

        {/* STACKING CARDS */}
        <ul ref={containerRef} className="relative">
          {flagships.map((company, i) => {
            const isReverse = i % 2 !== 0;

            return (
              <li
                key={company.slug}
                className="stack-item sticky top-28 origin-top transform-gpu overflow-hidden rounded-3xl border border-sg-line-light bg-white shadow-2xl md:top-32"
              >
                <div
                  className={`flex w-full flex-col md:flex-row ${
                    isReverse ? "md:flex-row-reverse" : ""
                  } transition-all duration-500`}
                >
                  {/* VISUAL PANEL — 16:9 widescreen showcase */}
                  <div className="flex w-full items-center justify-center p-4 md:w-[58%] md:p-6 lg:p-8">
                    <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-sg-line-light bg-white">
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
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 flex select-none items-center justify-center font-display text-[9rem] font-bold leading-none text-white/[0.05] sm:text-[12rem] md:text-[15rem]"
                          >
                            {company.letter}
                          </span>
                          <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                            <CompanyLogo
                              company={company}
                              className="max-h-24 w-auto rounded-2xl bg-white p-3 shadow-lg sm:max-h-32 md:max-h-40"
                            />
                          </div>
                          <span className="absolute bottom-4 left-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-sg-muted">
                            {company.letter} · {company.letterName}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* TEXT PANEL — 42% on desktop, bottom half on mobile */}
                  <div className="flex w-full flex-col justify-between p-5 sm:p-6 md:w-[42%] md:p-6 lg:p-8">
                    {/* LOGO + TITLE */}
                    <div className="mb-3 flex items-center gap-3.5 md:mb-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12">
                        <CompanyLogo company={company} className="h-full w-full" />
                      </div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-sg-dark-ink md:text-3xl">
                        {company.name}
                      </h3>
                    </div>

                    <p className="mb-3 font-display text-sm italic text-sg-red md:text-base">
                      {company.tagline}
                    </p>

                    {/* Description with gradient fade for overflow */}
                    <div className="relative min-h-0 flex-1 overflow-hidden">
                      <p className="whitespace-pre-line text-sm leading-relaxed text-sg-dark-muted md:text-[0.98rem]">
                        {company.summary}
                        {"\n\n"}
                        {company.services
                          .slice(0, 4)
                          .map((s) => `• ${s.title}`)
                          .join("\n")}
                      </p>
                      <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-linear-to-t from-white via-white/80 to-transparent md:hidden" />
                      <div className="pointer-events-none absolute bottom-0 left-0 hidden h-12 w-full bg-linear-to-t from-white/40 to-transparent md:block" />
                    </div>

                    {/* CTAs — aligned right */}
                    <div className="mt-auto flex flex-wrap items-center justify-end gap-2 pt-4">
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/site inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-sg-dark-muted transition-colors hover:text-sg-red"
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
                            "group/btn rounded-full px-6 font-medium transition-all hover:pr-5",
                        })}
                      >
                        Explore
                        <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
