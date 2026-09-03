"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import {
  audienceServices,
  businessSourcingUses,
  companyPrinciples,
  distributionCustomers,
  enquiryRequirements,
  homeGardenCategories,
  importComplianceNotice,
  importFaqs,
  importProcess,
  logisticsCapabilities,
  managedImportServices,
  productSourcingSteps,
  projectProcurementTargets,
  sourceableProducts,
  sourcingCapabilities,
  sourcingMarkets,
  starGardensCustomers,
  whyStarline,
  type StarlineContentBlock,
} from "@/lib/starline-import-export";

type DetailSection =
  | {
      kind: "blocks";
      title: string;
      intro?: string;
      blocks: StarlineContentBlock[];
    }
  | {
      kind: "list";
      title: string;
      intro?: string;
      items: string[];
    }
  | {
      kind: "process";
      title: string;
    }
  | {
      kind: "faq";
      title: string;
    }
  | {
      kind: "enquiry";
      title: string;
    };

type Topic = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  overview: string;
  image: string;
  alt: string;
  sections: DetailSection[];
};

const cardRoot = "/starline-import-&-export/cards";

const topics: Topic[] = [
  {
    id: "global-sourcing",
    title: "Global Sourcing",
    eyebrow: "China · Vietnam · Indonesia",
    summary: "Reliable manufacturers, commercial coordination and international procurement.",
    overview:
      "Starline connects Indian businesses with capable manufacturers across three focused sourcing markets. The team coordinates supplier discovery, commercial discussions and the practical steps required to turn an international product requirement into a dependable supply arrangement.",
    image: `${cardRoot}/global-sourcing.webp`,
    alt: "Cargo ship and containers representing Starline global sourcing",
    sections: [
      {
        kind: "blocks",
        title: "Three focused sourcing markets",
        intro:
          "Starline coordinates directly with manufacturers so Indian businesses can access international production without independently managing every stage.",
        blocks: sourcingMarkets,
      },
      {
        kind: "list",
        title: "What the team manages",
        items: managedImportServices,
      },
    ],
  },
  {
    id: "home-garden-imports",
    title: "Home & Garden Imports",
    eyebrow: "Products for the Indian market",
    summary: "Planters, décor, furniture and landscape products distributed through Star Gardens.",
    overview:
      "A curated range of home, garden and landscape products is sourced for Indian homes, businesses and projects. Selected products are supplied through Star Gardens, combining international manufacturing access with local product knowledge and Pan-India distribution support.",
    image: `${cardRoot}/home-garden-imports.webp`,
    alt: "Imported planters and outdoor décor in a premium garden setting",
    sections: [
      {
        kind: "blocks",
        title: "Home and garden product categories",
        intro:
          "Products can be selected or customised according to manufacturer capability, commercial quantity and project requirements.",
        blocks: homeGardenCategories,
      },
      {
        kind: "list",
        title: "Who Star Gardens serves",
        intro:
          "Selected international products are stocked and distributed through the group's landscape architecture and garden-development brand.",
        items: starGardensCustomers,
      },
    ],
  },
  {
    id: "pan-india-distribution",
    title: "Pan-India Distribution",
    eyebrow: "From port to project",
    summary: "Imported products supplied to professionals, businesses and projects across India.",
    overview:
      "After products arrive in India, Starline coordinates the movement from cargo release to the customer’s destination. Orders can support retailers, designers, developers and commercial projects, with delivery planned around product availability, volume and site requirements.",
    image: `${cardRoot}/pan-india-distribution.webp`,
    alt: "Freight truck and India distribution network at sunrise",
    sections: [
      {
        kind: "list",
        title: "Businesses and professionals served",
        intro:
          "Bulk orders and project-based supply can be handled according to availability, quantity and commercial feasibility.",
        items: distributionCustomers,
      },
    ],
  },
  {
    id: "business-sourcing",
    title: "Business Sourcing Services",
    eyebrow: "Tell us what you need",
    summary: "Manufacturer discovery and product sourcing for many Indian business models.",
    overview:
      "Businesses can begin with a photograph, drawing, product link or written brief. Starline translates that requirement into manufacturer searches, comparable commercial options and a practical sourcing route suited to resale, private label, e-commerce or project procurement.",
    image: `${cardRoot}/business-sourcing.webp`,
    alt: "Procurement team reviewing product samples and packaging",
    sections: [
      {
        kind: "list",
        title: "Products sourced around your requirement",
        intro:
          "You do not need to know the supplier. Share a product reference and the team can identify suitable manufacturers. Sourcing is not limited to home and garden products.",
        items: businessSourcingUses,
      },
      {
        kind: "blocks",
        title: "Built for different buying models",
        blocks: audienceServices,
      },
    ],
  },
  {
    id: "product-sourcing",
    title: "Product Sourcing",
    eyebrow: "Find and validate the right manufacturer",
    summary: "Requirements, supplier comparison, samples, customisation and private label.",
    overview:
      "Effective sourcing starts with a precise specification and continues through supplier evaluation, samples and commercial comparison. Starline helps businesses validate the complete offer — quality, quantity, price, packaging, customisation and delivery timeline — before committing to production.",
    image: `${cardRoot}/product-sourcing.webp`,
    alt: "Specialist inspecting a product prototype and specifications",
    sections: [
      {
        kind: "blocks",
        title: "The sourcing foundation",
        intro:
          "The goal is not simply to find a product, but to find a manufacturer that can consistently deliver the required quality, quantity, price, specification, packaging and timeline.",
        blocks: productSourcingSteps,
      },
      {
        kind: "blocks",
        title: "Commercial product development",
        blocks: sourcingCapabilities.slice(0, 4),
      },
    ],
  },
  {
    id: "production-quality",
    title: "Production & Quality",
    eyebrow: "Confidence before dispatch",
    summary: "Supplier verification, quality inspection, production follow-up and payment coordination.",
    overview:
      "Production is followed from order confirmation through completion, with supplier communication and applicable quality checks coordinated before dispatch. This gives buyers clearer visibility over specifications, progress, payment stages and the condition of goods before they leave the factory.",
    image: `${cardRoot}/production-quality.webp`,
    alt: "Quality inspector checking a planter at a manufacturing facility",
    sections: [
      {
        kind: "blocks",
        title: "Verification and quality control",
        blocks: sourcingCapabilities.slice(4),
      },
      {
        kind: "blocks",
        title: "Production and payment coordination",
        blocks: logisticsCapabilities.slice(0, 2),
      },
    ],
  },
  {
    id: "shipping-logistics",
    title: "Shipping & Logistics",
    eyebrow: "Sea · Air · Consolidation",
    summary: "International freight, multi-supplier consolidation and correct import documents.",
    overview:
      "The right freight plan depends on cargo size, urgency, origin and cost. Starline coordinates sea or air movement, combines eligible shipments from multiple suppliers where practical, and helps keep the commercial and transport documents aligned for import into India.",
    image: `${cardRoot}/shipping-logistics.webp`,
    alt: "Cargo ship, aircraft, container loading and import documents",
    sections: [
      {
        kind: "blocks",
        title: "Moving goods to India",
        blocks: logisticsCapabilities.slice(2, 5),
      },
    ],
  },
  {
    id: "customs-delivery",
    title: "Customs & Doorstep Delivery",
    eyebrow: "Arrival to final destination",
    summary: "Clearance, cargo release, inland transport and delivery to the agreed location.",
    overview:
      "Once a shipment reaches India, the work continues through customs coordination, cargo release and domestic transport. Starline keeps these connected stages moving toward the agreed warehouse, business address or project site, providing one local point of coordination.",
    image: `${cardRoot}/customs-delivery.webp`,
    alt: "Customs inspection and transfer from container to local delivery truck",
    sections: [
      {
        kind: "blocks",
        title: "The final stages of the import",
        blocks: logisticsCapabilities.slice(5),
      },
    ],
  },
  {
    id: "project-procurement",
    title: "Project Procurement",
    eyebrow: "Multi-product sourcing",
    summary: "Coordinated procurement for hospitality, real estate, interiors and landscapes.",
    overview:
      "Large developments often require products from several categories and more than one manufacturer. Starline structures these requirements as a coordinated procurement programme, helping project teams manage suppliers, samples, production schedules, consolidation and delivery as one connected workflow.",
    image: `${cardRoot}/project-procurement.webp`,
    alt: "Architects reviewing resort plans and imported finish samples",
    sections: [
      {
        kind: "list",
        title: "Projects supported",
        intro:
          "Large requirements may involve several products and manufacturers brought into one structured sourcing and logistics programme.",
        items: projectProcurementTargets,
      },
      {
        kind: "list",
        title: "Products businesses can source",
        intro:
          "Availability remains subject to legal importability, Indian regulations, certifications and suitable manufacturers.",
        items: sourceableProducts,
      },
    ],
  },
  {
    id: "why-starline",
    title: "Why Starline",
    eyebrow: "One point of coordination",
    summary: "Global manufacturer access backed by transparent communication and local accountability.",
    overview:
      "International sourcing becomes easier when one accountable team understands both the overseas supply side and the buyer’s needs in India. Starline combines manufacturer access with clear coordination, documented stages and local support throughout the sourcing and import journey.",
    image: `${cardRoot}/why-starline.webp`,
    alt: "Business owner and sourcing partner agreeing an import project",
    sections: [
      {
        kind: "blocks",
        title: "Why businesses choose a sourcing partner",
        blocks: whyStarline,
      },
      {
        kind: "blocks",
        title: "Vision, mission and promise",
        blocks: companyPrinciples,
      },
    ],
  },
  {
    id: "import-process",
    title: "Our Import Process",
    eyebrow: "Ten coordinated stages",
    summary: "A clear path from the first product brief to delivery at your destination.",
    overview:
      "Each import is organised as a sequence of connected decisions rather than a collection of separate vendors. The ten-stage process moves from requirement review and supplier selection through sampling, production, freight, customs clearance and final delivery.",
    image: `${cardRoot}/import-process.webp`,
    alt: "Physical objects illustrating the stages of an import process",
    sections: [{ kind: "process", title: "From requirement to doorstep" }],
  },
  {
    id: "faq-enquiry",
    title: "FAQs & Start an Enquiry",
    eyebrow: "Practical answers",
    summary: "What to send, what can be coordinated and how to begin your import journey.",
    overview:
      "Starting an enquiry does not require a finished procurement document. Share the information already available and the team can clarify specifications, likely quantities, sourcing feasibility and the next steps needed to develop a practical import plan.",
    image: `${cardRoot}/faq-enquiry.webp`,
    alt: "Sourcing consultant explaining a product sample to a business owner",
    sections: [
      { kind: "faq", title: "Frequently asked questions" },
      { kind: "enquiry", title: "Tell us what you want to source" },
    ],
  },
];

function ModalCheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-sg-dark-muted">
          <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-sg-red" strokeWidth={2.5} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ModalBlock({ block }: { block: StarlineContentBlock }) {
  return (
    <article className="rounded-2xl border border-sg-line-light bg-sg-paper p-5 sm:p-6">
      <h4 className="font-display text-xl font-semibold text-sg-dark-ink">{block.title}</h4>
      {block.subtitle && (
        <p className="mt-1.5 font-display text-sm italic text-sg-red">{block.subtitle}</p>
      )}
      {block.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-sm leading-relaxed text-sg-dark-muted">
          {paragraph}
        </p>
      ))}
      {block.groups?.map((group, index) => (
        <div key={`${block.title}-${group.label ?? index}`} className="mt-4">
          {group.label && (
            <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-sg-dark-ink">
              {group.label}
            </p>
          )}
          <ModalCheckList items={group.items} />
        </div>
      ))}
      {block.note && (
        <p className="mt-4 border-t border-sg-line-light pt-3 text-xs leading-relaxed text-sg-dark-muted">
          {block.note}
        </p>
      )}
    </article>
  );
}

function DetailContent({ topic }: { topic: Topic }) {
  return (
    <div className="space-y-10">
      {topic.sections.map((section) => (
        <section key={section.title}>
          <h3 className="font-display text-2xl font-semibold text-sg-dark-ink sm:text-3xl">
            {section.title}
          </h3>
          {"intro" in section && section.intro && (
            <p className="mt-3 max-w-[72ch] text-sm leading-relaxed text-sg-dark-muted">
              {section.intro}
            </p>
          )}

          {section.kind === "blocks" && (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {section.blocks.map((block) => (
                <ModalBlock key={block.title} block={block} />
              ))}
            </div>
          )}

          {section.kind === "list" && (
            <div className="mt-5 rounded-2xl border border-sg-line-light bg-sg-paper p-5 sm:p-6">
              <ModalCheckList items={section.items} />
            </div>
          )}

          {section.kind === "process" && (
            <ol className="mt-5 grid gap-4 sm:grid-cols-2">
              {importProcess.map((step) => (
                <li key={step.number} className="rounded-2xl border border-sg-line-light bg-sg-paper p-5">
                  <span className="font-mono text-xs text-sg-red">{step.number}</span>
                  <h4 className="mt-2 font-display text-lg font-semibold text-sg-dark-ink">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-sg-dark-muted">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          )}

          {section.kind === "faq" && (
            <div className="mt-5 space-y-3">
              {importFaqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border border-sg-line-light bg-sg-paper p-5">
                  <summary className="cursor-pointer font-display text-lg font-semibold text-sg-dark-ink">
                    {faq.question}
                  </summary>
                  <p className="mt-3 border-t border-sg-line-light pt-3 text-sm leading-relaxed text-sg-dark-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          )}

          {section.kind === "enquiry" && (
            <div className="mt-5 rounded-2xl bg-sg-dark-ink p-6 text-white sm:p-8">
              <p className="max-w-[66ch] text-sm leading-relaxed text-white/70">
                Send a photo, product link, drawing or simply your requirement. The sourcing team
                can explore suitable manufacturing options in China, Vietnam and Indonesia.
              </p>
              <div className="mt-6 [&_li]:text-white/75 [&_svg]:text-sg-red-bright">
                <ModalCheckList items={enquiryRequirements} />
              </div>
              <Link
                href="/enquiry"
                className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-sg-red px-6 py-2.5 text-sm font-semibold text-white"
              >
                Submit your requirement
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55">
                {importComplianceNotice}
              </p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export function StarlineServicesGallery() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selectedTopic) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedTopic(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedTopic]);

  const closeModal = () => {
    setSelectedTopic(null);
    requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  return (
    <section className="bg-sg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-10 max-w-[72ch]">
          <p className="sg-eyebrow mb-4 text-sg-red">Starline Import &amp; Export</p>
          <h2 className="font-display text-3xl font-semibold text-sg-dark-ink md:text-5xl">
            Explore our sourcing and import services.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-sg-dark-muted">
            Select any service card to see its image, process and complete details — from
            product sourcing and quality checks to shipping, customs and delivery.
          </p>
        </div>

        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {topics.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setSelectedTopic(topic);
              }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sg-line-light bg-white text-left shadow-[0_18px_38px_-34px_rgba(32,31,29,0.45)] outline-none transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-sg-red hover:shadow-[0_22px_44px_-30px_rgba(224,20,44,0.35)] focus-visible:ring-2 focus-visible:ring-sg-red focus-visible:ring-offset-2"
              aria-haspopup="dialog"
            >
              <span className="relative block aspect-[3508/2480] w-full shrink-0 overflow-hidden bg-sg-dark-ink">
                <Image
                  src={topic.image}
                  alt={topic.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </span>
              <span className="flex flex-1 flex-col p-5">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-sg-red">
                  {topic.eyebrow}
                </span>
                <span className="mt-2 block font-display text-xl font-semibold text-sg-dark-ink">
                  {topic.title}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-sg-dark-muted">
                  {topic.summary}
                </span>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-semibold text-sg-red">
                  View details
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedTopic && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="starline-topic-title"
            data-lenis-prevent=""
            className="max-h-[94dvh] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:rounded-3xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-sg-line-light bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
              <div>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-sg-red">
                  {selectedTopic.eyebrow}
                </p>
                <h2 id="starline-topic-title" className="mt-1 font-display text-xl font-semibold text-sg-dark-ink sm:text-2xl">
                  {selectedTopic.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sg-line-light text-sg-dark-ink outline-none hover:border-sg-red hover:text-sg-red focus-visible:ring-2 focus-visible:ring-sg-red"
                aria-label="Close details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 sm:p-8 lg:p-10">
              <div className="grid overflow-hidden rounded-2xl border border-sg-line-light bg-sg-paper lg:grid-cols-[1.08fr_0.92fr]">
                <div className="relative aspect-[4/3] min-h-0 overflow-hidden bg-sg-dark-ink lg:aspect-auto lg:min-h-[22rem]">
                  <Image
                    src={selectedTopic.image}
                    alt={selectedTopic.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-sg-red">
                    Service overview
                  </p>
                  <p className="mt-4 font-display text-xl font-semibold leading-snug text-sg-dark-ink sm:text-2xl">
                    {selectedTopic.summary}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-sg-dark-muted sm:text-base">
                    {selectedTopic.overview}
                  </p>
                </div>
              </div>

              <div className="mt-10 lg:mt-12">
                <DetailContent topic={selectedTopic} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
