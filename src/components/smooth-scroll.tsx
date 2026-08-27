"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

let globalLenis: Lenis | null = null;

export function getLenis() {
  return globalLenis;
}

export function resetScroll(hash?: string) {
  if (typeof window === "undefined") return;

  const targetHash = hash || window.location.hash;
  if (targetHash) {
    const target = document.querySelector(targetHash);
    if (target) {
      if (globalLenis) {
        globalLenis.scrollTo(target as HTMLElement, { offset: -100 });
      } else {
        target.scrollIntoView();
      }
      return;
    }
  }

  if (globalLenis) {
    globalLenis.scrollTo(0, { immediate: true, force: true });
  }
  window.scrollTo(0, 0);
  ScrollTrigger.refresh();
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so Lenis and ScrollTrigger
 * share a single rAF loop and never fight over scroll position.
 * Disabled entirely when the visitor prefers reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Prevent the browser's native scroll restoration from fighting with Lenis
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    globalLenis = lenis;

    // Keep ScrollTrigger in sync with Lenis' virtual scroll position
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links inside the page should ease rather than jump
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const href = anchor?.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -100 });
    };
    document.addEventListener("click", onAnchorClick);

    // Late-loading fonts/images change layout — recalculate once settled
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const settle = window.setTimeout(refresh, 600);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", refresh);
      window.clearTimeout(settle);
      gsap.ticker.remove(raf);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);

  return null;
}
