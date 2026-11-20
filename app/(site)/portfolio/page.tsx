import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/home/cta-band";
import { Container, Section } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { PortfolioEmptyState } from "@/components/shared/portfolio-empty-state";
import { getPortfolio, getServices, getSettings } from "@/lib/api-server";
import { cn, whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected design, video, marketing and web projects by Amader Agency.",
  alternates: { canonical: "/portfolio" },
};

type Props = { searchParams: Promise<{ service?: string; page?: string }> };

const chip = (active: boolean) =>
  cn(
    "inline-flex h-9 items-center rounded-full border px-4 text-sm",
    active ? "border-brand bg-brand text-brand-contrast" : "border-line hover:border-fg/50"
  );

export default async function PortfolioPage({ searchParams }: Props) {
  const { service, page } = await searchParams;
  const current = Math.max(1, Number(page) || 1);

  const [services, { items, meta }, settings] = await Promise.all([
    getServices(),
    getPortfolio({ service, page: current, limit: 12 }),
    getSettings(),
  ]);

  const href = (p: number) => {
    const qs = new URLSearchParams();
    if (service) qs.set("service", service);
    if (p > 1) qs.set("page", String(p));
    const s = qs.toString();
    return `/portfolio${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <Section className="pb-20">
        <Container>
          <PageHeader chip="Portfolio" title="Our work" intro="A selection of projects across design, video, marketing and web." />

          <nav aria-label="Filter by service" className="mt-10 flex flex-wrap gap-2">
            <Link href="/portfolio" className={chip(!service)}>
              All
            </Link>
            {services.map((s) => (
              <Link key={s.id} href={`/portfolio?service=${s.slug}`} className={chip(service === s.slug)}>
                {s.title}
              </Link>
            ))}
          </nav>

          {items.length === 0 ? (
            <div className="mt-14">
              <PortfolioEmptyState />
              <p className="mt-6 border-t border-line pt-8 text-muted">
                No projects here yet. Add them from the admin panel, or check back soon.
              </p>
            </div>
          ) : (
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {meta.totalPages > 1 ? (
            <nav aria-label="Pagination" className="mt-16 flex items-center justify-between border-t border-line pt-6 text-sm">
              {current > 1 ? (
                <Link href={href(current - 1)} className="hover:text-brand">
                  Previous
                </Link>
              ) : (
                <span />
              )}
              <span className="text-muted">
                Page {meta.page} of {meta.totalPages}
              </span>
              {current < meta.totalPages ? (
                <Link href={href(current + 1)} className="hover:text-brand">
                  Next
                </Link>
              ) : (
                <span />
              )}
            </nav>
          ) : null}
        </Container>
      </Section>
      <CtaBand whatsapp={whatsappLink(settings.whatsapp)} />
    </>
  );
}
