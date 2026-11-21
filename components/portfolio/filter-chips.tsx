"use client";

import Link from "next/link";
import { m } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { EASE, MOTION_LEVEL } from "@/lib/motion";
import type { Service } from "@/lib/types";

export function PortfolioFilterChips({
  services,
  service,
}: {
  services: Service[];
  service?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const animatePill = MOTION_LEVEL === "rich" && !reducedMotion;

  const linkClass =
    "portfolio-filter-chip relative isolate inline-flex h-9 items-center rounded-full border px-4 text-sm";

  return (
    <>
      <Link
        href="/portfolio"
        aria-current={!service ? "page" : undefined}
        data-motion-level={MOTION_LEVEL}
        className={`${linkClass} ${service ? "border-line text-ink hover:border-fg/50" : "border-brand text-white"}`}
      >
        {!service ? (
          animatePill ? (
            <m.span
              aria-hidden="true"
              className="absolute inset-0 z-0 rounded-full bg-brand"
              layoutId="filter-pill"
              transition={{ duration: 0.3, ease: EASE }}
              data-reveal=""
            />
          ) : (
            <span aria-hidden="true" className="absolute inset-0 z-0 rounded-full bg-brand" />
          )
        ) : null}
        <span className="relative z-10">All</span>
      </Link>
      {services.map((item) => {
        const active = service === item.slug;

        return (
          <Link
            key={item.id}
            href={`/portfolio?service=${item.slug}`}
            aria-current={active ? "page" : undefined}
            data-motion-level={MOTION_LEVEL}
            className={`${linkClass} ${active ? "border-brand text-white" : "border-line text-ink hover:border-fg/50"}`}
          >
            {active ? (
              animatePill ? (
                <m.span
                  aria-hidden="true"
                  className="absolute inset-0 z-0 rounded-full bg-brand"
                  layoutId="filter-pill"
                  transition={{ duration: 0.3, ease: EASE }}
                  data-reveal=""
                />
              ) : (
                <span aria-hidden="true" className="absolute inset-0 z-0 rounded-full bg-brand" />
              )
            ) : null}
            <span className="relative z-10">{item.title}</span>
          </Link>
        );
      })}
    </>
  );
}
