import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, Clock, Globe, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { Container, Section } from "@/components/shared/container";
import { ContactForm } from "@/components/shared/contact-form";
import { PageHeader } from "@/components/shared/page-header";
import { publicButtonClass } from "@/components/shared/public-button";
import { getServices, getSettings } from "@/lib/api-server";
import { cn, whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your business. We will get back to you soon.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ service?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  const defaultServiceId = services.find((s) => s.slug === service)?.id ?? "";
  const whatsapp = whatsappLink(settings.whatsapp, "Hello Amader Agency, I would like to talk about my business.");
  const socials = Object.entries(settings.socials ?? {}).filter(([, url]) => url);

  return (
    <Section>
      <Container>
        <PageHeader
          chip="Contact"
          title="Let's talk about your business"
          intro="Tell us what you need. We will review it and get back to you with next steps."
        />
        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div>
            {whatsapp ? (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={cn(publicButtonClass({ size: "lg" }), "mt-8")}>
                Chat on WhatsApp
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </a>
            ) : null}

            <dl className="mt-10 grid gap-3 text-sm">
              {settings.phone ? (
                <ContactDetail icon={Phone} label="Phone">
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-brand">
                    {settings.phone}
                  </a>
                </ContactDetail>
              ) : null}
              {settings.whatsapp ? (
                <ContactDetail icon={MessageCircle} label="WhatsApp">
                  {settings.whatsapp}
                </ContactDetail>
              ) : null}
              {settings.email ? (
                <ContactDetail icon={Mail} label="Email">
                  <a href={`mailto:${settings.email}`} className="hover:text-brand">
                    {settings.email}
                  </a>
                </ContactDetail>
              ) : null}
              {settings.address ? (
                <ContactDetail icon={MapPin} label="Address">
                  {settings.address}
                </ContactDetail>
              ) : null}
              {settings.businessHours ? (
                <ContactDetail icon={Clock} label="Business hours">
                  {settings.businessHours}
                </ContactDetail>
              ) : null}
              {socials.length > 0 ? (
                <ContactDetail icon={Globe} label="Follow us">
                  <span className="flex flex-wrap gap-x-5 gap-y-1 text-muted">
                    {socials.map(([name, url]) => (
                      <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-brand">
                        {name}
                      </a>
                    ))}
                  </span>
                </ContactDetail>
              ) : null}
            </dl>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-10">
            <ContactForm services={services} defaultServiceId={defaultServiceId} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ContactDetail({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10">
        <Icon aria-hidden="true" className="size-5 text-brand" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 pt-0.5">
        <dt className="font-medium">{label}</dt>
        <dd className="mt-1 break-words text-muted">{children}</dd>
      </div>
    </div>
  );
}
