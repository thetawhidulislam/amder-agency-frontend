"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/utils";
import { DURATION, EASE, MOTION_LEVEL } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";

type RevealVariant = "up" | "left" | "right" | "scale" | "mask" | "mask-left" | "mask-right" | "fade";

function subscribeToDesktop(callback: () => void) {
  const media = window.matchMedia("(min-width: 768px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function getDesktopServerSnapshot() {
  return false;
}

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  once?: boolean;
  amount?: number;
  duration?: number;
  scaleFrom?: number;
  distance?: number;
  as?: "div" | "span";
  className?: string;
};

const revealStates: Record<RevealVariant | "fade", { initial: Record<string, string | number>; visible: Record<string, string | number> }> = {
  up: {
    initial: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    initial: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    initial: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
  mask: {
    initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    visible: { opacity: 1, clipPath: "inset(0 0 0 0)" },
  },
  "mask-left": {
    initial: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: { opacity: 1, clipPath: "inset(0 0 0 0)" },
  },
  "mask-right": {
    initial: { opacity: 0, clipPath: "inset(0 0 0 100%)" },
    visible: { opacity: 1, clipPath: "inset(0 0 0 0)" },
  },
  fade: {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  once = true,
  amount = 0.25,
  duration = DURATION.reveal * 1000,
  scaleFrom = 0.96,
  distance = 24,
  as = "div",
  className,
}: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const MotionElement = as === "span" ? m.span : m.div;
  const defaultStates = revealStates[MOTION_LEVEL === "calm" ? "fade" : variant];
  const states =
    MOTION_LEVEL !== "calm" && variant === "scale" && scaleFrom !== 0.96
      ? {
          initial: { opacity: 0, scale: scaleFrom },
          visible: { opacity: 1, scale: 1 },
        }
      : MOTION_LEVEL !== "calm" && variant === "up" && distance !== 24
        ? {
            initial: { opacity: 0, y: distance },
            visible: { opacity: 1, y: 0 },
          }
      : defaultStates;
  const isStatic = reducedMotion;

  return (
    <MotionElement
      initial={isStatic ? false : states.initial}
      whileInView={states.visible}
      viewport={{ once, amount }}
      onViewportEnter={() => setVisible(true)}
      onViewportLeave={() => {
        if (!once) setVisible(false);
      }}
      transition={{
        duration: isStatic ? 0 : duration / 1000,
        ease: EASE,
        delay: delay / 1000,
      }}
      className={cn("motion-reveal overflow-hidden", className)}
      data-reveal=""
      data-ready="true"
      data-visible={isStatic || visible ? "true" : "false"}
      data-variant={variant}
      data-motion-level={MOTION_LEVEL}
    >
      {children}
    </MotionElement>
  );
}

export function ResponsiveReveal({
  mobileVariant,
  desktopVariant,
  ...props
}: RevealProps & { mobileVariant: RevealVariant; desktopVariant: RevealVariant }) {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot
  );

  return <Reveal {...props} variant={isDesktop ? desktopVariant : mobileVariant} />;
}
