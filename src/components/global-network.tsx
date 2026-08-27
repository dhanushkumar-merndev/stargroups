"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Globe as GlobeIcon } from "lucide-react";
import { companies, type Company } from "@/lib/companies";
import { CompanyLogo } from "./company-logo";

// 3D Point on sphere
interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Node3D {
  company: Company;
  lat: number;
  lng: number;
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  visible: boolean;
}

interface FloatingCardInfo {
  company: Company;
  eyebrow: string;
  highlight: string;
  side: "left" | "right";
  floatDelay: number;
}

const desktopArcPositions = {
  left: [
    { left: "8%", top: "2%" },
    { left: "1%", top: "27%" },
    { left: "1%", top: "52%" },
    { left: "8%", top: "77%" },
  ],
  right: [
    { left: "70%", top: "2%" },
    { left: "77%", top: "27%" },
    { left: "77%", top: "52%" },
    { left: "70%", top: "77%" },
  ],
} as const;

type GlobalNetworkProps = {
  /** Delays the card bloom until the hero copy has finished its entrance. */
  cardRevealDelay?: number;
};

export function GlobalNetwork({ cardRevealDelay = 2.75 }: GlobalNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [isInView, setIsInView] = useState(true);

  // All 8 companies mapped to structured floating cards
  const allCards: FloatingCardInfo[] = useMemo(() => {
    const cardData: Record<string, { eyebrow: string; highlight: string; side: "left" | "right"; delay: number }> = {
      "star-growth-hub": {
        eyebrow: "MARKETING & GROWTH",
        highlight: "SEO, Performance & Paid Media",
        side: "left",
        delay: 0,
      },
      "star-tech-india": {
        eyebrow: "SOFTWARE & SYSTEMS",
        highlight: "Web, App & WhatsApp CRM",
        side: "left",
        delay: 0.6,
      },
      "star-spaces": {
        eyebrow: "SMART INTERIORS",
        highlight: "Modular Kitchens & Living",
        side: "left",
        delay: 1.2,
      },
      "star-gardens": {
        eyebrow: "LANDSCAPING",
        highlight: "Landscape & Plants on Hire",
        side: "left",
        delay: 1.8,
      },
      "star-production-house": {
        eyebrow: "MEDIA & CINEMA",
        highlight: "Commercials & 4K Cinema",
        side: "right",
        delay: 0.3,
      },
      "star-capital-venture": {
        eyebrow: "VENTURE CAPITAL",
        highlight: "Seed & Growth Funding",
        side: "right",
        delay: 0.9,
      },
      "mac-reality": {
        eyebrow: "REAL ESTATE",
        highlight: "Residential & Commercial",
        side: "right",
        delay: 1.5,
      },
      "starline-solutions": {
        eyebrow: "OPERATIONS & SUPPORT",
        highlight: "Shared Group Infrastructure",
        side: "right",
        delay: 2.1,
      },
    };

    return companies.map((c) => {
      const meta = cardData[c.slug] || {
        eyebrow: c.sector.toUpperCase(),
        highlight: c.tagline,
        side: "left" as const,
        delay: 0,
      };
      return {
        company: c,
        eyebrow: meta.eyebrow,
        highlight: meta.highlight,
        side: meta.side,
        floatDelay: meta.delay,
      };
    });
  }, []);

  const leftCards = useMemo(() => allCards.filter((c) => c.side === "left"), [allCards]);
  const rightCards = useMemo(() => allCards.filter((c) => c.side === "right"), [allCards]);

  // Pause canvas when out of view for performance
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // 3D Canvas rendering with slow, cinematic rotation & high performance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Slow cinematic rotation constants
    const SLOW_SPEED = 0.0011; // Slow and smooth auto-rotation
    let rotationY = 0.5;
    let rotationX = 0.22;
    let targetRotationY = 0.5;
    let targetRotationX = 0.22;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let autoRotate = true;

    // Radius of sphere
    let radius = 195;

    // Hub coordinates (Bengaluru: ~12.97° N, ~77.59° E)
    const hubLat = (12.97 * Math.PI) / 180;
    const hubLng = (77.59 * Math.PI) / 180;

    // Pre-generate grid dots on sphere
    const sphereDots: Point3D[] = [];
    const latStep = 9;
    const lngStep = 13;

    for (let lat = -80; lat <= 80; lat += latStep) {
      const phi = (lat * Math.PI) / 180;
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      const numLng = Math.max(6, Math.floor(360 / (lngStep / Math.max(0.18, cosPhi))));
      for (let i = 0; i < numLng; i++) {
        const theta = (i * 2 * Math.PI) / numLng;
        sphereDots.push({
          x: Math.cos(theta) * cosPhi,
          y: -sinPhi,
          z: Math.sin(theta) * cosPhi,
        });
      }
    }

    // 8 Strategic target locations on the globe for all 8 companies
    const companyNodes: Node3D[] = companies.map((comp, idx) => {
      const targetCoords = [
        { lat: 24, lng: 54 },    // 0: Star Growth Hub (Dubai / Middle East)
        { lat: 37, lng: 127 },   // 1: Star Tech India (Seoul / East Asia)
        { lat: 51.5, lng: -0.1 },// 2: Star Spaces (London / Europe)
        { lat: -33.8, lng: 151 },// 3: Star Gardens (Sydney / Pacific)
        { lat: 34.0, lng: -118 },// 4: MAC Reality (Los Angeles)
        { lat: 1.35, lng: 103.8 },// 5: Starline Solutions (Singapore)
        { lat: 40.7, lng: -74 }, // 6: Star Production House (New York / Global Media)
        { lat: 37.7, lng: -122 },// 7: Star Venture Capital (Silicon Valley)
      ];

      const loc = targetCoords[idx % targetCoords.length];
      const phi = (loc.lat * Math.PI) / 180;
      const theta = (loc.lng * Math.PI) / 180;

      return {
        company: comp,
        lat: phi,
        lng: theta,
        x: Math.cos(theta) * Math.cos(phi),
        y: -Math.sin(phi),
        z: Math.sin(theta) * Math.cos(phi),
        screenX: 0,
        screenY: 0,
        visible: true,
      };
    });

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = Math.min(rect.width * 0.85, 540);
      
      if (width < 640) {
        height = 360;
        radius = Math.min(width * 0.38, 145);
      } else if (width < 1024) {
        height = 440;
        radius = Math.min(width * 0.32, 175);
      } else {
        radius = Math.min(width * 0.22, 205);
      }

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse drag interactions
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      autoRotate = false;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      targetRotationY += dx * 0.004;
      targetRotationX = Math.max(-0.65, Math.min(0.65, targetRotationX - dy * 0.004));
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
      setTimeout(() => {
        autoRotate = true;
      }, 4000);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        autoRotate = false;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMouseX;
      const dy = e.touches[0].clientY - lastMouseY;
      targetRotationY += dx * 0.005;
      targetRotationX = Math.max(-0.65, Math.min(0.65, targetRotationX - dy * 0.005));
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      isDragging = false;
      setTimeout(() => {
        autoRotate = true;
      }, 4000);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // 3D rotation projection helper
    const project = (
      px: number,
      py: number,
      pz: number,
      cx: number,
      cy: number,
      r: number,
      rotX: number,
      rotY: number,
    ) => {
      // Rotate Y (Yaw)
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = px * cosY + pz * sinY;
      const y1 = py;
      const z1 = -px * sinY + pz * cosY;

      // Rotate X (Pitch)
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      // Perspective projection
      const fov = 750;
      const scale = fov / (fov + z2 * r * 0.6);

      return {
        x: cx + x2 * r * scale,
        y: cy + y2 * r * scale,
        z: z2,
        scale,
      };
    };

    const startTime = performance.now();
    let lastTime = startTime;

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) * 0.001, 0.1);
      lastTime = time;
      const elapsed = (time - startTime) * 0.001;

      // Smooth delta-based slow rotation
      if (autoRotate) {
        targetRotationY += SLOW_SPEED * (delta * 60);
      }
      rotationY += (targetRotationY - rotationY) * 0.05;
      rotationX += (targetRotationX - rotationX) * 0.05;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2 - 8;

      // 1. Ground Contact Shadow Ellipse
      const shadowGradient = ctx.createRadialGradient(
        cx,
        cy + radius * 1.08,
        5,
        cx,
        cy + radius * 1.08,
        radius * 1.15,
      );
      shadowGradient.addColorStop(0, "rgba(13, 13, 16, 0.09)");
      shadowGradient.addColorStop(0.5, "rgba(13, 13, 16, 0.025)");
      shadowGradient.addColorStop(1, "rgba(13, 13, 16, 0)");

      ctx.fillStyle = shadowGradient;
      ctx.beginPath();
      ctx.ellipse(
        cx,
        cy + radius * 1.08,
        radius * 1.1,
        radius * 0.2,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // 2. Sphere Outer Silhouette & Soft Ambient Core
      const globeGlow = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.25,
        radius * 0.15,
        cx,
        cy,
        radius,
      );
      globeGlow.addColorStop(0, "rgba(255, 255, 255, 0.98)");
      globeGlow.addColorStop(0.65, "rgba(250, 249, 248, 0.88)");
      globeGlow.addColorStop(1, "rgba(228, 225, 222, 0.4)");

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = globeGlow;
      ctx.fill();

      // Delicate subtle sphere border ring
      ctx.strokeStyle = "rgba(224, 20, 44, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Render Dotted Grid on Sphere Surface
      for (let i = 0; i < sphereDots.length; i++) {
        const dot = sphereDots[i];
        const p = project(dot.x, dot.y, dot.z, cx, cy, radius, rotationX, rotationY);

        let alpha = 0;
        let dotSize = 1.05;

        if (p.z > 0) {
          alpha = 0.25 + p.z * 0.42;
          dotSize = 0.95 + p.z * 0.8;
        } else {
          alpha = Math.max(0.035, 0.25 + p.z * 0.22);
          dotSize = 0.8;
        }

        ctx.fillStyle = `rgba(13, 13, 16, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Project Hub (Bengaluru)
      const hubRawX = Math.cos(hubLng) * Math.cos(hubLat);
      const hubRawY = -Math.sin(hubLat);
      const hubRawZ = Math.sin(hubLng) * Math.cos(hubLat);

      const hubProj = project(hubRawX, hubRawY, hubRawZ, cx, cy, radius, rotationX, rotationY);

      // Project all company target nodes
      companyNodes.forEach((node) => {
        const p = project(node.x, node.y, node.z, cx, cy, radius, rotationX, rotationY);
        node.screenX = p.x;
        node.screenY = p.y;
        node.visible = p.z > -0.3;
      });

      // 4. Draw 3D Curved Connection Arcs
      companyNodes.forEach((node, idx) => {
        const isHovered = hoveredCompany === node.company.slug;

        if (hubProj.z > -0.5 || node.visible) {
          const midRawX = (hubRawX + node.x) * 0.5;
          const midRawY = (hubRawY + node.y) * 0.5;
          const midRawZ = (hubRawZ + node.z) * 0.5;
          const midLen = Math.hypot(midRawX, midRawY, midRawZ) || 1;

          // Apex lift above sphere
          const arcApex = 1.26;
          const midLiftX = (midRawX / midLen) * arcApex;
          const midLiftY = (midRawY / midLen) * arcApex;
          const midLiftZ = (midRawZ / midLen) * arcApex;

          const midProj = project(midLiftX, midLiftY, midLiftZ, cx, cy, radius, rotationX, rotationY);

          ctx.beginPath();
          ctx.moveTo(hubProj.x, hubProj.y);
          ctx.quadraticCurveTo(midProj.x, midProj.y, node.screenX, node.screenY);

          if (isHovered) {
            ctx.strokeStyle = "#e0142c";
            ctx.lineWidth = 2.2;
          } else {
            ctx.strokeStyle = idx % 2 === 0 ? "rgba(224, 20, 44, 0.35)" : "rgba(13, 13, 16, 0.16)";
            ctx.lineWidth = idx % 2 === 0 ? 1.2 : 0.85;
          }
          ctx.stroke();

          // 5. Gentle Traveling Light Pulse Particle
          const speed = 0.28 + (idx % 4) * 0.08; // Slower, more elegant pulse
          const progress = (elapsed * speed + idx * 0.15) % 1;

          const t = progress;
          const invT = 1 - t;
          const px = invT * invT * hubProj.x + 2 * invT * t * midProj.x + t * t * node.screenX;
          const py = invT * invT * hubProj.y + 2 * invT * t * midProj.y + t * t * node.screenY;

          const particleGlow = ctx.createRadialGradient(px, py, 0, px, py, 5);
          particleGlow.addColorStop(0, "rgba(224, 20, 44, 0.95)");
          particleGlow.addColorStop(0.5, "rgba(224, 20, 44, 0.45)");
          particleGlow.addColorStop(1, "rgba(224, 20, 44, 0)");

          ctx.fillStyle = particleGlow;
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // 6. Draw Node Marker (Target Ring)
        if (node.visible) {
          const isHoveredNode = hoveredCompany === node.company.slug;

          ctx.beginPath();
          ctx.arc(node.screenX, node.screenY, isHoveredNode ? 8 : 5.5, 0, Math.PI * 2);
          ctx.strokeStyle = isHoveredNode ? "#e0142c" : "rgba(13, 13, 16, 0.3)";
          ctx.lineWidth = 1.1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(node.screenX, node.screenY, isHoveredNode ? 3.5 : 2.2, 0, Math.PI * 2);
          ctx.fillStyle = isHoveredNode ? "#e0142c" : "#0d0d10";
          ctx.fill();
        }
      });

      // 7. Draw Central Hub (Bengaluru · HQ)
      if (hubProj.z > -0.4) {
        const pulsePhase = (elapsed * 1.2) % 1;
        const ringRadius = 5 + pulsePhase * 16;
        const ringAlpha = Math.max(0, 1 - pulsePhase);

        ctx.beginPath();
        ctx.arc(hubProj.x, hubProj.y, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(224, 20, 44, ${ringAlpha * 0.6})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(hubProj.x, hubProj.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#e0142c";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(hubProj.x, hubProj.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Hub Pill Badge
        const label = "Bengaluru";
        ctx.font = "600 11px system-ui, -apple-system, sans-serif";
        const textMetrics = ctx.measureText(label);
        const paddingX = 9;
        const badgeW = textMetrics.width + paddingX * 2;
        const badgeH = 20;
        const badgeX = hubProj.x - badgeW / 2;
        const badgeY = hubProj.y - 28;

        ctx.fillStyle = "#0d0d10";
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 10);
        ctx.fill();

        ctx.strokeStyle = "rgba(224, 20, 44, 0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, hubProj.x, badgeY + badgeH / 2);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [hoveredCompany, isInView]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto my-2 flex w-full max-w-[1400px] flex-col items-center justify-center px-4"
    >
      {/* EXTRA-WIDE DESKTOP: cards bloom from the center into two curved arcs. */}
      <div className="relative hidden h-[590px] w-full 2xl:block">
        {allCards.map((card) => {
          const isHovered = hoveredCompany === card.company.slug;
          const sideIndex =
            card.side === "left" ? leftCards.indexOf(card) : rightCards.indexOf(card);
          const position = desktopArcPositions[card.side][sideIndex];

          return (
            <motion.div
              key={`arc-${card.company.slug}`}
              initial={{
                opacity: 0,
                scale: 0.48,
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                left: position.left,
                top: position.top,
                x: 0,
                y: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 170,
                damping: 18,
                delay: cardRevealDelay + sideIndex * 0.12,
              }}
              onMouseEnter={() => setHoveredCompany(card.company.slug)}
              onMouseLeave={() => setHoveredCompany(null)}
              className="absolute z-20 w-[310px] will-change-transform"
            >
              <Link href={`/companies/${card.company.slug}`} className="group block">
                <div
                  className={`relative flex flex-col rounded-2xl border bg-white/95 p-4 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 ${
                    isHovered
                      ? card.side === "left"
                        ? "translate-x-2 border-sg-red shadow-[0_18px_40px_-8px_rgba(224,20,44,0.2)] ring-1 ring-sg-red"
                        : "-translate-x-2 border-sg-red shadow-[0_18px_40px_-8px_rgba(224,20,44,0.2)] ring-1 ring-sg-red"
                      : "border-sg-line-light hover:border-sg-red/60 hover:shadow-md"
                  }`}
                >
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-mono text-[0.6rem] font-semibold tracking-wider text-sg-dark-muted uppercase">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isHovered ? "animate-pulse bg-sg-red" : "bg-sg-dark-ink/25"
                        }`}
                      />
                      {card.eyebrow}
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-sg-dark-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sg-red" />
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                      <CompanyLogo company={card.company} className="h-full w-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-display text-[0.92rem] font-bold text-sg-dark-ink transition-colors group-hover:text-sg-red">
                        {card.company.name}
                      </h4>
                      <p className="truncate text-[0.72rem] font-medium text-sg-red">
                        {card.highlight}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* DESKTOP & TABLET LAYOUT: 3-COLUMN ORBIT (4 Left Cards — 3D Globe — 4 Right Cards) */}
      <div className="relative hidden w-full items-center justify-between gap-4 lg:flex xl:gap-8 2xl:hidden">
        
        {/* LEFT COLUMN (4 CARDS) */}
        <div className="z-20 flex w-[280px] shrink-0 flex-col gap-3.5 xl:w-[310px]">
          {leftCards.map((card, idx) => {
            const isHovered = hoveredCompany === card.company.slug;

            return (
              <motion.div
                key={card.company.slug}
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                onMouseEnter={() => setHoveredCompany(card.company.slug)}
                onMouseLeave={() => setHoveredCompany(null)}
              >
                <Link href={`/companies/${card.company.slug}`} className="group block">
                  <div
                    className={`relative flex flex-col rounded-2xl border bg-white/95 p-3.5 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 xl:p-4 ${
                      isHovered
                        ? "translate-x-2 border-sg-red shadow-[0_18px_40px_-8px_rgba(224,20,44,0.2)] ring-1 ring-sg-red"
                        : "border-sg-line-light hover:border-sg-red/60 hover:shadow-md"
                    }`}
                  >
                    {/* Eyebrow + indicator */}
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-mono text-[0.6rem] font-semibold tracking-wider text-sg-dark-muted uppercase">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isHovered ? "animate-pulse bg-sg-red" : "bg-sg-dark-ink/25"
                          }`}
                        />
                        {card.eyebrow}
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-sg-dark-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sg-red" />
                    </div>

                    {/* Title + Logo */}
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                        <CompanyLogo company={card.company} className="h-full w-full" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-display text-[0.92rem] font-bold text-sg-dark-ink transition-colors group-hover:text-sg-red">
                          {card.company.name}
                        </h4>
                        <p className="truncate text-[0.72rem] font-medium text-sg-red">
                          {card.highlight}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CENTER GLOBE CANVAS */}
        <div className="relative flex flex-1 items-center justify-center overflow-visible">
          <canvas
            ref={canvasRef}
            className="cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
          />
        </div>

        {/* RIGHT COLUMN (4 CARDS) */}
        <div className="z-20 flex w-[280px] shrink-0 flex-col gap-3.5 xl:w-[310px]">
          {rightCards.map((card, idx) => {
            const isHovered = hoveredCompany === card.company.slug;

            return (
              <motion.div
                key={card.company.slug}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                onMouseEnter={() => setHoveredCompany(card.company.slug)}
                onMouseLeave={() => setHoveredCompany(null)}
              >
                <Link href={`/companies/${card.company.slug}`} className="group block">
                  <div
                    className={`relative flex flex-col rounded-2xl border bg-white/95 p-3.5 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 xl:p-4 ${
                      isHovered
                        ? "-translate-x-2 border-sg-red shadow-[0_18px_40px_-8px_rgba(224,20,44,0.2)] ring-1 ring-sg-red"
                        : "border-sg-line-light hover:border-sg-red/60 hover:shadow-md"
                    }`}
                  >
                    {/* Eyebrow + indicator */}
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-mono text-[0.6rem] font-semibold tracking-wider text-sg-dark-muted uppercase">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isHovered ? "animate-pulse bg-sg-red" : "bg-sg-dark-ink/25"
                          }`}
                        />
                        {card.eyebrow}
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-sg-dark-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sg-red" />
                    </div>

                    {/* Title + Logo */}
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                        <CompanyLogo company={card.company} className="h-full w-full" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-display text-[0.92rem] font-bold text-sg-dark-ink transition-colors group-hover:text-sg-red">
                          {card.company.name}
                        </h4>
                        <p className="truncate text-[0.72rem] font-medium text-sg-red">
                          {card.highlight}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* TABLET / MID-SCREEN DOCKED GRID (md to lg) */}
      <div className="relative hidden w-full flex-col items-center md:flex lg:hidden">
        <div className="relative flex w-full items-center justify-center">
          <canvas
            ref={canvasRef}
            className="cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
          />
        </div>

        {/* Grid of all 8 cards */}
        <div className="mt-6 grid w-full grid-cols-2 gap-3 px-4 sm:grid-cols-4">
          {allCards.map((card) => {
            const isHovered = hoveredCompany === card.company.slug;
            return (
              <Link
                key={`tab-${card.company.slug}`}
                href={`/companies/${card.company.slug}`}
                className={`flex flex-col rounded-xl border bg-white/90 p-3 shadow-xs transition-all ${
                  isHovered ? "border-sg-red shadow-md" : "border-sg-line-light hover:border-sg-red/60"
                }`}
                onMouseEnter={() => setHoveredCompany(card.company.slug)}
                onMouseLeave={() => setHoveredCompany(null)}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-mono text-[0.58rem] font-semibold text-sg-dark-muted uppercase">
                    {card.eyebrow.slice(0, 16)}
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-sg-dark-muted" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                    <CompanyLogo company={card.company} className="h-full w-full" />
                  </div>
                  <span className="truncate font-display text-[0.82rem] font-bold text-sg-dark-ink">
                    {card.company.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* MOBILE RESPONSIVE CAROUSEL (< md) */}
      <div className="relative flex w-full flex-col items-center md:hidden">
        {/* Globe */}
        <div className="relative flex w-full items-center justify-center">
          <canvas
            ref={canvasRef}
            className="cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
          />
        </div>

        {/* Swipeable 8-Card Deck */}
        <div className="mt-3 w-full">
          <div className="mb-2 flex items-center justify-between px-2">
            <span className="flex items-center gap-1.5 font-mono text-[0.65rem] font-semibold tracking-wider text-sg-dark-muted uppercase">
              <GlobeIcon className="h-3 w-3 text-sg-red" />
              All 8 Ventures ({activeMobileIndex + 1}/8)
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setActiveMobileIndex((prev) => (prev > 0 ? prev - 1 : allCards.length - 1))
                }
                className="flex h-7 w-7 items-center justify-center rounded-full border border-sg-line-light bg-white text-sg-dark-ink transition-colors hover:border-sg-red"
                aria-label="Previous card"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() =>
                  setActiveMobileIndex((prev) => (prev < allCards.length - 1 ? prev + 1 : 0))
                }
                className="flex h-7 w-7 items-center justify-center rounded-full border border-sg-line-light bg-white text-sg-dark-ink transition-colors hover:border-sg-red"
                aria-label="Next card"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Active Card Preview */}
          {allCards[activeMobileIndex] && (
            <Link
              href={`/companies/${allCards[activeMobileIndex].company.slug}`}
              className="group block"
            >
              <div className="rounded-2xl border border-sg-line-light bg-white/95 p-4 shadow-[0_12px_28px_-8px_rgba(0,0,0,0.1)] transition-all hover:border-sg-red">
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-[0.62rem] font-semibold tracking-wider text-sg-red uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-sg-red animate-pulse" />
                    {allCards[activeMobileIndex].eyebrow}
                  </span>
                  <span className="flex items-center gap-1 text-[0.72rem] font-semibold text-sg-dark-ink group-hover:text-sg-red">
                    Explore <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                    <CompanyLogo
                      company={allCards[activeMobileIndex].company}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display text-[1rem] font-bold text-sg-dark-ink">
                      {allCards[activeMobileIndex].company.name}
                    </h4>
                    <p className="line-clamp-1 text-[0.78rem] font-medium text-sg-dark-muted">
                      {allCards[activeMobileIndex].highlight}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Pagination dots for all 8 cards */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {allCards.map((_, i) => (
              <button
                key={`dot-${i}`}
                onClick={() => setActiveMobileIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeMobileIndex === i ? "w-6 bg-sg-red" : "w-1.5 bg-sg-line-light hover:bg-sg-dark-muted"
                }`}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
