import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function SectionChip({
  children,
  className,
  tone = "default",
  ...props
}: ComponentProps<"span"> & { tone?: "default" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        tone === "dark"
          ? "border-brand/30 bg-brand/15 text-white"
          : "border-brand/30 bg-brand/10 text-brand-dark",
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand" />
      {children}
    </span>
  );
}
