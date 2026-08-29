import type { Metadata } from "next";
import { CompaniesGrid } from "@/components/companies-grid";
import { Ticker } from "@/components/ticker";
import { companies, flagships } from "@/lib/companies";
import { Reveal, SplitWords } from "@/components/animated-text";

export const metadata: Metadata = {
  title: "Companies",
  description:
    "The full Star Groups family — real estate, infrastructure, interiors, technology, landscaping, trade, heavy equipment and growth marketing.",
};

export default function CompaniesPage() {
  return (
    <>
      <section className="sg-grain relative overflow-hidden bg-white pb-16 pt-24 lg:pb-20 lg:pt-28">
        <div
          aria-hidden="true"
          className="sg-gridlines pointer-events-none absolute inset-0"
        />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="sg-eyebrow mb-6 text-sg-red">The Constellation</p>
          <SplitWords
            text={`${companies.length} companies. ${flagships.length} live brands. One group.`}
            as="h1"
            trigger={false}
            delay={0.1}
            highlight={["one", "group."]}
            className="max-w-[18ch] font-display text-[clamp(2.4rem,6.5vw,4.8rem)] font-semibold text-sg-dark-ink"
          />
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-sg-dark-muted">
              Each company below runs independently — its own team, its own clients, its
              own accountability. What they share is a standard, a city, and the ability
              to hand a project to a sister company without anything falling through the
              gap.
            </p>
          </Reveal>
        </div>
      </section>

      <Ticker />
      <CompaniesGrid heading="Every star in the group." eyebrow="Browse" />
    </>
  );
}
