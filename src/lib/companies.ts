/**
 * Single source of truth for the Star Groups family of companies.
 * Every count, nav menu, constellation node and detail page derives from here,
 * so adding or removing a company only ever means editing this array.
 */

export type Company = {
  slug: string;
  name: string;
  /** Greek letter used as the constellation designation */
  letter: string;
  letterName: string;
  sector: string;
  tagline: string;
  /** One-line summary used on cards */
  summary: string;
  /** Longer intro used at the top of the detail page */
  intro: string;
  /** Paragraphs for the detail page body */
  body: string[];
  services: { title: string; description: string }[];
  stats: { value: string; label: string }[];
  /** Live website, if the company has one */
  website?: string;
  email?: string;
  phone?: string;
  /** Lucide icon name, resolved in the icon map */
  icon: string;
  /**
   * Path to the company's own logo in /public. Not every company has
   * uploaded distinct artwork yet — <CompanyLogo> falls back to the Star
   * Groups mark automatically if this file is missing or fails to load.
   */
  logo: string;
  /** Custom visual showcase image for the stacking cards */
  stackingImage?: string;
  featured?: boolean;
};

/** Group-wide logo, used as the fallback whenever a company's own is missing. */
export const GROUP_LOGO = "/stargroups.png";

export const GROUP_ADDRESS =
  "18, 1st Floor, 80 Feet Road, BSK 1st Stage, Srinivasnagar, Banashankari, Bengaluru, Karnataka 560050";
export const GROUP_EMAIL = "stargrowthhub@gmail.com";
export const GROUP_PHONE = "+91 91509 66108";
export const GROUP_HOURS = "Mon–Sat, 10:00am – 7:00pm";

export const companies: Company[] = [
  {
    slug: "star-growth-hub",
    name: "Star Growth Hub",
    letter: "α",
    letterName: "ALPHA",
    sector: "Marketing & Growth",
    tagline: "We turn local searches into paying customers.",
    summary:
      "The group's in-house marketing and growth engine — SEO, paid ads, social and web, for every Star Groups company and for clients beyond it.",
    intro:
      "Star Growth Hub is a full-service digital marketing agency in Bengaluru that consolidates SEO, paid advertising, social media, web design and branding under one roof. It builds the digital presence for every company in the group — and runs the same playbook for outside clients.",
    body: [
      "Most agencies sell reach. Star Growth Hub sells enquiries. Every engagement is measured on the two numbers that actually move a business — how many people got in touch, and what each of those conversations cost to create.",
      "The engagement model is deliberately uncomfortable for an agency: clients own every ad account, analytics property, domain and source file from day one, engagements run month to month on 30 days' notice, and clients talk directly to the people running their campaigns rather than through an account manager.",
      "Campaigns run across clinics and healthcare, real estate and interiors, education and coaching, retail and D2C, professional services, and B2B manufacturing.",
    ],
    services: [
      {
        title: "Search Engine Optimisation",
        description:
          "Technical audits, local and Maps SEO, content strategy, and link building that compounds month over month.",
      },
      {
        title: "Google Ads & PPC",
        description:
          "Search campaigns, Performance Max, conversion tracking and landing pages built to convert, not just to click.",
      },
      {
        title: "Meta & Social Media",
        description:
          "Meta Ads, content calendars, Reels and creative production, and day-to-day community management.",
      },
      {
        title: "Web Design & Development",
        description:
          "Landing pages, business websites, speed optimisation and WhatsApp enquiry flows that capture demand.",
      },
      {
        title: "Branding & Design",
        description:
          "Logo design, brand identity systems, print, billboards and outdoor — the offline half of the funnel.",
      },
      {
        title: "Lead Generation",
        description:
          "Email marketing, B2B outreach, affiliate programmes and proper attribution across every channel.",
      },
    ],
    stats: [
      { value: "214%", label: "Average lift in organic enquiries" },
      { value: "41%", label: "Reduction in cost per lead" },
      { value: "2.1s", label: "Typical mobile LCP on sites we build" },
      { value: "5.0", label: "Google rating" },
    ],
    website: "https://stargrowthhub.in",
    email: "stargrowthhub@gmail.com",
    phone: "+91 91509 66108",
    icon: "trending-up",
    logo: "/stargrowthhub.png",
    stackingImage: "/stargrowthhub-stacking.png",
    featured: true,
  },
  {
    slug: "star-tech-india",
    name: "Star Tech India",
    letter: "β",
    letterName: "BETA",
    sector: "Software & Technology",
    tagline: "Build the work that runs itself.",
    summary:
      "Websites, CRM, mobile apps and custom software — the systems that keep a growing business running in one view.",
    intro:
      "Star Tech India builds the integrated business systems behind the group and its clients: websites, CRM platforms, mobile applications, automation and custom ERP. Everything your business needs to grow online, and everything it needs to keep running once it has.",
    body: [
      "A business outgrows spreadsheets long before it admits it. Star Tech India builds the layer that replaces them — lead capture that feeds a real pipeline, approvals that route themselves, dashboards that answer the question before it is asked.",
      "Work spans the full stack: customer-facing websites and e-commerce, internal CRM and ERP, mobile apps that work offline, and the integrations that tie them to the tools Indian businesses actually run on — Tally, GST, payment gateways and WhatsApp.",
    ],
    services: [
      {
        title: "Website Development",
        description:
          "Corporate sites, landing pages, e-commerce, customer portals and CMS builds.",
      },
      {
        title: "CRM & Lead Management",
        description:
          "Lead capture, sales pipelines and WhatsApp CRM that keeps every enquiry accounted for.",
      },
      {
        title: "Mobile App Development",
        description:
          "iOS and Android apps with offline capability and integrated payments.",
      },
      {
        title: "Business Automation",
        description:
          "Workflows, approvals, notifications and dashboards that remove manual follow-up.",
      },
      {
        title: "Custom Software & ERP",
        description:
          "Billing, inventory and operations systems built around how the business actually works.",
      },
      {
        title: "Integrations & APIs",
        description:
          "Tally, GST, payment gateways and WhatsApp, wired into the systems you already run.",
      },
    ],
    stats: [
      { value: "6", label: "Core service lines" },
      { value: "8+", label: "Named enterprise clients" },
      { value: "1", label: "View of your whole business" },
    ],
    website: "https://startechindia.com",
    email: "hello@startechindia.com",
    icon: "code",
    logo: "/startechindia.png",
    stackingImage: "/startechindia-stacking.png",
  },
  {
    slug: "star-spaces",
    name: "Star Spaces",
    letter: "γ",
    letterName: "GAMMA",
    sector: "Interiors",
    tagline: "Smart interiors. Seamless living.",
    summary:
      "Modular kitchens, wardrobes and storage — interiors designed and executed for how people actually live.",
    intro:
      "Star Spaces designs and builds beautiful, functional spaces that reflect your style and elevate everyday living. Modular solutions, crafted for modern lifestyles and executed end to end across Bengaluru.",
    body: [
      "Interiors go wrong in the gap between the drawing and the install. Star Spaces closes it by owning both — the same team that designs the kitchen is accountable for the day it goes in.",
      "Projects run on a clear staged payment structure — 10% at booking, 40% at production, 40% at material dispatch and 10% on final settlement — so clients always know what they have paid for and what remains outstanding.",
    ],
    services: [
      {
        title: "Modular Kitchens",
        description: "Smart, elegant and made for you — designed around the way you cook.",
      },
      {
        title: "Wardrobes",
        description: "Organised, stylish and space-smart storage for every bedroom.",
      },
      {
        title: "Storage Units",
        description: "Clever storage for every corner, including the awkward ones.",
      },
      {
        title: "Living Spaces",
        description: "Comfortable, warm and beautifully designed rooms to actually live in.",
      },
    ],
    stats: [
      { value: "12+", label: "Projects delivered" },
      { value: "4", label: "Bengaluru zones served" },
      { value: "30–45", label: "Day average timeline" },
    ],
    website: "https://starspaces.in",
    phone: "+91 99163 06553",
    icon: "sofa",
    logo: "/starspaces.png",
    stackingImage: "/starspaces-stacking.png",
  },
  {
    slug: "star-gardens",
    name: "Star Gardens",
    letter: "δ",
    letterName: "DELTA",
    sector: "Landscaping",
    tagline: "Landscape design & plants on hire.",
    summary:
      "Landscape design and plants on hire — green space designed, installed and maintained across Bangalore.",
    intro:
      "Star Gardens handles the green half of the group's work: landscape design for residential and commercial developments, and plants on hire for offices, events and interiors across Bangalore.",
    body: [
      "Landscaping is the part of a development people feel before they can explain it. Star Gardens designs it as infrastructure rather than decoration — planting that suits the light it will actually get, and that someone can realistically maintain.",
      "The plants-on-hire side puts the same thinking into spaces that need greenery without a permanent commitment: offices, showrooms, events and interiors, maintained on a rotating schedule so nothing is ever tired.",
    ],
    services: [
      {
        title: "Landscape Design",
        description:
          "Planting plans, hardscape and layout for residential communities and commercial developments.",
      },
      {
        title: "Plants on Hire",
        description:
          "Indoor and outdoor plants for offices, events and showrooms, on a maintained rotation.",
      },
      {
        title: "Green Maintenance",
        description:
          "Scheduled upkeep that keeps installed landscape looking the way it did on handover.",
      },
    ],
    stats: [
      { value: "2", label: "Service lines" },
      { value: "Bengaluru", label: "Primary operating city" },
    ],
    website: "https://stargardens.in",
    icon: "leaf",
    logo: "/stargardens.png",
    stackingImage: "/stargardens-stacking.png",
  },
  {
    slug: "mac-reality",
    name: "MAC Reality",
    letter: "ε",
    letterName: "EPSILON",
    sector: "Real Estate",
    tagline: "Property, across every segment.",
    summary:
      "Real estate development and property solutions across residential and commercial segments.",
    intro:
      "MAC Reality is the group's real estate development and property arm, working across residential and commercial segments — from land and acquisition through to development and sale.",
    body: [
      "Real estate is the thread that connects most of the group. MAC Reality is where a plot becomes a project, and where the group's landscaping, interiors and technology companies get pointed at the same piece of land.",
      "That structure means a buyer is dealing with one accountable group rather than assembling a project from unrelated vendors.",
    ],
    services: [
      {
        title: "Residential Development",
        description: "Homes and residential projects from acquisition through handover.",
      },
      {
        title: "Commercial Property",
        description: "Commercial development and property solutions for occupiers and investors.",
      },
      {
        title: "Property Advisory",
        description: "Acquisition, positioning and sale strategy backed by the wider group.",
      },
    ],
    stats: [{ value: "2", label: "Segments covered" }],
    icon: "home",
    logo: "/macreality.png",
  },
  {
    slug: "starline-solutions",
    name: "Starline Solutions",
    letter: "ζ",
    letterName: "ZETA",
    sector: "Business Solutions",
    tagline: "The support layer under the group.",
    summary:
      "Business solutions and shared services supporting every company in the wider group.",
    intro:
      "Starline Solutions provides the business and operational support that lets a set of specialist companies behave like one group — shared services, process and back-office capability.",
    body: [
      "A group only works if the unglamorous functions are handled centrally. Starline Solutions is that layer: the operational spine that means each company can stay focused on the work it exists to do.",
      "It also gives smaller companies in the group access to a level of process and support they could not justify carrying alone.",
    ],
    services: [
      {
        title: "Business Solutions",
        description: "Operational and process support across the group's companies.",
      },
      {
        title: "Shared Services",
        description: "Back-office capability shared across the family of companies.",
      },
      {
        title: "Group Support",
        description: "The connective tissue that lets independent companies operate as one group.",
      },
    ],
    stats: [{ value: "All", label: "Companies supported" }],
    icon: "network",
    logo: "/starlinesolution.png",
  },
  {
    slug: "star-production-house",
    name: "Star Production House",
    letter: "η",
    letterName: "ETA",
    sector: "Media & Production",
    tagline: "Stories that build brands and move audiences.",
    summary:
      "Commercial films, brand videos, digital ad campaigns and studio post-production that bring vision to life.",
    intro:
      "Star Production House is the creative and cinematic powerhouse of Star Groups — producing high-end corporate films, brand commercials, digital ad campaigns, product videography and studio post-production across India.",
    body: [
      "In an attention economy, craft is leverage. Star Production House combines cinematic vision with commercial purpose — creating films that stop the scroll, build deep brand equity and convert viewers into customers.",
      "From scriptwriting and storyboard development to multi-camera cinema rigs, drone videography, VFX and colour grading, everything is produced and finished by our integrated in-house crew.",
    ],
    services: [
      {
        title: "Commercial & Ad Films",
        description: "High-impact TVCs and digital commercials crafted for maximum recall and conversion.",
      },
      {
        title: "Corporate & Brand Storytelling",
        description: "Documentary-style founder stories, brand anthems and corporate showcase films.",
      },
      {
        title: "Product & Fashion Videography",
        description: "Studio and on-location product showcases, 360-degree captures and catalog shoots.",
      },
      {
        title: "Drone & Aerial Cinematography",
        description: "Licensed 4K/8K drone cinematography for real estate, events and landscapes.",
      },
      {
        title: "Post-Production & VFX",
        description: "Full-suite editing, colour grading, motion graphics, 3D animations and sound design.",
      },
      {
        title: "Social Media Video Engine",
        description: "High-volume Reels, YouTube series and short-form video production built for virality.",
      },
    ],
    stats: [
      { value: "50+", label: "Films & shoots produced" },
      { value: "4K/8K", label: "Cinema standard production" },
      { value: "100%", label: "In-house post-production" },
    ],
    icon: "clapperboard",
    logo: "/stargroups.png",
  },
  {
    slug: "star-capital-venture",
    name: "Star Capital Venture",
    letter: "θ",
    letterName: "THETA",
    sector: "Venture & Growth Capital",
    tagline: "Backing ambitious founders and scalable ventures.",
    summary:
      "Seed capital, growth investments and ecosystem leverage for early-stage ventures and breakout businesses.",
    intro:
      "Star Capital Venture is the strategic investment vehicle of Star Groups — backing visionary founders, high-growth startups and promising businesses across technology, consumer brands, media and infrastructure.",
    body: [
      "Capital is a commodity; operational muscle is not. Star Capital Venture goes beyond the term sheet, giving portfolio companies immediate access to the group's marketing engine, technology stack, operational infrastructure and real estate footprint.",
      "We partner with founders building durable, category-defining enterprises with strong unit economics and clear moats.",
    ],
    services: [
      {
        title: "Seed & Early-Stage Capital",
        description: "Patient, founder-friendly equity funding at the formative stages of venture building.",
      },
      {
        title: "Growth Equity & Expansion",
        description: "Growth capital for businesses looking to scale market share, technology and regional reach.",
      },
      {
        title: "Strategic Ecosystem Synergy",
        description: "Unlocking direct growth leverage across Star Groups' media, tech, and operational companies.",
      },
      {
        title: "Founder Mentorship & Advisory",
        description: "Hands-on guidance across go-to-market strategy, hiring, unit economics and governance.",
      },
      {
        title: "Syndicate & Deal Structuring",
        description: "Co-investment partnerships and strategic deal structuring with institutional networks.",
      },
    ],
    stats: [
      { value: "Early & Growth", label: "Investment stages" },
      { value: "8+", label: "Group synergies unlocked" },
      { value: "Bengaluru", label: "Primary investment hub" },
    ],
    icon: "landmark",
    logo: "/stargroups.png",
  },
];

/** Companies that sit on the constellation ring (everything except the centre). */
export const companyCount = companies.length;

export function getCompany(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

/** Companies with a live, visitable website. */
export const flagships = companies.filter((c) => c.website);

export const sectors = Array.from(new Set(companies.map((c) => c.sector)));
