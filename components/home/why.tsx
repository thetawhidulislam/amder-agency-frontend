import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Code,
  HeartHandshake,
  Layers,
  Megaphone,
  Palette,
  Target,
  UserRound,
  Users,
  Video,
} from "lucide-react";
import { Container, Section } from "@/components/shared/container";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { SectionChip } from "@/components/shared/section-chip";
import { WhyRings } from "@/components/home/why-rings";
import { whyPoints } from "@/config/site";
import { MOTION_LEVEL } from "@/lib/motion";

const whyIcons = [Layers, Users, Target, BadgeCheck, HeartHandshake];
const cardPlacements = [
  "md:col-span-2 lg:col-span-2 lg:row-start-1 lg:min-h-[300px]",
  "md:min-h-[360px] lg:col-start-3 lg:row-start-1 lg:row-span-2 lg:min-h-[500px]",
  "lg:col-start-1 lg:row-start-2 lg:min-h-[260px]",
  "md:min-h-[300px] lg:col-start-2 lg:row-start-2 lg:min-h-[300px]",
  "lg:col-span-3 lg:row-start-3 lg:min-h-[180px]",
];
const serviceIcons = [Megaphone, Palette, Video, Code];
const decorativeMotion =
  "motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-safe:group-hover:translate-x-2 motion-safe:group-hover:-translate-y-2 motion-safe:group-focus-within:translate-x-2 motion-safe:group-focus-within:-translate-y-2";
const decorativeClassName = MOTION_LEVEL === "rich" ? decorativeMotion : "";

export function Why() {
  return (
    <Section>
      <Container>
        <header className="mx-auto max-w-3xl text-center">
          <SectionChip className="mb-5">Why Amader Agency</SectionChip>
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
            Why businesses choose Amader Agency
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            Growth needs more than advertising. It needs the right strategy, clear creative and steady execution.
          </p>
        </header>

        <dl className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyPoints.slice(0, 5).map((point, index) => {
            const Icon = whyIcons[index];
            const isDark = index === 0;
            const isRed = index === 4;
            const lightCard = index === 1 || index === 2 || index === 3;
            const cardTone = isDark
              ? "bg-ink text-white"
              : isRed
                ? "bg-brand text-white"
                : index === 2
                  ? "bg-[#f4f4f4] text-ink"
                  : "border border-[rgb(11_11_11_/_0.1)] bg-white text-ink";
            const iconTone = isDark
              ? "bg-white/10 text-white"
              : isRed
                ? "bg-white/20 text-white"
                : "bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white";

            const cardContent = (
                <>
                    {index === 0 ? (
                      <div
                        aria-hidden="true"
                        className={`absolute -bottom-[280px] -right-[280px] z-0 size-[360px] md:-bottom-[180px] md:-right-[160px] ${decorativeClassName}`}
                      >
                        <WhyRings />
                      </div>
                    ) : null}

                    {index === 1 ? (
                      <>
                        <div
                          aria-hidden="true"
                          className="absolute right-0 top-0 z-0 size-28 opacity-60"
                          style={{
                            backgroundImage: "radial-gradient(circle, rgb(11 11 11 / 0.1) 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                          }}
                        />
                        <div
                          aria-hidden="true"
                          className={`absolute bottom-8 left-8 z-0 flex -space-x-3 ${decorativeClassName}`}
                        >
                          <span className="flex size-11 items-center justify-center rounded-full bg-brand text-white ring-4 ring-white">
                            <Users className="size-5" />
                          </span>
                          <span className="flex size-11 items-center justify-center rounded-full bg-ink text-white ring-4 ring-white">
                            <UserRound className="size-5" />
                          </span>
                          <span className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f4] text-brand ring-4 ring-white">
                            <UserRound className="size-5" />
                          </span>
                        </div>
                      </>
                    ) : null}

                    {index === 2 ? (
                      <div
                        aria-hidden="true"
                        className={`absolute -bottom-14 -right-14 z-0 size-48 ${decorativeClassName}`}
                      >
                        <span className="absolute bottom-0 right-0 size-48 rounded-full border border-[rgb(225_29_39_/_0.15)]" />
                        <span className="absolute bottom-8 right-8 size-32 rounded-full border border-[rgb(225_29_39_/_0.15)]" />
                        <span className="absolute bottom-16 right-16 size-16 rounded-full border border-[rgb(225_29_39_/_0.15)]" />
                      </div>
                    ) : null}

                    {index === 3 ? (
                      <BadgeCheck
                        aria-hidden="true"
                        className={`absolute -bottom-4 -right-4 z-0 size-24 text-brand opacity-[0.08] md:size-[140px] ${decorativeClassName}`}
                        strokeWidth={1.5}
                      />
                    ) : null}

                    {index === 4 ? (
                      <HeartHandshake
                        aria-hidden="true"
                        className="absolute bottom-6 right-6 z-0 block size-28 text-white opacity-[0.15] md:hidden lg:bottom-auto lg:right-8 lg:top-1/2 lg:block lg:size-36 lg:-translate-y-1/2 motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-safe:group-hover:translate-x-2 motion-safe:group-hover:translate-y-2 motion-safe:group-focus-within:translate-x-2 motion-safe:group-focus-within:translate-y-2 motion-safe:lg:group-hover:-translate-y-[calc(50%+8px)] motion-safe:lg:group-focus-within:-translate-y-[calc(50%+8px)]"
                        strokeWidth={1.25}
                      />
                    ) : null}

                    <div className="relative z-10 flex h-full flex-col">
                      <span className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${iconTone}`}>
                        <Icon aria-hidden="true" className="size-7" strokeWidth={1.75} />
                      </span>
                      <dt
                        className={`mt-6 font-display text-2xl font-semibold leading-tight ${
                          index === 3
                            ? "max-w-[9rem] sm:max-w-none"
                            : index === 4
                              ? "max-w-[9rem] md:max-w-sm"
                              : ""
                        }`}
                      >
                        {point.title}
                      </dt>
                      <dd
                        className={`mt-3 max-w-sm text-base leading-relaxed ${
                          isDark ? "text-white/70" : isRed ? "text-white/90" : "text-muted"
                        } ${
                          index === 0 || index === 2 || index === 3 || index === 4
                            ? index === 0
                              ? "max-w-[12rem] md:max-w-sm"
                              : index === 2
                                ? "max-w-[9rem]"
                                : index === 3
                                  ? "max-w-[9rem]"
                                : "max-w-[9rem] md:max-w-sm"
                            : ""
                        }`}
                      >
                        {point.text}
                      </dd>

                      {index === 0 ? (
                        <div aria-hidden="true" className="mt-auto flex flex-wrap gap-3 pt-8">
                          {serviceIcons.map((ServiceIcon, iconIndex) => (
                            <span key={iconIndex} className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white">
                              <ServiceIcon className="size-4" strokeWidth={1.75} />
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {index === 1 ? <div className="mt-auto min-h-14 pt-8" aria-hidden="true" /> : null}

                      {index === 4 ? (
                        <Link
                          href="/contact"
                          className="mt-6 hidden w-fit shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-dark motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1 sm:inline-flex sm:mt-0 sm:self-end"
                        >
                          Start a project
                          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                        </Link>
                      ) : null}
                    </div>
                </>
              );
              const cardClassName = `why-card group relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-3xl p-8 shadow-[var(--shadow-card)] motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-safe:hover:-translate-y-1 motion-safe:focus-within:-translate-y-1 hover:shadow-[var(--shadow-lift)] focus-within:shadow-[var(--shadow-lift)] ${cardTone}`;

              return (
                <Reveal
                  key={point.title}
                  delay={index * 80}
                  variant="scale"
                  scaleFrom={0.94}
                  className={`overflow-visible ${cardPlacements[index]}`}
                >
                  {lightCard ? (
                    <SpotlightCard className={cardClassName} contentClassName="flex h-full flex-col">
                      {cardContent}
                    </SpotlightCard>
                  ) : (
                    <div className={cardClassName}>{cardContent}</div>
                  )}
                </Reveal>
              );
          })}
        </dl>
      </Container>
    </Section>
  );
}
