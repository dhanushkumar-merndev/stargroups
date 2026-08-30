"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { companies } from "@/lib/companies";
import { Reveal, SplitWords } from "./animated-text";
import { LeafPattern } from "./leaf-pattern";
import { CompanyInteractiveCard } from "./company-interactive-card";

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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((c, i) => (
            <Reveal
              key={c.slug}
              delay={0.04 * (i % 3)}
              className={i > 2 && !showAllOnMobile ? "hidden sm:block" : undefined}
            >
              <CompanyInteractiveCard company={c} index={i} />
            </Reveal>
          ))}
        </div>

        {companies.length > 3 && (
          <div className="mt-7 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => setShowAllOnMobile((visible) => !visible)}
              aria-expanded={showAllOnMobile}
              className="inline-flex items-center gap-2 bg-transparent px-5 py-2.5 text-sm font-semibold text-sg-dark-ink"
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
