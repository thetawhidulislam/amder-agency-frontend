"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { buttonClass } from "@/components/ui/button";
import { navLinks } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-sm focus:bg-brand focus:px-3 focus:py-2 focus:text-brand-contrast"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
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
                "relative py-[1.35rem] text-sm text-ink transition-colors hover:text-brand",
                isActive(link.href) ? "font-medium after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-brand" : ""
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className={cn(buttonClass({ variant: "ink", size: "sm" }), "hidden md:inline-flex hover:bg-brand")}>
            Start a project
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
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-page md:hidden">
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
              <Link href="/contact" onClick={() => setOpen(false)} className={cn(buttonClass({ variant: "ink" }), "w-full hover:bg-brand")}>
                Start a project
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
