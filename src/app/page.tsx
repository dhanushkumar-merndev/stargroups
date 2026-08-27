import { Hero } from "@/components/hero";
import Stacking from "@/components/stacking";
import { Ticker } from "@/components/ticker";
import { AboutSection } from "@/components/about-section";
import { CompaniesGrid } from "@/components/companies-grid";
import { ResultsSection } from "@/components/results-section";
import { Testimonials } from "@/components/testimonials";
import { companies } from "@/lib/companies";

export default function Home() {
  return (
    <>
      <Hero />
      <Stacking />
      <Ticker />
      <AboutSection />
      <CompaniesGrid
        heading="Every star in the group."
        intro={`${companies.length} independent companies, one shared standard. Each has its own team, its own clients and its own P&L — and access to everything the rest of the group can do.`}
      />
      <ResultsSection />
      <Testimonials />
    </>
  );
}
