"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { companies, GROUP_LOGO } from "@/lib/companies";

const VIEW_W = 1000;
const VIEW_H = 500;
const CX = VIEW_W / 2;
const CY = 250;
const RX = 385;
const RY = 172;

/** Evenly distribute the companies around an ellipse, starting at the top. */
const nodes = companies.map((c, i) => {
  const angle = (-90 + (360 / companies.length) * i) * (Math.PI / 180);
  const x = CX + RX * Math.cos(angle);
  const y = CY + RY * Math.sin(angle);
  // Nudge labels inward at the extreme left/right so they stay in frame
  const anchor: "start" | "end" | "middle" =
    x < CX - 240 ? "start" : x > CX + 240 ? "end" : "middle";
  const labelX = anchor === "start" ? x - 16 : anchor === "end" ? x + 16 : x;
  const labelY = y < CY ? y - 22 : y + 32;
  return { ...c, x, y, labelX, labelY, anchor };
});

export function Constellation() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative z-10 mx-auto w-full max-w-[1050px]">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={`Constellation map of the ${companies.length} Star Groups companies`}
      >
        <defs>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#e0142c" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#e0142c" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#e0142c" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connecting lines, drawn outward from the centre */}
        {nodes.map((n, i) => (
          <motion.line
            key={`line-${n.slug}`}
            x1={CX}
            y1={CY}
            x2={n.x}
            y2={n.y}
            stroke={active === n.slug ? "#e0142c" : "#0d0d10"}
            strokeWidth={active === n.slug ? 1.6 : 0.9}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: active === n.slug ? 1 : 0.22,
            }}
            transition={{
              pathLength: { duration: 1.1, delay: 0.5 + i * 0.07, ease: "easeOut" },
              opacity: { duration: 0.3 },
            }}
          />
        ))}

        {/* Centre — the parent group */}
        <motion.g
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle cx={CX} cy={CY} r={70} fill="url(#coreGlow)" />
          <motion.circle
            cx={CX}
            cy={CY}
            r={30}
            fill="#0a0a0b"
            stroke="#0a0a0b"
            strokeWidth={1.5}
            animate={{ r: [30, 33, 30] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* The centre node is Star Groups itself, so it carries the real mark */}
          <image
            href={GROUP_LOGO}
            x={CX - 26}
            y={CY - 26}
            width={52}
            height={52}
            preserveAspectRatio="xMidYMid meet"
            clipPath={`circle(26px at ${CX}px ${CY}px)`}
          />
          <text
            x={CX}
            y={CY + 62}
            textAnchor="middle"
            className="fill-current font-display text-sg-dark-ink"
            style={{ fontSize: 19, fontWeight: 700, letterSpacing: "0.04em" }}
          >
            STAR GROUPS
          </text>
        </motion.g>

        {/* Company nodes */}
        {nodes.map((n, i) => {
          const isActive = active === n.slug;
          return (
            <motion.g
              key={n.slug}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.7 + i * 0.07,
                ease: [0.2, 1.4, 0.4, 1],
              }}
              style={{ transformOrigin: `${n.x}px ${n.y}px`, cursor: "pointer" }}
              onMouseEnter={() => setActive(n.slug)}
              onMouseLeave={() => setActive(null)}
            >
              <Link href={`/companies/${n.slug}`}>
                {/* Generous invisible hit area */}
                <circle cx={n.x} cy={n.y} r={34} fill="transparent" />

                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={22}
                  fill="#e0142c"
                  animate={{ opacity: isActive ? 0.22 : 0.07 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={10}
                  fill={isActive ? "#e0142c" : "#ffffff"}
                  stroke="#e0142c"
                  strokeWidth={1.5}
                  filter={isActive ? "url(#softGlow)" : undefined}
                  animate={{ r: isActive ? 13 : 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                />
                <text
                  x={n.x}
                  y={n.y + 0.5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none font-mono"
                  fill={isActive ? "#ffffff" : "#e0142c"}
                  style={{ fontSize: 11 }}
                >
                  {n.letter}
                </text>
                <motion.text
                  x={n.labelX}
                  y={n.labelY}
                  textAnchor={n.anchor}
                  className="pointer-events-none"
                  animate={{ fill: isActive ? "#e0142c" : "#63636e" }}
                  transition={{ duration: 0.25 }}
                  style={{ fontSize: 12.5, fontWeight: isActive ? 600 : 400 }}
                >
                  {n.name}
                </motion.text>
              </Link>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
