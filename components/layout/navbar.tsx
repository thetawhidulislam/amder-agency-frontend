"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { m } from "motion/react";
import { Magnetic } from "@/components/motion/magnetic";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { publicButtonClass } from "@/components/shared/public-button";
import { navLinks } from "@/config/site";
import { EASE, MOTION_LEVEL } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useSiteReady } from "@/hooks/use-site-ready";

const menuVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
};

const menuItemsVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const menuListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

export function Navbar() {
  const siteReady = useSiteReady();
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const motionEnabled = MOTION_LEVEL === "rich" && !reducedMotion;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const updateScrollState = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);

      if (!motionEnabled || currentY <= 200 || open) {
        setHidden(false);
      } else if (currentY > lastScrollY.current + 2) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - 2) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, [motionEnabled, open]);

  return (
    <m.header
      className="pointer-events-none sticky top-0 z-40 h-20"
      initial={false}
      animate={
        siteReady
          ? { opacity: 1, y: hidden && motionEnabled ? "-100%" : 0 }
          : { opacity: 0, y: -12 }
      }
      transition={{ duration: 0.3, ease: EASE }}
      data-reveal=""
    >
      <a
        href="#main"
        className="pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-xl focus:bg-brand focus:px-3 focus:py-2 focus:text-brand-contrast"
      >
        Skip to content
      </a>

      <div
        className={cn(
          "pointer-events-auto absolute inset-x-0 top-0 mx-auto flex w-full max-w-none items-center justify-between border-b border-line px-5 sm:px-8",
          scrolled ? "h-16 bg-white/90 backdrop-blur-md" : "h-20 bg-white"
        )}
      >
        <Link href="/" onClick={() => setOpen(false)} aria-label="Amader Agency home" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="" width={40} height={40} priority className="size-10 bg-white object-contain" />
          <span className="font-display text-lg font-bold tracking-tight sm:text-xl">
            <span className="text-ink">Amader</span> <span className="text-brand">Agency</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="relative isolate rounded-full px-3 py-2 text-sm text-ink hover:text-brand"
              >
                {active ? (
                  motionEnabled ? (
                    <m.span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full bg-surface"
                      layoutId="nav-pill"
                      transition={{ duration: 0.3, ease: EASE }}
                      data-reveal=""
                    />
                  ) : (
                    <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-surface" />
                  )
                ) : null}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic className="hidden md:inline-flex">
            <Link href="/contact" className={publicButtonClass({ variant: "ink", size: "sm" })}>
              Start a project
              <ArrowUpRight aria-hidden="true" className="motion-arrow size-4" />
            </Link>
          </Magnetic>
          <button
            type="button"
            className="-mr-2 p-2 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <m.nav
          id="mobile-nav"
          aria-label="Mobile"
          className={cn(
            "pointer-events-auto absolute inset-x-0 border-t border-line bg-page md:hidden",
            scrolled ? "top-16" : "top-20"
          )}
          variants={menuVariants}
          initial={motionEnabled ? "hidden" : false}
          animate={motionEnabled ? "visible" : false}
          transition={{ duration: 0.3, ease: EASE }}
          data-reveal=""
        >
          <m.ul className="mx-auto max-w-6xl px-5 py-3" variants={menuListVariants}>
            {navLinks.map((link) => (
              <m.li key={link.href} variants={menuItemsVariants} transition={{ duration: 0.3, ease: EASE }} data-reveal="">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "block border-b border-line py-3.5 text-lg",
                    isActive(link.href) ? "font-medium text-brand" : ""
                  )}
                >
                  {link.label}
                </Link>
              </m.li>
            ))}
            <m.li variants={menuItemsVariants} transition={{ duration: 0.3, ease: EASE }} data-reveal="">
              <div className="py-4">
                <Magnetic className="flex w-full">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className={cn(publicButtonClass({ variant: "ink" }), "w-full")}
                  >
                    Start a project
                    <ArrowUpRight aria-hidden="true" className="motion-arrow size-4" />
                  </Link>
                </Magnetic>
              </div>
            </m.li>
          </m.ul>
        </m.nav>
      ) : null}
    </m.header>
  );
}
