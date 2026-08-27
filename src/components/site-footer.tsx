import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import {
  companies,
  GROUP_ADDRESS,
  GROUP_EMAIL,
  GROUP_HOURS,
  GROUP_LOGO,
  GROUP_PHONE,
} from "@/lib/companies";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-sg-line bg-sg-black">
      <div className="relative mx-auto max-w-[1400px] px-6 py-12 lg:px-10 lg:py-14">
        {/* Call to action, carried over from the old standalone band */}
        <div className="mb-10 flex flex-col gap-5 border-b border-sg-line pb-9 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="sg-eyebrow mb-3 text-sg-red-bright">
              Get in touch
            </p>
            <h2 className="max-w-[22ch] font-display text-2xl font-bold text-white md:text-3xl">
              Ready to work with the group?
            </h2>
            <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-sg-muted">
              Whether it&apos;s a property, an interior fit-out, a landscape, a software
              build or growth marketing — tell us what you&apos;re building.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/enquiry"
              className="group inline-flex h-10 items-center gap-2 rounded-full bg-sg-red px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-sg-red-bright hover:shadow-[0_10px_40px_-8px_rgba(224,20,44,0.7)]"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`mailto:${GROUP_EMAIL}`}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-sg-black"
            >
              <Mail className="h-4 w-4" />
              {GROUP_EMAIL}
            </a>
          </div>
        </div>

        <div className="grid gap-10 pb-7 md:pb-12 lg:grid-cols-[1.2fr_1fr_0.7fr_1fr] lg:gap-8">
          {/* Brand + contact */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/5">
                <Image
                  src={GROUP_LOGO}
                  alt="Star Groups"
                  width={36}
                  height={36}
                  className="h-full w-full object-contain brightness-0 invert"
                />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                STAR GROUPS
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-sg-muted">
              A family of {companies.length} companies spanning real estate, interiors,
              landscaping, technology, media, venture capital and growth marketing — each independent, all
              pulling in the same direction.
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <a
                href={`mailto:${GROUP_EMAIL}`}
                className="group flex items-center gap-3 text-sg-muted transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-sg-red" />
                {GROUP_EMAIL}
              </a>
              <a
                href={`tel:${GROUP_PHONE.replace(/\s/g, "")}`}
                className="group flex items-center gap-3 text-sg-muted transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-sg-red" />
                {GROUP_PHONE}
              </a>
              <p className="flex items-start gap-3 text-sg-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sg-red" />
                <span className="max-w-xs leading-relaxed">{GROUP_ADDRESS}</span>
              </p>
            </div>
            <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-widest text-sg-muted/70">
              {GROUP_HOURS}
            </p>
          </div>

          {/* Companies */}
          <div>
            <h3 className="sg-eyebrow mb-4 text-sg-red-bright">The Companies</h3>
            <ul className="space-y-2">
              {companies.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/companies/${c.slug}`}
                    className="group flex items-center gap-2.5 text-sm text-sg-muted transition-colors hover:text-white"
                  >
                    <span className="w-3.5 font-mono text-[0.7rem] text-sg-red/80">
                      {c.letter}
                    </span>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="sg-eyebrow mb-4 text-sg-red-bright">Explore</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About the group" },
                { href: "/companies", label: "All companies" },
                { href: "/contact", label: "Contact" },
                { href: "/enquiry", label: "Send an enquiry" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-sg-muted transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Live sites */}
          <div>
            <h3 className="sg-eyebrow mb-4 text-sg-red-bright">Live Sites</h3>
            <ul className="space-y-2">
              {companies
                .filter((c) => c.website)
                .map((c) => (
                  <li key={c.slug}>
                    <a
                      href={c.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm text-sg-muted transition-colors hover:text-sg-red-bright"
                    >
                      {c.website!.replace("https://", "")}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Give the watermark its own space, then place the divider below it. */}
        <div className="relative hidden h-[clamp(7rem,11vw,13rem)] overflow-hidden md:block">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 w-max -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[10vw] font-bold leading-none tracking-[-0.07em] text-white/[0.025]"
          >
            STAR GROUPS
          </div>
        </div>

        {/* Breakline */}
        <hr className="border-0 border-t border-sg-line" />

        {/* Rest / Copyright */}
        <div className="flex flex-col gap-3 pt-6 text-xs text-sg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Star Groups. A family of {companies.length}{" "}
            companies.
          </p>
          <p className="font-mono uppercase tracking-widest">Bengaluru, India</p>
        </div>
      </div>
    </footer>
  );
}
