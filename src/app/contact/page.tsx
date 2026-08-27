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
import { EnquiryForm } from "@/app/enquiry/enquiry-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Star Groups — one Bengaluru address for property, interiors, landscaping, software and growth marketing.",
};

const whatsapp = `https://wa.me/${GROUP_PHONE.replace(/\D/g, "")}`;

export default function ContactPage() {
  return (
    <>
      <section className="sg-grain relative overflow-hidden bg-sg-paper pb-20 pt-36 lg:pb-28 lg:pt-44">
        {/* Background Decorative Gridlines & Ambient Glows */}
        <div
          aria-hidden="true"
          className="sg-gridlines pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-rose-500/10 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 -left-20 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-blue-500/5 blur-[150px]"
        />

        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="sg-eyebrow sg-eyebrow-lg mb-4 sm:mb-5 text-sg-red">Start a conversation</p>
            <SplitWords
              text="Tell us what you're building."
              as="h1"
              trigger={false}
              delay={0.1}
              highlight={["building."]}
              className="max-w-[15ch] font-display text-3xl font-bold text-sg-dark-ink sm:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.25}>
              <p className="mt-4 sm:mt-6 max-w-[52ch] text-base sm:text-lg leading-relaxed text-sg-dark-muted">
                One message reaches the whole group. Tell us what you need and
                we&apos;ll put the right venture in front of you — usually the same day.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10 xl:gap-12">
            {/* Main Enquiry Form with Apple Glassmorphic Styling */}
            <Reveal>
              <EnquiryForm />
            </Reveal>

            {/* Direct channels with Apple Glassmorphic styling */}
            <Reveal delay={0.12}>
              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between rounded-[24px] sm:rounded-[28px] border border-white/80 bg-gradient-to-b from-white/90 via-white/80 to-white/65 p-5 sm:p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-black/[0.04] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-white/95 hover:shadow-[0_24px_50px_-20px_rgba(16,185,129,0.25),inset_0_1px_0_rgba(255,255,255,1)]"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/70 text-emerald-600 border border-emerald-200/60 shadow-[0_4px_12px_-4px_rgba(16,185,129,0.2),inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-300 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white">
                      <MessageCircle className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-sg-dark-muted">
                        Direct Chat
                      </span>
                      <span className="block font-display text-base font-bold text-sg-dark-ink transition-colors group-hover:text-emerald-600">
                        Message on WhatsApp
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md">
                    Fastest
                  </span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${GROUP_EMAIL}`}
                  className="group relative flex items-center justify-between rounded-[24px] sm:rounded-[28px] border border-white/80 bg-gradient-to-b from-white/90 via-white/80 to-white/65 p-5 sm:p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-black/[0.04] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-sg-red/40 hover:bg-white/95 hover:shadow-[0_24px_50px_-20px_rgba(224,20,44,0.25),inset_0_1px_0_rgba(255,255,255,1)]"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <span className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sg-red-tint to-rose-100/60 text-sg-red border border-sg-red/15 shadow-[0_4px_12px_-4px_rgba(224,20,44,0.2),inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-300 group-hover:scale-105 group-hover:bg-sg-red group-hover:text-white">
                      <Mail className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-sg-dark-muted">
                        Official Email
                      </span>
                      <span className="block truncate text-sm sm:text-base font-medium text-sg-dark-ink transition-colors group-hover:text-sg-red">
                        {GROUP_EMAIL}
                      </span>
                    </span>
                  </div>
                  <ArrowUpRight className="ml-2 h-4 w-4 shrink-0 text-sg-dark-muted/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sg-red" />
                </a>

                {/* Phone */}
                <a
                  href={`tel:${GROUP_PHONE.replace(/\s/g, "")}`}
                  className="group relative flex items-center justify-between rounded-[24px] sm:rounded-[28px] border border-white/80 bg-gradient-to-b from-white/90 via-white/80 to-white/65 p-5 sm:p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-black/[0.04] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-sg-red/40 hover:bg-white/95 hover:shadow-[0_24px_50px_-20px_rgba(224,20,44,0.25),inset_0_1px_0_rgba(255,255,255,1)]"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sg-red-tint to-rose-100/60 text-sg-red border border-sg-red/15 shadow-[0_4px_12px_-4px_rgba(224,20,44,0.2),inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-300 group-hover:scale-105 group-hover:bg-sg-red group-hover:text-white">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-sg-dark-muted">
                        Direct Phone Line
                      </span>
                      <span className="block font-display text-base font-bold text-sg-dark-ink transition-colors group-hover:text-sg-red">
                        {GROUP_PHONE}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-sg-dark-muted/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sg-red" />
                </a>

                {/* Headquarters Address Block */}
                <div className="relative rounded-[24px] sm:rounded-[28px] border border-white/80 bg-gradient-to-b from-white/90 via-white/80 to-white/65 p-6 sm:p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-black/[0.04] backdrop-blur-2xl">
                  <p className="flex items-start gap-3.5 text-sm leading-relaxed text-sg-dark-ink">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sg-red-tint text-sg-red border border-sg-red/10">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span className="text-sg-dark-muted">
                      <strong className="font-semibold text-sg-dark-ink">Headquarters:</strong>{" "}
                      {GROUP_ADDRESS}
                    </span>
                  </p>
                  <div className="mt-5 border-t border-black/[0.06] pt-4">
                    <p className="flex items-center gap-3.5 text-xs text-sg-dark-muted">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-sg-red">
                        <Clock className="h-3.5 w-3.5" />
                      </span>
                      <span>
                        <strong className="font-semibold text-sg-dark-ink">Hours:</strong> {GROUP_HOURS}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Route to a specific company */}
      <section className="relative border-t border-sg-line-light bg-sg-paper py-20 lg:py-28">
        <LeafPattern />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-10 sm:mb-12 max-w-2xl">
            <p className="sg-eyebrow mb-4 sm:mb-5 text-sg-red">Straight to the source</p>
            <SplitWords
              text="Or go direct to a company."
              as="h2"
              highlight={["direct"]}
              className="font-display text-3xl font-semibold text-sg-dark-ink md:text-4xl"
            />
          </div>

          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((c, i) => (
              <Reveal key={c.slug} delay={0.04 * (i % 3)}>
                <Link
                  href={`/companies/${c.slug}`}
                  className="group relative flex h-full items-center gap-4 rounded-[22px] border border-white/80 bg-gradient-to-b from-white/90 via-white/80 to-white/65 p-5 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-black/[0.03] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sg-red/40 hover:bg-white/95 hover:shadow-[0_20px_40px_-20px_rgba(224,20,44,0.3),inset_0_1px_0_rgba(255,255,255,1)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/[0.03] p-1">
                    <CompanyLogo company={c} className="h-full w-full" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-sg-dark-ink transition-colors group-hover:text-sg-red">
                      {c.name}
                    </span>
                    <span className="block truncate text-xs text-sg-dark-muted">
                      {c.sector}
                    </span>
                  </span>
                  <span className="shrink-0 font-bold text-sg-red transition-transform duration-300 group-hover:translate-x-1">
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
