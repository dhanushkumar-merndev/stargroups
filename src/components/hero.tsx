"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { HeroCompanyCards, HeroCompanyCardsMobile } from "./hero-company-cards";
import { HeroMap } from "./hero-map";
import { companies } from "@/lib/companies";
import { SplitCharacters } from "./animated-text";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="sg-grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 pb-8 pt-24 text-center xl:h-[100svh] xl:min-h-0 xl:justify-start xl:pt-52"
    >
      {/* Repeating leaf motif, full-bleed across the hero */}
      <div
        aria-hidden="true"
        className="sg-gridlines pointer-events-none absolute inset-0"
      />

      <HeroCompanyCards />

      <motion.div
        style={{ y: copyY }}
        className="relative z-30 mx-auto flex w-full max-w-5xl flex-col items-center px-4 xl:max-w-[40rem]"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="sg-eyebrow mb-3 justify-center text-sg-red"
        >
          Bengaluru · Est. as a group
        </motion.p>

        <SplitCharacters
          text={`${companies.length} ventures, and still growing. One guiding star.`}
          as="h1"
          trigger={false}
          delay={1.05}
          stagger={0.015}
          highlight={["one", "guiding", "star."]}
          className="mx-auto max-w-[19ch] font-display text-[clamp(1.65rem,3.25vw,3rem)] font-bold leading-[1.08] text-sg-dark-ink"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.75, duration: 0.8 }}
          className="mx-auto mt-3 max-w-[54ch] text-xs text-sg-dark-muted sm:text-sm"
        >
          Star Groups is a family of companies spanning real estate, interiors,
          landscaping, technology, media, venture capital and growth marketing — each
          independent, all pulling in the same direction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/companies"
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-sg-red px-5 text-[0.82rem] font-semibold text-white transition-all duration-300 hover:bg-sg-red-bright hover:shadow-[0_10px_40px_-8px_rgba(224,20,44,0.7)]"
          >
            Explore the group
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/companies/star-growth-hub"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-sg-dark-ink px-5 text-[0.82rem] font-semibold text-sg-dark-ink transition-all duration-300 hover:bg-sg-dark-ink hover:text-white"
          >
            Meet Star Growth Hub
          </Link>
        </motion.div>

      </motion.div>

      <div
        className="relative z-10 mt-6 hidden h-[clamp(180px,27svh,290px)] w-full max-w-3xl xl:absolute xl:bottom-[-1520px] xl:left-1/2 xl:mt-0 xl:block xl:h-[2700px] xl:w-[2700px] xl:max-w-none xl:-translate-x-1/2"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 2.55, duration: 0.9, ease: "easeOut" }}
          className="h-full w-full"
        >
          <HeroMap />
        </motion.div>
      </div>

      <HeroCompanyCardsMobile />

    </section>
  );
}
