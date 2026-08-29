"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Info, X } from "lucide-react";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import type { Project } from "@/lib/companies";

type ProjectDetail = NonNullable<Project["details"]>[number];

function DetailCard({ detail }: { detail: ProjectDetail }) {
  return (
    <section className="group/card rounded-2xl border border-sg-line-light/70 bg-sg-paper p-5 transition-all duration-300 hover:border-sg-red/30 hover:bg-white hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2.5">
        <span className="h-2 w-2 rounded-full bg-sg-red transition-transform duration-300 group-hover/card:scale-125" />
        <h3 className="font-display text-xl font-semibold text-sg-dark-ink">{detail.title}</h3>
      </div>
      {detail.description && (
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-sg-dark-muted">
          {detail.description}
        </p>
      )}
      {detail.items && (
        <ul className="mt-4 grid gap-2.5 text-sm leading-relaxed text-sg-dark-muted sm:grid-cols-2">
          {detail.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sg-red-tint text-sg-red">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function ProjectInfoDialog({
  title,
  details,
  footer,
}: {
  title: string;
  details: ProjectDetail[];
  footer?: string[];
}) {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const dragControls = useDragControls();

  // The sheet slides up on phones and fades in as a centred modal from md up.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="group inline-flex h-10 w-full shrink-0 items-center justify-center gap-2.5 rounded-full md:w-auto border border-sg-line-light bg-white/95 px-3.5 py-1.5 md:px-4 text-sm font-semibold text-sg-dark-ink shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sg-red/40 hover:bg-white hover:text-sg-red hover:shadow-[0_8px_20px_-4px_rgba(224,20,44,0.16)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sg-red focus-visible:ring-offset-2"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sg-red-tint text-sg-red transition-all duration-300 group-hover:bg-sg-red group-hover:text-white group-hover:scale-105 group-hover:rotate-6">
          <Info className="h-3 w-3" strokeWidth={2.5} />
        </span>
        <span className="transition-colors duration-300 group-hover:text-sg-red">Project Info</span>
        <ArrowUpRight className="h-3.5 w-3.5 text-sg-dark-muted/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sg-red" />
      </button>

      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-[100] flex items-end justify-center p-0 md:items-center md:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-sg-black/50 md:backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-info-title"
              data-lenis-prevent=""
              drag={isDesktop ? false : "y"}
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.55 }}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 700) setOpen(false);
              }}
              initial={isDesktop ? { opacity: 0, scale: 0.98 } : { y: "100%" }}
              animate={isDesktop ? { opacity: 1, scale: 1 } : { y: 0 }}
              exit={isDesktop ? { opacity: 0, scale: 0.98 } : { y: "100%" }}
              transition={{ type: "tween", duration: 0.34, ease: [0.32, 0.72, 0, 1] }}
              style={{ willChange: "transform" }}
              className="relative z-10 flex max-h-[88dvh] w-full flex-col rounded-t-3xl border border-sg-line-light/80 bg-white shadow-2xl md:max-h-[80dvh] md:w-[min(92vw,72rem)] md:rounded-3xl"
            >
              {/* Grab bar — drag it down to dismiss (phones only) */}
              <div
                onPointerDown={(event) => dragControls.start(event)}
                aria-hidden="true"
                className="flex shrink-0 cursor-grab touch-none justify-center pb-1 pt-3 active:cursor-grabbing md:hidden"
              >
                <span className="h-1 w-10 rounded-full bg-sg-line-light" />
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-sg-line-light px-5 pb-4 pt-2 md:px-7 md:py-4">
                <div className="min-w-0 flex-1 text-center md:text-left">
                  <p className="sg-eyebrow text-sg-red">Project information</p>
                  <h2
                    id="project-info-title"
                    className="mt-1 font-display text-2xl font-semibold text-sg-dark-ink md:text-3xl"
                  >
                    {title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close project information"
                  className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sg-line-light bg-sg-paper text-sg-dark-ink transition-all duration-300 hover:rotate-90 hover:border-sg-red/40 hover:bg-sg-red-tint hover:text-sg-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sg-red md:flex"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                data-lenis-prevent=""
                className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-5 py-5 [scrollbar-color:theme(colors.sg.red)_transparent] [scrollbar-width:thin] md:px-7 md:py-7"
              >
                <div className="space-y-4 md:hidden">
                  {details.map((detail) => (
                    <DetailCard key={detail.title} detail={detail} />
                  ))}
                </div>
                <div className="hidden grid-cols-2 gap-4 md:grid">
                  {[0, 1].map((column) => (
                    <div key={column} className="space-y-4">
                      {details
                        .filter((_, index) => index % 2 === column)
                        .map((detail) => (
                          <DetailCard key={detail.title} detail={detail} />
                        ))}
                    </div>
                  ))}
                </div>
                {footer && (
                  <div className="mt-6 border-l-2 border-sg-red pl-5">
                    {footer.map((line, index) => (
                      <p
                        key={line}
                        className={
                          index === 0
                            ? "font-display text-xl italic text-sg-dark-ink"
                            : index === 1
                              ? "mt-4 font-display text-lg font-semibold text-sg-dark-ink"
                              : "mt-1 text-sm text-sg-dark-muted"
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.section>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
