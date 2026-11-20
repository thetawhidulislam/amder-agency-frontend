import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { navLinks, siteConfig } from "@/config/site";
import type { Service, Settings } from "@/lib/types";

export function Footer({ settings, services }: { settings: Settings; services: Service[] }) {
  const socials = Object.entries(settings.socials ?? {}).filter(([, url]) => url);

  return (
    <footer className="theme-dark border-t-4 border-brand bg-page pt-14 text-fg">
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
                <span className="flex items-center gap-2">
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-brand" strokeWidth={1.75} />
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-white">
                    {settings.phone}
                  </a>
                </span>
              </li>
            ) : null}
            {settings.whatsapp ? (
              <li className="flex items-center gap-2">
                <MessageCircle aria-hidden="true" className="size-4 shrink-0 text-brand" strokeWidth={1.75} />
                <span>WhatsApp: {settings.whatsapp}</span>
              </li>
            ) : null}
            {settings.email ? (
              <li>
                <span className="flex items-center gap-2">
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-brand" strokeWidth={1.75} />
                  <a href={`mailto:${settings.email}`} className="hover:text-white">
                    {settings.email}
                  </a>
                </span>
              </li>
            ) : null}
            {settings.address ? (
              <li className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-4 shrink-0 text-brand" strokeWidth={1.75} />
                <span>{settings.address}</span>
              </li>
            ) : null}
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
      <div aria-hidden="true" className="mt-14 h-[8vw] max-h-32 overflow-hidden">
        <p className="whitespace-nowrap font-display text-[13vw] font-bold leading-[0.8] tracking-tighter text-white/[0.08]">
          AMADER AGENCY
        </p>
      </div>
    </footer>
  );
}
