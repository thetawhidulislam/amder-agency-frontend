"use client";

import { MessageCircle } from "lucide-react";
import { m } from "motion/react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { MOTION_LEVEL } from "@/lib/motion";

export function WhatsAppFab({ href }: { href: string | null }) {
  const reducedMotion = usePrefersReducedMotion();
  const motionEnabled = MOTION_LEVEL === "rich" && !reducedMotion;
  const [ready, setReady] = useState(!motionEnabled);

  useEffect(() => {
    if (!motionEnabled) {
      setReady(true);
      return;
    }

    const timer = window.setTimeout(() => setReady(true), 1000);
    return () => window.clearTimeout(timer);
  }, [motionEnabled]);

  if (!href) return null;
  return (
    <m.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      aria-hidden={!ready}
      tabIndex={ready ? undefined : -1}
      initial={motionEnabled ? { opacity: 0, scale: 0.8 } : false}
      animate={motionEnabled && !ready ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
      transition={motionEnabled ? { type: "spring", stiffness: 280, damping: 22 } : { duration: 0 }}
      data-reveal=""
      className={`public-button fixed bottom-5 left-5 z-40 inline-flex items-center gap-3 rounded-full bg-brand py-1.5 pl-1.5 pr-5 font-medium text-white shadow-[0_10px_24px_-10px_rgb(225_29_39_/_0.5)] hover:bg-brand-dark ${ready ? "" : "pointer-events-none"}`}
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-white/20">
        <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </span>
      <span>Chat with us</span>
    </m.a>
  );
}
