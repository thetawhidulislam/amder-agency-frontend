export interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string | null;
  shortDesc: string;
  features: string[];
  order: number;
}

export interface PortfolioSummary {
  id: string;
  title: string;
  slug: string;
  cover: string;
  client: string | null;
  tags: string[];
}

export interface PortfolioListItem extends PortfolioSummary {
  featured: boolean;
  service: { title: string; slug: string };
}

export interface ServiceDetail extends Service {
  description: string;
  metaTitle: string | null;
  metaDescription: string | null;
  portfolio: PortfolioSummary[];
}

export interface PortfolioDetail {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  cover: string;
  gallery: string[];
  videoUrl: string | null;
  description: string;
  tags: string[];
  service: { id: string; title: string; slug: string };
}

export interface Settings {
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  address: string | null;
  businessHours: string | null;
  socials: Record<string, string> | null;
}

export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/* ---------- admin ---------- */

export interface AdminService {
  id: string;
  title: string;
  slug: string;
  icon: string | null;
  shortDesc: string;
  description: string;
  features: string[];
  order: number;
  isActive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  _count?: { portfolio: number; leads: number };
}

export interface AdminPortfolioItem {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  cover: string;
  gallery: string[];
  videoUrl: string | null;
  description: string;
  tags: string[];
  featured: boolean;
  isActive: boolean;
  order: number;
  serviceId: string;
  service: { id: string; title: string };
}

export type LeadStatus = "NEW" | "CONTACTED" | "CLOSED";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  budget: string | null;
  message: string;
  status: LeadStatus;
  source: string | null;
  createdAt: string;
  service: { id: string; title: string } | null;
}

export interface LeadStats {
  NEW: number;
  CONTACTED: number;
  CLOSED: number;
  total: number;
}
