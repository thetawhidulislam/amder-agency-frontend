import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPortfolio, getServices, getTeam } from "@/lib/api-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, portfolio, team] = await Promise.all([
    getServices(),
    getPortfolio({ limit: 100 }),
    getTeam(),
  ]);
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    ...["", "/services", "/portfolio", "/about", "/contact"].map((p) => ({ url: url(p) })),
    ...services.map((s) => ({ url: url(`/services/${s.slug}`) })),
    ...portfolio.items.map((p) => ({ url: url(`/portfolio/${p.slug}`) })),
    ...team.filter((member) => member.slug).map((member) => ({ url: url(`/team/${member.slug}`) })),
  ];
}
