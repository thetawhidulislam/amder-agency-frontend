import type { Metadata } from "next";
import { CtaBand } from "@/components/home/cta-band";
import { Industries } from "@/components/home/industries";
import { Why } from "@/components/home/why";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { PhilosophyGrid } from "@/components/shared/philosophy-grid";
import { Reveal } from "@/components/motion/reveal";
import { philosophy } from "@/config/site";
import { TeamSection } from "@/components/shared/team-section";
import { getSettings, getTeam } from "@/lib/api-server";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description: "Amader Agency is a full-stack marketing agency providing creative and digital solutions under one roof.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [settings, team] = await Promise.all([getSettings(), getTeam()]);
  return (
    <>
      <Section className="pb-16">
        <Container>
          <PageHeader
            chip="About"
            title="Creative thinking. Strategic execution. Business growth."
            intro="Every business has a story. Every brand has the potential to grow."
          />
          <div className="mt-10 max-w-2xl space-y-5 text-lg text-muted">
            <Reveal variant="up" distance={16} delay={240}>
              <p>
                At Amader Agency, we believe business growth requires more than just advertising. It requires the right
                strategy, creative communication and consistent execution.
              </p>
            </Reveal>
            <Reveal variant="up" distance={16} delay={360}>
              <p>
                We are a full-stack marketing agency providing creative and digital solutions under one roof. From graphic
                design and video production to digital marketing, website development and SEO, we bring specialized
                services together through a coordinated team.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Why />

      <TeamSection members={team} id="team" />

      <Section className="theme-dark bg-page text-fg">
        <Container>
          <SectionHeading title="What we believe" />
          <PhilosophyGrid items={philosophy} />
        </Container>
      </Section>

      <Industries />
      <CtaBand whatsapp={whatsappLink(settings.whatsapp)} />
    </>
  );
}
