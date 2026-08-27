"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { companies } from "@/lib/companies";
import { CompanyLogo } from "./company-logo";

// Each column reads as a gentle crescent hugging the left/right edge: the
// `offset` (distance in from the edge) is largest at the top and bottom of
// the column — curling those cards in toward the headline — and smallest at
// the vertical middle, where the card sits out near the edge. That bows the
// whole stack inward like the arc of a circle wrapping around the text,
// instead of a straight line.
const cardDetails = [
  // Row 1
  { slug: "star-gardens", eyebrow: "Landscaping", tagline: "Landscape & Plants on Hire", side: "left", offset: "19%", top: "12%", delay: 0 },
  { slug: "starline-solutions", eyebrow: "Operations & Support", tagline: "Shared Group Infrastructure", side: "right", offset: "19%", top: "12%", delay: 0 },
  // Row 2
  { slug: "star-production-house", eyebrow: "Media & Cinema", tagline: "Commercials & 4K Cinema", side: "left", offset: "11%", top: "30%", delay: 0.12 },
  { slug: "star-tech-india", eyebrow: "Software & Systems", tagline: "Web, App & WhatsApp CRM", side: "right", offset: "11%", top: "30%", delay: 0.12 },
  // Row 3
  { slug: "star-spaces", eyebrow: "Smart Interiors", tagline: "Modular Kitchens & Living", side: "left", offset: "7%", top: "48%", delay: 0.24 },
  { slug: "star-growth-hub", eyebrow: "Marketing & Growth", tagline: "SEO, Performance & Paid Media", side: "right", offset: "7%", top: "48%", delay: 0.24 },
  // Row 4
  { slug: "star-infra-developers", eyebrow: "Infrastructure Development", tagline: "Roads, Utilities & Site Works", side: "left", offset: "11%", top: "66%", delay: 0.36 },
  { slug: "mac-reality", eyebrow: "Real Estate", tagline: "Residential & Commercial", side: "right", offset: "11%", top: "66%", delay: 0.36 },
  // Row 5
  { slug: "star-capital-venture", eyebrow: "Venture Capital", tagline: "Seed & Growth Funding", side: "left", offset: "19%", top: "84%", delay: 0.48 },
  { slug: "starline-import-export", eyebrow: "Import & Export", tagline: "Global Sourcing & Freight", side: "right", offset: "19%", top: "84%", delay: 0.48 },
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

export function HeroCompanyCards({ skipIntro = false }: { skipIntro?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden xl:block">
      {cardDetails.map((detail) => {
        const company = companies.find((item) => item.slug === detail.slug);
        if (!company) return null;

        return (
          <HeroCompanyCard
            key={company.slug}
            company={company}
            detail={detail}
            skipIntro={skipIntro}
          />
        );
      })}
    </div>
  );
}

function HeroCompanyCard({
  company,
  detail,
  skipIntro,
}: {
  company: (typeof companies)[number];
  detail: (typeof cardDetails)[number];
  skipIntro: boolean;
}) {
  const [hasPoppedOut, setHasPoppedOut] = useState(skipIntro);

  return (
    <motion.div
      initial={
        skipIntro
          ? false
          : {
              opacity: 0,
              scale: 0,
              x:
                detail.side === "left"
                  ? `calc(50vw - ${parseFloat(detail.offset)}vw - 50%)`
                  : `calc(-50vw + ${parseFloat(detail.offset)}vw + 50%)`,
              y: `calc(50vh - ${parseFloat(detail.top)}vh - 50%)`,
            }
      }
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={
        skipIntro
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 110,
              damping: 18,
              delay: 0.65 + detail.delay,
            }
      }
      onAnimationComplete={() => setHasPoppedOut(true)}
      style={
        detail.side === "left"
          ? { left: detail.offset, top: detail.top }
          : { right: detail.offset, top: detail.top }
      }
      className="pointer-events-auto absolute w-[clamp(8.5rem,11vw,13rem)]"
    >
      <RandomDrift enabled={hasPoppedOut}>
        <Link href={`/companies/${company.slug}`} className="group block">
          <div className="rounded-xl border border-sg-line-light bg-white/95 p-2 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.14)] backdrop-blur-md transition-all duration-300 hover:border-sg-red/60 hover:shadow-[0_15px_32px_-12px_rgba(224,20,44,0.3)]">
            <div className="mb-0.5 flex items-center justify-between gap-1.5">
              <span className="flex items-center gap-1 font-mono text-[0.46rem] font-semibold tracking-wider text-sg-dark-muted uppercase">
                <span className="h-1 w-1 rounded-full bg-sg-dark-ink/25" />
                {detail.eyebrow}
              </span>
              <ArrowUpRight className="h-2.5 w-2.5 shrink-0 text-sg-dark-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sg-red" />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                <CompanyLogo company={company} className="h-full w-full" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-[0.72rem] font-bold text-sg-dark-ink transition-colors group-hover:text-sg-red">
                  {company.name}
                </h3>
                <p className="truncate text-[0.58rem] font-medium text-sg-red">
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
      {cardDetails.map((detail) => {
        const company = companies.find((item) => item.slug === detail.slug);
        if (!company) return null;

        return (
          <div key={company.slug}>
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
          </div>
        );
      })}
    </div>
  );
}
