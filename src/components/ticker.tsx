"use client";

import { motion } from "motion/react";
import { companies } from "@/lib/companies";

/** Infinite horizontal ticker of every company in the group. */
export function Ticker() {
  const items = [...companies, ...companies];

  return (
    <div className="relative overflow-hidden border-y border-sg-line bg-sg-black py-6">
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
      >
        {items.map((c, i) => (
          <span key={`${c.slug}-${i}`} className="flex items-center gap-10">
            <span className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-sg-red-bright">{c.letter}</span>
              <span className="font-display text-lg font-medium text-white/90">
                {c.name}
              </span>
            </span>
            <span className="text-sg-red/60" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
