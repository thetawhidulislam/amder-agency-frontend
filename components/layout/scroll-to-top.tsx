"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { m } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { MOTION_LEVEL } from "@/lib/motion";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const motionEnabled = MOTION_LEVEL === "rich" && !reducedMotion;

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1000);
    const updateVisibility = () => setVisible(window.scrollY > 400);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  function scrollToTop() {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
  }

  return (
    <m.button
      type="button"
      aria-label="Scroll to top"
      aria-hidden={!visible || !ready}
      tabIndex={visible && ready ? 0 : -1}
      onClick={scrollToTop}
      initial={motionEnabled ? { opacity: 0, scale: 0.8, y: 8 } : false}
      animate={
        motionEnabled
          ? visible && ready
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.8, y: 8 }
          : { opacity: visible ? 1 : 0, scale: 1, y: 0 }
      }
      transition={
        motionEnabled
          ? { type: "spring", stiffness: 280, damping: 22 }
          : { duration: 0 }
      }
      data-reveal=""
      className={`scroll-to-top public-button fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_24px_-10px_rgb(225_29_39_/_0.5)] ${
        visible && ready ? "scroll-to-top-visible" : ""
      }`}
    >
      <ArrowUp aria-hidden="true" className="size-5" strokeWidth={1.75} />
    </m.button>
  );
}
