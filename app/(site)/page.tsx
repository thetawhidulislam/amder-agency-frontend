import { CtaBand } from "@/components/home/cta-band";
import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { Industries } from "@/components/home/industries";
import { Process } from "@/components/home/process";
import { ServiceMarquee } from "@/components/home/service-marquee";
import { ServicesSection } from "@/components/home/services-section";
import { Why } from "@/components/home/why";
import { TeamSection } from "@/components/shared/team-section";
import { getPortfolio, getServices, getSettings, getTeam } from "@/lib/api-server";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 3600;

export default async function HomePage() {
  const [services, featured, settings, team] = await Promise.all([
    getServices(),
    getPortfolio({ featured: true, limit: 6 }),
    getSettings(),
    getTeam({ home: true, limit: 8 }),
  ]);
  const whatsapp = whatsappLink(settings.whatsapp, "Hello Amader Agency, I would like to talk about my business.");

  return (
    <>
      <Hero services={services} whatsapp={whatsapp} />
      <ServiceMarquee services={services} />
      <ServicesSection services={services} />
      <Process />
      <Why />
      <TeamSection members={team} id="team" viewAllHref="/about#team" />
      <FeaturedWork items={featured.items} />
      <Industries />
      <CtaBand whatsapp={whatsapp} />
    </>
  );
}
