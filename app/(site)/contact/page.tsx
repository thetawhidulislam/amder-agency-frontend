import type { Metadata } from "next";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
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

            <dl className="mt-12 space-y-6 border-t border-line pt-8 text-sm">
              {settings.phone ? (
                <div>
                  <dt className="flex items-center gap-2 font-medium">
                    <Phone aria-hidden="true" className="size-4 text-brand" strokeWidth={1.75} />
                    Phone
                  </dt>
                  <dd className="mt-1 text-muted">
                    <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-brand">
                      {settings.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {settings.whatsapp ? (
                <div>
                  <dt className="flex items-center gap-2 font-medium">
                    <MessageCircle aria-hidden="true" className="size-4 text-brand" strokeWidth={1.75} />
                    WhatsApp
                  </dt>
                  <dd className="mt-1 text-muted">{settings.whatsapp}</dd>
                </div>
              ) : null}
              {settings.email ? (
                <div>
                  <dt className="flex items-center gap-2 font-medium">
                    <Mail aria-hidden="true" className="size-4 text-brand" strokeWidth={1.75} />
                    Email
                  </dt>
                  <dd className="mt-1 text-muted">
                    <a href={`mailto:${settings.email}`} className="hover:text-brand">
                      {settings.email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {settings.address ? (
                <div>
                  <dt className="flex items-center gap-2 font-medium">
                    <MapPin aria-hidden="true" className="size-4 text-brand" strokeWidth={1.75} />
                    Address
                  </dt>
                  <dd className="mt-1 text-muted">{settings.address}</dd>
                </div>
              ) : null}
              {settings.businessHours ? (
                <div>
                  <dt className="flex items-center gap-2 font-medium">
                    <Clock aria-hidden="true" className="size-4 text-brand" strokeWidth={1.75} />
                    Business hours
                  </dt>
                  <dd className="mt-1 text-muted">{settings.businessHours}</dd>
                </div>
              ) : null}
              {socials.length > 0 ? (
                <div>
                  <dt className="font-medium">Follow us</dt>
                  <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-muted">
                    {socials.map(([name, url]) => (
                      <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-brand">
                        {name}
                      </a>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="relative">
            <ContactForm services={services} defaultServiceId={defaultServiceId} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
