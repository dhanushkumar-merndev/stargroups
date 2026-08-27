"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { companies } from "@/lib/companies";
import { CompanyLogo } from "./company-logo";
import { Reveal, SplitWords } from "./animated-text";
import { LeafPattern } from "./leaf-pattern";

export function CompaniesGrid({
  heading = "Every star in the group.",
  eyebrow = "The Companies",
  intro,
}: {
  heading?: string;
  eyebrow?: string;
  intro?: string;
}) {
  const [showAllOnMobile, setShowAllOnMobile] = useState(false);

  return (
    <section className="relative bg-sg-paper py-24 lg:py-32">
      <LeafPattern />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="sg-eyebrow mb-5 text-sg-red">{eyebrow}</p>
          <SplitWords
            text={heading}
            as="h2"
            highlight={["star", "group."]}
            className="font-display text-3xl font-semibold text-sg-dark-ink md:text-5xl"
          />
          {intro && (
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-[56ch] text-sg-dark-muted">{intro}</p>
            </Reveal>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((c, i) => (
            <Reveal
              key={c.slug}
              delay={0.04 * (i % 3)}
              className={i > 2 && !showAllOnMobile ? "hidden sm:block" : undefined}
            >
              <Link
                href={`/companies/${c.slug}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-sg-line-light bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-sg-red hover:shadow-[0_24px_50px_-24px_rgba(224,20,44,0.55)] sm:aspect-square sm:rounded-3xl sm:p-7"
              >
                {/* Hover wash */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 85% 0%, rgba(224,20,44,0.09), transparent 62%)",
                  }}
                />
                
                {/* Top header: Logo + Link icon */}
                <div className="relative flex items-start justify-between">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center transition-transform duration-500 group-hover:scale-110 sm:h-12 sm:w-12">
                    <CompanyLogo company={c} className="h-full w-full" />
                  </span>
                  {c.website && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sg-paper transition-all duration-300 group-hover:bg-sg-red/10 group-hover:text-sg-red sm:h-8 sm:w-8">
                      <ArrowUpRight className="h-3.5 w-3.5 text-sg-dark-muted transition-colors group-hover:text-sg-red sm:h-4 sm:w-4" />
                    </span>
                  )}
                </div>

                {/* Middle info */}
                <div className="relative my-auto py-2">
                  <h3 className="font-display text-lg font-bold text-sg-dark-ink sm:text-xl">
                    {c.name}
                  </h3>
                  <p className="mt-0.5 font-mono text-[0.72rem] uppercase tracking-wider text-sg-dark-muted/85">
                    {c.sector}
                  </p>
                  <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-sg-dark-muted sm:mt-3 sm:line-clamp-4 sm:text-sm">
                    {c.summary}
                  </p>
                </div>

                {/* Bottom CTA */}
                <div className="relative mt-auto pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sg-red sm:text-sm">
                    Explore
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {companies.length > 3 && (
          <div className="mt-7 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => setShowAllOnMobile((visible) => !visible)}
              aria-expanded={showAllOnMobile}
              className="inline-flex items-center gap-2 rounded-full border border-sg-dark-ink px-5 py-2.5 text-sm font-semibold text-sg-dark-ink transition-colors hover:bg-sg-dark-ink hover:text-white"
            >
              {showAllOnMobile ? "Show less" : `View ${companies.length - 3} more`}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showAllOnMobile ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
