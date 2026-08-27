"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { HeroCompanyCards, HeroCompanyCardsMobile } from "./hero-company-cards";
import { companies } from "@/lib/companies";
import { CountUp } from "./animated-text";
import { usePlayOnce } from "@/lib/use-play-once";

const HeroMap = dynamic(
  () => import("./hero-map").then((module) => module.HeroMap),
  { ssr: false },
);

const DESKTOP_MEDIA_QUERY = "(min-width: 1280px)";

function subscribeToDesktopChange(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeToDesktopChange,
    getDesktopSnapshot,
    () => false,
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
  const shouldAnimate = usePlayOnce();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="sg-grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 pb-8 pt-24 text-center sm:px-6 xl:h-[100svh] xl:min-h-0 xl:justify-start xl:pt-60"
    >
      {/* Repeating leaf motif, full-bleed across the hero */}
      <div
        aria-hidden="true"
        className="sg-gridlines pointer-events-none absolute inset-0"
      />

      {isDesktop && <HeroCompanyCards skipIntro={!shouldAnimate} />}

      <motion.div
        style={isDesktop ? { y: copyY } : undefined}
        className="relative z-30 mx-auto flex w-full max-w-5xl flex-col items-center px-1 sm:px-4 xl:max-w-[40rem]"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="sg-eyebrow mb-3 hidden justify-center text-sg-red md:inline-flex"
        >
          Bengaluru · Est. as a group
        </motion.p>

        <h1 className="mx-auto max-w-[19ch] font-display text-[clamp(1.65rem,3.25vw,3rem)] font-bold leading-[1.08] text-sg-dark-ink">
          <CountUp value={String(companies.length)} className="tabular-nums" />{" "}
          ventures, and still growing.{" "}
          <span className="font-display text-sg-red">One guiding star.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-3 max-w-[54ch] text-xs text-sg-dark-muted sm:text-sm"
        >
          Star Groups is a family of companies spanning real estate, interiors,
          landscaping, technology, media, venture capital and growth marketing — each
          independent, all pulling in the same direction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="mt-4 flex w-full items-center justify-center gap-2 px-3 sm:gap-3 sm:px-0"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link
              href="/companies"
              className="group inline-flex h-9 sm:h-10 shrink-0 items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-sg-red px-3.5 sm:px-5 text-[0.72rem] sm:text-[0.82rem] font-semibold text-white whitespace-nowrap shadow-sm transition-all duration-300 hover:bg-sg-red-bright hover:shadow-[0_10px_30px_-6px_rgba(224,20,44,0.6)]"
            >
              Explore the group
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link
              href="/companies/star-growth-hub"
              className="inline-flex h-9 sm:h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-sg-dark-ink px-3.5 sm:px-5 text-[0.72rem] sm:text-[0.82rem] font-semibold text-sg-dark-ink whitespace-nowrap transition-all duration-300 hover:bg-sg-dark-ink hover:text-white hover:shadow-md"
            >
              Meet Star Growth Hub
            </Link>
          </motion.div>
        </motion.div>

      </motion.div>

      {isDesktop && (
        <div
          className="relative z-10 mt-6 hidden h-[clamp(180px,27svh,190px)] w-full max-w-3xl xl:absolute xl:bottom-[-1530px] xl:left-1/2 xl:mt-0 xl:block xl:h-[2700px] xl:w-[2700px] xl:max-w-none xl:-translate-x-1/2"
        >
          <motion.div
            initial={shouldAnimate ? { opacity: 0, scale: 0.96, y: 28 } : false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={
              shouldAnimate
                ? { delay: 0.5, duration: 0.9, ease: "easeOut" }
                : { duration: 0 }
            }
            className="h-full w-full"
          >
            <HeroMap />
          </motion.div>
        </div>
      )}

      {/* Desktop-only: softly dissolve the oversized globe into the next section. */}
      {isDesktop && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-8 bg-gradient-to-b from-white/0 via-white/70 to-white backdrop-blur-[2px]"
        />
      )}

      <HeroCompanyCardsMobile />

    </section>
  );
}
