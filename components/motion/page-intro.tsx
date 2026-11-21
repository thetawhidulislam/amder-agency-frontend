"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { m } from "motion/react";
import { EASE, MOTION_LEVEL } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";

const INTRO_KEY = "amader-agency-intro-seen";

export function PageIntro() {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (pathname !== "/") {
      try {
        if (!window.sessionStorage.getItem(INTRO_KEY)) {
          window.sessionStorage.setItem(INTRO_KEY, "skipped");
        }
      } catch (error) {
        console.warn("Unable to use session storage for the page intro.", error);
      }
      return;
    }

    if (
      MOTION_LEVEL === "calm" ||
      reducedMotion ||
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    try {
      if (window.sessionStorage.getItem(INTRO_KEY)) return;
      window.sessionStorage.setItem(INTRO_KEY, "true");
    } catch (error) {
      console.warn("Unable to use session storage for the page intro.", error);
      return;
    }

    setVisible(true);
    window.setTimeout(() => setExiting(true), 700);
    window.setTimeout(() => setVisible(false), 1100);
  }, [pathname, reducedMotion]);

  if (!visible) return null;

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-white"
      data-reveal=""
      initial={{ y: 0 }}
      animate={{ y: exiting ? "-100%" : 0 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <div className="flex flex-col items-center">
        <m.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: EASE }}
          data-reveal=""
        >
          <Image src="/logo.png" alt="" width={80} height={80} priority />
        </m.div>
        <m.div
          className="mt-6 h-[3px] w-40 origin-left bg-brand"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.25, ease: EASE }}
          data-reveal=""
        />
      </div>
    </m.div>
  );
}
