"use client";

import { MotionConfig } from "framer-motion";

/** Framer Motion honours the user's reduced-motion preference everywhere below this. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
