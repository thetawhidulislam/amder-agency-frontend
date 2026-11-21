import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/home/cta-band";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { publicButtonClass } from "@/components/shared/public-button";
import { PortfolioCard } from "@/components/shared/portfolio-card";
import { AnimatedGrid } from "@/components/portfolio/animated-grid";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedFeatureList } from "@/components/services/animated-feature-list";
import { ServiceDetailHeading } from "@/components/services/service-detail-heading";
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
          <Link href="/services" className="service-back-link text-sm text-muted hover:text-brand">
            <ArrowLeft aria-hidden="true" className="service-back-arrow size-4" strokeWidth={1.75} />
            All services
          </Link>
          <div className="service-detail-grid mt-8 grid gap-12 overflow-x-clip lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <div>
              <ServiceDetailHeading
                icon={service.icon}
                title={service.title}
                description={service.shortDesc}
              />

              <div className="mt-12">
                <SectionHeading title="What is included" />
                <AnimatedFeatureList features={service.features} />
              </div>
            </div>

            <Reveal variant="right" className="overflow-visible lg:sticky lg:top-28 lg:self-start">
              <aside>
                <div className="rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
                  <p className="font-display text-xl font-semibold">Ask about this service</p>
                  <Magnetic className="mt-5 flex w-full">
                    <Link
                      href={`/contact?service=${service.slug}`}
                      className={cn(publicButtonClass({ size: "lg" }), "w-full")}
                    >
                      Ask about {service.title}
                      <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    </Link>
                  </Magnetic>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line py-14 sm:py-20">
        <Container className="max-w-3xl space-y-5 text-lg text-muted">
          {paragraphs.map((p, i) => (
            <Reveal key={i} variant="up" delay={i * 100}>
              <p>{p}</p>
            </Reveal>
          ))}
        </Container>
      </Section>

      {service.portfolio.length > 0 ? (
        <Section className="border-t border-line py-14 sm:py-20">
          <Container>
            <SectionHeading title={`Work in ${service.title}`} />
            <AnimatedGrid
              className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            >
              {service.portfolio.map((item) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  serviceTitle={service.title}
                  imageReveal
                />
              ))}
            </AnimatedGrid>
          </Container>
        </Section>
      ) : null}

      <CtaBand whatsapp={whatsappLink(settings.whatsapp)} />
    </>
  );
}
