import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/motion/reveal";
import { navLinks, siteConfig } from "@/config/site";
import type { Service, Settings } from "@/lib/types";

const socialIcons: Record<string, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  website: Globe,
};

const companyLinkLabels = ["Home", "About", "Services", "Portfolio", "Contact"];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4v12.5a3.5 3.5 0 1 1-2-3.16V7l7-1.5v8" />
      <path d="M14 4c.5 2.5 2.5 4.5 5 5" />
    </svg>
  );
}

function FooterInfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/15">
        <Icon aria-hidden="true" className="size-5 text-brand" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/55">{label}</p>
        <div className="mt-1 break-words text-sm font-semibold text-white">{children}</div>
      </div>
    </div>
  );
}

export function Footer({ settings, services }: { settings: Settings; services: Service[] }) {
  const companyLinks = companyLinkLabels.flatMap((label) => {
    const link = navLinks.find((item) => item.label === label);
    return link ? [link] : [];
  });
  const socials = Object.entries(settings.socials ?? {}).flatMap(([name, url]) => {
    const normalizedName = name.toLowerCase();
    const Icon = socialIcons[normalizedName];
    return url && (Icon || normalizedName === "tiktok") ? [{ name, url, Icon: Icon ?? null }] : [];
  });
  const phone = settings.phone || settings.whatsapp;

  return (
    <footer className="theme-dark bg-ink pt-12 text-white sm:pt-14">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.7fr_0.9fr_1.2fr]">
        <Reveal delay={0} className="overflow-visible">
        <div>
          <Link href="/" aria-label="Amader Agency home" className="inline-flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-white p-1">
              <Image src="/logo.png" alt="" width={36} height={36} className="size-9 object-contain" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              <span>Amader</span> <span className="text-brand">Agency</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">
            {siteConfig.tagline}. Let&apos;s build, promote and grow, together.
          </p>
          {socials.length > 0 ? (
            <nav aria-label="Social media" className="mt-6 flex flex-wrap gap-2">
              {socials.map(({ name, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="footer-social group flex size-10 items-center justify-center rounded-xl border border-white/15 text-white/70 hover:border-brand hover:text-brand"
                >
                  {Icon ? (
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  ) : (
                    <TikTokIcon className="size-5" />
                  )}
                </a>
              ))}
            </nav>
          ) : null}
        </div>
        </Reveal>

        <Reveal delay={100} className="overflow-visible">
        <nav aria-label="Company">
          <p className="text-sm font-semibold">Company</p>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        </Reveal>

        <Reveal delay={200} className="overflow-visible">
        <div>
          <p className="text-sm font-semibold">What we do</p>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            {services.map((service) => (
              <li key={service.id}>
                <Link href={`/services/${service.slug}`} className="footer-link hover:text-white">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </Reveal>

        <Reveal delay={300} className="overflow-visible">
        <div>
          <p className="text-sm font-semibold">Official info</p>
          <div className="mt-3 divide-y divide-white/10">
            {settings.email ? (
              <FooterInfoRow icon={Mail} label="Email us">
                <a href={`mailto:${settings.email}`} className="footer-link hover:text-brand">
                  {settings.email}
                </a>
              </FooterInfoRow>
            ) : null}
            {phone ? (
              <FooterInfoRow icon={Phone} label="Call us">
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="footer-link hover:text-brand">
                  {phone}
                </a>
              </FooterInfoRow>
            ) : null}
            {settings.address ? (
              <FooterInfoRow icon={MapPin} label="Our office">
                {settings.address}
              </FooterInfoRow>
            ) : null}
            {settings.businessHours ? (
              <FooterInfoRow icon={Clock} label="Business hours">
                {settings.businessHours}
              </FooterInfoRow>
            ) : null}
          </div>
        </div>
        </Reveal>
      </Container>

      <Container className="mt-10 flex flex-col gap-4 border-t border-white/10 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <nav aria-label="Footer legal" className="flex gap-5">
          <Link href="/about" className="footer-link hover:text-white">About</Link>
          <Link href="/contact" className="footer-link hover:text-white">Contact</Link>
        </nav>
      </Container>
    </footer>
  );
}
