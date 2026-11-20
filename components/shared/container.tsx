import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

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
}: {
  title: string;
  intro?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div className={cn("max-w-2xl", className)}>
      <Reveal>
        <div>
          <span aria-hidden="true" className="section-heading-bar mb-6 block h-1 w-12 bg-brand" />
          <Heading
            className={cn(
              "font-display font-semibold tracking-tight text-balance",
              as === "h2" ? "text-[clamp(2.25rem,5vw,4rem)]" : "text-3xl sm:text-5xl"
            )}
          >
            {title}
          </Heading>
          {intro ? <p className="mt-4 text-lg text-muted">{intro}</p> : null}
        </div>
      </Reveal>
    </div>
  );
}
