import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Sparkles, ShieldCheck, CalendarRange } from "lucide-react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export const Route = createFileRoute("/app/assistant")({
  component: AssistantPage,
});

type Chart =
  | { kind: "yearTrend"; years: number[] }
  | { kind: "categoryYoY"; from: number; to: number }
  | { kind: "districtYears"; years: number[] };

type Msg = { role: "user" | "ai"; text: string; chart?: Chart };

const AVAILABLE_YEARS = [2021, 2022, 2023, 2024, 2025] as const;

// Deterministic yearly mock data for Karnataka
const YEARLY_TOTALS: Record<number, number> = {
  2021: 18420, 2022: 19980, 2023: 21540, 2024: 23110, 2025: 24680,
};
const CATEGORIES = ["Theft", "Assault", "Fraud", "Vandalism", "Cybercrime", "Narcotics"] as const;
const CATEGORY_BY_YEAR: Record<number, Record<(typeof CATEGORIES)[number], number>> = {
  2021: { Theft: 6200, Assault: 3100, Fraud: 2100, Vandalism: 2400, Cybercrime: 2600, Narcotics: 2020 },
  2022: { Theft: 6580, Assault: 3220, Fraud: 2480, Vandalism: 2380, Cybercrime: 3120, Narcotics: 2200 },
  2023: { Theft: 6890, Assault: 3310, Fraud: 2860, Vandalism: 2300, Cybercrime: 3820, Narcotics: 2360 },
  2024: { Theft: 7120, Assault: 3395, Fraud: 3310, Vandalism: 2210, Cybercrime: 4620, Narcotics: 2455 },
  2025: { Theft: 7380, Assault: 3480, Fraud: 3810, Vandalism: 2140, Cybercrime: 5330, Narcotics: 2540 },
};
const DISTRICTS = ["Bengaluru Urban", "Mysuru", "Mangaluru", "Hubballi-Dharwad", "Belagavi"] as const;
const DISTRICT_BY_YEAR: Record<number, Record<(typeof DISTRICTS)[number], number>> = {
  2021: { "Bengaluru Urban": 6800, "Mysuru": 2100, "Mangaluru": 1800, "Hubballi-Dharwad": 1600, "Belagavi": 1500 },
  2022: { "Bengaluru Urban": 7250, "Mysuru": 2240, "Mangaluru": 1880, "Hubballi-Dharwad": 1690, "Belagavi": 1580 },
  2023: { "Bengaluru Urban": 7810, "Mysuru": 2380, "Mangaluru": 1965, "Hubballi-Dharwad": 1780, "Belagavi": 1660 },
  2024: { "Bengaluru Urban": 8420, "Mysuru": 2510, "Mangaluru": 2050, "Hubballi-Dharwad": 1870, "Belagavi": 1740 },
  2025: { "Bengaluru Urban": 9080, "Mysuru": 2650, "Mangaluru": 2140, "Hubballi-Dharwad": 1965, "Belagavi": 1830 },
};

const SEED: Msg[] = [
  { role: "ai", text: "Namaskara, Commander. I'm SentinelIQ Assistant. Pick a **year** or **year range** above, then ask about year-over-year trends, category shifts, or district comparisons across Karnataka." },
];

const SUGGESTED_MONTH = [
  "Show theft hotspots this week",
  "Which districts need more patrol coverage?",
  "Predict next week's risk in Bengaluru Urban",
];
const SUGGESTED_YEAR = [
  "Compare crime statistics between 2022 and 2025",
  "Show year-over-year crime trends",
  "Which crime category increased the most from 2023 to 2024?",
  "Compare district-wise crime rates across years",
];

const MONTH_CANNED: Record<string, string> = {
  theft: "Theft hotspots this week concentrate in **Bengaluru Urban – Whitefield** (38%) and **Mysuru – Devaraja Market** (22%). Peak window 8–11 PM. Recommend +12 officers on evening patrol.",
  predict: "Next-week forecast: **Bengaluru Urban** risk climbs 74 → 82. Drivers: repeat-offender cluster + festival window. 92% model confidence.",
  patrol: "Coverage gaps: Bengaluru Urban (risk 88), Mysuru (82), Mangaluru (74). Suggest reallocating 15 officers from lower-risk Kodagu and Chikkamagaluru.",
};

function pickYearsFromQuery(q: string, fallback: number[]): number[] {
  const found = Array.from(q.matchAll(/\b(20\d{2})\b/g)).map((m) => Number(m[1]));
  const valid = found.filter((y) => (AVAILABLE_YEARS as readonly number[]).includes(y));
  return valid.length ? Array.from(new Set(valid)).sort() : fallback;
}

function yearReply(q: string, selectedYears: number[]): Msg {
  const k = q.toLowerCase();
  const years = pickYearsFromQuery(q, selectedYears);

  if (k.includes("category") || k.includes("increased") || k.includes("most")) {
    const [from, to] = years.length >= 2 ? [years[0], years[years.length - 1]] : [2023, 2024];
    const deltas = CATEGORIES.map((c) => ({
      c,
      pct: ((CATEGORY_BY_YEAR[to][c] - CATEGORY_BY_YEAR[from][c]) / CATEGORY_BY_YEAR[from][c]) * 100,
    })).sort((a, b) => b.pct - a.pct);
    const top = deltas[0];
    return {
      role: "ai",
      text: `Between **${from}** and **${to}**, **${top.c}** grew the most: **+${top.pct.toFixed(1)}%**. Runner-up: **${deltas[1].c}** (+${deltas[1].pct.toFixed(1)}%). Declining: **${deltas[deltas.length - 1].c}** (${deltas[deltas.length - 1].pct.toFixed(1)}%).`,
      chart: { kind: "categoryYoY", from, to },
    };
  }

  if (k.includes("district")) {
    return {
      role: "ai",
      text: `District-wise totals across **${years.join(", ")}** for Karnataka's top 5 districts. Bengaluru Urban continues to dominate volume (~35% of state), with steady 7–8% YoY growth.`,
      chart: { kind: "districtYears", years },
    };
  }

  if (k.includes("compare") || years.length >= 2 || k.includes("year") || k.includes("trend") || k.includes("annual")) {
    const first = years[0], last = years[years.length - 1];
    const delta = ((YEARLY_TOTALS[last] - YEARLY_TOTALS[first]) / YEARLY_TOTALS[first]) * 100;
    return {
      role: "ai",
      text: `**Karnataka statewide totals** — ${years.map((y) => `${y}: ${YEARLY_TOTALS[y].toLocaleString()}`).join(" · ")}. Change from **${first} → ${last}**: **${delta >= 0 ? "+" : ""}${delta.toFixed(1)}%**. Cybercrime is the fastest-growing category; vandalism is the only declining one.`,
      chart: { kind: "yearTrend", years },
    };
  }

  return {
    role: "ai",
    text: "Try: *Compare 2022 vs 2025*, *year-over-year trends*, *which category grew most from 2023 to 2024*, or *district-wise crime across years*.",
  };
}

function monthReply(q: string): Msg {
  const k = q.toLowerCase();
  for (const key of Object.keys(MONTH_CANNED)) if (k.includes(key)) return { role: "ai", text: MONTH_CANNED[key] };
  return { role: "ai", text: "In monthly mode, try **theft** hotspots, **predict** next week, or **patrol** coverage. Switch to **Yearly** for annual comparisons." };
}

function AssistantPage() {
  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [mode, setMode] = useState<"monthly" | "yearly">("yearly");
  const [primaryYear, setPrimaryYear] = useState<number>(2025);
  const [compareYear, setCompareYear] = useState<number>(2022);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const selectedYears = useMemo(() => {
    const set = new Set<number>([primaryYear, compareYear]);
    return Array.from(set).sort();
  }, [primaryYear, compareYear]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const resp = mode === "yearly" ? yearReply(text, selectedYears) : monthReply(text);
      setMessages((m) => [...m, resp]);
      setTyping(false);
    }, 650);
  };

  const suggested = mode === "yearly" ? SUGGESTED_YEAR : SUGGESTED_MONTH;

  return (
    <div className="mx-auto max-w-[1000px] space-y-6">
      <PageHeader
        title="AI Assistant"
        subtitle="Natural-language querying of Karnataka crime intelligence — monthly or year-over-year."
        actions={<Badge variant="outline"><Sparkles className="mr-1 h-3 w-3" /> Model v4.2</Badge>}
      />

      {/* Year / mode controls */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <CalendarRange className="h-4 w-4 text-muted-foreground" />
            <ToggleGroup
              type="single"
              value={mode}
              onValueChange={(v) => v && setMode(v as "monthly" | "yearly")}
              className="border border-border rounded-md"
            >
              <ToggleGroupItem value="monthly" className="px-3 text-xs">Monthly</ToggleGroupItem>
              <ToggleGroupItem value="yearly" className="px-3 text-xs">Yearly</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Year</span>
              <Select value={String(primaryYear)} onValueChange={(v) => setPrimaryYear(Number(v))}>
                <SelectTrigger className="h-9 w-[110px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {AVAILABLE_YEARS.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Compare to</span>
              <Select value={String(compareYear)} onValueChange={(v) => setCompareYear(Number(v))}>
                <SelectTrigger className="h-9 w-[110px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {AVAILABLE_YEARS.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Badge variant="secondary" className="text-[10px]">
              Active: {selectedYears.join(" vs ")}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="flex h-[65vh] flex-col overflow-hidden">
        <CardContent className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
          {messages.map((m, i) => <Bubble key={i} m={m} />)}
          {typing && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary text-primary-foreground"><ShieldCheck className="h-4 w-4" /></AvatarFallback></Avatar>
              <span className="inline-flex gap-1">
                <Dot /><Dot delay={0.15} /><Dot delay={0.3} />
              </span>
            </div>
          )}
          <div ref={endRef} />
        </CardContent>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggested.map((s) => (
              <Badge key={s} variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => send(s)}>
                {s}
              </Badge>
            ))}
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "yearly" ? "Ask about year-over-year trends…" : "Ask SentinelIQ anything…"}
              className="h-11"
            />
            <Button type="submit" className="h-11" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

function Bubble({ m }: { m: Msg }) {
  const isUser = m.role === "user";
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-8 w-8">
        <AvatarFallback className={isUser ? "bg-muted" : "bg-primary text-primary-foreground"}>
          {isUser ? "U" : <ShieldCheck className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className={`max-w-[80%] space-y-3 ${isUser ? "items-end" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
          dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") }}
        />
        {m.chart && <ChartBlock chart={m.chart} />}
      </div>
    </motion.div>
  );
}

function ChartBlock({ chart }: { chart: Chart }) {
  if (chart.kind === "yearTrend") {
    const data = chart.years.map((y) => ({ year: String(y), total: YEARLY_TOTALS[y] }));
    return (
      <div className="rounded-xl border border-border bg-card p-3">
        <div className="mb-1 text-xs font-semibold">Yearly totals — Karnataka</div>
        <div className="h-56">
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="year" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="var(--color-primary)" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  if (chart.kind === "categoryYoY") {
    const data = CATEGORIES.map((c) => ({
      category: c,
      [chart.from]: CATEGORY_BY_YEAR[chart.from][c],
      [chart.to]: CATEGORY_BY_YEAR[chart.to][c],
    }));
    return (
      <div className="rounded-xl border border-border bg-card p-3">
        <div className="mb-1 text-xs font-semibold">Category comparison — {chart.from} vs {chart.to}</div>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="category" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Legend />
              <Bar dataKey={chart.from} fill="var(--color-chart-3)" />
              <Bar dataKey={chart.to} fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  // districtYears
  const data = DISTRICTS.map((d) => {
    const row: Record<string, string | number> = { district: d };
    chart.years.forEach((y) => (row[y] = DISTRICT_BY_YEAR[y][d]));
    return row;
  });
  const palette = ["var(--color-primary)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-chart-2)"];
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="mb-1 text-xs font-semibold">District-wise totals — {chart.years.join(", ")}</div>
      <div className="h-64">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="district" fontSize={10} />
            <YAxis fontSize={11} />
            <Tooltip />
            <Legend />
            {chart.years.map((y, i) => (
              <Bar key={y} dataKey={String(y)} fill={palette[i % palette.length]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground"
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}
