"use client";
import { cn } from "@/lib/utils";
import { IAppText } from "@/types";
import { motion } from "motion/react";

export const variants = {
  hero: {
    tag: "h1",
    className: "font-heading font-bold text-3xl md:text-5xl xl:text-8xl",
  },

  heading: {
    tag: "h2",
    className: "font-heading font-semibold text-2xl md:text-4xl xl:text-5xl",
  },

  subheading: {
    tag: "h3",
    className: "font-heading font-bold text-sm md:text-base",
  },

  cardTitle: {
    tag: "h4",
    className: "font-heading text-lg",
  },

  body: {
    tag: "p",
    className: "text-base text-muted lg:text-lg",
  },

  sectionTitle: {
    tag: "h2",
    className: "font-bold text-lg md:text-xl lg:text-2xl font-heading",
  },

  sectionSub: {
    tag: "h3",
    className: "font-semibold text-base md:text-lg",
  },

  cardText: {
    tag: "p",
    className: "text-base text-muted text-accent",
  },
  // Dashboard variants
  pageTitle: {
    tag: "h1",
    className: "font-accent font-semibold text-xl text-[#1e1a17]",
  },

  pageSub: {
    tag: "p",
    className: "text-xs text-muted mt-0.5",
  },

  sectionLabel: {
    tag: "p",
    className: "text-xs text-muted",
  },

  cardHeading: {
    tag: "h3",
    className: "font-accent font-semibold text-sm lg:text-base text-[#1e1a17]",
  },

  statValue: {
    tag: "h2",
    className: "font-accent font-semibold text-2xl text-[#1e1a17]",
  },

  statLabel: {
    tag: "p",
    className: "text-xs text-muted",
  },

  tableHeader: {
    tag: "p",
    className: "text-sm text-muted font-medium",
  },

  tableCell: {
    tag: "p",
    className: "text-xs text-[#1e1a17]",
  },

  tableCellMuted: {
    tag: "p",
    className: "text-[11px] text-muted",
  },

  badge: {
    tag: "p",
    className: "text-xs font-medium",
  },
} as const;

const motionComponents = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
};
const App_Text = ({
  variant = "body",
  className,
  children,
  motionObj,
}: IAppText) => {
  const Component = variants[variant].tag as keyof typeof motionComponents;
  const MotionComponent = motionComponents[Component];

  return (
    <MotionComponent
      className={cn(variants[variant].className, className)}
      {...motionObj}
    >
      {children}
    </MotionComponent>
  );
};

export default App_Text;
