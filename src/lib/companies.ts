/**
 * Single source of truth for the Star Groups family of companies.
 * Every count, nav menu, constellation node and detail page derives from here,
 * so adding or removing a company only ever means editing this array.
 *
 * Order matches the hero section's floating card layout (top to bottom,
 * left column then right column, row by row) — keep new entries in step
 * with that layout, or with hero-company-cards.tsx if it changes.
 */

export type ProjectStatus = "finished" | "ongoing" | "upcoming";

export type Project = {
  status: ProjectStatus;
  title: string;
  subtitle?: string;
  description: string;
  images: { src: string; alt: string }[];
  details?: {
    title: string;
    description?: string;
    items?: string[];
  }[];
  footer?: string[];
};

export type ProjectCounts = Record<ProjectStatus, number>;

export type CompanyMilestone = {
  value: string;
  label: string;
  title: string;
  body: string[];
  closing: string;
};

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
  /** Optional project portfolio shown on the company detail page */
  projects?: Project[];
  /** Introductory copy displayed above the completed-project portfolio */
  projectIntro?: string;
  /** Published project totals; use when the full portfolio is not listed on the site yet */
  projectCounts?: ProjectCounts;
  /** Optional delivery milestone shown on the company detail page */
  milestone?: CompanyMilestone;
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
    slug: "star-gardens",
    name: "Star Gardens",
    letter: "δ",
    letterName: "DELTA",
    sector: "Landscape Design & Execution",
    tagline: "Landscape design and execution.",
    summary:
      "Landscape design and execution — green spaces designed, built and maintained across Bangalore.",
    intro:
      "Star Gardens delivers turnkey landscape design, execution and maintenance for homes, offices, resorts and commercial developments, alongside fully maintained plants on hire across Bangalore.",
    body: [
      "Rooted in the founder's family farming background and formally established in 2009, Star Gardens now works from its own production nursery and brings in specialty plants when a project calls for them.",
      "The team takes turnkey responsibility from design through execution — including irrigation, hardscape, civil work, planting and installation — then stays involved through scheduled landscape maintenance.",
      "The plants-on-hire side puts the same thinking into spaces that need greenery without a permanent commitment: offices, showrooms, events and interiors, maintained on a rotating schedule so nothing is ever tired.",
    ],
    services: [
      {
        title: "Landscape Design",
        description:
          "Planting plans, hardscape and layout for residential communities and commercial developments.",
      },
      {
        title: "Landscape Execution",
        description:
          "Turnkey installation covering irrigation, civil work, hardscape, planting and final delivery from one team.",
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
      { value: "27,00,000", label: "Sq. ft. of green area covered" },
      { value: "1,04,000", label: "Trees planted" },
      { value: "3,40,000", label: "Shrubs planted" },
      { value: "6,85,000", label: "Ground-cover plants" },
    ],
    website: "https://stargardens.in",
    icon: "leaf",
    logo: "/stargardens.png",
    stackingImage: "/stargardens-stacking.png",
    projectIntro:
      "A look at how Star Gardens designs, builds and maintains green spaces — from complete outdoor landscapes to flexible indoor planting for workplaces.",
    projects: [
      {
        status: "finished",
        title: "Landscape Design & Execution",
        subtitle: "Turnkey outdoor spaces · Design, build and maintain",
        description:
          "Complete landscape delivery for homes, resorts, offices and commercial developments, bringing planting, irrigation, hardscape and ongoing care together through one accountable team.",
        images: [
          {
            src: "/stargardens/projects/landscape-design.webp",
            alt: "Completed lawn and landscape planting by Star Gardens",
          },
          {
            src: "/stargardens/projects/terrace-garden.webp",
            alt: "Terrace garden with seating, planters and a green wall",
          },
          {
            src: "/stargardens/projects/vertical-garden.webp",
            alt: "Indoor vertical garden installed by Star Gardens",
          },
        ],
      },
      {
        status: "finished",
        title: "Plants on Hire & Workplace Greenery",
        subtitle: "Corporate interiors · Delivered, arranged and maintained",
        description:
          "Indoor and outdoor plants supplied for offices and commercial spaces with professional placement, scheduled care and replacement support that keeps every installation consistently healthy.",
        images: [
          {
            src: "/stargardens/projects/plants-on-hire.webp",
            alt: "Maintained indoor plants supplied on hire",
          },
          {
            src: "/stargardens/projects/office-plants.webp",
            alt: "Office workspace styled with indoor plants",
          },
          {
            src: "/stargardens/projects/indoor-plants.webp",
            alt: "Collection of decorative indoor plants and planters",
          },
        ],
      },
    ],
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
      {
        title: "Process Coordination",
        description:
          "Coordinating shared workflows and communication so work moves smoothly across the group.",
      },
    ],
    stats: [
      { value: "All", label: "Group companies supported" },
      { value: "Central", label: "Back-office operations" },
      { value: "Shared", label: "Processes and resources" },
      { value: "End-to-end", label: "Workflow coordination" },
    ],
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
      { value: "360°", label: "Script-to-screen production" },
    ],
    icon: "clapperboard",
    logo: "/stargroups.png",
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
      { value: "Full-stack", label: "Web, mobile, CRM & ERP delivery" },
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
    sector: "Interior Design & Execution",
    tagline: "Interior design and execution.",
    summary:
      "Interior design and execution — modular kitchens, wardrobes and storage, designed and built for how people actually live.",
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
      { value: "3", label: "Core modular categories" },
    ],
    website: "https://starspaces.in",
    phone: "+91 99163 06553",
    icon: "sofa",
    logo: "/starspaces.png",
    stackingImage: "/starspaces-stacking.png",
    projectIntro:
      "A selection of thoughtful Bengaluru interiors designed around daily routines, practical storage and a consistent material story from room to room.",
    projects: [
      {
        status: "finished",
        title: "Modular Kitchens & Smart Storage",
        subtitle: "Kitchens and wardrobes · Planned for real daily routines",
        description:
          "Ergonomic kitchens and space-smart wardrobes shaped around how each family cooks, stores and moves, with durable finishes and carefully planned internal organisation.",
        images: [
          {
            src: "/starspaces/projects/sage-kitchen.webp",
            alt: "The Sage Kitchen by Star Spaces in Banashankari",
          },
          {
            src: "/starspaces/projects/oak-olive-kitchen.webp",
            alt: "Oak and Olive modular kitchen by Star Spaces in Jayanagar",
          },
          {
            src: "/starspaces/projects/sliding-wardrobe.webp",
            alt: "Quiet Sliding Storage wardrobe by Star Spaces in Banashankari",
          },
        ],
      },
      {
        status: "finished",
        title: "Living & Full-home Interiors",
        subtitle: "Connected rooms · One cohesive interior vision",
        description:
          "Complete living and bedroom environments where lighting, furniture, storage and material choices work together, coordinated by one team from design through production and handover.",
        images: [
          {
            src: "/starspaces/projects/quiet-living-room.webp",
            alt: "A Quieter Living Room by Star Spaces on Kanakapura Road",
          },
          {
            src: "/starspaces/projects/full-home-harmony.webp",
            alt: "Full-home Harmony interior by Star Spaces in Jayanagar",
          },
          {
            src: "/starspaces/projects/walnut-bedroom.webp",
            alt: "The Walnut Bedroom by Star Spaces in Koramangala",
          },
        ],
      },
    ],
  },
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
    slug: "star-infra-developers",
    name: "Star Infra Developers",
    letter: "ι",
    letterName: "IOTA",
    sector: "Real Estate Development",
    tagline: "Apartments, plotted layouts and farm land — developed end to end.",
    summary:
      "Star Infra Developers develops apartment communities, plotted layouts and farm land projects — from raw land to ready, livable property.",
    intro:
      "Star Infra Developers is the group's property development arm, working across three segments: apartment developments, plotted layouts and farm land projects — taking each from acquisition and planning through to a finished, ready-to-live or ready-to-build property.",
    body: [
      "Different buyers want different things from land — a flat to move into, a plot to build on their own timeline, or a piece of farm land to hold and develop. Star Infra Developers runs all three as dedicated development lines rather than treating them as one generic real estate business.",
      "It works closely with MAC Reality on promotion and sales for its own developments, while continuing to plan and develop new apartment, layout and farm land projects independently.",
    ],
    services: [
      {
        title: "Apartment Development",
        description: "Residential apartment communities developed from land acquisition through to handover.",
      },
      {
        title: "Plotted Layout Development",
        description: "Approved, ready-to-build residential plots with roads and utilities in place.",
      },
      {
        title: "Farm Land Development",
        description: "Farm land projects developed and managed for buyers looking beyond the city.",
      },
    ],
    stats: [{ value: "3", label: "Development lines" }],
    icon: "hard-hat",
    logo: "/stargroups.png",
    projects: [
      {
        status: "finished",
        title: "Star Woods Estate",
        subtitle: "Madikeri · Premium Farmland Development",
        description:
          "A nature-focused farmland community surrounded by the beautiful landscape of Coorg, offering spacious agricultural plots, internal access roads and a peaceful environment for weekend homes and long-term land ownership.",
        images: [
          {
            src: "/starinfradeveloper/completed/star-woods-estate-1.png",
            alt: "Star Woods Estate farmland home in Madikeri",
          },
          {
            src: "/starinfradeveloper/completed/star-woods-estate-2.png",
            alt: "Star Woods Estate landscape in Madikeri",
          },
          {
            src: "/starinfradeveloper/completed/star-woods-estate-3.png",
            alt: "Star Woods Estate countryside view in Madikeri",
          },
        ],
      },
      {
        status: "finished",
        title: "Star Coffee County",
        subtitle: "Madikeri · Managed Farmland",
        description:
          "A premium farmland project inspired by the natural character of Coorg, featuring lush plantation surroundings, individual farmland parcels, internal pathways and spaces suitable for private farm retreats.",
        images: [
          {
            src: "/starinfradeveloper/completed/star-coffee-county-1.png",
            alt: "Star Coffee County plantation retreat in Madikeri",
          },
          {
            src: "/starinfradeveloper/completed/star-coffee-county-2.png",
            alt: "Star Coffee County farmland landscape in Madikeri",
          },
          {
            src: "/starinfradeveloper/completed/star-coffee-county-3.png",
            alt: "Star Coffee County retreat view in Madikeri",
          },
        ],
      },
      {
        status: "finished",
        title: "Star Misty Acres",
        subtitle: "Madikeri · Luxury Farmland & Weekend Retreat Development",
        description:
          "A scenic farmland development surrounded by greenery and the misty landscape of Coorg, planned for nature lovers seeking private land, plantation living and peaceful weekend experiences.",
        images: [
          {
            src: "/starinfradeveloper/completed/star-misty-acres-1.png",
            alt: "Star Misty Acres luxury weekend retreat in Madikeri",
          },
          {
            src: "/starinfradeveloper/completed/star-misty-acres-2.png",
            alt: "Star Misty Acres hillside villa in Madikeri",
          },
          {
            src: "/starinfradeveloper/completed/star-misty-acres-3.png",
            alt: "Star Misty Acres villa and pond at dusk in Madikeri",
          },
        ],
      },
      {
        status: "finished",
        title: "Star Meadows",
        subtitle: "Hoskote, Bangalore · Premium Plotted Development",
        description:
          "A residential plotted community created for buyers looking to build independent homes in a peaceful environment while remaining connected to Bangalore's growing eastern corridor.",
        images: [
          {
            src: "/starinfradeveloper/completed/star-meadows-1.png",
            alt: "Star Meadows plotted development entrance in Hoskote",
          },
          {
            src: "/starinfradeveloper/completed/star-meadows-2.png",
            alt: "Star Meadows landscaped plots in Hoskote",
          },
          {
            src: "/starinfradeveloper/completed/star-meadows-3.png",
            alt: "Star Meadows internal avenue in Hoskote",
          },
        ],
      },
      {
        status: "ongoing",
        title: "Arkha Sanctuary",
        description:
          "Arkha Sanctuary is a BBMP-approved 2 and 3 BHK residential development at BHCS Layout, Banashankari VI Stage, Bengaluru. The project highlights vastu-compliant homes with no common walls, a planned typical floor layout, and amenities including swimming pools, a gym, landscaped gardens, a jogging track and 24-hour security.",
        images: [
          {
            src: "/starinfradeveloper/1.webp",
            alt: "Arkha Sanctuary apartment exterior",
          },
          {
            src: "/starinfradeveloper/2.webp",
            alt: "Arkha Sanctuary typical floor plan",
          },
          {
            src: "/starinfradeveloper/arkha-sanctuary-amenities.webp",
            alt: "Arkha Sanctuary amenities, apartment layouts and landscaped courtyard",
          },
        ],
      },
      {
        status: "upcoming",
        title: "Star Nirman Infra",
        subtitle: "Modern 2BHK homes designed for comfortable family living.",
        description:
          "An upcoming G+5 residential community in Malur, beside STTR Road. Set across about one acre, it offers spacious, well-ventilated 2BHK homes designed for comfortable, secure family living.",
        images: [
          {
            src: "/starinfradeveloper/upcomig1-1.webp",
            alt: "Star Nirman Infra upcoming apartment development in Malur",
          },
          {
            src: "/starinfradeveloper/upcoming1-2.webp",
            alt: "Star Nirman Infra upcoming residential project exterior",
          },
          {
            src: "/starinfradeveloper/upcoming1-3.webp",
            alt: "Star Nirman Infra Malur 2BHK apartment project",
          },
        ],
        details: [
          {
            title: "Project Highlights",
            items: [
              "Location: Malur – Right next to STTR Road",
              "Project Type: Residential Apartment Development",
              "Configuration: 100% 2BHK Apartments",
              "Building: Ground + 5 Floors",
              "Project Area: Approx. 1 Acre",
              "Expected Handover: December 2027",
            ],
          },
          {
            title: "Planned Amenities",
            description:
              "Residents can look forward to a thoughtfully developed community with amenities designed for recreation, wellness, convenience and family living, including:",
            items: [
              "Landscaped entrance and beautifully designed green spaces",
              "Children’s play area",
              "Senior citizens’ seating and relaxation zone",
              "Walking and jogging pathway",
              "Multipurpose recreational area",
              "Indoor games / activity area",
              "Fitness / gymnasium space",
              "Community gathering and multipurpose hall",
              "Landscaped garden and leisure seating",
              "Open lawn and family recreation spaces",
              "Dedicated two-wheeler and car parking",
              "Visitor parking",
              "Security cabin and controlled entrance",
              "CCTV surveillance in common areas",
              "Lift access to all residential floors",
              "Power backup for essential common areas",
              "Rainwater harvesting",
              "Sewage treatment and responsible water management",
              "Waste management provisions",
              "Borewell / water supply provisions",
              "Fire safety systems as per applicable norms",
              "Well-lit common areas and internal pathways",
              "Modern entrance lobby",
              "Dedicated utility and service areas",
              "Vastu-conscious apartment planning wherever practically possible",
            ],
          },
          {
            title: "A Home Built Around Your Family",
            description:
              "More than just an apartment, this upcoming development is envisioned as a peaceful residential community where families can live comfortably, grow together and build lasting memories.\n\nWith excellent access through STTR Road, developing infrastructure around Malur and thoughtfully planned 2BHK residences, the project aims to offer an ideal combination of connectivity, comfort and long-term value.",
            items: ["Possession – December 2027"],
          },
        ],
        footer: [
          "Your new beginning in Malur is taking shape.",
          "STAR NIRMAN INFRA",
          "Building Homes. Creating Happy Families.",
        ],
      },
      {
        status: "upcoming",
        title: "Lux Build Con",
        subtitle: "Exquisite 3BHK & 4BHK apartments designed for elevated living.",
        description:
          "An upcoming G+14 ultra-luxury address in Happy Valley Layout, Uttarahalli. Spacious 3BHK and 4BHK homes pair refined design, premium finishes, natural light and private, elevated living.",
        images: [
          {
            src: "/starinfradeveloper/upcoming2-1.webp",
            alt: "Lux Build Con proposed high-rise apartment entrance in Uttarahalli",
          },
          {
            src: "/starinfradeveloper/upcoming2-2.webp",
            alt: "Lux Build Con proposed G+14 residential tower",
          },
          {
            src: "/starinfradeveloper/upcoming2-3.webp",
            alt: "Lux Build Con proposed ultra-luxury apartment exterior",
          },
        ],
        details: [
          {
            title: "Project Highlights",
            items: [
              "Project Name: Lux Build Con",
              "Location: Happy Valley Layout, Uttarahalli",
              "Project Type: Ultra-Luxury Residential Apartment Development",
              "Configurations: Spacious 3BHK & 4BHK Apartments",
              "Building: Ground + 14 Floors",
              "Lifestyle: Premium urban living with world-class amenities",
            ],
          },
          {
            title: "World-Class Amenities",
            description:
              "Residents can look forward to an exceptional range of amenities designed for wellness, recreation, relaxation, convenience and community living, including:",
            items: [
              "Grand entrance lobby with premium finishes",
              "Landscaped gardens and beautifully designed green spaces",
              "Swimming pool with dedicated leisure deck",
              "Fully equipped fitness centre and modern gymnasium",
              "Indoor games and recreation zone",
              "Children’s play area",
              "Senior citizens’ relaxation and seating area",
              "Walking and jogging tracks",
              "Multipurpose hall for celebrations and gatherings",
              "Clubhouse with premium lifestyle facilities",
              "Outdoor family recreation spaces",
              "Landscaped terrace and leisure zones",
              "Dedicated two-wheeler and car parking",
              "Visitor parking facilities",
              "High-speed lift access to all floors",
              "24/7 security and controlled entrance",
              "CCTV surveillance in common areas",
              "Power backup for essential services and common areas",
              "Fire safety systems as per applicable norms",
              "Rainwater harvesting and sustainable water management",
              "Sewage treatment and waste management provisions",
              "Well-lit internal pathways and common areas",
              "Dedicated utility and service areas",
              "Vastu-conscious apartment planning wherever practically possible",
            ],
          },
          {
            title: "A New Standard of Luxury Living",
            description:
              "More than just a residence, Lux Build Con is envisioned as an exclusive lifestyle destination where luxury, comfort, privacy and convenience come together.\n\nLocated in Happy Valley Layout, Uttarahalli, the project offers residents the advantage of a well-connected neighbourhood along with the tranquillity of a thoughtfully planned residential community. With premium 3BHK and 4BHK homes, a striking G+14 structure and world-class amenities, Lux Build Con is designed for families who aspire to live life at its finest.",
          },
        ],
        footer: [
          "Your Address of Distinction",
          "BUILT LUX CON",
          "Elevating Everyday Living to Extraordinary Heights.",
        ],
      },
    ],
    projectIntro:
      "Thoughtfully planned communities and farmland developments in Madikeri and Hoskote, created around quality infrastructure, natural surroundings and lasting value.",
    projectCounts: {
      finished: 14,
      ongoing: 3,
      upcoming: 5,
    },
    milestone: {
      value: "2,300+",
      label: "Homes successfully delivered",
      title: "Building Homes. Creating Happy Families.",
      body: [
        "We are proud to have successfully delivered more than 2,300 flats, providing families with thoughtfully designed, comfortable, and secure homes where they can live, grow, and create beautiful memories together.",
        "Every home we deliver reflects our commitment to quality construction, peaceful living, modern comfort, and long-term value.",
      ],
      closing: "2,300+ Homes Delivered | Thousands of Happy Residents | One Trusted Commitment",
    },
  },
  {
    slug: "mac-reality",
    name: "MAC Reality",
    letter: "ε",
    letterName: "EPSILON",
    sector: "Real Estate",
    tagline: "Real estate promoters and channelling partners.",
    summary:
      "MAC Reality works as real estate promoters and channelling partners — connecting buyers to trusted developer projects across residential and commercial segments.",
    intro:
      "MAC Reality is the group's real estate promoters and channelling partners, working across residential and commercial segments — representing developer projects, driving buyer interest and guiding every sale from first enquiry to closing.",
    body: [
      "Real estate is the thread that connects most of the group. As promoters and channelling partners, MAC Reality is where developer projects meet genuine buyer interest — backed by the same group that also runs landscaping, interiors and technology for the properties it promotes.",
      "That structure means a buyer is dealing with one accountable group rather than assembling a project from unrelated vendors, and a developer gets a channelling partner who understands the property end to end.",
    ],
    services: [
      {
        title: "Project Promotion",
        description: "Marketing and promoting residential and commercial developments on behalf of developer partners.",
      },
      {
        title: "Channelling Partnership",
        description: "Acting as a trusted channelling partner between developers and buyers across segments.",
      },
      {
        title: "Buyer Advisory",
        description: "Guiding buyers to the right property, developer and segment for their needs.",
      },
      {
        title: "Sales Facilitation",
        description:
          "Coordinating site visits, negotiations and follow-ups from the first enquiry through closing.",
      },
    ],
    stats: [
      { value: "2", label: "Property segments covered" },
      { value: "3", label: "Core service lines" },
      { value: "End-to-end", label: "Buyer journey support" },
      { value: "Group-backed", label: "Cross-company expertise" },
    ],
    icon: "home",
    logo: "/macreality.png",
  },
  {
    slug: "star-capital-venture",
    name: "Star Venture Capital",
    letter: "θ",
    letterName: "THETA",
    sector: "Venture Capital",
    tagline: "Backing ambitious founders and scalable ventures.",
    summary:
      "Seed capital, growth investments and ecosystem leverage for early-stage ventures and breakout businesses.",
    intro:
      "Star Venture Capital is the strategic investment vehicle of Star Groups — backing visionary founders, high-growth startups and promising businesses across technology, consumer brands, media and infrastructure.",
    body: [
      "Capital is a commodity; operational muscle is not. Star Venture Capital goes beyond the term sheet, giving portfolio companies immediate access to the group's marketing engine, technology stack, operational infrastructure and real estate footprint.",
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
      {
        title: "Investment Due Diligence",
        description:
          "Evaluating markets, business models, unit economics and growth readiness before investment.",
      },
    ],
    stats: [
      { value: "Early & Growth", label: "Investment stages" },
      { value: "8+", label: "Group synergies unlocked" },
      { value: "Bengaluru", label: "Primary investment hub" },
      { value: "Hands-on", label: "Portfolio support model" },
    ],
    icon: "landmark",
    logo: "/stargroups.png",
  },
  {
    slug: "starline-import-export",
    name: "Starline Import & Export",
    letter: "κ",
    letterName: "KAPPA",
    sector: "Import & Export",
    tagline: "Global sourcing. Reliable imports. Pan-India distribution.",
    summary:
      "An India-based sourcing, import and distribution company connecting businesses with manufacturers across China, Vietnam and Indonesia.",
    intro:
      "Starline Import & Export sources home, garden, landscape and decorative products from reliable manufacturers across China, Vietnam and Indonesia. Through Star Gardens, selected products are stocked and distributed across India, while businesses can also use the team as an end-to-end sourcing and import partner — from manufacturer identification and commercial negotiation through shipping, customs clearance and doorstep delivery.",
    body: [
      "International sourcing can create tremendous opportunities, but unknown suppliers, product quality, payments, documentation, freight and customs can make importing complicated. Starline Import & Export brings the complete process under one professional team.",
      "The company supports businesses importing for resale, distribution, private-label development, e-commerce, commercial procurement and large projects — coordinating each requirement from the initial product brief until final delivery.",
      "Its objective is simple: make international sourcing easier, safer and more accessible for Indian businesses, with transparent communication and local accountability at every major stage.",
    ],
    services: [
      {
        title: "Product & Manufacturer Sourcing",
        description:
          "Product identification, suitable manufacturer discovery, supplier evaluation and commercial comparison.",
      },
      {
        title: "Sampling, Customisation & Private Label",
        description:
          "Sample coordination, product modifications, branding, labels, packaging and OEM opportunities.",
      },
      {
        title: "Production & Quality Coordination",
        description:
          "Production follow-up, supplier verification and applicable pre-shipment quality inspection.",
      },
      {
        title: "Shipping, Customs & Delivery",
        description:
          "Sea or air freight, cargo consolidation, import documentation, customs clearance and inland delivery.",
      },
    ],
    projects: [
      {
        status: "ongoing",
        title: "Import & Distribution Operations",
        subtitle: "From international cargo arrival to local doorstep delivery.",
        description:
          "Container receipt, unloading and cargo handling at Starline Import & Export's Bengaluru facility — part of an end-to-end import workflow that carries products from overseas manufacturers through to distribution across India.",
        images: [
          {
            src: "/starline-import-&-export/1.webp",
            alt: "Starline Import & Export team unloading imported cartons from a shipping container",
          },
          {
            src: "/starline-import-&-export/2.webp",
            alt: "Sealed import container outside the Starline Import & Export Bengaluru facility",
          },
          {
            src: "/starline-import-&-export/3.webp",
            alt: "Open shipping container ready for cargo unloading at Starline Import & Export",
          },
        ],
      },
    ],
    stats: [
      { value: "3", label: "Primary sourcing markets" },
      { value: "Pan-India", label: "Distribution and delivery" },
      { value: "10", label: "Coordinated import stages" },
      { value: "End-to-end", label: "Sourcing and import support" },
    ],
    icon: "ship",
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
