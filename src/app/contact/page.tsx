import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  companies,
  GROUP_ADDRESS,
  GROUP_EMAIL,
  GROUP_HOURS,
  GROUP_PHONE,
} from "@/lib/companies";
import { CompanyLogo } from "@/components/company-logo";
import { Reveal, SplitWords } from "@/components/animated-text";
import { LeafPattern } from "@/components/leaf-pattern";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Star Groups — one Bengaluru address for property, interiors, landscaping, software and growth marketing.",
};

const whatsapp = `https://wa.me/${GROUP_PHONE.replace(/\D/g, "")}`;

export default function ContactPage() {
  return (
    <>
      <section className="sg-grain relative overflow-hidden bg-white pb-20 pt-36 lg:pb-28 lg:pt-44">
        <div
          aria-hidden="true"
          className="sg-gridlines pointer-events-none absolute inset-0"
        />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="sg-eyebrow mb-6 text-sg-red">Contact</p>
          <SplitWords
            text="Tell us what you're building."
            as="h1"
            trigger={false}
            delay={0.1}
            highlight={["building."]}
            className="max-w-[15ch] font-display text-[clamp(2.4rem,6.5vw,4.8rem)] font-semibold text-sg-dark-ink"
          />
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-[54ch] text-lg leading-relaxed text-sg-dark-muted">
              One message reaches the whole group. Tell us roughly what you need and
              we&apos;ll put the right company in front of you — usually the same day.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            {/* Direct channels */}
            <Reveal>
              <div className="space-y-3">
                <a
                  href={`mailto:${GROUP_EMAIL}`}
                  className="group flex items-center gap-5 rounded-2xl border border-sg-line-light bg-white p-6 transition-all duration-400 hover:-translate-y-1 hover:border-sg-red hover:shadow-[0_24px_50px_-28px_rgba(224,20,44,0.5)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sg-red-tint text-sg-red transition-colors duration-300 group-hover:bg-sg-red group-hover:text-white">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-sg-dark-muted">
                      Email
                    </span>
                    <span className="block truncate font-medium text-sg-dark-ink">
                      {GROUP_EMAIL}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-sg-dark-muted transition-all group-hover:text-sg-red" />
                </a>

                <a
                  href={`tel:${GROUP_PHONE.replace(/\s/g, "")}`}
                  className="group flex items-center gap-5 rounded-2xl border border-sg-line-light bg-white p-6 transition-all duration-400 hover:-translate-y-1 hover:border-sg-red hover:shadow-[0_24px_50px_-28px_rgba(224,20,44,0.5)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sg-red-tint text-sg-red transition-colors duration-300 group-hover:bg-sg-red group-hover:text-white">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-sg-dark-muted">
                      Phone
                    </span>
                    <span className="block font-medium text-sg-dark-ink">
                      {GROUP_PHONE}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-sg-dark-muted transition-all group-hover:text-sg-red" />
                </a>

                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-2xl border border-sg-line-light bg-white p-6 transition-all duration-400 hover:-translate-y-1 hover:border-sg-red hover:shadow-[0_24px_50px_-28px_rgba(224,20,44,0.5)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sg-red-tint text-sg-red transition-colors duration-300 group-hover:bg-sg-red group-hover:text-white">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-sg-dark-muted">
                      WhatsApp
                    </span>
                    <span className="block font-medium text-sg-dark-ink">
                      Message the team
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-sg-dark-muted transition-all group-hover:text-sg-red" />
                </a>
              </div>
            </Reveal>

            {/* Address block */}
            <Reveal delay={0.12}>
              <div className="rounded-2xl border border-sg-line-light bg-sg-paper p-8">
                <p className="sg-eyebrow mb-6 text-sg-red">The office</p>
                <p className="flex items-start gap-4 text-sg-dark-ink">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-sg-red" />
                  <span className="leading-relaxed">{GROUP_ADDRESS}</span>
                </p>
                <p className="mt-5 flex items-center gap-4 text-sg-dark-ink">
                  <Clock className="h-5 w-5 shrink-0 text-sg-red" />
                  {GROUP_HOURS}
                </p>
                <p className="mt-6 border-t border-sg-line-light pt-5 text-sm leading-relaxed text-sg-dark-muted">
                  Every company in the group works out of this address, so a single visit
                  can cover a property question, an interiors quote and a marketing plan.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Route to a specific company */}
      <section className="relative border-t border-sg-line-light bg-sg-paper py-24 lg:py-28">
        <LeafPattern />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="sg-eyebrow mb-5 text-sg-red">Straight to the source</p>
            <SplitWords
              text="Or go direct to a company."
              as="h2"
              highlight={["direct"]}
              className="font-display text-3xl font-semibold text-sg-dark-ink md:text-4xl"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((c, i) => (
              <Reveal key={c.slug} delay={0.04 * (i % 3)}>
                <Link
                  href={`/companies/${c.slug}`}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-sg-line-light bg-white p-5 transition-all duration-400 hover:-translate-y-1 hover:border-sg-red hover:shadow-[0_20px_40px_-28px_rgba(224,20,44,0.6)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                    <CompanyLogo company={c} className="h-full w-full" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-sg-dark-ink transition-colors group-hover:text-sg-red">
                      {c.name}
                    </span>
                    <span className="block truncate text-xs text-sg-dark-muted">
                      {c.sector}
                    </span>
                  </span>
                  <span className="shrink-0 text-sg-red transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
