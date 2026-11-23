"use client";

import { useQuery } from "@tanstack/react-query";
import { Briefcase, Images, Inbox, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/portfolio", label: "Portfolio", icon: Images },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const me = useQuery({
    queryKey: ["admin", "me"],
    queryFn: async () => (await api.get<{ data: { name: string; email: string } }>("/auth/me")).data.data,
  });

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  async function logout() {
    await api.post("/auth/logout").catch(() => null);
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="theme-dark border-b border-line bg-page text-fg md:w-60 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-5 py-4 md:block">
          <Link href="/admin" className="font-display text-lg font-bold tracking-tight">
            Amader Admin
          </Link>
          {me.data ? <p className="hidden pt-1 text-xs text-muted md:block">{me.data.email}</p> : null}
          <Button variant="ghost" size="sm" onClick={logout} className="md:hidden" aria-label="Log out">
            <LogOut className="size-4" />
          </Button>
        </div>

        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:px-3 md:pb-0">
          {items.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-sm px-3 py-2 text-sm",
                isActive(href) ? "bg-brand font-medium text-white" : "hover:bg-white/10"
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden p-3 md:block">
          <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start">
            <LogOut className="size-4" />
            Log out
          </Button>
          <Link href="/" target="_blank" className="mt-1 block px-4 py-2 text-xs text-muted hover:text-white">
            View website
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1 bg-page p-5 text-fg sm:p-8">{children}</main>
    </div>
  );
}
