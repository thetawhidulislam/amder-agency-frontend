import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { SectionChip } from "@/components/shared/section-chip";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)} {...props} />;
}

export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-20 sm:py-28 lg:py-32", className)} {...props} />;
}

export function SectionHeading({
  title,
  intro,
  className,
  as = "h2",
  align = "left",
  chip,
  chipTone = "default",
  splitTitle = false,
}: {
  title: string;
  intro?: string;
  className?: string;
  as?: "h1" | "h2";
  align?: "center" | "left";
  chip?: string;
  chipTone?: "default" | "dark";
  splitTitle?: boolean;
}) {
  const Heading = as;
  const headingClassName = cn(
    "font-display font-semibold leading-[1.05] tracking-tight text-balance",
    as === "h2" ? "text-[clamp(2.25rem,5vw,4rem)]" : "text-[clamp(2.75rem,6vw,5.5rem)]"
  );
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <div>
          {chip ? <SectionChip tone={chipTone} className="mb-5">{chip}</SectionChip> : null}
          {splitTitle ? (
            <SplitHeading as={as} text={title} className={headingClassName} />
          ) : (
            <Heading className={headingClassName}>{title}</Heading>
          )}
          {intro ? (
            <p className={cn("mt-4 text-lg text-muted", align === "center" && "mx-auto max-w-2xl")}>
              {intro}
            </p>
          ) : null}
        </div>
      </Reveal>
    </div>
  );
}
