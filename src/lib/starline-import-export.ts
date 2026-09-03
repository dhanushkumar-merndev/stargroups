export type StarlineContentGroup = {
  label?: string;
  items: string[];
};

export type StarlineContentBlock = {
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  groups?: StarlineContentGroup[];
  note?: string;
};

export const managedImportServices = [
  "Product identification",
  "Manufacturer sourcing",
  "Supplier verification",
  "Product sampling",
  "Price negotiation",
  "Customisation",
  "Branding and private labelling",
  "Production coordination",
  "Quality inspection",
  "International payment coordination",
  "Documentation",
  "Cargo consolidation",
  "Sea and air freight",
  "Customs clearance",
  "Inland transportation",
  "Doorstep delivery",
];

export const sourcingMarkets: StarlineContentBlock[] = [
  {
    title: "China",
    subtitle: "Scale and manufacturing depth",
    paragraphs: [
      "One of the world's largest manufacturing ecosystems, suitable for a wide range of products, custom development and high-volume commercial orders.",
    ],
  },
  {
    title: "Vietnam",
    subtitle: "Fast-growing specialist production",
    paragraphs: [
      "A rapidly growing manufacturing destination known for furniture, handicrafts, décor, garden accessories, natural materials and lifestyle products.",
    ],
  },
  {
    title: "Indonesia",
    subtitle: "Craft and natural materials",
    paragraphs: [
      "Known for handcrafted products, natural materials, furniture, planters, décor, outdoor accessories and artisanal products.",
    ],
  },
];

export const homeGardenCategories: StarlineContentBlock[] = [
  {
    title: "Garden Décor",
    paragraphs: [
      "Distinctive decorative products sourced from international manufacturers to enhance outdoor spaces.",
    ],
    groups: [
      {
        items: [
          "Garden sculptures",
          "Decorative pots",
          "Outdoor statues",
          "Garden ornaments",
          "Decorative planters",
          "Feature pieces",
          "Wall décor",
          "Garden accessories",
          "Outdoor art pieces",
          "Decorative screens",
        ],
      },
    ],
  },
  {
    title: "Planters",
    paragraphs: [
      "Planters for residential, commercial, hospitality and landscape applications, with customisation coordinated where quantity and manufacturing capability allow.",
    ],
    groups: [
      {
        label: "Products",
        items: [
          "FRP and fiberglass planters",
          "Ceramic and terracotta pots",
          "Cement-look and lightweight planters",
          "Decorative indoor and outdoor pots",
          "Large landscape pots",
          "Hotel, resort and commercial-grade planters",
        ],
      },
      {
        label: "Available variations",
        items: ["Sizes", "Shapes", "Colours", "Finishes", "Materials", "Designs"],
      },
    ],
  },
  {
    title: "Outdoor Furniture",
    groups: [
      {
        label: "Products",
        items: [
          "Outdoor chairs",
          "Garden benches",
          "Lounge seating",
          "Outdoor tables",
          "Patio and poolside furniture",
          "Balcony furniture",
          "Garden swings",
          "Outdoor sofas",
          "Commercial outdoor seating",
        ],
      },
      {
        label: "Applications",
        items: [
          "Villas and apartments",
          "Resorts and hotels",
          "Cafés and restaurants",
          "Clubhouses and farmhouses",
          "Commercial landscapes",
          "Rooftop spaces",
        ],
      },
    ],
  },
  {
    title: "Landscape Accessories",
    paragraphs: [
      "Products that help landscape designers and contractors create practical, distinctive outdoor environments.",
    ],
    groups: [
      {
        items: [
          "Garden edging",
          "Decorative screens and outdoor partitions",
          "Trellis systems and plant supports",
          "Garden structures",
          "Landscape ornaments",
          "Outdoor containers",
          "Decorative lighting accessories",
          "Garden display elements",
        ],
      },
    ],
  },
  {
    title: "Water Feature Products",
    paragraphs: [
      "Components and decorative products can be sourced according to individual project requirements.",
    ],
    groups: [
      {
        items: [
          "Outdoor and garden fountains",
          "Cascade and wall features",
          "Decorative water features",
          "Water bowls",
          "Fountain sculptures",
          "Landscape water-feature accessories",
        ],
      },
    ],
  },
  {
    title: "Artificial Landscape Décor",
    paragraphs: ["Selected solutions for commercial spaces and special requirements."],
    groups: [
      {
        items: [
          "Artificial plants",
          "Artificial green walls",
          "Decorative artificial foliage",
          "Artificial trees",
          "Faux landscape elements",
          "Artificial hanging greenery",
        ],
      },
    ],
  },
  {
    title: "Home Décor",
    paragraphs: ["Selected decorative products for residential and commercial interiors."],
    groups: [
      {
        items: [
          "Decorative accessories and objects",
          "Table and wall décor",
          "Sculptures",
          "Ceramic accessories",
          "Designer pots",
          "Handmade and natural décor items",
          "Decorative storage products",
        ],
      },
    ],
  },
];

export const distributionCustomers = [
  "Landscape architects",
  "Landscape contractors",
  "Architects",
  "Interior designers",
  "Builders",
  "Developers",
  "Resorts",
  "Hotels",
  "Restaurants",
  "Cafés",
  "Retailers",
  "Garden centres",
  "Nurseries",
  "Corporate offices",
  "Facility management companies",
  "Institutional buyers",
  "Home décor businesses",
  "Project procurement companies",
];

export const businessSourcingUses = [
  "Resale",
  "Distribution",
  "Projects",
  "Private labelling",
  "Manufacturing",
  "Retail",
  "E-commerce",
  "Hospitality",
  "Construction",
  "Interiors",
  "Landscaping",
  "Corporate procurement",
  "Industrial requirements",
];

export const productSourcingSteps: StarlineContentBlock[] = [
  {
    title: "1. Understand the requirement",
    paragraphs: ["Share the clearest available commercial and product brief."],
    groups: [
      {
        items: [
          "Product photographs",
          "Specifications and dimensions",
          "Material requirements",
          "Quantity and target pricing",
          "Packaging requirements",
          "Branding requirements",
        ],
      },
    ],
  },
  {
    title: "2. Identify manufacturers",
    paragraphs: [
      "Suitable suppliers and manufacturers are searched through sourcing networks and relevant manufacturing markets.",
    ],
  },
  {
    title: "3. Evaluate suppliers",
    groups: [
      {
        items: [
          "Manufacturing capability and product range",
          "Pricing and minimum order quantity",
          "Experience and export capability",
          "Production capacity",
          "Customisation capability",
          "Documentation readiness",
        ],
      },
    ],
  },
  {
    title: "4. Compare commercial terms",
    paragraphs: ["Where possible, quotations are compared before a commercial decision."],
    groups: [
      {
        items: [
          "Price and quality",
          "MOQ and lead time",
          "Packaging",
          "Payment terms",
          "Product specifications",
        ],
      },
    ],
  },
];

export const sourcingCapabilities: StarlineContentBlock[] = [
  {
    title: "Sample Development",
    subtitle: "Verify before committing to a bulk order",
    paragraphs: [
      "For suitable products, samples can be coordinated before final bulk production so required changes can be communicated to the manufacturer.",
    ],
    groups: [
      {
        label: "Verify",
        items: [
          "Dimensions",
          "Material",
          "Finish",
          "Colour",
          "Functionality",
          "Packaging",
          "Overall quality",
        ],
      },
    ],
  },
  {
    title: "Product Customisation",
    subtitle: "Build products around your brand",
    paragraphs: [
      "Customisation depends on the product, manufacturer capability and commercial quantity.",
    ],
    groups: [
      {
        label: "Options",
        items: [
          "Size, colour, material and finish",
          "Packaging and custom cartons",
          "Logo printing and labels",
          "Branding",
          "Product design modifications",
        ],
      },
      {
        label: "Suitable for",
        items: [
          "Private-label brands",
          "Retail product lines",
          "E-commerce brands",
          "Dealer networks",
          "Distribution businesses",
        ],
      },
    ],
  },
  {
    title: "Private Label Imports",
    subtitle: "Your brand. International manufacturing.",
    paragraphs: [
      "OEM and private-label opportunities allow Indian businesses to create internationally manufactured products under their own brands without independently managing the overseas supply chain.",
    ],
    groups: [
      {
        items: [
          "Product selection and manufacturer sourcing",
          "Custom branding and logo placement",
          "Packaging",
          "Production",
          "Documentation",
          "Shipping",
          "Customs clearance",
          "Delivery",
        ],
      },
    ],
  },
  {
    title: "Price Negotiation",
    subtitle: "Commercially competitive procurement",
    paragraphs: [
      "Commercial discussions are coordinated with suppliers to work toward practical terms based on the requirement and order volume.",
    ],
    groups: [
      {
        label: "Landed-cost factors",
        items: [
          "Product price and quantity",
          "Packaging and shipping volume",
          "Freight",
          "Customs duty",
          "Local logistics",
          "Currency movement",
        ],
      },
    ],
  },
  {
    title: "Factory & Supplier Verification",
    subtitle: "Reduce risk before large orders",
    paragraphs: [
      "Where required and commercially feasible, additional verification can be coordinated. The appropriate level depends on the product, supplier, country and project.",
    ],
    groups: [
      {
        items: [
          "Company information",
          "Manufacturing capabilities and facilities",
          "Export experience",
          "Product certifications",
          "Previous product work",
          "Packaging facilities",
          "Production capacity",
        ],
      },
    ],
  },
  {
    title: "Quality Control",
    subtitle: "Verify quality before dispatch",
    paragraphs: [
      "For applicable orders, quality checks or third-party inspections can be coordinated before shipment. Specialist testing or certification may use appropriate external agencies.",
    ],
    groups: [
      {
        label: "Inspection parameters",
        items: [
          "Quantity and dimensions",
          "Appearance, finish and colour",
          "Packaging and labelling",
          "Product specifications",
          "Visible manufacturing defects",
        ],
      },
    ],
  },
];

export const logisticsCapabilities: StarlineContentBlock[] = [
  {
    title: "Production Follow-Up",
    subtitle: "Continuous coordination with manufacturers",
    paragraphs: [
      "Once an order enters production, supplier milestones are tracked to provide better visibility between order placement and shipment.",
    ],
    groups: [
      {
        items: [
          "Production commencement",
          "Raw material status",
          "Sample approval",
          "Production progress",
          "Packaging",
          "Inspection readiness",
          "Dispatch schedule",
        ],
      },
    ],
  },
  {
    title: "Payment Coordination",
    subtitle: "Properly managed international transactions",
    paragraphs: [
      "Commercial documentation and payment requirements are coordinated through appropriate banking and regulatory channels.",
    ],
    groups: [
      {
        items: [
          "Advance and balance payments",
          "Telegraphic transfer",
          "Bank-supported international payments",
          "Letters of Credit for applicable transactions",
        ],
      },
    ],
    note: "Transactions remain subject to applicable banking, foreign-exchange, taxation, customs and regulatory requirements.",
  },
  {
    title: "Shipping & Logistics",
    subtitle: "International freight managed professionally",
    paragraphs: [
      "The suitable shipping method is determined by product type, dimensions, weight, urgency and commercial feasibility.",
    ],
    groups: [
      {
        label: "Sea freight — FCL or LCL",
        items: [
          "Bulk cargo",
          "Large products",
          "Commercial quantities",
          "Container shipments",
          "Cost-sensitive imports",
        ],
      },
      {
        label: "Air freight",
        items: ["Samples", "Smaller shipments", "High-value products", "Urgent requirements"],
      },
    ],
  },
  {
    title: "Cargo Consolidation",
    subtitle: "Multiple suppliers. One coordinated shipment.",
    paragraphs: [
      "Where commercially and operationally suitable, products purchased from different factories can be coordinated for consolidation before onward shipment, simplifying logistics and potentially improving shipping cost.",
    ],
  },
  {
    title: "Import Documentation",
    subtitle: "Proper documentation for every shipment",
    paragraphs: [
      "Documentation requirements are coordinated with the relevant professionals and agencies. Certain products may need additional approvals, testing, licences or regulatory compliance.",
    ],
    groups: [
      {
        items: [
          "Commercial Invoice and Packing List",
          "Bill of Lading or Airway Bill",
          "Certificate of Origin",
          "Insurance documentation",
          "Product certificates",
          "Shipping documentation",
          "Import-related declarations",
          "Customs documentation",
        ],
      },
    ],
  },
  {
    title: "Customs Clearance",
    subtitle: "Coordinated arrival at Indian ports",
    paragraphs: [
      "Appropriate customs-clearing and logistics partners coordinate the arrival and clearance process in India.",
    ],
    groups: [
      {
        items: [
          "Import documentation and customs filing",
          "Duty assessment and applicable taxes",
          "Port procedures",
          "Examination coordination",
          "Cargo release",
          "Transportation",
        ],
      },
    ],
    note: "Duties, taxes, statutory charges and regulatory requirements depend on product classification and prevailing Indian regulations.",
  },
  {
    title: "Doorstep Delivery",
    subtitle: "The import is complete when the goods reach you",
    paragraphs: [
      "After customs clearance, onward transportation can be coordinated to the agreed destination: warehouse, retail store, factory, project site, office, distribution centre or residence.",
    ],
    note: "Manufacturer → Port → India → Customs → Your Doorstep",
  },
];

export const projectProcurementTargets = [
  "Resorts",
  "Hotels",
  "Restaurants",
  "Luxury villas",
  "Apartments",
  "Commercial developments",
  "Landscape projects",
  "Interior projects",
  "Hospitality projects",
  "Farmhouse developments",
];

export const sourceableProducts = [
  "Home décor",
  "Garden décor",
  "Furniture",
  "Outdoor furniture",
  "Planters",
  "Landscape products",
  "Building accessories",
  "Interior products",
  "Lighting products",
  "Hardware",
  "Hospitality products",
  "Packaging products",
  "Display products",
  "Retail accessories",
  "Custom-manufactured products",
  "Promotional products",
  "Machinery accessories",
  "Commercial equipment",
];

export const whyStarline: StarlineContentBlock[] = [
  {
    title: "One Point of Coordination",
    paragraphs: [
      "A structured sourcing partner coordinates the supplier, factory, quality inspector, freight forwarder, customs broker and transporter.",
    ],
  },
  {
    title: "International Manufacturer Access",
    paragraphs: [
      "Focused sourcing across China, Vietnam and Indonesia opens diverse manufacturing ecosystems and product categories.",
    ],
  },
  {
    title: "Business-Focused Procurement",
    groups: [
      {
        items: [
          "Consistency",
          "Quality",
          "Correct documentation",
          "Reliable timelines",
          "Commercial transparency",
          "Professional communication",
        ],
      },
    ],
  },
  {
    title: "Transparent Communication",
    paragraphs: ["Clients are kept informed at the major stages of every order."],
    groups: [
      {
        items: [
          "Sourcing",
          "Sampling",
          "Production",
          "Shipping",
          "Documentation",
          "Clearance",
          "Delivery",
        ],
      },
    ],
  },
  {
    title: "Customised, End-to-End Service",
    paragraphs: [
      "Each search is shaped around the product, quantity, quality level, budget, timeline, branding and business model — from manufacturer identification overseas to delivery in India.",
    ],
  },
];

export const importProcess = [
  {
    number: "01",
    title: "Share Your Requirement",
    description: "Send a product image, video, link, drawing or specification with estimated quantity.",
  },
  {
    number: "02",
    title: "Product & Manufacturer Search",
    description: "The sourcing team identifies suitable manufacturers for the requirement.",
  },
  {
    number: "03",
    title: "Quotation & Comparison",
    description: "Pricing, MOQ, specifications, lead time and commercial terms are coordinated.",
  },
  {
    number: "04",
    title: "Sample & Approval",
    description: "Where required, product samples are organised for evaluation.",
  },
  {
    number: "05",
    title: "Order Confirmation",
    description:
      "Product, price, specifications, quantity, packaging and payment terms are finalised before ordering.",
  },
  {
    number: "06",
    title: "Production Monitoring",
    description: "The supplier is coordinated with throughout production.",
  },
  {
    number: "07",
    title: "Quality Check",
    description: "Where applicable, inspection is coordinated before dispatch.",
  },
  {
    number: "08",
    title: "Shipping",
    description: "Cargo moves through the appropriate sea or air freight channel.",
  },
  {
    number: "09",
    title: "Customs Clearance",
    description: "Import documentation and customs procedures are coordinated in India.",
  },
  {
    number: "10",
    title: "Doorstep Delivery",
    description: "Cleared goods are transported to the agreed destination.",
  },
];

export const starGardensCustomers = [
  "Residential landscapes",
  "Villas",
  "Apartments",
  "Resorts",
  "Hotels",
  "Corporate campuses",
  "Restaurants",
  "Commercial developments",
  "Landscape architects",
  "Builders and developers",
];

export const audienceServices: StarlineContentBlock[] = [
  {
    title: "Architects & Designers",
    paragraphs: [
      "Architects, landscape architects, interior designers and project consultants can share an international product reference for suitable manufacturing and import options.",
    ],
  },
  {
    title: "Builders & Developers",
    paragraphs: [
      "Project-specific sourcing can unlock larger selections, custom finishes and dimensions, bulk manufacturing, private designs and competitive commercial options.",
    ],
  },
  {
    title: "Retailers & Distributors",
    paragraphs: [
      "Explore exclusive products, bulk imports, private-label opportunities, retail-ready packaging and custom branding while the international supply process is coordinated.",
    ],
  },
  {
    title: "E-commerce Brands",
    paragraphs: [
      "Build a pipeline from product idea to manufacturer, sample, branding, packaging, production, shipping, customs and final delivery.",
    ],
  },
];

export const importFaqs = [
  {
    question: "Do you only import home and garden products?",
    answer:
      "No. Home and garden is a core category distributed through Star Gardens, but other legal and commercially importable products can also be sourced from China, Vietnam and Indonesia.",
  },
  {
    question: "Can you help if I do not know a supplier?",
    answer:
      "Yes. Share the product details, photograph, reference link or specification and the team can identify suitable manufacturers.",
  },
  {
    question: "Can you customise products with our brand?",
    answer:
      "For many categories, yes. Subject to manufacturer capability and MOQ, logos, packaging, labels, colours, sizes and designs can potentially be coordinated.",
  },
  {
    question: "Can you arrange samples?",
    answer:
      "For suitable products, samples can be arranged before bulk production. Sample, courier and related charges may apply.",
  },
  {
    question: "Do you handle shipping?",
    answer:
      "Yes. Sea or air freight can be coordinated according to the product, urgency and order size.",
  },
  {
    question: "Do you handle customs clearance?",
    answer:
      "Yes. Appropriate customs and logistics professionals are coordinated for applicable imports in India.",
  },
  {
    question: "Will you deliver the goods to our location?",
    answer:
      "Yes. After customs clearance, onward transport can be coordinated to the agreed destination.",
  },
  {
    question: "Can I purchase products from several factories?",
    answer:
      "Yes. Depending on cargo size and supplier locations, consolidation may be coordinated before export.",
  },
  {
    question: "Can you visit or inspect a factory?",
    answer:
      "Factory verification or third-party inspection may be arranged for applicable projects, subject to supplier location and inspection requirements.",
  },
  {
    question: "What information should I send to get a quotation?",
    answer:
      "Send as much detail as possible: product image or link, specifications, dimensions, material, quantity, required quality, branding requirements, delivery city and expected timeline. This helps identify the most appropriate sourcing solution.",
  },
];

export const enquiryRequirements = [
  "Product name",
  "Product image, link, drawing or reference",
  "Specifications and dimensions",
  "Preferred material and required quality",
  "Required quantity",
  "Target price, if available",
  "Branding requirements",
  "Delivery city",
  "Expected timeline",
  "Business or company name",
  "Contact details",
];

export const companyPrinciples: StarlineContentBlock[] = [
  {
    title: "Our Vision",
    paragraphs: [
      "To become a trusted Indian sourcing and international procurement partner that connects businesses with reliable global manufacturing while simplifying the complexities of international trade.",
    ],
  },
  {
    title: "Our Mission",
    paragraphs: ["Build a professionally managed sourcing ecosystem around six principles."],
    groups: [
      {
        items: [
          "Reliability",
          "Transparency",
          "Quality",
          "Compliance",
          "Commercial efficiency",
          "Long-term partnerships",
        ],
      },
    ],
  },
  {
    title: "Our Promise",
    subtitle: "Global manufacturing. Local accountability.",
    paragraphs: [
      "An overseas order commits capital, time, customer promises, project timelines and brand reputation. The approach is therefore built around structured coordination from sourcing through final delivery.",
    ],
  },
];

export const importComplianceNotice =
  "All sourcing, customs, taxation, payment and import activities are subject to applicable Indian laws, regulations, product-specific approvals and statutory requirements. Product sourcing is also subject to legal importability, certification requirements and manufacturer availability.";
