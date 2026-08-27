"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/testimonials";
import { SplitWords } from "./animated-text";
import { LeafPattern } from "./leaf-pattern";

/** Duplicated once so the marquee can loop seamlessly. */
const columnFor = (offset: number) =>
  testimonials.filter((_, i) => i % 3 === offset);

function Card({
  name,
  business,
  quote,
  reply,
  avatar,
}: (typeof testimonials)[number]) {
  return (
    <figure className="rounded-2xl border border-sg-line-light bg-white p-6 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.25)]">
      <Quote className="mb-3 h-5 w-5 text-sg-red" strokeWidth={2} />
      <blockquote className="text-[0.93rem] leading-relaxed text-sg-dark-ink">
        {quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 overflow-hidden items-center justify-center rounded-full bg-sg-red font-display text-sm font-semibold text-white">
          {avatar ? (
            <img src={avatar} alt={`${name} avatar`} className="h-full w-full object-cover" />
          ) : (
            name.charAt(0)
          )}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-sg-dark-ink">
            {name}
          </span>
          <span className="block truncate text-xs text-sg-dark-muted">{business}</span>
        </span>
      </figcaption>
      {reply && (
        <p className="mt-4 border-t border-dashed border-sg-line-light pt-3 text-[0.8rem] leading-relaxed text-sg-dark-muted">
          <b className="font-semibold text-sg-red">Star Growth Hub —</b> {reply}
        </p>
      )}
    </figure>
  );
}

function MarqueeColumn({
  items,
  duration,
  reverse = false,
}: {
  items: typeof testimonials;
  duration: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex flex-col gap-4"
        animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((t, i) => (
          <Card key={`${t.name}-${i}`} {...t} />
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-sg-paper py-24 lg:py-32">
      <LeafPattern />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="sg-eyebrow mb-4 justify-center text-sg-red">In their words</p>
          <SplitWords
            text="Clients talk in results, not adjectives."
            as="h2"
            highlight={["results"]}
            className="font-display text-3xl font-semibold text-sg-dark-ink md:text-5xl"
          />
          <p className="mx-auto mt-5 max-w-lg text-sg-dark-muted">
            Real messages from the businesses Star Growth Hub runs marketing for —
            jewellery showrooms, gyms, academies and D2C brands across Bengaluru.
          </p>
        </div>

        {/* Three drifting columns, masked top and bottom */}
        <div
          className="relative grid max-h-[600px] grid-cols-1 gap-4 overflow-hidden md:grid-cols-2 lg:grid-cols-3"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <MarqueeColumn items={columnFor(0)} duration={34} />
          <MarqueeColumn items={columnFor(1)} duration={42} reverse />
          <div className="hidden lg:block">
            <MarqueeColumn items={columnFor(2)} duration={38} />
          </div>
        </div>
      </div>
    </section>
  );
}
