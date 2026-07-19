import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Bell, Phone, MessageSquareWarning, HeartHandshake, ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/public/")({
  component: PublicHome,
});

const tiles = [
  { to: "/public/heatmap",   icon: MapPin,                title: "Safety Heatmap",     desc: "See safe & high-caution areas across Karnataka. Aggregated data only." },
  { to: "/public/trends",    icon: TrendingUp,            title: "Local Trends",       desc: "Recent crime trends by locality — theft, harassment, traffic incidents." },
  { to: "/public/alerts",    icon: Bell,                  title: "Safety Alerts",      desc: "Live public advisories and area cautions from Karnataka Police." },
  { to: "/public/emergency", icon: Phone,                 title: "Emergency Contacts", desc: "Dial-100, women, child, cyber, ambulance and control-room numbers." },
  { to: "/public/report",    icon: MessageSquareWarning,  title: "Report Anonymously", desc: "Share tips without revealing your identity. Every detail matters." },
  { to: "/public/safety",    icon: HeartHandshake,        title: "Personal Safety",    desc: "Practical tips to keep you, your family and property safer." },
];

function PublicHome() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground md:p-12">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(800px 400px at 20% 0%, oklch(0.66 0.11 200 / 0.4), transparent 60%)",
          }}
        />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
            <ShieldCheck className="h-3 w-3" /> Karnataka State Police
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Public Safety Portal for the people of Karnataka.
          </h1>
          <p className="mt-3 text-sm text-primary-foreground/75 md:text-base">
            Aggregated, anonymised information to help you stay informed and safe.
            No suspect names, investigation details, or sensitive case data are shown.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild size="lg" className="bg-info text-info-foreground hover:bg-info/90">
              <Link to="/public/heatmap">View Safety Heatmap <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/public/emergency">Emergency Contacts</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <Link key={t.to} to={t.to} className="group">
              <Card className="h-full transition group-hover:-translate-y-0.5 group-hover:border-primary group-hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{t.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{t.desc}</CardContent>
              </Card>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
