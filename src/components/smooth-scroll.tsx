"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

let globalLenis: Lenis | null = null;

export function getLenis() {
  return globalLenis;
}

export function refreshScroll() {
  if (typeof window === "undefined") return;
  globalLenis?.resize();
  ScrollTrigger.refresh();
}

export function resetScroll(hash?: string) {
  if (typeof window === "undefined") return;

  const targetHash = hash || window.location.hash;
  if (targetHash) {
    const target = document.querySelector(targetHash);
    if (target) {
      if (globalLenis) {
        globalLenis.resize();
        globalLenis.scrollTo(target as HTMLElement, { offset: -100 });
      } else {
        target.scrollIntoView();
      }
      return;
    }
  }

  if (globalLenis) {
    globalLenis.resize();
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
  const pathname = usePathname();

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
      autoRaf: false,
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
      lenis.resize();
      lenis.scrollTo(target as HTMLElement, { offset: -100 });
    };
    document.addEventListener("click", onAnchorClick);

    // Recalculate and resize Lenis whenever the layout changes
    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    // ResizeObserver watches document body changes (image loads, card stacking, dynamic DOM)
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        onResize();
      });
      if (document.body) {
        resizeObserver.observe(document.body);
      }
    }

    const timer1 = window.setTimeout(onResize, 100);
    const timer2 = window.setTimeout(onResize, 500);
    const timer3 = window.setTimeout(onResize, 1200);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
      window.clearTimeout(timer3);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      gsap.ticker.remove(raf);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);

  // Handle route change: resize Lenis and ensure scroll reaches top and recalculates limits
  useEffect(() => {
    if (!globalLenis) return;
    const timer = setTimeout(() => {
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          globalLenis?.resize();
          globalLenis?.scrollTo(target as HTMLElement, { offset: -100 });
          return;
        }
      }
      globalLenis?.resize();
      globalLenis?.scrollTo(0, { immediate: true, force: true });
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
