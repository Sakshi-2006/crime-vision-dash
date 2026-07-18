import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Suspense, lazy, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Layers, Clock, ZoomIn } from "lucide-react";

const LazyMap = lazy(() => import("@/components/crime-map"));

export const Route = createFileRoute("/_app/map")({
  component: MapPage,
});

function MapPage() {
  const [layer, setLayer] = useState<"heatmap" | "markers" | "clusters">("heatmap");
  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <PageHeader
        title="Interactive Crime Map"
        subtitle="Live spatial view of incidents, districts, and hotspots."
        actions={
          <>
            <Button size="sm" variant={layer === "heatmap" ? "default" : "outline"} onClick={() => setLayer("heatmap")}>Heatmap</Button>
            <Button size="sm" variant={layer === "markers" ? "default" : "outline"} onClick={() => setLayer("markers")}>Markers</Button>
            <Button size="sm" variant={layer === "clusters" ? "default" : "outline"} onClick={() => setLayer("clusters")}>Clusters</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="overflow-hidden">
          <div className="h-[560px] w-full">
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <LazyMap layer={layer} />
            </Suspense>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Layers className="h-4 w-4" /> Legend</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <LegendRow color="bg-destructive" label="Critical density" />
              <LegendRow color="bg-warning" label="High density" />
              <LegendRow color="bg-info" label="Medium density" />
              <LegendRow color="bg-success" label="Low density" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Clock className="h-4 w-4" /> Time filter</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["24h", "7d", "30d", "90d", "YTD"].map((t, i) => (
                <Badge key={t} variant={i === 1 ? "default" : "outline"} className="cursor-pointer">{t}</Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><ZoomIn className="h-4 w-4" /> Crime density</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                {[
                  { name: "Eastfield · Sector 4", pct: 92 },
                  { name: "Central · Market St", pct: 78 },
                  { name: "Southbay · Docks", pct: 65 },
                  { name: "Harborline · Node 7", pct: 48 },
                ].map((d) => (
                  <div key={d.name}>
                    <div className="mb-1 flex justify-between">
                      <span className="text-foreground">{d.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{d.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-gradient-to-r from-info to-destructive" style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
