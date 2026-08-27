"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { companies } from "@/lib/companies";
import { CompanyLogo } from "./company-logo";

const cardDetails = [
  { slug: "star-growth-hub", eyebrow: "Marketing & Growth", tagline: "SEO, Performance & Paid Media", side: "left", offset: "12%", top: "14%", delay: 0 },
  { slug: "star-tech-india", eyebrow: "Software & Systems", tagline: "Web, App & WhatsApp CRM", side: "left", offset: "6%", top: "36%", delay: 0.12 },
  { slug: "star-spaces", eyebrow: "Smart Interiors", tagline: "Modular Kitchens & Living", side: "left", offset: "6%", top: "57%", delay: 0.24 },
  { slug: "star-gardens", eyebrow: "Landscaping", tagline: "Landscape & Plants on Hire", side: "left", offset: "12%", top: "77%", delay: 0.36 },
  { slug: "mac-reality", eyebrow: "Real Estate", tagline: "Residential & Commercial", side: "right", offset: "12%", top: "14%", delay: 0 },
  { slug: "starline-solutions", eyebrow: "Operations & Support", tagline: "Shared Group Infrastructure", side: "right", offset: "6%", top: "36%", delay: 0.12 },
  { slug: "star-production-house", eyebrow: "Media & Cinema", tagline: "Commercials & 4K Cinema", side: "right", offset: "6%", top: "57%", delay: 0.24 },
  { slug: "star-capital-venture", eyebrow: "Venture Capital", tagline: "Seed & Growth Funding", side: "right", offset: "12%", top: "77%", delay: 0.36 },
] as const;

function RandomDrift({ children, enabled }: { children: ReactNode; enabled: boolean }) {
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !enabled) return;

    let active = true;
    // Let the entrance spring fully settle before this element receives its
    // own transform animation. Starting both at once causes the visible jitter.
    const timer = window.setTimeout(() => {
      const drift = async () => {
        while (active) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 7 + Math.random() * 12;

          await controls.start({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            rotate: (Math.random() - 0.5) * 1.4,
            transition: {
              duration: 2.8 + Math.random() * 1.8,
              ease: "easeInOut",
            },
          });
        }
      };

      void drift();
    }, 1000);

    return () => {
      active = false;
      window.clearTimeout(timer);
      controls.stop();
    };
  }, [controls, enabled, reduceMotion]);

  return <motion.div animate={controls}>{children}</motion.div>;
}

export function HeroCompanyCards() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden xl:block">
      {cardDetails.map((detail) => {
        const company = companies.find((item) => item.slug === detail.slug);
        if (!company) return null;

        return <HeroCompanyCard key={company.slug} company={company} detail={detail} />;
      })}
    </div>
  );
}

function HeroCompanyCard({
  company,
  detail,
}: {
  company: (typeof companies)[number];
  detail: (typeof cardDetails)[number];
}) {
  const [hasPoppedOut, setHasPoppedOut] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
        x:
          detail.side === "left"
            ? `calc(50vw - ${parseFloat(detail.offset)}vw - 50%)`
            : `calc(-50vw + ${parseFloat(detail.offset)}vw + 50%)`,
        y: `calc(50vh - ${parseFloat(detail.top)}vh - 50%)`,
      }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 18,
        delay: 2.65 + detail.delay,
      }}
      onAnimationComplete={() => setHasPoppedOut(true)}
      style={
        detail.side === "left"
          ? { left: detail.offset, top: detail.top }
          : { right: detail.offset, top: detail.top }
      }
      className="pointer-events-auto absolute w-[clamp(11rem,16vw,18rem)]"
    >
      <RandomDrift enabled={hasPoppedOut}>
        <Link href={`/companies/${company.slug}`} className="group block">
          <div className="rounded-2xl border border-sg-line-light bg-white/95 p-3 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.14)] backdrop-blur-md transition-all duration-300 hover:border-sg-red/60 hover:shadow-[0_15px_32px_-12px_rgba(224,20,44,0.3)]">
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-mono text-[0.54rem] font-semibold tracking-wider text-sg-dark-muted uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-sg-dark-ink/25" />
                {detail.eyebrow}
              </span>
              <ArrowUpRight className="h-3 w-3 shrink-0 text-sg-dark-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sg-red" />
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                <CompanyLogo company={company} className="h-full w-full" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-[0.86rem] font-bold text-sg-dark-ink transition-colors group-hover:text-sg-red">
                  {company.name}
                </h3>
                <p className="truncate text-[0.68rem] font-medium text-sg-red">
                  {detail.tagline}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </RandomDrift>
    </motion.div>
  );
}

export function HeroCompanyCardsMobile() {
  return (
    <div className="relative z-20 mt-12 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 xl:hidden">
      {cardDetails.map((detail, index) => {
        const company = companies.find((item) => item.slug === detail.slug);
        if (!company) return null;

        return (
          <motion.div
            key={company.slug}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 17,
              delay: 2.2 + index * 0.08,
            }}
          >
            <Link href={`/companies/${company.slug}`} className="group block text-left">
              <div className="rounded-2xl border border-sg-line-light bg-white/95 p-3 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-sg-red/60 hover:shadow-[0_15px_32px_-12px_rgba(224,20,44,0.3)]">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 font-mono text-[0.6rem] font-semibold tracking-wider text-sg-dark-muted uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-sg-dark-ink/25" />
                    {detail.eyebrow}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-sg-dark-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sg-red" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                    <CompanyLogo company={company} className="h-full w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-display text-[0.92rem] font-bold text-sg-dark-ink transition-colors group-hover:text-sg-red">
                      {company.name}
                    </h3>
                    <p className="truncate text-[0.72rem] font-medium text-sg-red">
                      {detail.tagline}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
