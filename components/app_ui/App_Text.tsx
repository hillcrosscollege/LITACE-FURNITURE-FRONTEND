"use client";
import { cn } from "@/lib/utils";
import { IAppText } from "@/types";
import { motion } from "motion/react";
import { JSX } from "react";

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
    className: "font-heading text-xl md:text-2xl",
  },

  body: {
    tag: "p",
    className: "text-base text-muted",
  },

  sectionTitle: {
    tag: "h2",
    className: "font-bold text-lg md:text-xl lg:text-2xl",
  },

  sectionSub: {
    tag: "h3",
    className: "font-semibold text-base md:text-lg",
  },

  cardText: {
    tag: "p",
    className: "text-base text-muted text-accent",
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
  const Component = variants[variant].tag as keyof JSX.IntrinsicElements;
  const MotionComponent = motionComponents[Component];

  return (
    <MotionComponent
      className={cn(variants[variant].className, className)}
      motionObj={{
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 1,
          delay: 1,
        },
      }}
    >
      {children}
    </MotionComponent>
  );
};

export default App_Text;
