import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

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
  accent = false,
}: {
  title: string;
  intro?: string;
  className?: string;
  as?: "h1" | "h2";
  accent?: boolean;
}) {
  const Heading = as;
  return (
    <div className={cn("max-w-2xl", className)}>
      <Heading
        className={cn(
          "font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl",
          accent && "before:mb-6 before:block before:h-1 before:w-12 before:bg-brand"
        )}
      >
        {title}
      </Heading>
      {intro ? <p className="mt-4 text-lg text-muted">{intro}</p> : null}
    </div>
  );
}
