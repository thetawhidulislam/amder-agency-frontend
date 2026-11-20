"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { publicButtonClass } from "@/components/shared/public-button";
import { navLinks } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 40);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header className="pointer-events-none sticky top-0 z-40 h-20">
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

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "nav-link-underline relative py-4 text-sm text-ink hover:text-brand",
                isActive(link.href) ? "font-medium" : ""
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className={cn(publicButtonClass({ variant: "ink", size: "sm" }), "hidden md:inline-flex")}>
            Start a project
            <ArrowUpRight aria-hidden="true" className="motion-arrow size-4" />
          </Link>
          <button
            type="button"
            className="-mr-2 p-2 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className={cn(
            "mobile-nav-enter pointer-events-auto absolute inset-x-0 border-t border-line bg-page md:hidden",
            scrolled ? "top-16" : "top-20"
          )}
        >
          <ul className="mx-auto max-w-6xl px-5 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
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
              </li>
            ))}
            <li className="py-4">
              <Link href="/contact" onClick={() => setOpen(false)} className={cn(publicButtonClass({ variant: "ink" }), "w-full")}>
                Start a project
                <ArrowUpRight aria-hidden="true" className="motion-arrow size-4" />
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
