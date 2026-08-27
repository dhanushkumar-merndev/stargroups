import type { Metadata } from "next";
import Image from "next/image";
import { AboutSection } from "@/components/about-section";
import { Ticker } from "@/components/ticker";
import { companies } from "@/lib/companies";
import { Reveal, SplitWords } from "@/components/animated-text";
import { LeafPattern } from "@/components/leaf-pattern";

export const metadata: Metadata = {
  title: "About",
  description:
    "Star Groups is a Bengaluru family of companies built like a constellation, not a hierarchy — independent businesses held to one shared standard.",
};

const principles = [
  {
    title: "Independent, not isolated",
    body: "Every company runs its own team, clients and P&L. None of them has to wait on a head office to make a decision — but none of them has to solve a problem alone either.",
  },
  {
    title: "One standard, six businesses",
    body: "A landscaping crew and a software team have almost nothing in common operationally. What they share is what the group actually enforces: show up, quote honestly, and finish what you started.",
  },
  {
    title: "The whole chain, in-house",
    body: "Property, landscaping and interiors, then the website, CRM and marketing that sell them. A project can move through all of it without a single external handoff.",
  },
  {
    title: "Numbers over adjectives",
    body: "The group's marketing company reports on enquiries and cost per lead rather than reach. That habit runs through everything else — measurable commitments, not impressive language.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="sg-grain relative overflow-hidden bg-white pb-16 pt-36 lg:pb-20 lg:pt-44">
        <div
          aria-hidden="true"
          className="sg-gridlines pointer-events-none absolute inset-0"
        />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="sg-eyebrow mb-6 text-sg-red">About</p>
          <SplitWords
            text="A group is only worth building if it makes each company better."
            as="h1"
            trigger={false}
            delay={0.1}
            highlight={["better."]}
            className="max-w-[19ch] font-display text-[clamp(2.2rem,5.6vw,4.4rem)] font-semibold text-sg-dark-ink"
          />
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-sg-dark-muted">
              Star Groups runs {companies.length} companies out of one Bengaluru address,
              and no two of them are in the same business. The structure exists for one
              reason: a client with a piece of land, a brand with no enquiries, or a
              business drowning in spreadsheets should all be able to walk into the same
              building and leave with the right team on it.
            </p>
          </Reveal>
        </div>
      </section>

      <Ticker />
      <AboutSection />

      {/* Founder */}
      <section className="relative bg-white py-24 lg:py-32">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-sg-line-light bg-sg-paper-2 lg:mx-0">
                <Image
                  src="/abhishek-suhas.png"
                  alt="Abhishek Suhas, Founder of Star Groups"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
              </div>
            </Reveal>
            <div>
              <p className="sg-eyebrow mb-5 text-sg-red">The Founder</p>
              <SplitWords
                text="Started with one business. Built to hold many."
                as="h2"
                highlight={["one", "many."]}
                className="max-w-[18ch] font-display text-3xl font-semibold text-sg-dark-ink md:text-5xl"
              />
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-sg-dark-muted">
                  Abhishek Suhas founded Star Groups on a simple bet: that the same
                  standards of speed, honesty and accountability that make one business
                  trustworthy could hold across an entire family of businesses. What began
                  as a single venture grew, one company at a time, into a group spanning
                  real estate, interiors, technology, media and growth marketing — each
                  one independent, all built to the same standard, under one roof.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-6">
                  <p className="font-display text-lg font-semibold text-sg-dark-ink">
                    Abhishek Suhas
                  </p>
                  <p className="text-sm text-sg-dark-muted">Founder, Star Groups</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative bg-sg-paper py-24 lg:py-32">
        <LeafPattern />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-14 max-w-2xl">
            <p className="sg-eyebrow mb-5 text-sg-red">How the group operates</p>
            <SplitWords
              text="Four things that stay true across every company."
              as="h2"
              highlight={["four"]}
              className="font-display text-3xl font-semibold text-sg-dark-ink md:text-5xl"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={0.06 * i}>
                <article className="group h-full rounded-2xl border border-sg-line-light bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-sg-red hover:shadow-[0_24px_50px_-28px_rgba(224,20,44,0.5)]">
                  <span className="font-mono text-[0.7rem] text-sg-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-sg-dark-ink">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-sg-dark-muted">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
