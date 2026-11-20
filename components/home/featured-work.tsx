import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { PortfolioEmptyState } from "@/components/shared/portfolio-empty-state";
import type { PortfolioListItem } from "@/lib/types";

export function FeaturedWork({ items }: { items: PortfolioListItem[] }) {
  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading title="Recent work" />
          <Link href="/portfolio" className="text-sm font-medium underline decoration-brand decoration-2 underline-offset-4 hover:text-brand">
            View all projects
          </Link>
        </div>
        {items.length === 0 ? (
          <PortfolioEmptyState className="mt-12" />
        ) : (
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <PortfolioCard key={item.id} item={item} featured={index === 0} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
