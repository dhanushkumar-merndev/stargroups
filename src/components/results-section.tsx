import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/testimonials";
import { Reveal, SplitWords } from "./animated-text";
import { LeafPattern } from "./leaf-pattern";

export function ResultsSection() {
  return (
    <section className="relative bg-white py-24 lg:py-32">
      <LeafPattern />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="sg-eyebrow mb-5 text-sg-red">Recent work</p>
            <SplitWords
              text="Numbers, not adjectives."
              as="h2"
              highlight={["numbers"]}
              className="font-display text-3xl font-semibold text-sg-dark-ink md:text-5xl"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[46ch] text-sg-dark-muted">
                Star Growth Hub reports on enquiries and cost per lead, not impressions
                and reach. A sample of what that has produced for clients across
                Bengaluru.
              </p>
              <Link
                href="/companies/star-growth-hub"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-sg-red"
              >
                See how Star Growth Hub works
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.sector} delay={0.06 * i}>
                <article className="group h-full rounded-2xl border border-sg-line-light bg-sg-paper p-7 transition-all duration-500 hover:border-sg-red hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(224,20,44,0.5)]">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-sg-red">
                    {cs.sector}
                  </span>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-sg-dark-ink">
                    {cs.result}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
