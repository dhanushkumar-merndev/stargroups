import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  GROUP_ADDRESS,
  GROUP_EMAIL,
  GROUP_HOURS,
  GROUP_PHONE,
} from "@/lib/companies";
import { Reveal, SplitWords } from "@/components/animated-text";
import { EnquiryForm } from "./enquiry-form";

export const metadata: Metadata = {
  title: "Enquiry",
  description:
    "Send Star Groups an enquiry — property, interiors, landscaping, software or growth marketing, all from one Bengaluru address.",
};

const whatsapp = `https://wa.me/${GROUP_PHONE.replace(/\D/g, "")}`;

export default function EnquiryPage() {
  return (
    <section className="sg-grain relative overflow-hidden bg-sg-paper pb-24 pt-36 lg:pb-32 lg:pt-44">
      <div
        aria-hidden="true"
        className="sg-gridlines pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="sg-eyebrow sg-eyebrow-lg mb-5 text-sg-red">Start a conversation</p>
          <SplitWords
            text="Tell us what you're building."
            as="h1"
            trigger={false}
            delay={0.1}
            highlight={["building."]}
            className="max-w-[15ch] font-display text-4xl font-bold text-sg-dark-ink sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-sg-dark-muted">
              One form reaches the whole group. Pick the company closest to what you
              need — if it turns out to be the wrong one, we&apos;ll route it internally.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <Reveal>
            <EnquiryForm />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-4">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-3xl border border-sg-line-light/90 bg-white/95 p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sg-red hover:shadow-[0_20px_40px_-24px_rgba(224,20,44,0.4)]"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <MessageCircle className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-sg-dark-muted">
                      Direct Chat
                    </span>
                    <span className="block font-display text-base font-bold text-sg-dark-ink transition-colors group-hover:text-sg-red">
                      Message on WhatsApp
                    </span>
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  Fastest
                </span>
              </a>

              <a
                href={`mailto:${GROUP_EMAIL}`}
                className="group flex items-center gap-4 rounded-3xl border border-sg-line-light/90 bg-white/95 p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sg-red hover:shadow-[0_20px_40px_-24px_rgba(224,20,44,0.4)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sg-red-tint text-sg-red border border-sg-red/10 transition-colors group-hover:bg-sg-red group-hover:text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-sg-dark-muted">
                    Official Email
                  </span>
                  <span className="block truncate font-medium text-sg-dark-ink text-sm sm:text-base transition-colors group-hover:text-sg-red">
                    {GROUP_EMAIL}
                  </span>
                </span>
              </a>

              <a
                href={`tel:${GROUP_PHONE.replace(/\s/g, "")}`}
                className="group flex items-center gap-4 rounded-3xl border border-sg-line-light/90 bg-white/95 p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sg-red hover:shadow-[0_20px_40px_-24px_rgba(224,20,44,0.4)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sg-red-tint text-sg-red border border-sg-red/10 transition-colors group-hover:bg-sg-red group-hover:text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-sg-dark-muted">
                    Direct Phone Line
                  </span>
                  <span className="block font-display text-base font-bold text-sg-dark-ink transition-colors group-hover:text-sg-red">
                    {GROUP_PHONE}
                  </span>
                </span>
              </a>

              <div className="rounded-3xl border border-sg-line-light/90 bg-white/95 p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] backdrop-blur-sm">
                <p className="flex items-start gap-3.5 text-sm leading-relaxed text-sg-dark-ink">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-sg-red" />
                  <span className="text-sg-dark-muted"><strong className="text-sg-dark-ink font-semibold">Headquarters:</strong> {GROUP_ADDRESS}</span>
                </p>
                <div className="mt-5 border-t border-sg-line-light/70 pt-4">
                  <p className="flex items-center gap-3.5 text-xs text-sg-dark-muted">
                    <Clock className="h-4 w-4 shrink-0 text-sg-red" />
                    <span><strong className="text-sg-dark-ink font-semibold">Hours:</strong> {GROUP_HOURS}</span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
