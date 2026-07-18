// Centralized mock data for SentinelIQ.
// All values are illustrative and safe for demo purposes.

export const KPI = {
  totalCrimes: 24_318,
  todayCrimes: 142,
  crimeGrowth: -4.6, // percent vs prev period
  solvedCases: 15_204,
  pendingCases: 9_114,
  highRiskDistricts: 6,
  activeAlerts: 23,
  aiRiskScore: 78, // 0-100
};

export const crimeTrend = [
  { month: "Jan", crimes: 1820, solved: 1180 },
  { month: "Feb", crimes: 1710, solved: 1105 },
  { month: "Mar", crimes: 1965, solved: 1288 },
  { month: "Apr", crimes: 2110, solved: 1402 },
  { month: "May", crimes: 2045, solved: 1330 },
  { month: "Jun", crimes: 2280, solved: 1490 },
  { month: "Jul", crimes: 2401, solved: 1602 },
  { month: "Aug", crimes: 2290, solved: 1510 },
  { month: "Sep", crimes: 2150, solved: 1450 },
  { month: "Oct", crimes: 2320, solved: 1580 },
  { month: "Nov", crimes: 2107, solved: 1421 },
  { month: "Dec", crimes: 2120, solved: 1448 },
];

export const crimeByType = [
  { type: "Theft", value: 6820 },
  { type: "Burglary", value: 3410 },
  { type: "Assault", value: 2905 },
  { type: "Fraud", value: 4210 },
  { type: "Vandalism", value: 1885 },
  { type: "Narcotics", value: 2612 },
  { type: "Cybercrime", value: 2476 },
];

export const districts = [
  { id: "D1", name: "Central", crimes: 3120, risk: 82, population: 145_000, officers: 210 },
  { id: "D2", name: "Northgate", crimes: 2410, risk: 64, population: 118_000, officers: 165 },
  { id: "D3", name: "Riverside", crimes: 1980, risk: 55, population: 96_000, officers: 140 },
  { id: "D4", name: "Eastfield", crimes: 3480, risk: 88, population: 162_000, officers: 232 },
  { id: "D5", name: "Southbay", crimes: 2905, risk: 74, population: 138_000, officers: 198 },
  { id: "D6", name: "Westhill", crimes: 1720, risk: 41, population: 84_000, officers: 118 },
  { id: "D7", name: "Harborline", crimes: 2140, risk: 60, population: 102_000, officers: 152 },
  { id: "D8", name: "Uptown", crimes: 1560, risk: 38, population: 78_000, officers: 108 },
];

export const recentActivities = [
  { id: 1, time: "2m ago", type: "alert", title: "Armed robbery reported", district: "Eastfield", severity: "high" as const },
  { id: 2, time: "12m ago", type: "case", title: "Case #4821 marked solved", district: "Central", severity: "low" as const },
  { id: 3, time: "34m ago", type: "prediction", title: "AI flagged theft hotspot", district: "Southbay", severity: "medium" as const },
  { id: 4, time: "1h ago", type: "resource", title: "Patrol unit reassigned", district: "Northgate", severity: "low" as const },
  { id: 5, time: "2h ago", type: "alert", title: "Anomaly: crime spike +38%", district: "Eastfield", severity: "high" as const },
  { id: 6, time: "3h ago", type: "case", title: "New suspect identified", district: "Harborline", severity: "medium" as const },
];

export const alerts = [
  { id: "A-1042", title: "Armed robbery in progress", district: "Eastfield", time: "2 min ago", severity: "critical" as const, status: "active" },
  { id: "A-1041", title: "Crime spike detected (+38%)", district: "Central", time: "18 min ago", severity: "high" as const, status: "investigating" },
  { id: "A-1040", title: "Suspicious vehicle pattern", district: "Southbay", time: "45 min ago", severity: "medium" as const, status: "monitoring" },
  { id: "A-1039", title: "Officer requested backup", district: "Northgate", time: "1 hr ago", severity: "high" as const, status: "resolved" },
  { id: "A-1038", title: "Anomaly: unusual gathering", district: "Harborline", time: "2 hr ago", severity: "low" as const, status: "monitoring" },
  { id: "A-1037", title: "Repeat offender sighted", district: "Eastfield", time: "3 hr ago", severity: "medium" as const, status: "active" },
];

export const heatmapPoints = [
  // [lat, lng, intensity 0-1]
  [40.7128, -74.006, 0.9],
  [40.7228, -74.011, 0.7],
  [40.7028, -74.015, 0.6],
  [40.7180, -73.995, 0.85],
  [40.7080, -74.000, 0.5],
  [40.7300, -74.020, 0.4],
  [40.6980, -74.010, 0.75],
  [40.7250, -74.000, 0.65],
] as [number, number, number][];

export const predictions = [
  { zone: "Eastfield / Sector 4", risk: 88, window: "Next 24h", trend: "up" as const, confidence: 0.92 },
  { zone: "Central / Market St", risk: 76, window: "Next 48h", trend: "up" as const, confidence: 0.87 },
  { zone: "Southbay / Docks", risk: 71, window: "Next 24h", trend: "flat" as const, confidence: 0.81 },
  { zone: "Harborline / Node 7", risk: 62, window: "Next 72h", trend: "down" as const, confidence: 0.76 },
];

export const explainability = [
  { factor: "Historical theft frequency", weight: 0.28 },
  { factor: "Repeat offender proximity", weight: 0.22 },
  { factor: "Poor street lighting", weight: 0.16 },
  { factor: "Festival / event window", weight: 0.14 },
  { factor: "Weather (low visibility)", weight: 0.10 },
  { factor: "Officer coverage gap", weight: 0.10 },
];

export const forecast = [
  { day: "Mon", predicted: 210, actual: 198 },
  { day: "Tue", predicted: 224, actual: 231 },
  { day: "Wed", predicted: 240, actual: 236 },
  { day: "Thu", predicted: 218, actual: 210 },
  { day: "Fri", predicted: 260, actual: null },
  { day: "Sat", predicted: 285, actual: null },
  { day: "Sun", predicted: 272, actual: null },
];

export const resources = {
  officers: { available: 428, deployed: 612, total: 1040 },
  vehicles: { available: 84, deployed: 132, total: 216 },
  stations: 18,
};

export const recommendations = [
  {
    id: 1,
    location: "District 5 — Southbay",
    reason: "Burglary rate rising 8 PM–11 PM.",
    deploy: { officers: 12, vehicles: 3 },
    priority: "high" as const,
  },
  {
    id: 2,
    location: "District 1 — Central",
    reason: "Weekend nightlife anomaly detected.",
    deploy: { officers: 8, vehicles: 2 },
    priority: "medium" as const,
  },
  {
    id: 3,
    location: "District 4 — Eastfield",
    reason: "Repeat offender cluster identified.",
    deploy: { officers: 15, vehicles: 4 },
    priority: "critical" as const,
  },
];

export const users = [
  { id: 1, name: "Cmdr. Ava Reyes", email: "a.reyes@sentineliq.gov", role: "Commander", district: "Central", status: "active" },
  { id: 2, name: "Sgt. Marcus Chen", email: "m.chen@sentineliq.gov", role: "Sergeant", district: "Eastfield", status: "active" },
  { id: 3, name: "Officer Priya Rao", email: "p.rao@sentineliq.gov", role: "Officer", district: "Southbay", status: "on-patrol" },
  { id: 4, name: "Analyst J. Whitmore", email: "j.whitmore@sentineliq.gov", role: "Analyst", district: "HQ", status: "active" },
  { id: 5, name: "Chief L. Okafor", email: "l.okafor@sentineliq.gov", role: "Chief", district: "HQ", status: "away" },
  { id: 6, name: "Officer T. Nakamura", email: "t.nakamura@sentineliq.gov", role: "Officer", district: "Northgate", status: "off-duty" },
];

export const notifications = [
  { id: 1, title: "Critical alert: Eastfield", body: "Armed robbery reported — response dispatched.", time: "2m", read: false, kind: "critical" as const },
  { id: 2, title: "AI Prediction updated", body: "Southbay risk score increased to 74.", time: "20m", read: false, kind: "info" as const },
  { id: 3, title: "Weekly report ready", body: "November crime summary is available.", time: "1h", read: true, kind: "info" as const },
  { id: 4, title: "System: model retrained", body: "Predictive model v4.2 deployed.", time: "3h", read: true, kind: "success" as const },
];

export const reportsList = [
  { id: "RPT-2024-11", title: "November Crime Summary", type: "Monthly", size: "2.4 MB", date: "Dec 01, 2024" },
  { id: "RPT-D4-Q4", title: "Eastfield Q4 District Report", type: "District", size: "1.8 MB", date: "Nov 28, 2024" },
  { id: "RPT-TREND-12", title: "12-Month Trend Analysis", type: "Trend", size: "3.1 MB", date: "Nov 26, 2024" },
  { id: "RPT-AI-04", title: "AI Prediction Accuracy Q4", type: "AI", size: "1.2 MB", date: "Nov 22, 2024" },
];

export const networkNodes = [
  { id: "C1", label: "R. Kade", kind: "criminal" },
  { id: "C2", label: "M. Vega", kind: "criminal" },
  { id: "C3", label: "S. Halloran", kind: "criminal" },
  { id: "V1", label: "Blue Sedan · X72", kind: "vehicle" },
  { id: "V2", label: "White Van · 4KL", kind: "vehicle" },
  { id: "L1", label: "Warehouse 12", kind: "location" },
  { id: "L2", label: "Dock 7", kind: "location" },
  { id: "K1", label: "Case #4821", kind: "case" },
  { id: "K2", label: "Case #4902", kind: "case" },
  { id: "A1", label: "J. Rivera", kind: "associate" },
] as const;

export const networkEdges = [
  ["C1", "V1"], ["C1", "L1"], ["C1", "K1"],
  ["C2", "V1"], ["C2", "L2"], ["C2", "K2"],
  ["C3", "V2"], ["C3", "L1"], ["A1", "C1"],
  ["A1", "C2"], ["K1", "L1"], ["K2", "L2"],
] as const;
