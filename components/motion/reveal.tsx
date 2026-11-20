"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

let revealObserver: IntersectionObserver | null = null;

function getRevealObserver() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
  }

  return revealObserver;
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "span";
  className?: string;
}) {
  const elementRef = useRef<HTMLElement>(null);
  const Element = as;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    element.dataset.ready = "true";

    if (!("IntersectionObserver" in window)) {
      element.dataset.visible = "true";
      return;
    }

    const observer = getRevealObserver();
    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return (
    <Element
      ref={(element) => {
        elementRef.current = element;
      }}
      className={cn("motion-reveal overflow-hidden", className)}
      data-ready="false"
      data-visible="false"
      style={{ "--reveal-delay": `${delay}ms`, "--reveal-y": `${y}px` } as CSSProperties}
    >
      {children}
    </Element>
  );
}
