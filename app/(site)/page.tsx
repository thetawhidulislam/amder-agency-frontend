import { CtaBand } from "@/components/home/cta-band";
import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { Industries } from "@/components/home/industries";
import { Process } from "@/components/home/process";
import { ServicesSection } from "@/components/home/services-section";
import { Why } from "@/components/home/why";
import { getPortfolio, getServices, getSettings } from "@/lib/api-server";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 3600;

export default async function HomePage() {
  const [services, featured, settings] = await Promise.all([
    getServices(),
    getPortfolio({ featured: true, limit: 6 }),
    getSettings(),
  ]);
  const whatsapp = whatsappLink(settings.whatsapp, "Hello Amader Agency, I would like to talk about my business.");

  return (
    <>
      <Hero services={services} whatsapp={whatsapp} />
      <ServicesSection services={services} />
      <Process />
      <Why />
      <Industries />
      {featured.items.length > 0 ? <FeaturedWork items={featured.items} /> : null}
      <CtaBand whatsapp={whatsapp} />
    </>
  );
}
