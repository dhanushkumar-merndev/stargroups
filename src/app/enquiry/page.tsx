import { Clock, MapPin } from "lucide-react";
import { GROUP_ADDRESS, GROUP_HOURS } from "@/lib/companies";
import { Reveal, SplitWords } from "@/components/animated-text";
import { EnquiryForm } from "./enquiry-form";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Enquiry",
  description:
    "Send Star Groups an enquiry — property, interiors, landscaping, software or growth marketing, all from one Bengaluru address.",
  path: "/enquiry",
});

export default function EnquiryPage() {
  return (
    <section className="sg-grain relative overflow-hidden bg-sg-paper pb-24 pt-24 lg:pb-32 lg:pt-28">
      {/* Background Decorative Gridlines */}
      <div
        aria-hidden="true"
        className="sg-gridlines pointer-events-none absolute inset-0"
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
              One form reaches the whole group. Pick the company closest to what you
              need — if it turns out to be the wrong one, we&apos;ll route it internally.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10 xl:gap-12">
          {/* Main Enquiry Form with Apple Glassmorphic Styling */}
          <Reveal>
            <EnquiryForm />
          </Reveal>

          {/* Office info */}
          <Reveal delay={0.12}>
            <div className="space-y-4">
              {/* Headquarters & Hours Card */}
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
  );
}
