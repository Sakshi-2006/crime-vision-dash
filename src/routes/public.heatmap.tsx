import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { publicLocalitySafety, KARNATAKA_CENTER } from "@/lib/mock-data";
import { MapPin, ShieldCheck, AlertTriangle } from "lucide-react";

const LazyMap = lazy(() => import("@/components/crime-map"));

export const Route = createFileRoute("/public/heatmap")({
  component: HeatmapPage,
});

function levelStyle(level: "safe" | "moderate" | "caution") {
  if (level === "safe")    return { badge: "bg-success text-success-foreground", label: "Safe" };
  if (level === "caution") return { badge: "bg-destructive text-destructive-foreground", label: "Caution" };
  return { badge: "bg-warning text-warning-foreground", label: "Moderate" };
}

function HeatmapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Karnataka Safety Heatmap</h1>
        <p className="text-sm text-muted-foreground">
          Aggregated, anonymised density of reported incidents. No individual case details are shown.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="overflow-hidden">
          <div className="h-[520px] w-full">
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <LazyMap layer="heatmap" center={KARNATAKA_CENTER} zoom={7} />
            </Suspense>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><MapPin className="h-4 w-4" /> Legend</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <LegendRow color="bg-success" label="Safe" />
              <LegendRow color="bg-warning" label="Moderate caution" />
              <LegendRow color="bg-destructive" label="Higher caution" />
              <p className="pt-2 text-xs text-muted-foreground">
                Colours reflect aggregated public-safety scores over the last 30 days.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Locality scores</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              {publicLocalitySafety.map((l) => {
                const s = levelStyle(l.level);
                return (
                  <div key={l.locality} className="flex items-center justify-between">
                    <div>
                      <div className="text-foreground">{l.locality}</div>
                      <div className="text-xs text-muted-foreground">Score {l.score}/100</div>
                    </div>
                    <Badge className={s.badge}>{s.label}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <div className="flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-xs text-warning-foreground">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              This map is informational. In an emergency dial <b>100</b> or <b>112</b>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-3 w-6 rounded ${color}`} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
