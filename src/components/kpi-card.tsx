import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string | number;
  delta?: number; // percent change
  icon: LucideIcon;
  tone?: "default" | "success" | "warning" | "destructive" | "info";
  hint?: string;
};

const toneMap = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning",
  destructive: "bg-destructive/10 text-destructive",
  info: "bg-info/10 text-info",
};

export function KpiCard({ label, value, delta, icon: Icon, tone = "default", hint }: Props) {
  const positive = (delta ?? 0) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", toneMap[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {typeof delta === "number" && (
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-semibold",
              positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta).toFixed(1)}%
          </span>
          <span className="text-muted-foreground">vs last period</span>
        </div>
      )}
    </motion.div>
  );
}
