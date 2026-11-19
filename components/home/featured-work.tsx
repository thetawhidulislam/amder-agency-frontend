import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { PortfolioCard } from "@/components/shared/portfolio-card";
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
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
