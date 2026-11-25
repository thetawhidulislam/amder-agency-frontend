import type {
  PageMeta,
  PortfolioDetail,
  PortfolioListItem,
  Service,
  ServiceDetail,
  Settings,
  TeamMember,
  TeamMemberDetail,
} from "./types";

const BASE = `${process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/v1`;

/**
 * Server-side GET with ISR caching. Tags let the backend refresh pages
 * (via /api/revalidate) the moment an admin edits something.
 * Never throws: if the API is down the page renders with empty data.
 */
async function get<T>(path: string, tags: string[], revalidate = 3600): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { tags, revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

const emptySettings: Settings = {
  phone: null,
  email: null,
  whatsapp: null,
  address: null,
  businessHours: null,
  socials: null,
};

export async function getServices() {
  const res = await get<{ data: Service[] }>("/services", ["services"]);
  return res?.data ?? [];
}

export async function getTeam(params: { home?: boolean; limit?: number } = {}) {
  const qs = new URLSearchParams();
  if (params.home !== undefined) qs.set("home", String(params.home));
  if (params.limit !== undefined) qs.set("limit", String(params.limit));

  const query = qs.toString();
  const res = await get<{ data: TeamMember[] }>(`/team${query ? `?${query}` : ""}`, ["team"]);
  return res?.data ?? [];
}

export async function getTeamMember(slug: string) {
  const res = await get<{ data: TeamMemberDetail }>(`/team/${encodeURIComponent(slug)}`, ["team"]);
  return res?.data ?? null;
}

export async function getService(slug: string) {
  const res = await get<{ data: ServiceDetail }>(`/services/${slug}`, ["services", "portfolio"]);
  return res?.data ?? null;
}

export async function getPortfolio(params: {
  service?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
} = {}) {
  const qs = new URLSearchParams();
  if (params.service) qs.set("service", params.service);
  if (params.featured !== undefined) qs.set("featured", String(params.featured));
  qs.set("page", String(params.page ?? 1));
  qs.set("limit", String(params.limit ?? 12));

  const res = await get<{ items: PortfolioListItem[]; meta: PageMeta }>(
    `/portfolio?${qs.toString()}`,
    ["portfolio"]
  );
  return res ?? { items: [], meta: { page: 1, limit: params.limit ?? 12, total: 0, totalPages: 1 } };
}

export async function getPortfolioItem(slug: string) {
  const res = await get<{ data: PortfolioDetail }>(`/portfolio/${slug}`, ["portfolio"]);
  return res?.data ?? null;
}

export async function getSettings() {
  const res = await get<{ data: Settings }>("/settings", ["settings"]);
  return res?.data ?? emptySettings;
}
