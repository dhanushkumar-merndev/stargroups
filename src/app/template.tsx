"use client";

import { useEffect, useLayoutEffect } from "react";
import { resetScroll } from "@/components/smooth-scroll";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Template({ children }: { children: React.ReactNode }) {
  useIsomorphicLayoutEffect(() => {
    resetScroll();
  }, []);

  return <>{children}</>;
}
