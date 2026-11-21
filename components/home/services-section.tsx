import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { ServiceIcon } from "@/components/shared/service-icon";
import { ResponsiveReveal, Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { TiltCard } from "@/components/motion/tilt-card";
import { ServiceFeatureList } from "@/components/home/service-feature-list";
import type { Service } from "@/lib/types";

export function ServicesSection({
  services,
  title = "What we do",
  intro = "Specialist departments, coordinated under one roof, so you brief one agency and get the full result.",
  pageTitle = false,
  showHeading = true,
}: {
  services: Service[];
  title?: string;
  intro?: string;
  pageTitle?: boolean;
  showHeading?: boolean;
}) {
  return (
    <Section id="services" className={showHeading ? "py-12 sm:py-16 lg:py-20" : undefined}>
      <Container>
        {showHeading ? (
          <SectionHeading
            title={title}
            intro={intro}
            as={pageTitle ? "h1" : "h2"}
            align="center"
            chip="What we do"
            splitTitle
          />
        ) : null}

        {services.length === 0 ? (
          <p className={showHeading ? "mt-10 border-t border-line pt-6 text-muted" : "mt-12 border-t border-line pt-8 text-muted"}>
            Services will appear here once they are added in the admin panel.
          </p>
        ) : (
          <ul className={`grid md:grid-cols-2 ${showHeading ? "mt-10 gap-4" : "mt-12 gap-5"}`}>
            {services.map((s, index) => (
              <li key={s.id} className="service-card-item min-w-0">
                <ResponsiveReveal
                  delay={index * 80}
                  mobileVariant="up"
                  desktopVariant={index % 2 === 0 ? "left" : "right"}
                  className="service-grid-reveal h-full overflow-visible"
                >
                  <TiltCard className="h-full rounded-3xl">
                    <SpotlightCard
                      className={`service-card group h-full rounded-3xl border border-line bg-white ${
                        showHeading ? "p-5 sm:p-6" : "p-8"
                      }`}
                      contentClassName="flex h-full flex-col"
                    >
                      <article className="flex h-full flex-col">
                        <span className="service-card-icon flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                          <ServiceIcon name={s.icon} className="size-7" />
                        </span>
                        <h3 className={`font-display font-semibold leading-tight tracking-tight ${showHeading ? "mt-4 text-2xl" : "mt-5 text-3xl"}`}>
                          {s.title}
                        </h3>
                        <p className={showHeading ? "mt-2 text-sm leading-6 text-muted" : "mt-3 text-muted"}>{s.shortDesc}</p>
                        <ServiceFeatureList features={s.features} />
                        <Link
                          href={`/services/${s.slug}`}
                          className={`mt-auto flex items-center justify-between gap-4 border-t border-line text-sm font-medium ${
                            showHeading ? "pt-4" : "pt-6"
                          }`}
                        >
                          <span>See what is included</span>
                          <span className="service-card-arrow flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-ink group-hover:bg-brand group-hover:text-white">
                            <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.75} />
                          </span>
                        </Link>
                      </article>
                    </SpotlightCard>
                  </TiltCard>
                </ResponsiveReveal>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
