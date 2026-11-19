import type { Metadata } from "next";
import { CtaBand } from "@/components/home/cta-band";
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
      <div className="pt-8 before:mx-auto before:mt-12 before:block before:h-1 before:w-12 before:bg-brand">
        <ServicesSection
          services={services}
          title="Our services"
          intro="Digital marketing, creative design, video production, and web development with SEO. Use one team or all four."
        />
      </div>
      <CtaBand whatsapp={whatsappLink(settings.whatsapp)} />
    </>
  );
}
