import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { navLinks, siteConfig } from "@/config/site";
import type { Service, Settings } from "@/lib/types";

export function Footer({ settings, services }: { settings: Settings; services: Service[] }) {
  const socials = Object.entries(settings.socials ?? {}).filter(([, url]) => url);

  return (
    <footer className="theme-dark border-t-4 border-brand bg-page py-14 text-fg">
      <Container className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" aria-label="Amader Agency home" className="inline-flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-sm bg-white p-1">
              <Image src="/logo.png" alt="" width={36} height={36} className="size-9 object-contain" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              <span>Amader</span> <span className="text-brand">Agency</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">{siteConfig.tagline}. Let&apos;s build, promote and grow, together.</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-medium">Pages</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-medium">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services/${s.slug}`} className="hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {settings.phone ? (
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {settings.phone}
                </a>
              </li>
            ) : null}
            {settings.whatsapp ? <li>WhatsApp: {settings.whatsapp}</li> : null}
            {settings.email ? (
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </li>
            ) : null}
            {settings.address ? <li>{settings.address}</li> : null}
            {socials.map(([name, url]) => (
              <li key={name}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-white">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="mt-12 border-t border-line pt-6 text-xs text-muted">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </Container>
    </footer>
  );
}
