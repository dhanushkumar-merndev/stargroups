import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Phone } from "lucide-react";
import { companies, getCompany, GROUP_ADDRESS } from "@/lib/companies";
import { CompanyLogo } from "@/components/company-logo";
import { CountUp, Reveal, SplitWords } from "@/components/animated-text";
import { LeafPattern } from "@/components/leaf-pattern";
import { ProjectShowcase } from "@/components/project-showcase";
import { StarlineServicesGallery } from "@/components/starline-services-gallery";
import { absoluteUrl, createPageMetadata, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/companies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) return { title: "Company not found" };

  return createPageMetadata({
    title: company.name,
    description: company.summary,
    path: `/companies/${company.slug}`,
  });
}

export default async function CompanyPage({ params }: PageProps<"/companies/[slug]">) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();

  const index = companies.findIndex((c) => c.slug === slug);
  const next = companies[(index + 1) % companies.length];
  const prev = companies[(index - 1 + companies.length) % companies.length];
  const projectCounts = company.projectCounts ?? null;
  const companyStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/companies/${company.slug}#organization`,
    name: company.name,
    url: absoluteUrl(`/companies/${company.slug}`),
    logo: absoluteUrl(company.logo),
    description: company.summary,
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "18, 1st Floor, 80 Feet Road, BSK 1st Stage, Srinivasnagar, Banashankari",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560050",
      addressCountry: "IN",
    },
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
    sameAs: company.website ? [company.website] : undefined,
  };
  const stats = projectCounts
    ? [
        {
          value: String(projectCounts?.finished ?? 0),
          label: "Finished projects",
        },
        {
          value: String(projectCounts?.ongoing ?? 0),
          label: "Ongoing projects",
        },
        {
          value: String(projectCounts?.upcoming ?? 0),
          label: "Upcoming projects",
        },
      ]
    : company.stats;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(companyStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      {/* ---------- Hero ---------- */}
      <section className="sg-grain relative overflow-hidden bg-white pb-20 pt-24 lg:pb-28 lg:pt-28">
        <div
          aria-hidden="true"
          className="sg-gridlines pointer-events-none absolute inset-0"
        />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Link
            href="/companies"
            className="group mb-9 inline-flex items-center gap-2 text-sm text-sg-dark-muted transition-colors hover:text-sg-red"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All companies
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
              <CompanyLogo company={company} className="h-full w-full" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[0.58rem] leading-relaxed uppercase tracking-[0.14em] text-sg-red sm:text-[0.68rem] sm:tracking-[0.2em]">
                {company.sector}
              </p>
            </div>
          </div>

          <SplitWords
            text={company.name}
            as="h1"
            trigger={false}
            delay={0.15}
            className="mt-8 max-w-[16ch] font-display text-[clamp(2rem,8vw,5.2rem)] font-semibold text-sg-dark-ink sm:text-[clamp(2.6rem,7vw,5.2rem)]"
          />

          <Reveal delay={0.3}>
            <p className="mt-4 font-display text-xl italic text-sg-red md:text-2xl">
              {company.tagline}
            </p>
            <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-sg-dark-muted">
              {company.intro}
            </p>

            <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {company.website ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-sg-red px-7 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-sg-red-bright hover:shadow-[0_10px_40px_-8px_rgba(224,20,44,0.6)] sm:w-auto"
                >
                  Visit {company.website.replace("https://", "")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : (
                <Link
                  href="/enquiry"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-sg-red px-7 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-sg-red-bright hover:shadow-[0_10px_40px_-8px_rgba(224,20,44,0.6)] sm:w-auto"
                >
                  Enquire about {company.name}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              <Link
                href="/enquiry"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-sg-dark-ink px-7 py-3 text-center text-sm font-semibold text-sg-dark-ink transition-all duration-300 hover:bg-sg-dark-ink hover:text-white sm:w-auto"
              >
                Talk to the group
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Project gallery ---------- */}
      {company.projects && (
        <section className="relative bg-sg-paper py-20 lg:py-24">
          <LeafPattern />
          <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
            <ProjectShowcase projects={company.projects} intro={company.projectIntro} />
          </div>
        </section>
      )}

      {company.slug === "starline-import-export" && <StarlineServicesGallery />}

      {/* ---------- Delivery milestone ---------- */}
      {company.milestone && (
        <section className="relative bg-white py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-6 lg:grid-cols-[30rem_minmax(0,1fr)] lg:items-center lg:gap-20 lg:px-10">
            <Reveal>
              <div className="w-full max-w-[30rem] rounded-3xl bg-sg-dark-ink p-8 text-white sm:p-10 lg:w-[30rem]">
                <p className="font-display text-[clamp(3.5rem,8vw,6.5rem)] font-semibold leading-none tracking-tight text-sg-red-bright">
                  <CountUp value={company.milestone.value} />
                </p>
                <p className="mt-4 max-w-[16ch] text-lg leading-snug text-white/80">
                  {company.milestone.label}
                </p>
              </div>
            </Reveal>

            <div>
              <p className="sg-eyebrow mb-5 text-sg-red">Our commitment</p>
              <SplitWords
                text={company.milestone.title}
                as="h2"
                highlight={["Happy", "Families."]}
                className="max-w-[20ch] font-display text-3xl font-semibold text-sg-dark-ink md:text-5xl"
              />
              <div className="mt-6 max-w-[66ch] space-y-4">
                {company.milestone.body.map((paragraph, i) => (
                  <Reveal key={paragraph} delay={0.08 * i}>
                    <p className="text-base leading-relaxed text-sg-dark-muted">{paragraph}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.2}>
                <p className="mt-7 border-t border-sg-line-light pt-5 font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.08em] text-sg-dark-ink lg:whitespace-nowrap">
                  {company.milestone.closing}
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ---------- Stats ---------- */}
      {stats.length > 0 && (
        <section className="border-y border-sg-line bg-sg-black py-14">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.06 * i}>
                  <div className="border-l-2 border-sg-red/40 pl-5">
                    <div className="font-display text-4xl font-semibold text-white">
                      <CountUp value={s.value} />
                    </div>
                    <div className="mt-1.5 text-sm leading-snug text-sg-muted">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Body + services ---------- */}
      <section className="relative bg-white py-24 lg:py-32">
        <LeafPattern />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="sg-eyebrow mb-5 text-sg-red">The approach</p>
              <SplitWords
                text="How this company works."
                as="h2"
                highlight={["works."]}
                className="font-display text-3xl font-semibold text-sg-dark-ink md:text-4xl"
              />
              <div className="mt-7 space-y-5">
                {company.body.map((para, i) => (
                  <Reveal key={i} delay={0.08 * i}>
                    <p className="text-base leading-relaxed text-sg-dark-muted">{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <p className="sg-eyebrow mb-5 text-sg-red">What they do</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {company.services.map((service, i) => (
                  <Reveal key={service.title} delay={0.05 * i}>
                    <article className="group h-full rounded-2xl border border-sg-line-light bg-sg-paper p-6 transition-all duration-500 hover:-translate-y-1 hover:border-sg-red hover:bg-white hover:shadow-[0_24px_50px_-28px_rgba(224,20,44,0.5)]">
                      <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-sg-red-tint text-sg-red transition-colors duration-300 group-hover:bg-sg-red group-hover:text-white">
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                      <h3 className="font-display text-lg font-semibold text-sg-dark-ink">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-sg-dark-muted">
                        {service.description}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>

              {/* Direct contact, when the company publishes one */}
              {(company.phone || company.website) && (
                <Reveal delay={0.1}>
                  <div className="mt-10 rounded-2xl border border-sg-line-light bg-white p-7">
                    <p className="sg-eyebrow mb-5 text-sg-red">Direct line</p>
                    <div className="flex flex-col gap-3 text-sm">
                      {company.phone && (
                        <a
                          href={`tel:${company.phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-3 text-sg-dark-ink transition-colors hover:text-sg-red"
                        >
                          <Phone className="h-4 w-4 text-sg-red" />
                          {company.phone}
                        </a>
                      )}
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 text-sg-dark-ink transition-colors hover:text-sg-red"
                        >
                          <ArrowUpRight className="h-4 w-4 text-sg-red transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          {company.website.replace("https://", "")}
                        </a>
                      )}
                    </div>
                    <p className="mt-5 border-t border-sg-line-light pt-4 text-xs leading-relaxed text-sg-dark-muted">
                      {GROUP_ADDRESS}
                    </p>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Prev / next ---------- */}
      <section className="relative border-t border-sg-line-light bg-sg-paper py-4 sm:py-16">
        <LeafPattern />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-2 gap-1.5 px-2 sm:gap-4 sm:px-6 lg:px-10">
          <Link
            href={`/companies/${prev.slug}`}
            className="group relative block rounded-lg border border-sg-line-light bg-white p-2 transition-all duration-400 hover:-translate-y-0.5 hover:border-sg-red hover:shadow-[0_20px_40px_-28px_rgba(224,20,44,0.6)] sm:flex sm:items-center sm:gap-5 sm:rounded-2xl sm:p-6"
          >
            <div className="sm:hidden">
              <span className="flex items-center gap-1 font-mono text-[0.48rem] uppercase tracking-wide text-sg-dark-muted">
                <ArrowLeft className="h-2 w-2 shrink-0" />
                Previous
              </span>
              <div className="mt-1.5 flex items-center gap-1.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-sg-line-light/70 bg-sg-paper p-1">
                  <CompanyLogo company={prev} className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-display text-[0.62rem] font-semibold leading-tight text-sg-dark-ink">
                    {prev.name}
                  </span>
                  <span className="mt-px block truncate text-[0.46rem] text-sg-dark-muted">
                    {prev.sector}
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden sm:contents">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-sg-line-light/70 bg-sg-paper p-2 transition-all duration-300 group-hover:scale-105 group-hover:border-sg-red/30">
                <CompanyLogo company={prev} className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-sg-dark-muted">
                  <ArrowLeft className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-x-1" />
                  Previous
                </span>
                <span className="mt-1 block truncate font-display text-lg font-semibold leading-snug text-sg-dark-ink transition-colors group-hover:text-sg-red md:text-xl">
                  {prev.name}
                </span>
                <span className="mt-0.5 block truncate text-xs text-sg-dark-muted md:text-sm">
                  {prev.sector}
                </span>
              </div>
            </div>
          </Link>
          <Link
            href={`/companies/${next.slug}`}
            className="group relative block rounded-lg border border-sg-line-light bg-white p-2 transition-all duration-400 hover:-translate-y-0.5 hover:border-sg-red hover:shadow-[0_20px_40px_-28px_rgba(224,20,44,0.6)] sm:flex sm:items-center sm:justify-between sm:gap-5 sm:rounded-2xl sm:p-6"
          >
            <div className="sm:hidden">
              <span className="flex items-center justify-end gap-1 font-mono text-[0.48rem] uppercase tracking-wide text-sg-dark-muted">
                Next
                <ArrowRight className="h-2 w-2 shrink-0" />
              </span>
              <div className="mt-1.5 flex items-center justify-end gap-1.5">
                <div className="min-w-0 flex-1 text-right">
                  <span className="block font-display text-[0.62rem] font-semibold leading-tight text-sg-dark-ink">
                    {next.name}
                  </span>
                  <span className="mt-px block truncate text-[0.46rem] text-sg-dark-muted">
                    {next.sector}
                  </span>
                </div>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-sg-line-light/70 bg-sg-paper p-1">
                  <CompanyLogo company={next} className="h-full w-full object-contain" />
                </div>
              </div>
            </div>
            <div className="hidden sm:contents">
              <div className="min-w-0 flex-1 text-right">
                <span className="flex items-center justify-end gap-2 text-xs uppercase tracking-widest text-sg-dark-muted">
                  Next
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-1 block truncate font-display text-lg font-semibold leading-snug text-sg-dark-ink transition-colors group-hover:text-sg-red md:text-xl">
                  {next.name}
                </span>
                <span className="mt-0.5 block truncate text-xs text-sg-dark-muted md:text-sm">
                  {next.sector}
                </span>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-sg-line-light/70 bg-sg-paper p-2 transition-all duration-300 group-hover:scale-105 group-hover:border-sg-red/30">
                <CompanyLogo company={next} className="h-full w-full object-contain" />
              </div>
            </div>
          </Link>
        </div>
      </section>

    </>
  );
}
