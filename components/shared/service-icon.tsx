import { Code, LayoutTemplate, Megaphone, Palette, Search, Sparkles, Video, type LucideProps } from "lucide-react";

const icons = {
  megaphone: Megaphone,
  palette: Palette,
  video: Video,
  code: Code,
  search: Search,
  layout: LayoutTemplate,
};

export const serviceIconNames = Object.keys(icons);

export function ServiceIcon({ name, ...props }: { name?: string | null } & Omit<LucideProps, "name">) {
  const Icon = (name && icons[name as keyof typeof icons]) || Sparkles;
  return <Icon aria-hidden {...props} />;
}
