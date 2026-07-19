import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { ShieldCheck, MapPin, TrendingUp, Bell, Phone, MessageSquareWarning, HeartHandshake, LogIn, Home } from "lucide-react";

export const Route = createFileRoute("/public")({
  component: PublicLayout,
});

const nav = [
  { to: "/public",           label: "Home",              icon: Home,                  exact: true },
  { to: "/public/heatmap",   label: "Safety Heatmap",    icon: MapPin },
  { to: "/public/trends",    label: "Local Trends",      icon: TrendingUp },
  { to: "/public/alerts",    label: "Safety Alerts",     icon: Bell },
  { to: "/public/emergency", label: "Emergency",         icon: Phone },
  { to: "/public/report",    label: "Report Anonymously",icon: MessageSquareWarning },
  { to: "/public/safety",    label: "Safety Tips",       icon: HeartHandshake },
] as const;

function PublicLayout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <Link to="/public" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold">SentinelIQ · Public Portal</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Karnataka State Police
              </div>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent"
          >
            <LogIn className="h-3.5 w-3.5" /> Officer sign in
          </Link>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {n.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-background/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Karnataka State Police · Public information portal.
        No sensitive or investigation data is displayed here.
      </footer>
    </div>
  );
}
