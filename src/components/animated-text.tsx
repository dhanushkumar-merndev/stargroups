"use client";

import { useEffect, useRef, type ElementType } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fires `run` once the element first enters the viewport.
 *
 * Uses IntersectionObserver rather than GSAP ScrollTrigger because several of
 * these headings live inside `position: sticky` containers, where ScrollTrigger
 * measures the element's natural offset and can fail to fire at all — leaving
 * the text stuck at opacity 0. IO reports real visibility, so it is correct for
 * sticky content and needs no syncing with Lenis.
 */
function useInView(
  ref: React.RefObject<HTMLElement | null>,
  run: (el: HTMLElement) => void,
) {
  const runRef = useRef(run);

  // Keep the latest callback without writing to the ref during render.
  useEffect(() => {
    runRef.current = run;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      runRef.current(el);
    };

    // Already visible on mount (or IO unsupported): run immediately.
    if (typeof IntersectionObserver === "undefined") {
      fire();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            fire();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [ref]);
}

/**
 * Splits text into words and reveals them with a masked upward slide.
 */
export function SplitWords({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.045,
  /** Animate on mount instead of waiting for the element to scroll into view */
  trigger = true,
  /** Words matching this list render in red italic */
  highlight,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: boolean;
  highlight?: string[];
}) {
  const ref = useRef<HTMLElement>(null);

  const animate = (el: HTMLElement) => {
    const words = el.querySelectorAll<HTMLElement>(".sg-word-inner");
    if (!words.length) return;

    if (prefersReduced()) {
      gsap.set(words, { yPercent: 0, opacity: 1, rotate: 0 });
      return;
    }

    gsap.fromTo(
      words,
      { yPercent: 115, opacity: 0, rotate: 3 },
      {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.9,
        delay,
        stagger,
        ease: "power4.out",
        overwrite: "auto",
      },
    );
  };

  // Mount-triggered headings animate straight away; the rest wait for view.
  useEffect(() => {
    if (trigger) return;
    const el = ref.current;
    if (el) animate(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, text]);

  useInView(ref, (el) => {
    if (trigger) animate(el);
  });

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={cn("[text-wrap:balance]", className)}>
      {words.map((word, i) => {
        const clean = word.replace(/[^\w'&]/g, "").toLowerCase();
        const isHot = highlight?.some(
          (h) => h.replace(/[^\w'&]/g, "").toLowerCase() === clean,
        );
        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            {/*
              No inline opacity:0 here on purpose — if JS never runs the text
              must still be readable. GSAP hides it at the start of the tween.
            */}
            <span
              className={cn(
                "sg-word-inner inline-block will-change-transform opacity-0",
                isHot && "text-sg-red font-display",
              )}
            >
              {word}
            </span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </Tag>
  );
}

/**
 * Reveals a heading one character at a time while keeping highlighted words
 * together for natural wrapping.
 */
export function SplitCharacters({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.018,
  trigger = true,
  highlight,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: boolean;
  highlight?: string[];
}) {
  const ref = useRef<HTMLElement>(null);

  const animate = (el: HTMLElement) => {
    const characters = el.querySelectorAll<HTMLElement>(".sg-character-inner");
    if (!characters.length) return;

    if (prefersReduced()) {
      gsap.set(characters, { yPercent: 0, opacity: 1, rotate: 0 });
      return;
    }

    gsap.fromTo(
      characters,
      { yPercent: 82, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.68,
        delay,
        stagger,
        ease: "power4.out",
        overwrite: "auto",
      },
    );
  };

  useEffect(() => {
    if (trigger) return;
    const el = ref.current;
    if (el) animate(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, text]);

  useInView(ref, (el) => {
    if (trigger) animate(el);
  });

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, wordIndex) => {
        const clean = word.replace(/[^\w'&]/g, "").toLowerCase();
        const isHot = highlight?.some(
          (item) => item.replace(/[^\w'&]/g, "").toLowerCase() === clean,
        );

        return (
          <span
            key={`${word}-${wordIndex}`}
            className={cn(
              "inline-block whitespace-nowrap align-bottom",
              wordIndex < words.length - 1 && "mr-[0.22em]",
              isHot && "text-sg-red font-display",
            )}
          >
            {Array.from(word).map((character, characterIndex) => (
              <span
                key={`${character}-${characterIndex}`}
                className="inline-block overflow-hidden pb-[0.12em] align-bottom leading-[1.12]"
              >
                <span className="sg-character-inner inline-block will-change-transform opacity-0">
                  {character}
                </span>
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}

/** Fades and lifts its children the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 34,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useInView(ref, (el) => {
    if (prefersReduced()) {
      gsap.set(el, { y: 0, opacity: 1 });
      return;
    }
    gsap.fromTo(
      el,
      { y, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay, ease: "power3.out", overwrite: "auto" },
    );
  });

  return (
    <div ref={ref} className={cn("opacity-0", className)}>
      {children}
    </div>
  );
}

/**
 * Counts a numeric value up when it scrolls into view, preserving any
 * non-numeric prefix/suffix (₹, %, +, s). Non-numeric values render as-is.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useInView(ref, (el) => {
    const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
    if (!match) return;

    const [, prefix, numRaw, suffix] = match;
    const decimals = (numRaw.split(".")[1] ?? "").length;
    const target = parseFloat(numRaw.replace(/,/g, ""));
    if (Number.isNaN(target)) return;

    if (prefersReduced()) {
      el.textContent = value;
      return;
    }

    const counter = { n: 0 };
    gsap.to(counter, {
      n: target,
      duration: 1.6,
      ease: "power2.out",
      overwrite: "auto",
      onUpdate: () => {
        el.textContent =
          prefix +
          counter.n.toLocaleString("en-IN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) +
          suffix;
      },
      onComplete: () => {
        el.textContent = value;
      },
    });
  });

  // Renders the real value server-side so it is correct without JS.
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
