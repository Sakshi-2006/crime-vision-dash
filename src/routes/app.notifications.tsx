import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notifications } from "@/lib/mock-data";
import { AlertCircle, Info, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/notifications")({
  component: NotificationsPage,
});

const kindMap = {
  critical: { class: "bg-destructive/10 text-destructive", icon: AlertCircle },
  info: { class: "bg-info/10 text-info", icon: Info },
  success: { class: "bg-success/10 text-success", icon: CheckCircle2 },
} as const;

function NotificationsPage() {
  return (
    <div className="mx-auto max-w-[900px] space-y-6">
      <PageHeader
        title="Notifications"
        subtitle="System, prediction, and alert notifications in one place."
        actions={<Button size="sm" variant="outline">Mark all as read</Button>}
      />

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {notifications.map((n) => {
              const k = kindMap[n.kind];
              const Icon = k.icon;
              return (
                <div key={n.id} className={cn("flex items-start gap-3 p-4", !n.read && "bg-muted/30")}>
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", k.class)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{n.title}</span>
                      <span className="text-xs text-muted-foreground">{n.time} ago</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                  </div>
                  {!n.read && <Badge className="bg-info text-info-foreground">New</Badge>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
