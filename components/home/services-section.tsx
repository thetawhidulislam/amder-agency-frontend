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
        {showHeading ? <SectionHeading title={title} intro={intro} as={pageTitle ? "h1" : "h2"} /> : null}

        {services.length === 0 ? (
          <p className="mt-12 border-t border-line pt-8 text-muted">
            Services will appear here once they are added in the admin panel.
          </p>
        ) : (
          <Reveal y={0} className="service-list-reveal">
            <ul className={showHeading ? "mt-14 border-t border-line" : "border-t border-line"}>
              {services.map((s) => (
                <li key={s.id} className="service-row-item border-b border-line">
                  <div className="service-row-inner group service-row-content grid gap-6 px-3 py-10 hover:bg-surface md:grid-cols-[1fr_1.4fr] md:gap-14">
                    <div>
                      <span className="flex size-14 items-center justify-center bg-ink group-hover:bg-brand">
                        <ServiceIcon name={s.icon} className="size-7 text-brand group-hover:text-white" />
                      </span>
                      <h3 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
                        <Link href={`/services/${s.slug}`} className="service-row-title hover:text-brand">
                          {s.title}
                        </Link>
                      </h3>
                    </div>
                    <div>
                      <p className="max-w-prose text-lg text-muted">{s.shortDesc}</p>
                      <ul className="mt-6 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.75} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/services/${s.slug}`}
                        className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium underline decoration-brand decoration-2 underline-offset-4 hover:text-brand"
                      >
                        See what is included
                        <ArrowUpRight aria-hidden="true" className="service-included-arrow size-4" />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
