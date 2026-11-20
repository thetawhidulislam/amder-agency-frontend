import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/home/cta-band";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { publicButtonClass } from "@/components/shared/public-button";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { ServiceIcon } from "@/components/shared/service-icon";
import { getService, getServices, getSettings } from "@/lib/api-server";
import { cn, whatsappLink } from "@/lib/utils";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.metaTitle ? { absolute: service.metaTitle } : service.title,
    description: service.metaDescription ?? service.shortDesc,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getService(slug), getSettings()]);
  if (!service) notFound();

  const paragraphs = service.description.split(/\n{2,}/).filter(Boolean);

  return (
    <>
      <Section className="pb-12 sm:pb-16">
        <Container>
          <Link href="/services" className="text-sm text-muted hover:text-brand">
            All services
          </Link>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <div>
              <ServiceIcon name={service.icon} className="size-8 text-brand" />
              <h1 className="before:mb-6 before:block before:h-1 before:w-12 before:bg-brand mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-7xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-xl text-xl text-muted">{service.shortDesc}</p>

              <div className="mt-12">
                <SectionHeading title="What is included" />
                <ul className="mt-5 border-t border-line">
                {service.features.map((f) => (
                  <li key={f} className="flex gap-3 border-b border-line py-3.5">
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" strokeWidth={1.75} />
                    {f}
                  </li>
                ))}
                </ul>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
                <p className="font-display text-xl font-semibold">Ask about this service</p>
                <Link
                  href={`/contact?service=${service.slug}`}
                  className={cn(publicButtonClass({ size: "lg" }), "mt-5 w-full")}
                >
                  Ask about {service.title}
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line py-14 sm:py-20">
        <Container className="max-w-3xl space-y-5 text-lg text-muted">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Container>
      </Section>

      {service.portfolio.length > 0 ? (
        <Section className="border-t border-line py-14 sm:py-20">
          <Container>
            <SectionHeading title={`Work in ${service.title}`} />
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {service.portfolio.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand whatsapp={whatsappLink(settings.whatsapp)} />
    </>
  );
}
