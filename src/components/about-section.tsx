import { companies, flagships } from "@/lib/companies";
import { CountUp, Reveal, SplitWords } from "./animated-text";
import { LeafPattern } from "./leaf-pattern";

const stats = [
  { value: `${companies.length}`, label: "Companies in the group" },
  { value: `${flagships.length}`, label: "Live customer-facing brands" },
  { value: "1", label: "In-house growth engine" },
  { value: "1", label: "Address, in Bengaluru" },
];

export function AboutSection() {
  return (
    <section className="relative bg-white py-24 lg:py-32">
      <LeafPattern />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <p className="sg-eyebrow mb-5 text-sg-red">The Group</p>
            <SplitWords
              text="Built like a constellation, not a hierarchy."
              as="h2"
              highlight={["constellation"]}
              className="max-w-[16ch] font-display text-3xl font-semibold text-sg-dark-ink md:text-5xl"
            />
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-[54ch] text-base leading-relaxed text-sg-dark-muted">
                Every company under Star Groups charts its own course — from landscaped
                communities and property development to modular interiors, custom software
                and growth marketing. What holds them together isn&apos;t an org chart.
                It&apos;s a shared standard for how work gets done.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-sg-dark-muted">
                The practical effect is simple: a single property can move from
                development through landscaping and interiors — then get its website, CRM
                and marketing — without ever leaving the group.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 self-center">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.08 * i}>
                <div className="border-l-2 border-sg-red/25 pl-5">
                  <div className="font-display text-4xl font-semibold text-sg-red md:text-5xl">
                    <CountUp value={s.value} />
                  </div>
                  <div className="mt-1.5 text-[0.8rem] leading-snug text-sg-dark-muted">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
