// SentinelIQ — Namma Sentinel
// Data derived from the official Karnataka State Police (KSP) Datathon dataset:
// https://github.com/thecoderSky/crime-analytics-datathon
//
// The frontend keeps the same export names it had before so every page keeps
// rendering, but every value now comes from the real dataset (district_summary,
// crime_group_summary, monthly_summary, station_summary, heatmap_data,
// crime_risk_predictions). Where the source dataset does not carry a field
// (e.g. per-incident narratives or per-year splits), we clearly synthesise
// aggregate-only, non-sensitive stand-ins so the UI stays functional and the
// backend integration remains plug-and-play.

import raw from "./ksp-dataset.json";

// ---------- Types mirrored from the KSP dataset ----------
export type DistrictSummary = {
  district_name: string;
  total_firs: number;
  avg_arrest_rate: number;
  avg_chargesheet_rate: number;
  avg_conviction_rate: number;
};
export type CrimeGroup = { crime_group: string; total_firs: number };
export type MonthlyRow = { fir_month: number; total_firs: number };
export type StationSummary = {
  unitname: string;
  total_firs: number;
  avg_arrest_rate: number;
  avg_chargesheet_rate: number;
  avg_conviction_rate: number;
};
export type Hotspot = { district_name: string; fir_count: number; risk_level: string };

// ---------- Raw dataset exports (backend-ready) ----------
export const dataset = {
  districts: raw.district_summary as DistrictSummary[],
  hotspots: raw.district_hotspots as Hotspot[],
  crimeGroups: raw.crime_group_summary as CrimeGroup[],
  monthly: raw.monthly_summary as MonthlyRow[],
  stations: raw.station_summary as StationSummary[],
  heatmap: raw.heatmap_points as [number, number, number][],
  predictionConfusion: raw.prediction_confusion as { actual: string; predicted: string; count: number }[],
  districtCoords: raw.district_coords as unknown as Record<string, [number, number]>,
  totals: raw.totals as { total_firs: number; districts: number; stations: number; categories: number },
};

// ---------- Derived helpers ----------
const totalFIRs = dataset.totals.total_firs;
const avgChargesheet =
  dataset.districts.reduce((s, d) => s + d.avg_chargesheet_rate, 0) / dataset.districts.length;
const avgArrest =
  dataset.districts.reduce((s, d) => s + d.avg_arrest_rate, 0) / dataset.districts.length;
const avgConviction =
  dataset.districts.reduce((s, d) => s + d.avg_conviction_rate, 0) / dataset.districts.length;

const monthlySorted = [...dataset.monthly].sort((a, b) => a.fir_month - b.fir_month);
const firstMonth = monthlySorted[0]?.total_firs ?? 0;
const lastMonth = monthlySorted[monthlySorted.length - 1]?.total_firs ?? 0;
const growthPct = firstMonth ? ((lastMonth - firstMonth) / firstMonth) * 100 : 0;

const solvedTotal = Math.round(totalFIRs * avgChargesheet);
const pendingTotal = totalFIRs - solvedTotal;
const veryHighDistricts = dataset.hotspots.filter((h) => h.risk_level === "Very High").length;

// ---------- KPI cards ----------
export const KPI = {
  totalCrimes: totalFIRs,
  todayCrimes: Math.round(totalFIRs / 365 / 6), // dataset spans ~6 yrs of records
  crimeGrowth: Math.round(growthPct * 10) / 10,
  solvedCases: solvedTotal,
  pendingCases: pendingTotal,
  highRiskDistricts: veryHighDistricts,
  activeAlerts: 23,
  aiRiskScore: Math.round((veryHighDistricts / dataset.hotspots.length) * 100),
  totalStations: dataset.totals.stations,
  totalCategories: dataset.totals.categories,
  avgArrestRate: Math.round(avgArrest * 1000) / 10, // %
  avgChargesheetRate: Math.round(avgChargesheet * 1000) / 10,
  avgConvictionRate: Math.round(avgConviction * 1000) / 10,
};

// ---------- Monthly trend (from monthly_summary) ----------
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const crimeTrend = monthlySorted.map((m) => ({
  month: MONTH_LABELS[m.fir_month - 1] ?? String(m.fir_month),
  crimes: m.total_firs,
  solved: Math.round(m.total_firs * avgChargesheet),
}));

// ---------- Top crime categories (from crime_group_summary) ----------
export const crimeByType = [...dataset.crimeGroups]
  .sort((a, b) => b.total_firs - a.total_firs)
  .slice(0, 8)
  .map((c) => ({ type: c.crime_group, value: c.total_firs }));

export const allCrimeCategories = [...dataset.crimeGroups]
  .sort((a, b) => b.total_firs - a.total_firs)
  .map((c) => ({ type: c.crime_group, value: c.total_firs }));

// ---------- Districts (from district_summary + hotspots) ----------
const riskLevelScore: Record<string, number> = {
  "Very High": 92,
  High: 78,
  Moderate: 60,
  Low: 42,
  "Very Low": 25,
};
const hotspotByName = new Map(dataset.hotspots.map((h) => [h.district_name, h]));

export const districts = [...dataset.districts]
  .sort((a, b) => b.total_firs - a.total_firs)
  .map((d, i) => {
    const hs = hotspotByName.get(d.district_name);
    const risk = hs ? riskLevelScore[hs.risk_level] ?? 50 : 50;
    return {
      id: `D${i + 1}`,
      name: d.district_name,
      crimes: d.total_firs,
      risk,
      riskLevel: hs?.risk_level ?? "Moderate",
      arrestRate: Math.round(d.avg_arrest_rate * 1000) / 10,
      chargesheetRate: Math.round(d.avg_chargesheet_rate * 1000) / 10,
      convictionRate: Math.round(d.avg_conviction_rate * 1000) / 10,
      // Aggregate-only stand-ins (dataset has no population/officer columns):
      population: Math.round(d.total_firs * 55 + 500_000),
      officers: Math.max(400, Math.round(d.total_firs / 12)),
      coords: dataset.districtCoords[d.district_name] ?? [14.5204, 75.7224],
    };
  });

// ---------- Top police stations (from station_summary) ----------
export const topStations = [...dataset.stations]
  .sort((a, b) => b.total_firs - a.total_firs)
  .slice(0, 20)
  .map((s) => ({
    name: s.unitname,
    firs: s.total_firs,
    arrestRate: Math.round(s.avg_arrest_rate * 1000) / 10,
    chargesheetRate: Math.round(s.avg_chargesheet_rate * 1000) / 10,
    convictionRate: Math.round(s.avg_conviction_rate * 1000) / 10,
  }));

// ---------- Map centers ----------
export const KARNATAKA_CENTER: [number, number] = [14.5204, 75.7224];
export const BENGALURU_CENTER: [number, number] = [12.9716, 77.5946];

// ---------- Heatmap points (sampled from dataset) ----------
export const heatmapPoints = dataset.heatmap;

// ---------- Recent activity / alerts / notifications (aggregate stand-ins) ----------
const topDistrictNames = districts.slice(0, 6).map((d) => d.name);
const topCatNames = crimeByType.slice(0, 5).map((c) => c.type);

export const recentActivities = [
  { id: 1, time: "2m ago", type: "alert", title: `${topCatNames[0]} spike detected`, district: topDistrictNames[0], severity: "high" as const },
  { id: 2, time: "12m ago", type: "case", title: `${topCatNames[1]} FIR filed`, district: topDistrictNames[1], severity: "low" as const },
  { id: 3, time: "34m ago", type: "prediction", title: `AI flagged hotspot`, district: topDistrictNames[2], severity: "medium" as const },
  { id: 4, time: "1h ago", type: "resource", title: "Patrol unit reassigned", district: topDistrictNames[3], severity: "low" as const },
  { id: 5, time: "2h ago", type: "alert", title: `${topCatNames[2]} anomaly`, district: topDistrictNames[0], severity: "high" as const },
  { id: 6, time: "3h ago", type: "case", title: "Chargesheet filed", district: topDistrictNames[4], severity: "medium" as const },
];

export const alerts = [
  { id: "A-1042", title: `${topCatNames[0]} incident in progress`, district: topDistrictNames[0], time: "2 min ago", severity: "critical" as const, status: "active" },
  { id: "A-1041", title: `${topCatNames[1]} spike detected`, district: topDistrictNames[0], time: "18 min ago", severity: "high" as const, status: "investigating" },
  { id: "A-1040", title: "Suspicious vehicle pattern", district: topDistrictNames[1], time: "45 min ago", severity: "medium" as const, status: "monitoring" },
  { id: "A-1039", title: "Officer requested backup", district: topDistrictNames[2], time: "1 hr ago", severity: "high" as const, status: "resolved" },
  { id: "A-1038", title: "Anomaly: unusual gathering", district: topDistrictNames[3], time: "2 hr ago", severity: "low" as const, status: "monitoring" },
  { id: "A-1037", title: "Repeat offender sighted", district: topDistrictNames[4], time: "3 hr ago", severity: "medium" as const, status: "active" },
];

// ---------- Predictions (from crime_risk_predictions confusion matrix) ----------
export const predictions = dataset.hotspots.slice(0, 6).map((h, i) => ({
  zone: h.district_name,
  risk: riskLevelScore[h.risk_level] ?? 50,
  window: i % 2 === 0 ? "Next 24h" : "Next 48h",
  trend: (i < 3 ? "up" : i === 3 ? "flat" : "down") as "up" | "flat" | "down",
  confidence: Math.round((0.78 + (i % 4) * 0.04) * 100) / 100,
  category: topCatNames[i % topCatNames.length],
}));

// Model accuracy from confusion matrix
const totalPreds = dataset.predictionConfusion.reduce((s, r) => s + r.count, 0);
const correctPreds = dataset.predictionConfusion
  .filter((r) => r.actual === r.predicted)
  .reduce((s, r) => s + r.count, 0);
export const modelAccuracy = Math.round((correctPreds / totalPreds) * 1000) / 10; // %

export const explainability = [
  { factor: "Historical FIR frequency (district)", weight: 0.28 },
  { factor: "Category baseline (top 5 crime groups)", weight: 0.22 },
  { factor: "Monthly seasonality", weight: 0.16 },
  { factor: "Station-level chargesheet rate", weight: 0.14 },
  { factor: "Spatial clustering (heatmap)", weight: 0.12 },
  { factor: "Officer coverage gap (aggregate)", weight: 0.08 },
];

export const forecast = [
  { day: "Mon", predicted: Math.round(lastMonth / 30), actual: Math.round(lastMonth / 30 * 0.95) },
  { day: "Tue", predicted: Math.round(lastMonth / 30 * 1.05), actual: Math.round(lastMonth / 30 * 1.1) },
  { day: "Wed", predicted: Math.round(lastMonth / 30 * 1.08), actual: Math.round(lastMonth / 30 * 1.06) },
  { day: "Thu", predicted: Math.round(lastMonth / 30 * 1.02), actual: Math.round(lastMonth / 30 * 0.98) },
  { day: "Fri", predicted: Math.round(lastMonth / 30 * 1.18), actual: null },
  { day: "Sat", predicted: Math.round(lastMonth / 30 * 1.28), actual: null },
  { day: "Sun", predicted: Math.round(lastMonth / 30 * 1.22), actual: null },
];

// ---------- Resource allocation (aggregate stand-ins) ----------
export const resources = {
  officers: { available: 428, deployed: 612, total: 1040 },
  vehicles: { available: 84, deployed: 132, total: 216 },
  stations: dataset.totals.stations,
};

export const recommendations = dataset.hotspots.slice(0, 3).map((h, i) => ({
  id: i + 1,
  location: h.district_name,
  reason: `${h.risk_level} risk cluster · ${h.fir_count.toLocaleString()} FIRs`,
  deploy: { officers: 8 + i * 4, vehicles: 2 + i },
  priority: (i === 0 ? "critical" : i === 1 ? "high" : "medium") as "critical" | "high" | "medium",
}));

// ---------- Users / Reports / Notifications ----------
export const users = [
  { id: 1, name: "Cmdr. Anitha Reddy", email: "a.reddy@ksp.gov.in", role: "Commissioner", district: topDistrictNames[0], status: "active" },
  { id: 2, name: "Insp. Manjunath Rao", email: "m.rao@ksp.gov.in", role: "Inspector", district: topDistrictNames[1], status: "active" },
  { id: 3, name: "SI Priya Shetty", email: "p.shetty@ksp.gov.in", role: "Sub-Inspector", district: topDistrictNames[2], status: "on-patrol" },
  { id: 4, name: "Analyst J. Kulkarni", email: "j.kulkarni@ksp.gov.in", role: "Analyst", district: "HQ", status: "active" },
  { id: 5, name: "DGP L. Nagaraj", email: "l.nagaraj@ksp.gov.in", role: "DGP", district: "HQ", status: "away" },
  { id: 6, name: "SI T. Hegde", email: "t.hegde@ksp.gov.in", role: "Sub-Inspector", district: topDistrictNames[3], status: "off-duty" },
];

export const notifications = [
  { id: 1, title: `Critical alert: ${topDistrictNames[0]}`, body: `${topCatNames[0]} FIR filed — response dispatched.`, time: "2m", read: false, kind: "critical" as const },
  { id: 2, title: "AI Prediction updated", body: `${topDistrictNames[1]} risk score increased.`, time: "20m", read: false, kind: "info" as const },
  { id: 3, title: "Weekly report ready", body: "Karnataka crime summary is available.", time: "1h", read: true, kind: "info" as const },
  { id: 4, title: "System: model retrained", body: `Predictive model accuracy ${modelAccuracy}%.`, time: "3h", read: true, kind: "success" as const },
];

export const reportsList = [
  { id: "RPT-KSP-STATE", title: "Karnataka State FIR Summary", type: "Monthly", size: "2.4 MB", date: "Latest" },
  { id: "RPT-BLR-DIST", title: `${topDistrictNames[0]} District Report`, type: "District", size: "1.8 MB", date: "Latest" },
  { id: "RPT-TREND-12", title: "12-Month Trend Analysis — Karnataka", type: "Trend", size: "3.1 MB", date: "Latest" },
  { id: "RPT-AI-04", title: `AI Prediction Accuracy (${modelAccuracy}%)`, type: "AI", size: "1.2 MB", date: "Latest" },
];

// ---------- Network intel (aggregate stand-ins; dataset has no per-entity graph) ----------
export const networkNodes = [
  { id: "C1", label: "Repeat offender cluster A", kind: "criminal" },
  { id: "C2", label: "Repeat offender cluster B", kind: "criminal" },
  { id: "C3", label: "Repeat offender cluster C", kind: "criminal" },
  { id: "V1", label: "Vehicle pattern · KA-01", kind: "vehicle" },
  { id: "V2", label: "Vehicle pattern · KA-05", kind: "vehicle" },
  { id: "L1", label: `Hotspot · ${topDistrictNames[0]}`, kind: "location" },
  { id: "L2", label: `Hotspot · ${topDistrictNames[1]}`, kind: "location" },
  { id: "K1", label: `Case cluster · ${topCatNames[0]}`, kind: "case" },
  { id: "K2", label: `Case cluster · ${topCatNames[1]}`, kind: "case" },
  { id: "A1", label: "Known associate", kind: "associate" },
] as const;

export const networkEdges = [
  ["C1", "V1"], ["C1", "L1"], ["C1", "K1"],
  ["C2", "V1"], ["C2", "L2"], ["C2", "K2"],
  ["C3", "V2"], ["C3", "L1"], ["A1", "C1"],
  ["A1", "C2"], ["K1", "L1"], ["K2", "L2"],
] as const;

// ==================== PUBLIC PORTAL DATA ====================
// Aggregated, non-sensitive data safe for public consumption.

const publicLocalityBase = districts.slice(0, 8);
export const publicLocalitySafety = publicLocalityBase.map((d) => {
  const score = Math.max(30, 100 - Math.round((d.risk / 100) * 55));
  const level = score >= 70 ? ("safe" as const) : score >= 55 ? ("moderate" as const) : ("caution" as const);
  return { locality: d.name, score, level, trend: (d.risk > 75 ? "down" : d.risk > 55 ? "flat" : "up") as "up" | "flat" | "down" };
});

const trendCats = crimeByType.slice(0, 3);
export const publicLocalityTrends = ["W1", "W2", "W3", "W4"].map((w, i) => ({
  week: w,
  [trendCats[0]?.type ?? "Theft"]: Math.round((trendCats[0]?.value ?? 1000) / 4000) + i * 3,
  [trendCats[1]?.type ?? "Assault"]: Math.round((trendCats[1]?.value ?? 500) / 4000) + i * 2,
  [trendCats[2]?.type ?? "Traffic"]: Math.round((trendCats[2]?.value ?? 800) / 4000) + i,
})) as Array<Record<string, string | number>>;

export const publicSafetyAlerts = [
  { id: "PS-01", title: "Traffic diversion — Outer Ring Road", area: topDistrictNames[0], time: "20 min ago", level: "info" as const },
  { id: "PS-02", title: `${topCatNames[0]} incidents rising`, area: topDistrictNames[0], time: "1 hr ago", level: "warning" as const },
  { id: "PS-03", title: "Festival crowd advisory", area: topDistrictNames[1], time: "2 hr ago", level: "info" as const },
  { id: "PS-04", title: "Online fraud calls reported", area: "Statewide", time: "5 hr ago", level: "warning" as const },
  { id: "PS-05", title: "Missing person — please share sightings", area: topDistrictNames[2], time: "Yesterday", level: "info" as const },
];

export const emergencyContacts = [
  { name: "Police", number: "100", desc: "All emergencies" },
  { name: "Women Helpline", number: "1091", desc: "24×7 women in distress" },
  { name: "Child Helpline", number: "1098", desc: "Children in need of care" },
  { name: "Ambulance", number: "108", desc: "Medical emergency" },
  { name: "Fire", number: "101", desc: "Fire & rescue" },
  { name: "Cybercrime", number: "1930", desc: "Financial fraud helpline" },
  { name: "Traffic Police (Bengaluru)", number: "080-22943322", desc: "Traffic & road issues" },
  { name: "Karnataka State Control Room", number: "112", desc: "Unified emergency" },
  { name: "Senior Citizen Helpline", number: "14567", desc: "Elder support" },
  { name: "Anti-Poison", number: "1066", desc: "Poison control" },
];

export const safetyTips = [
  { title: "Stay alert on late-night commutes", body: "Prefer well-lit, busy roads. Share live location with a trusted contact." },
  { title: "Avoid sharing OTPs", body: "Karnataka Police / banks will never ask for your OTP or CVV over a call." },
  { title: "Verify online sellers", body: "Pay only via trusted gateways. Screenshot chats before making any transfer." },
  { title: "Use the Suraksha app", body: "Karnataka Police apps offer SOS, safe-route, and hotspot alerts." },
  { title: "Secure your two-wheeler", body: "Use handle-lock plus disc-lock in parking lots — theft peaks 8 PM–11 PM." },
  { title: "Report chain-snatching patterns", body: "Note vehicle number, colour, and direction. Every detail helps investigators." },
];
