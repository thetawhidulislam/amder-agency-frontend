import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "ink";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "h-12 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export function publicButtonClass({ variant = "primary", size = "md" }: { variant?: Variant; size?: Size } = {}) {
  return cn(
    buttonClass({ variant, size }),
    "public-button rounded-xl",
    sizes[size],
    variant === "primary" &&
      "shadow-[0_10px_24px_-10px_rgb(225_29_39_/_0.5)] hover:bg-brand-dark",
    variant === "outline" && "border border-[rgb(11_11_11_/_0.15)] bg-white text-ink hover:border-ink"
  );
}
