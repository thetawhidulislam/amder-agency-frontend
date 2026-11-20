import type { Metadata } from "next";
import { CtaBand } from "@/components/home/cta-band";
import { Industries } from "@/components/home/industries";
import { Why } from "@/components/home/why";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { philosophy } from "@/config/site";
import { getSettings } from "@/lib/api-server";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description: "Amader Agency is a full-stack marketing agency providing creative and digital solutions under one roof.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const settings = await getSettings();
  return (
    <>
      <Section className="pb-16">
        <Container>
          <h1 className="before:mb-6 before:block before:h-1 before:w-12 before:bg-brand max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-7xl">
            Creative thinking. Strategic execution. Business growth.
          </h1>
          <div className="mt-10 max-w-2xl space-y-5 text-lg text-muted">
            <p>Every business has a story. Every brand has the potential to grow.</p>
            <p>
              At Amader Agency, we believe business growth requires more than just advertising. It requires the right
              strategy, creative communication and consistent execution.
            </p>
            <p>
              We are a full-stack marketing agency providing creative and digital solutions under one roof. From graphic
              design and video production to digital marketing, website development and SEO, we bring specialized
              services together through a coordinated team.
            </p>
          </div>
        </Container>
      </Section>

      <Why />

      <Section className="theme-dark bg-page text-fg">
        <Container>
          <SectionHeading title="What we believe" />
          <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {philosophy.map((p) => (
              <div key={p.title} className="border-t border-line pt-5">
                <dt className="font-display text-2xl font-semibold">{p.title}</dt>
                <dd className="mt-2 max-w-sm text-muted">{p.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Industries />
      <CtaBand whatsapp={whatsappLink(settings.whatsapp)} />
    </>
  );
}
