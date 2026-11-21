import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { PortfolioEmptyState } from "@/components/shared/portfolio-empty-state";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { TiltCard } from "@/components/motion/tilt-card";
import { Reveal } from "@/components/motion/reveal";
import type { PortfolioListItem } from "@/lib/types";

export function FeaturedWork({ items }: { items: PortfolioListItem[] }) {
  return (
    <Section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading title="Recent work" chip="Our work" align="center" />
        <div className="mt-5 flex justify-center">
          <Link href="/portfolio" className="text-sm font-medium underline decoration-brand decoration-2 underline-offset-4 hover:text-brand">
            View all projects
          </Link>
        </div>
        {items.length === 0 ? (
          <PortfolioEmptyState className="mt-10" />
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={item.id} delay={index * 80} className="h-full overflow-visible">
                <TiltCard className="h-full rounded-3xl">
                  <SpotlightCard className="portfolio-work-card h-full overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-card)]">
                    <PortfolioCard
                      item={item}
                      surface="transparent"
                      imageReveal
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </SpotlightCard>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
