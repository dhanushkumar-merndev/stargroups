import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
            <Reveal key={c.slug} delay={0.04 * (i % 3)}>
              <Link
                href={`/companies/${c.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-sg-line-light bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-sg-red hover:shadow-[0_24px_50px_-24px_rgba(224,20,44,0.55)]"
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
                {/* Ghost letter */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-7 select-none font-display text-[7rem] font-bold leading-none text-sg-dark-ink/[0.045] transition-all duration-500 group-hover:text-sg-red/[0.14]"
                >
                  {c.letter}
                </span>

                <div className="relative flex items-start justify-between">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <CompanyLogo company={c} className="h-full w-full" />
                  </span>
                  {c.website && (
                    <ArrowUpRight className="h-4 w-4 text-sg-dark-muted opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  )}
                </div>

                <span className="relative mt-6 block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-sg-red">
                  {c.letter} · {c.letterName}
                </span>
                <h3 className="relative mt-2 font-display text-xl font-semibold text-sg-dark-ink">
                  {c.name}
                </h3>
                <p className="relative mt-1 text-[0.78rem] uppercase tracking-wide text-sg-dark-muted/85">
                  {c.sector}
                </p>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-sg-dark-muted">
                  {c.summary}
                </p>

                <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sg-red">
                  Explore
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
