import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, Filter } from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend,
  Line, LineChart, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { crimeByType, crimeTrend, districts } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/analytics")({
  component: AnalyticsPage,
});

const CHART_COLORS = ["#1f2a55", "#2aa7b8", "#7c8ba8", "#e08c3b", "#3aa872"];
const tt = { backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 };

function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <PageHeader
        title="Crime Analytics"
        subtitle="Deep-dive analytics across time, districts, and crime categories."
        actions={
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        }
      />

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Filter className="h-4 w-4" /> Filters
          </div>
          <FilterSelect label="Date range" options={["Last 7 days", "Last 30 days", "Last 90 days", "Year to date"]} />
          <FilterSelect label="District" options={["All districts", ...districts.map((d) => d.name)]} />
          <FilterSelect label="Crime type" options={["All types", ...crimeByType.map((c) => c.type)]} />
          <FilterSelect label="Status" options={["All", "Open", "Investigating", "Solved", "Closed"]} />
          <Button size="sm" variant="ghost" className="ml-auto">Reset</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Time Series — Reported Crimes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={crimeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={tt} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="crimes" stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="solved" stroke={CHART_COLORS[1]} strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={crimeByType} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="type" type="category" tick={{ fontSize: 12 }} width={90} />
                <Tooltip contentStyle={tt} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {crimeByType.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>District Comparison — Risk Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={districts}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis tick={{ fontSize: 10 }} />
                <Radar name="Risk" dataKey="risk" stroke={CHART_COLORS[1]} fill={CHART_COLORS[1]} fillOpacity={0.35} />
                <Tooltip contentStyle={tt} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Solved-Case Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={crimeTrend.map((d) => ({ ...d, rate: Math.round((d.solved / d.crimes) * 100) }))}>
                <defs>
                  <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART_COLORS[4]} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={CHART_COLORS[4]} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis unit="%" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={tt} />
                <Area type="monotone" dataKey="rate" stroke={CHART_COLORS[4]} fill="url(#ga)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Monthly Report Snapshot</CardTitle>
          <Badge variant="outline"><Calendar className="mr-1 h-3 w-3" /> November 2024</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { k: "2,107", v: "Total incidents" },
              { k: "1,421", v: "Cases solved" },
              { k: "67.4%", v: "Clearance rate" },
              { k: "1.6d", v: "Median response" },
            ].map((s) => (
              <div key={s.v} className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="text-2xl font-bold">{s.k}</div>
                <div className="text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FilterSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <Select defaultValue={options[0]}>
      <SelectTrigger className="h-9 w-[170px]">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
