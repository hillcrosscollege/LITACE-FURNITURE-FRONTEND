import type { Variants, Transition, TargetAndTransition } from "framer-motion";

// ─── Reusable Transitions ────────────────────────────────────────────────────

export const smoothSpring: Transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
};

// ─── Hero Header ─────────────────────────────────────────────────────────────

export const heroHeaderMotion = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1 } satisfies Transition,
};

// ─── Hero Buttons ─────────────────────────────────────────────────────────────

export const heroButtonsMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.4, duration: 0.8 } satisfies Transition,
};

// ─── Rotating Hero Text (AnimatePresence) ────────────────────────────────────

export const heroTextVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  } satisfies TargetAndTransition,
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(8px)",
  },
};

export const heroTextTransition: Transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
};
