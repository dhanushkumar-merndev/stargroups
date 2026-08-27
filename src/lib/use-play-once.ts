"use client";

import { useState, useEffect } from "react";

/**
 * Tracks whether an entrance animation has already played for this browser
 * session. Backed by a plain module-scope flag rather than sessionStorage:
 * it survives client-side route changes (the module stays loaded in memory
 * across Next.js navigations), but resets naturally on a hard refresh or
 * fresh page load, since the JS bundle re-initializes from scratch then.
 *
 * The very first component to mount after a (re)load gets `true` and should
 * run its intro animation; every remount after that — e.g. navigating away
 * from the hero's page and back — gets `false` and should render its final
 * state immediately, with no animation.
 */
let hasPlayed = false;

export function usePlayOnce(): boolean {
  const [shouldPlay] = useState(() => !hasPlayed);

  useEffect(() => {
    hasPlayed = true;
  }, []);

  return shouldPlay;
}
