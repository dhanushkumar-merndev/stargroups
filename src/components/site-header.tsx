"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { companies, GROUP_LOGO } from "@/lib/companies";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/companies", label: "Companies" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = () => {
    setMenuOpen(false);
    setMobileOpen(false);
  };

  // Ensure sidebar is closed whenever the route changes
  useEffect(() => {
    closeAll();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
          "fixed inset-x-0 top-0 z-50 border-b border-sg-line-light bg-white transition-all duration-300 lg:border-transparent lg:bg-transparent",
          scrolled
            ? "lg:bg-white/95 lg:backdrop-blur-xl lg:border-sg-line-light lg:shadow-[0_1px_20px_-10px_rgba(0,0,0,0.3)]"
            : "lg:bg-gradient-to-b lg:from-white/90 lg:to-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
          {/* Brand */}
          <Link
            href="/"
            onClick={closeAll}
            className="group flex items-center gap-2.5"
          >
            <motion.span
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex h-8 w-8 shrink-0 items-center justify-center"
            >
              <Image
                src={GROUP_LOGO}
                alt="Star Groups"
                width={32}
                height={32}
                priority
                className="h-full w-full object-contain"
              />
            </motion.span>
            <span className="font-display text-[1.05rem] font-bold tracking-tight text-sg-dark-ink">
              STAR GROUPS
            </span>
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
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-sg-line-light bg-white/97 p-2.5 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.35)] backdrop-blur-xl">
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
                            <span className="w-4 shrink-0 font-mono text-xs text-sg-red">
                              {c.letter}
                            </span>
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
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="text-sg-dark-ink lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-white px-6 pb-16 pt-24 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
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
                  <span className="w-4 font-mono text-xs text-sg-red">
                    {c.letter}
                  </span>
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
