"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { companies } from "@/lib/companies";
import { cn } from "@/lib/utils";
import { getLenis } from "@/components/smooth-scroll";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/companies", label: "Companies" },
  { href: "/contact", label: "Contact" },
];

const mobileNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/companies", label: "Companies" },
  { href: "/contact", label: "Contact" },
];

const navLogos: Record<string, string> = {
  "star-gardens": "/company-logo/star-gardens-logo.png",
  "starline-solutions": "/company-logo/starline-solutions-logo.png",
  "star-production-house": "/company-logo/star-production-house-logo.png",
  "star-tech-india": "/company-logo/star-tech-india-logo.png",
  "star-spaces": "/company-logo/star-spaces-logo.png",
  "star-growth-hub": "/company-logo/star-growth-hub-logo.png",
  "star-infra-developers": "/company-logo/star-infra-developers-logo.png",
  "mac-reality": "/company-logo/mac-reality.png",
  "star-capital-venture": "/company-logo/star-venture-capital-logo.png",
  "starline-import-export": "/company-logo/starline-import-export-logo-v2.png",
};

const navLogoDisplay: Record<string, { className: string; sizes: string }> = {
  "star-gardens": {
    className: "w-[10.3rem] sm:w-[11.1rem]",
    sizes: "(max-width: 640px) 140px, 168px",
  },
  "starline-solutions": {
    className: "w-[9.7rem] sm:w-[10.9rem]",
    sizes: "(max-width: 640px) 155px, 174px",
  },
  "star-production-house": {
    className: "w-[11.8rem] sm:w-[13.3rem]",
    sizes: "(max-width: 640px) 189px, 213px",
  },
  "star-tech-india": {
    className: "w-[8.3rem] sm:w-[9.3rem]",
    sizes: "(max-width: 640px) 133px, 149px",
  },
  "star-spaces": {
    className: "w-[7.6rem] sm:w-[8.5rem]",
    sizes: "(max-width: 640px) 122px, 136px",
  },
  "star-growth-hub": {
    className: "w-[9.3rem] sm:w-[10.5rem]",
    sizes: "(max-width: 640px) 149px, 168px",
  },
  "star-infra-developers": {
    className: "w-[10.8rem] sm:w-[12.2rem]",
    sizes: "(max-width: 640px) 173px, 195px",
  },
  "mac-reality": {
    className: "w-[7rem] sm:w-[7.9rem]",
    sizes: "(max-width: 640px) 112px, 126px",
  },
  "star-capital-venture": {
    className: "w-[10.8rem] sm:w-[12.1rem]",
    sizes: "(max-width: 640px) 173px, 194px",
  },
  "starline-import-export": {
    className: "w-[13rem] sm:w-[15rem]",
    sizes: "(max-width: 640px) 208px, 240px",
  },
};

const navLogoAssets = [
  {
    slug: "star-groups",
    src: "/company-logo/star-groups-logo.png",
    sizes: "(max-width: 640px) 118px, 133px",
  },
  ...Object.entries(navLogos).map(([slug, src]) => ({
    slug,
    src,
    sizes: navLogoDisplay[slug]?.sizes ?? "(max-width: 640px) 118px, 133px",
  })),
];

export function SiteHeader() {
  const pathname = usePathname();

  // Determine logo based on the current page
  const currentCompany = companies.find((c) => pathname === `/companies/${c.slug}`);
  const logoDisplay = currentCompany ? navLogoDisplay[currentCompany.slug] : undefined;
  const activeLogoSlug = currentCompany?.slug ?? "star-groups";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = () => {
    setMenuOpen(false);
    setMobileOpen(false);
  };

  // While momentum scrolling is still running the browser swallows the first
  // tap (it only stops the fling), so the burger used to need two presses.
  // Derive the tap from pointer events instead of relying on `click`.
  const tapStart = useRef<{ x: number; y: number; id: number } | null>(null);
  const ignoreNextClick = useRef(false);

  const onTogglePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse") return;
    tapStart.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  };

  const onTogglePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const start = tapStart.current;
    tapStart.current = null;
    if (!start || start.id !== event.pointerId) return;
    // Treat it as a drag (the user was scrolling), not a tap.
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 10) return;

    ignoreNextClick.current = true;
    window.setTimeout(() => {
      ignoreNextClick.current = false;
    }, 500);
    setMobileOpen((v) => !v);
  };

  const onToggleClick = () => {
    if (ignoreNextClick.current) {
      ignoreNextClick.current = false;
      return;
    }
    setMobileOpen((v) => !v);
  };

  // Ensure sidebar is closed whenever the route changes
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMenuOpen(false);
      setMobileOpen(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    const lenis = getLenis();
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [mobileOpen]);

  // A drawer opened on a phone can otherwise remain logically open if the
  // viewport is resized to desktop, leaving the page scroll-locked.
  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setMobileOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          mobileOpen
            ? "border-b border-sg-line-light bg-white"
            : scrolled
              ? "border-b border-sg-line-light bg-white/95 backdrop-blur-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)]"
              : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2.5 sm:py-4 lg:px-10">
          {/* Brand */}
          <Link
            href="/"
            onClick={closeAll}
            aria-label="Star Groups home"
            className="block"
          >
            <motion.span
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={cn(
                "relative block h-8 origin-left overflow-hidden sm:h-9",
                logoDisplay?.className ?? "w-[7.4rem] sm:w-[8.3rem]",
              )}
            >
              {navLogoAssets.map((logo) => {
                const isActive = logo.slug === activeLogoSlug;
                const logoCompany = companies.find((company) => company.slug === logo.slug);

                return (
                  <Image
                    key={logo.slug}
                    src={logo.src}
                    alt={isActive ? `${logoCompany?.name ?? "Star Groups"} logo` : ""}
                    aria-hidden={!isActive}
                    fill
                    sizes={logo.sizes}
                    preload={isActive}
                    loading={isActive ? undefined : "eager"}
                    fetchPriority={isActive ? "high" : "low"}
                    className={cn(
                      "object-contain object-left mix-blend-multiply",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                );
              })}
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
                className="flex items-center gap-1.5 py-2 text-sm text-sg-dark-muted transition-colors hover:text-sg-dark-ink"
              >
                Companies
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-300",
                    menuOpen && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4"
                  >
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-sg-line-light bg-white p-2.5 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.35)]">
                      {companies.map((c, i) => (
                        <motion.div
                          key={c.slug}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.03 * i, duration: 0.25 }}
                        >
                          <Link
                            href={`/companies/${c.slug}`}
                            onClick={closeAll}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-sg-paper-2"
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[0.86rem] font-medium text-sg-dark-ink transition-colors group-hover:text-sg-red">
                                {c.name}
                              </span>
                              <span className="block truncate text-[0.7rem] text-sg-dark-muted">
                                {c.sector}
                              </span>
                            </span>
                            {c.website && (
                              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-sg-dark-muted opacity-0 transition-all group-hover:opacity-100 group-hover:text-sg-red" />
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks
              .filter((l) => l.label !== "Companies")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAll}
                  className="group relative py-2 text-sm text-sg-dark-muted transition-colors hover:text-sg-dark-ink"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-sg-red transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}

            <Link
              href="/enquiry"
              onClick={closeAll}
              className="rounded-full bg-sg-red px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-sg-red-bright hover:shadow-[0_8px_30px_-6px_rgba(224,20,44,0.6)]"
            >
              Work with us
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onPointerDown={onTogglePointerDown}
            onPointerUp={onTogglePointerUp}
            onPointerCancel={() => (tapStart.current = null)}
            onClick={onToggleClick}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="text-sg-dark-ink lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div
          data-lenis-prevent=""
          className="fixed inset-0 z-40 overscroll-contain overflow-y-auto bg-white px-6 pb-16 pt-24 lg:hidden"
        >
          <nav className="flex flex-col gap-1">
            {mobileNavLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeAll}
                  className="block border-b border-sg-line-light py-4 font-display text-2xl text-sg-dark-ink transition-colors hover:text-sg-red"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          <p className="sg-eyebrow mt-10 mb-3 text-sg-red">The Companies</p>
          <div className="flex flex-col">
            {companies.map((c) => (
              <div key={c.slug}>
                <Link
                  href={`/companies/${c.slug}`}
                  onClick={closeAll}
                  className="flex items-center gap-3 border-b border-sg-line-light py-3.5 transition-colors hover:bg-sg-paper-2"
                >
                  <span className="flex-1">
                    <span className="block text-sm text-sg-dark-ink">{c.name}</span>
                    <span className="block text-[0.7rem] text-sg-dark-muted">{c.sector}</span>
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/enquiry"
              onClick={closeAll}
              className="flex h-12 w-full items-center justify-center rounded-full bg-sg-red text-sm font-semibold text-white transition-all hover:bg-sg-red-bright hover:shadow-[0_8px_30px_-6px_rgba(224,20,44,0.6)]"
            >
              Work with us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
