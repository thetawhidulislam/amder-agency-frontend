import type { Metadata } from "next";
import { CtaBand } from "@/components/home/cta-band";
import { Container, Section } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { ServicesSection } from "@/components/home/services-section";
import { getServices, getSettings } from "@/lib/api-server";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Services",
  description: "Digital marketing, creative design, video production, web development and SEO from one coordinated team.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  return (
    <>
      <Section className="pb-0">
        <Container>
          <PageHeader
            chip="Services"
            title="Our services"
            intro="Digital marketing, creative design, video production, and web development with SEO. Use one team or all four."
          />
        </Container>
      </Section>
      <ServicesSection services={services} showHeading={false} />
      <CtaBand whatsapp={whatsappLink(settings.whatsapp)} />
    </>
  );
}
