import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { PortfolioEmptyState } from "@/components/shared/portfolio-empty-state";
import type { PortfolioListItem } from "@/lib/types";

export function FeaturedWork({ items }: { items: PortfolioListItem[] }) {
  return (
    <Section>
      <Container>
        <SectionHeading title="Recent work" chip="Our work" align="center" />
        <div className="mt-5 flex justify-center">
          <Link href="/portfolio" className="text-sm font-medium underline decoration-brand decoration-2 underline-offset-4 hover:text-brand">
            View all projects
          </Link>
        </div>
        {items.length === 0 ? (
          <PortfolioEmptyState className="mt-12" />
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
