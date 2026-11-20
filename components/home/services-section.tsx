import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/shared/container";
import { ServiceIcon } from "@/components/shared/service-icon";
import { Reveal } from "@/components/motion/reveal";
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
    <Section id="services">
      <Container>
        {showHeading ? (
          <SectionHeading
            title={title}
            intro={intro}
            as={pageTitle ? "h1" : "h2"}
            align="center"
            chip="What we do"
          />
        ) : null}

        {services.length === 0 ? (
          <p className="mt-12 border-t border-line pt-8 text-muted">
            Services will appear here once they are added in the admin panel.
          </p>
        ) : (
          <Reveal y={0} className="service-grid-reveal mt-12 overflow-visible">
            <ul className="grid gap-5 md:grid-cols-2">
              {services.map((s) => (
                <li key={s.id} className="service-card-item">
                  <article className="service-card group flex h-full flex-col rounded-3xl border border-line bg-white p-8">
                    <span className="service-card-icon flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white">
                      <ServiceIcon name={s.icon} className="size-7" />
                    </span>
                    <h3 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-muted">{s.shortDesc}</p>
                    <ul className="mt-6 grid gap-x-4 gap-y-3 text-sm sm:grid-cols-2">
                      {s.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                            <Check aria-hidden="true" className="size-3.5 text-brand" strokeWidth={1.75} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/services/${s.slug}`}
                      className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-6 text-sm font-medium"
                    >
                      <span>See what is included</span>
                      <span className="service-card-arrow flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-ink group-hover:bg-brand group-hover:text-white">
                        <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.75} />
                      </span>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
