"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { type Company } from "@/lib/companies";
import { CompanyLogo } from "./company-logo";
import { cn } from "@/lib/utils";

interface CompanyInteractiveCardProps {
  company: Company;
  index: number;
  className?: string;
}

export function CompanyInteractiveCard({
  company,
  index,
  className,
}: CompanyInteractiveCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const borderGlowRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const actionButtonRef = useRef<HTMLSpanElement>(null);
  const ctaArrowRef = useRef<HTMLSpanElement>(null);

  // Physics animation state (spring-lerp without React re-renders)
  const animState = useRef({
    current: {
      x: 0,
      y: 0,
      rotX: 0,
      rotY: 0,
      scaleX: 1,
      scaleY: 1,
      rTL: 28,
      rTR: 28,
      rBR: 28,
      rBL: 28,
      rTLy: 28,
      rTRy: 28,
      rBRy: 28,
      rBLy: 28,
      spotX: 0,
      spotY: 0,
      opacity: 0,
      borderGlow: 0,
      shadowSpread: 0,
    },
    target: {
      x: 0,
      y: 0,
      rotX: 0,
      rotY: 0,
      scaleX: 1,
      scaleY: 1,
      rTL: 28,
      rTR: 28,
      rBR: 28,
      rBL: 28,
      rTLy: 28,
      rTRy: 28,
      rBRy: 28,
      rBLy: 28,
      spotX: 0,
      spotY: 0,
      opacity: 0,
      borderGlow: 0,
      shadowSpread: 0,
    },
    isHovered: false,
    rafId: 0,
  });

  const updatePhysics = useCallback(() => {
    const s = animState.current;
    const cur = s.current;
    const tar = s.target;

    // Smooth spring lerp factor
    const lerp = 0.12;

    cur.x += (tar.x - cur.x) * lerp;
    cur.y += (tar.y - cur.y) * lerp;
    cur.rotX += (tar.rotX - cur.rotX) * lerp;
    cur.rotY += (tar.rotY - cur.rotY) * lerp;
    cur.scaleX += (tar.scaleX - cur.scaleX) * lerp;
    cur.scaleY += (tar.scaleY - cur.scaleY) * lerp;

    cur.rTL += (tar.rTL - cur.rTL) * lerp;
    cur.rTR += (tar.rTR - cur.rTR) * lerp;
    cur.rBR += (tar.rBR - cur.rBR) * lerp;
    cur.rBL += (tar.rBL - cur.rBL) * lerp;
    cur.rTLy += (tar.rTLy - cur.rTLy) * lerp;
    cur.rTRy += (tar.rTRy - cur.rTRy) * lerp;
    cur.rBRy += (tar.rBRy - cur.rBRy) * lerp;
    cur.rBLy += (tar.rBLy - cur.rBLy) * lerp;

    cur.spotX += (tar.spotX - cur.spotX) * 0.18;
    cur.spotY += (tar.spotY - cur.spotY) * 0.18;
    cur.opacity += (tar.opacity - cur.opacity) * 0.15;
    cur.borderGlow += (tar.borderGlow - cur.borderGlow) * 0.15;
    cur.shadowSpread += (tar.shadowSpread - cur.shadowSpread) * lerp;

    if (cardRef.current) {
      // 3D Perspective + Squeeze + Repel Transform
      cardRef.current.style.transform = `perspective(1100px) rotateX(${cur.rotX.toFixed(
        2
      )}deg) rotateY(${cur.rotY.toFixed(2)}deg) translate3d(${cur.x.toFixed(
        2
      )}px, ${cur.y.toFixed(2)}px, 0) scale3d(${cur.scaleX.toFixed(
        3
      )}, ${cur.scaleY.toFixed(3)}, 1)`;

      // Dynamic 8-value border radius squeeze & edge repel
      const radiusStr = `${cur.rTL.toFixed(1)}px ${cur.rTR.toFixed(
        1
      )}px ${cur.rBR.toFixed(1)}px ${cur.rBL.toFixed(1)}px / ${cur.rTLy.toFixed(
        1
      )}px ${cur.rTRy.toFixed(1)}px ${cur.rBRy.toFixed(1)}px ${cur.rBLy.toFixed(
        1
      )}px`;
      cardRef.current.style.borderRadius = radiusStr;

      // Dynamic reactive shadow with Star Red ambient glow
      const shadowY = 12 + cur.shadowSpread * 14;
      const shadowBlur = 28 + cur.shadowSpread * 26;
      const redAlpha = (0.12 * cur.borderGlow).toFixed(3);
      cardRef.current.style.boxShadow = `0 ${shadowY}px ${shadowBlur}px -12px rgba(224, 20, 44, ${redAlpha}), 0 4px 16px -4px rgba(0, 0, 0, 0.05), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)`;
    }

    // Update cursor spotlight
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(420px circle at ${cur.spotX.toFixed(
        1
      )}px ${cur.spotY.toFixed(
        1
      )}px, rgba(224, 20, 44, 0.11), rgba(224, 20, 44, 0.02) 45%, transparent 75%)`;
      spotlightRef.current.style.opacity = cur.opacity.toFixed(3);
      spotlightRef.current.style.borderRadius = `${cur.rTL.toFixed(
        1
      )}px ${cur.rTR.toFixed(1)}px ${cur.rBR.toFixed(1)}px ${cur.rBL.toFixed(
        1
      )}px / ${cur.rTLy.toFixed(1)}px ${cur.rTRy.toFixed(
        1
      )}px ${cur.rBRy.toFixed(1)}px ${cur.rBLy.toFixed(1)}px`;
    }

    // Update border glow gradient mask
    if (borderGlowRef.current) {
      borderGlowRef.current.style.background = `radial-gradient(280px circle at ${cur.spotX.toFixed(
        1
      )}px ${cur.spotY.toFixed(
        1
      )}px, rgba(224, 20, 44, 0.75), rgba(224, 20, 44, 0.2) 50%, transparent 80%)`;
      borderGlowRef.current.style.opacity = cur.borderGlow.toFixed(3);
      borderGlowRef.current.style.borderRadius = `${cur.rTL.toFixed(
        1
      )}px ${cur.rTR.toFixed(1)}px ${cur.rBR.toFixed(1)}px ${cur.rBL.toFixed(
        1
      )}px / ${cur.rTLy.toFixed(1)}px ${cur.rTRy.toFixed(
        1
      )}px ${cur.rBRy.toFixed(1)}px ${cur.rBLy.toFixed(1)}px`;
    }

    // Parallax depth on floating logo badge
    if (logoWrapperRef.current) {
      const lx = (cur.rotY * 0.7).toFixed(2);
      const ly = (-cur.rotX * 0.7).toFixed(2);
      logoWrapperRef.current.style.transform = `translate3d(${lx}px, ${ly}px, 20px)`;
    }

    // Parallax depth on top right action arrow
    if (actionButtonRef.current) {
      const ax = (cur.rotY * 0.5).toFixed(2);
      const ay = (-cur.rotX * 0.5).toFixed(2);
      actionButtonRef.current.style.transform = `translate3d(${ax}px, ${ay}px, 15px)`;
    }

    // Parallax depth on bottom CTA arrow
    if (ctaArrowRef.current) {
      const cx = (cur.rotY * 0.4).toFixed(2);
      ctaArrowRef.current.style.transform = `translate3d(${cx}px, 0, 10px)`;
    }

    // Check if we should keep animating (either hovering or returning to rest)
    const isSettled =
      Math.abs(tar.x - cur.x) < 0.05 &&
      Math.abs(tar.y - cur.y) < 0.05 &&
      Math.abs(tar.rotX - cur.rotX) < 0.05 &&
      Math.abs(tar.rotY - cur.rotY) < 0.05 &&
      Math.abs(tar.scaleX - cur.scaleX) < 0.002 &&
      Math.abs(tar.rTL - cur.rTL) < 0.1 &&
      Math.abs(tar.rTR - cur.rTR) < 0.1 &&
      Math.abs(tar.rBR - cur.rBR) < 0.1 &&
      Math.abs(tar.rBL - cur.rBL) < 0.1 &&
      Math.abs(tar.opacity - cur.opacity) < 0.01;

    if (s.isHovered || !isSettled) {
      s.rafId = requestAnimationFrame(updatePhysics);
    } else {
      s.rafId = 0;
    }
  }, []);

  const ensureAnimation = useCallback(() => {
    if (!animState.current.rafId) {
      animState.current.rafId = requestAnimationFrame(updatePhysics);
    }
  }, [updatePhysics]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Normalized coordinates (-1 to 1)
    const nx = (x / width) * 2 - 1;
    const ny = (y / height) * 2 - 1;

    // Corner distances
    const dTL = Math.hypot(x, y);
    const dTR = Math.hypot(width - x, y);
    const dBR = Math.hypot(width - x, height - y);
    const dBL = Math.hypot(x, height - y);
    const maxDiag = Math.hypot(width, height) * 0.75;

    // Proximity to corners (0 when far, 1 when right at corner)
    const pTL = Math.max(0, 1 - dTL / maxDiag);
    const pTR = Math.max(0, 1 - dTR / maxDiag);
    const pBR = Math.max(0, 1 - dBR / maxDiag);
    const pBL = Math.max(0, 1 - dBL / maxDiag);

    // Edge proximity (0 at center, 1 at edge)
    const absX = Math.abs(nx);
    const absY = Math.abs(ny);
    const edgeProximity = Math.max(absX, absY);

    const baseRadius = 28;

    // Dynamic Corner Squish & Edge Repel:
    // When cursor is close to Top-Left, TL corner indents/repels inwards
    // and opposite corner stretches outward, creating an organic squishy jelly squeeze!
    const rTL = Math.max(12, baseRadius - pTL * 18 + pBR * 16);
    const rTR = Math.max(12, baseRadius - pTR * 18 + pBL * 16);
    const rBR = Math.max(12, baseRadius - pBR * 18 + pTL * 16);
    const rBL = Math.max(12, baseRadius - pBL * 18 + pTR * 16);

    // Asymmetric vertical corner radii for organic fluid repulsion
    const rTLy = Math.max(12, baseRadius - pTL * 15 + pTR * 10);
    const rTRy = Math.max(12, baseRadius - pTR * 15 + pBR * 10);
    const rBRy = Math.max(12, baseRadius - pBR * 15 + pBL * 10);
    const rBLy = Math.max(12, baseRadius - pBL * 15 + pTL * 10);

    // Elastic squeeze compression:
    // When near edges, card compresses on that axis (squish effect)
    const scaleX = 1.015 - absX * 0.025 + absY * 0.015;
    const scaleY = 1.015 - absY * 0.025 + absX * 0.015;

    // Magnetic Repel Displacement (card gently repels away from cursor)
    const repelPush = 6;
    const targetX = -nx * repelPush;
    const targetY = -ny * repelPush;

    // 3D Tilt perspective (subtle, crisp)
    const maxRot = 8;
    const rotX = -ny * maxRot;
    const rotY = nx * maxRot;

    const tar = animState.current.target;
    tar.x = targetX;
    tar.y = targetY;
    tar.rotX = rotX;
    tar.rotY = rotY;
    tar.scaleX = scaleX;
    tar.scaleY = scaleY;
    tar.rTL = rTL;
    tar.rTR = rTR;
    tar.rBR = rBR;
    tar.rBL = rBL;
    tar.rTLy = rTLy;
    tar.rTRy = rTRy;
    tar.rBRy = rBRy;
    tar.rBLy = rBLy;
    tar.spotX = x;
    tar.spotY = y;
    tar.opacity = 1;
    tar.borderGlow = 0.85 + edgeProximity * 0.15;
    tar.shadowSpread = 1;

    ensureAnimation();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    animState.current.isHovered = true;
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      animState.current.target.spotX = x;
      animState.current.target.spotY = y;
      animState.current.current.spotX = x;
      animState.current.current.spotY = y;
    }
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    animState.current.isHovered = false;
    const tar = animState.current.target;
    tar.x = 0;
    tar.y = 0;
    tar.rotX = 0;
    tar.rotY = 0;
    tar.scaleX = 1;
    tar.scaleY = 1;
    tar.rTL = 28;
    tar.rTR = 28;
    tar.rBR = 28;
    tar.rBL = 28;
    tar.rTLy = 28;
    tar.rTRy = 28;
    tar.rBRy = 28;
    tar.rBLy = 28;
    tar.opacity = 0;
    tar.borderGlow = 0;
    tar.shadowSpread = 0;

    ensureAnimation();
  };

  useEffect(() => {
    return () => {
      if (animState.current.rafId) {
        cancelAnimationFrame(animState.current.rafId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full select-none [perspective:1200px]",
        className
      )}
    >
      <Link
        ref={cardRef}
        href={`/companies/${company.slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden border border-sg-line-light/80 bg-white p-6.5 transition-colors duration-300 sm:aspect-square sm:p-7.5 md:p-8"
        style={{
          borderRadius: "28px",
          transformStyle: "preserve-3d",
          willChange: "transform, border-radius, box-shadow",
          boxShadow:
            "0 10px 30px -15px rgba(0,0,0,0.06), 0 2px 8px -2px rgba(0,0,0,0.03), inset 0 1px 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Glowing border outline highlight tracking the cursor */}
        <div
          ref={borderGlowRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-[-1.5px] -z-10 opacity-0 transition-opacity duration-300"
          style={{
            borderRadius: "28px",
            filter: "blur(0.5px)",
          }}
        />

        {/* Inner Card Background with micro-dot grid accent on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-white"
        >
          {/* Subtle noise/grid pattern on hover */}
          <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#0d0d10_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* Interactive Cursor Spotlight */}
        <div
          ref={spotlightRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
        />

        {/* Ambient Top Corner Light Sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-sg-red/8 via-sg-red/3 to-transparent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Top Header: Floating Elevated Logo + Action Button */}
        <div className="relative z-10 flex items-start justify-between gap-3">
          {/* Elevated 3D Logo Badge */}
          <div
            ref={logoWrapperRef}
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sg-line-light/70 bg-gradient-to-b from-white to-sg-paper p-2 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:border-sg-red/30 group-hover:shadow-[0_8px_20px_-4px_rgba(224,20,44,0.18)] sm:h-13 sm:w-13"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <CompanyLogo
              company={company}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-108"
            />
          </div>

          {/* Top-Right Magnetic Action Arrow */}
          <span
            ref={actionButtonRef}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sg-line-light/80 bg-sg-paper text-sg-dark-muted shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:border-sg-red group-hover:bg-sg-red group-hover:text-white group-hover:shadow-[0_6px_16px_-3px_rgba(224,20,44,0.45)] sm:h-10 sm:w-10"
            style={{
              willChange: "transform",
            }}
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45 sm:h-4.5 sm:w-4.5" />
          </span>
        </div>

        {/* Middle Content: Title, Sector Subtitle, and Description */}
        <div className="relative z-10 my-auto py-3">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-xl font-bold tracking-tight text-sg-dark-ink transition-colors duration-300 group-hover:text-sg-red sm:text-2xl">
              {company.name}
            </h3>
          </div>

          <p className="mt-1 font-mono text-[0.72rem] font-semibold uppercase tracking-widest text-sg-dark-muted/80 transition-colors duration-300 group-hover:text-sg-dark-ink">
            {company.sector}
          </p>

          <p className="mt-3 line-clamp-3 text-[0.82rem] leading-relaxed text-sg-dark-muted transition-colors duration-300 group-hover:text-sg-dark-ink/80 sm:line-clamp-4 sm:text-[0.88rem]">
            {company.summary}
          </p>
        </div>

        {/* Bottom CTA Row: Interactive Pill with Magnetic Arrow */}
        <div className="relative z-10 mt-auto flex items-center justify-between border-t border-sg-line-light/60 pt-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-sg-red sm:text-sm">
            <span className="relative">
              Explore
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-sg-red transition-all duration-300 group-hover:w-full" />
            </span>
            <span
              ref={ctaArrowRef}
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-sans"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
