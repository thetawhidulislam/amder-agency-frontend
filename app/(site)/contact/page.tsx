import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/shared/container";
import { ContactForm } from "@/components/shared/contact-form";
import { AnimatedContactDetail } from "@/components/shared/animated-contact";
import { PageHeader } from "@/components/shared/page-header";
import { publicButtonClass } from "@/components/shared/public-button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
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
          <Reveal variant="left" className="overflow-visible">
          <div>
            {whatsapp ? (
              <Magnetic className="mt-8">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={cn(publicButtonClass({ size: "lg" }))}>
                  Chat on WhatsApp
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                </a>
              </Magnetic>
            ) : null}

            <dl className="mt-10 grid gap-3 text-sm">
              {settings.phone ? (
                <AnimatedContactDetail icon="phone" label="Phone" delay={0}>
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="link-underline hover:text-brand">
                    {settings.phone}
                  </a>
                </AnimatedContactDetail>
              ) : null}
              {settings.whatsapp ? (
                <AnimatedContactDetail icon="whatsapp" label="WhatsApp" delay={80}>
                  {settings.whatsapp}
                </AnimatedContactDetail>
              ) : null}
              {settings.email ? (
                <AnimatedContactDetail icon="email" label="Email" delay={160}>
                  <a href={`mailto:${settings.email}`} className="link-underline hover:text-brand">
                    {settings.email}
                  </a>
                </AnimatedContactDetail>
              ) : null}
              {settings.address ? (
                <AnimatedContactDetail icon="address" label="Address" delay={240}>
                  {settings.address}
                </AnimatedContactDetail>
              ) : null}
              {settings.businessHours ? (
                <AnimatedContactDetail icon="hours" label="Business hours" delay={320}>
                  {settings.businessHours}
                </AnimatedContactDetail>
              ) : null}
              {socials.length > 0 ? (
                <AnimatedContactDetail icon="social" label="Follow us" delay={400}>
                  <span className="flex flex-wrap gap-x-5 gap-y-1 text-muted">
                    {socials.map(([name, url]) => (
                      <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="link-underline capitalize hover:text-brand">
                        {name}
                      </a>
                    ))}
                  </span>
                </AnimatedContactDetail>
              ) : null}
            </dl>
          </div>

          </Reveal>

          <Reveal variant="right" className="overflow-visible">
            <ContactForm services={services} defaultServiceId={defaultServiceId} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
