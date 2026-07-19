// Centralized mock data for SentinelIQ — Karnataka State Police.
// All values are illustrative and safe for demo purposes.

export const KPI = {
  totalCrimes: 24_318,
  todayCrimes: 142,
  crimeGrowth: -4.6,
  solvedCases: 15_204,
  pendingCases: 9_114,
  highRiskDistricts: 6,
  activeAlerts: 23,
  aiRiskScore: 78,
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

// Karnataka districts (subset of major districts / police commissionerates)
export const districts = [
  { id: "D1", name: "Bengaluru Urban",     crimes: 5820, risk: 84, population: 9_620_000, officers: 18_400 },
  { id: "D2", name: "Mysuru",              crimes: 2410, risk: 62, population: 3_000_000, officers: 4_180 },
  { id: "D3", name: "Mangaluru (D.K.)",    crimes: 1980, risk: 55, population: 2_100_000, officers: 3_140 },
  { id: "D4", name: "Hubballi-Dharwad",    crimes: 2680, risk: 71, population: 1_850_000, officers: 2_820 },
  { id: "D5", name: "Belagavi",            crimes: 2305, risk: 66, population: 4_780_000, officers: 3_560 },
  { id: "D6", name: "Kalaburagi",          crimes: 2140, risk: 68, population: 2_560_000, officers: 2_910 },
  { id: "D7", name: "Shivamogga",          crimes: 1560, risk: 44, population: 1_750_000, officers: 2_120 },
  { id: "D8", name: "Tumakuru",            crimes: 1720, risk: 47, population: 2_680_000, officers: 2_260 },
  { id: "D9", name: "Ballari",             crimes: 1885, risk: 58, population: 2_450_000, officers: 2_380 },
  { id: "D10", name: "Vijayapura",         crimes: 1420, risk: 41, population: 2_180_000, officers: 1_960 },
];

export const recentActivities = [
  { id: 1, time: "2m ago",  type: "alert",      title: "Chain snatching reported",       district: "Bengaluru Urban", severity: "high" as const },
  { id: 2, time: "12m ago", type: "case",       title: "Case #4821 marked solved",       district: "Mysuru",          severity: "low" as const },
  { id: 3, time: "34m ago", type: "prediction", title: "AI flagged theft hotspot",       district: "Hubballi-Dharwad", severity: "medium" as const },
  { id: 4, time: "1h ago",  type: "resource",   title: "Patrol unit reassigned",         district: "Belagavi",        severity: "low" as const },
  { id: 5, time: "2h ago",  type: "alert",      title: "Anomaly: crime spike +38%",      district: "Bengaluru Urban", severity: "high" as const },
  { id: 6, time: "3h ago",  type: "case",       title: "New suspect identified",         district: "Mangaluru (D.K.)", severity: "medium" as const },
];

export const alerts = [
  { id: "A-1042", title: "Chain snatching in progress",   district: "Bengaluru Urban",  time: "2 min ago",  severity: "critical" as const, status: "active" },
  { id: "A-1041", title: "Crime spike detected (+38%)",   district: "Bengaluru Urban",  time: "18 min ago", severity: "high" as const,     status: "investigating" },
  { id: "A-1040", title: "Suspicious vehicle pattern",    district: "Mysuru",           time: "45 min ago", severity: "medium" as const,   status: "monitoring" },
  { id: "A-1039", title: "Officer requested backup",      district: "Hubballi-Dharwad", time: "1 hr ago",   severity: "high" as const,     status: "resolved" },
  { id: "A-1038", title: "Anomaly: unusual gathering",    district: "Mangaluru (D.K.)", time: "2 hr ago",   severity: "low" as const,      status: "monitoring" },
  { id: "A-1037", title: "Repeat offender sighted",       district: "Belagavi",         time: "3 hr ago",   severity: "medium" as const,   status: "active" },
];

// Heatmap points centred on Karnataka, weighted toward Bengaluru.
// [lat, lng, intensity 0-1]
export const heatmapPoints = [
  // Bengaluru cluster
  [12.9716, 77.5946, 0.95], // MG Road
  [12.9352, 77.6245, 0.82], // Koramangala
  [12.9784, 77.6408, 0.78], // Indiranagar
  [13.0359, 77.5970, 0.70], // Hebbal
  [12.9141, 77.6784, 0.66], // HSR Layout
  [12.9250, 77.5938, 0.72], // Jayanagar
  [13.0287, 77.5386, 0.58], // Yeshwanthpur
  [12.9698, 77.7500, 0.62], // Whitefield
  // Rest of Karnataka
  [12.2958, 76.6394, 0.55], // Mysuru
  [12.9141, 74.8560, 0.48], // Mangaluru
  [15.3647, 75.1240, 0.60], // Hubballi
  [15.8497, 74.4977, 0.52], // Belagavi
  [17.3297, 76.8343, 0.58], // Kalaburagi
  [13.9299, 75.5681, 0.35], // Shivamogga
  [13.3409, 77.1010, 0.40], // Tumakuru
  [15.1394, 76.9214, 0.45], // Ballari
] as [number, number, number][];

export const KARNATAKA_CENTER: [number, number] = [14.5204, 75.7224];
export const BENGALURU_CENTER: [number, number] = [12.9716, 77.5946];

export const predictions = [
  { zone: "Bengaluru / KR Puram",     risk: 88, window: "Next 24h", trend: "up" as const,   confidence: 0.92 },
  { zone: "Bengaluru / Majestic",     risk: 76, window: "Next 48h", trend: "up" as const,   confidence: 0.87 },
  { zone: "Mysuru / Devaraja Market", risk: 71, window: "Next 24h", trend: "flat" as const, confidence: 0.81 },
  { zone: "Hubballi / Gokul Road",    risk: 62, window: "Next 72h", trend: "down" as const, confidence: 0.76 },
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
  { id: 1, location: "Bengaluru — Koramangala",  reason: "Burglary rate rising 8 PM–11 PM.",       deploy: { officers: 12, vehicles: 3 }, priority: "high" as const },
  { id: 2, location: "Mysuru — Devaraja Market", reason: "Weekend nightlife anomaly detected.",    deploy: { officers: 8, vehicles: 2 },  priority: "medium" as const },
  { id: 3, location: "Bengaluru — KR Puram",     reason: "Repeat offender cluster identified.",    deploy: { officers: 15, vehicles: 4 }, priority: "critical" as const },
];

export const users = [
  { id: 1, name: "Cmdr. Anitha Reddy",   email: "a.reddy@ksp.gov.in",    role: "Commissioner", district: "Bengaluru Urban",  status: "active" },
  { id: 2, name: "Insp. Manjunath Rao",  email: "m.rao@ksp.gov.in",       role: "Inspector",    district: "Mysuru",           status: "active" },
  { id: 3, name: "SI Priya Shetty",      email: "p.shetty@ksp.gov.in",    role: "Sub-Inspector", district: "Mangaluru (D.K.)", status: "on-patrol" },
  { id: 4, name: "Analyst J. Kulkarni",  email: "j.kulkarni@ksp.gov.in",  role: "Analyst",      district: "HQ",               status: "active" },
  { id: 5, name: "DGP L. Nagaraj",       email: "l.nagaraj@ksp.gov.in",   role: "DGP",          district: "HQ",               status: "away" },
  { id: 6, name: "SI T. Hegde",          email: "t.hegde@ksp.gov.in",     role: "Sub-Inspector", district: "Hubballi-Dharwad", status: "off-duty" },
];

export const notifications = [
  { id: 1, title: "Critical alert: Bengaluru",  body: "Chain snatching reported — response dispatched.", time: "2m", read: false, kind: "critical" as const },
  { id: 2, title: "AI Prediction updated",      body: "Mysuru risk score increased to 74.",              time: "20m", read: false, kind: "info" as const },
  { id: 3, title: "Weekly report ready",        body: "November crime summary is available.",            time: "1h", read: true,  kind: "info" as const },
  { id: 4, title: "System: model retrained",    body: "Predictive model v4.2 deployed.",                 time: "3h", read: true,  kind: "success" as const },
];

export const reportsList = [
  { id: "RPT-2024-11",  title: "November Crime Summary — Karnataka", type: "Monthly",  size: "2.4 MB", date: "Dec 01, 2024" },
  { id: "RPT-BLR-Q4",   title: "Bengaluru Urban Q4 District Report", type: "District", size: "1.8 MB", date: "Nov 28, 2024" },
  { id: "RPT-TREND-12", title: "12-Month Trend Analysis — Karnataka", type: "Trend",    size: "3.1 MB", date: "Nov 26, 2024" },
  { id: "RPT-AI-04",    title: "AI Prediction Accuracy Q4",           type: "AI",       size: "1.2 MB", date: "Nov 22, 2024" },
];

export const networkNodes = [
  { id: "C1", label: "R. Kade", kind: "criminal" },
  { id: "C2", label: "M. Vega", kind: "criminal" },
  { id: "C3", label: "S. Halloran", kind: "criminal" },
  { id: "V1", label: "Blue Sedan · KA-01-X72", kind: "vehicle" },
  { id: "V2", label: "White Van · KA-05-4KL",  kind: "vehicle" },
  { id: "L1", label: "Warehouse 12, Peenya",   kind: "location" },
  { id: "L2", label: "Old Port, Mangaluru",    kind: "location" },
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

// ==================== PUBLIC PORTAL DATA ====================
// Aggregated, non-sensitive data safe for public consumption.

export const publicLocalitySafety = [
  { locality: "MG Road, Bengaluru",       score: 62, level: "moderate" as const, trend: "down" as const },
  { locality: "Koramangala, Bengaluru",   score: 71, level: "safe" as const,     trend: "flat" as const },
  { locality: "Indiranagar, Bengaluru",   score: 68, level: "moderate" as const, trend: "up" as const },
  { locality: "Whitefield, Bengaluru",    score: 78, level: "safe" as const,     trend: "up" as const },
  { locality: "Majestic, Bengaluru",      score: 44, level: "caution" as const,  trend: "down" as const },
  { locality: "Devaraja Mkt, Mysuru",     score: 58, level: "moderate" as const, trend: "flat" as const },
  { locality: "Hampankatta, Mangaluru",   score: 74, level: "safe" as const,     trend: "up" as const },
  { locality: "Gokul Road, Hubballi",     score: 51, level: "moderate" as const, trend: "down" as const },
];

export const publicLocalityTrends = [
  { week: "W1", theft: 42, harassment: 12, traffic: 88 },
  { week: "W2", theft: 38, harassment: 15, traffic: 92 },
  { week: "W3", theft: 45, harassment: 10, traffic: 84 },
  { week: "W4", theft: 33, harassment: 8,  traffic: 79 },
];

export const publicSafetyAlerts = [
  { id: "PS-01", title: "Traffic diversion — Outer Ring Road",  area: "Bengaluru",  time: "20 min ago", level: "info" as const },
  { id: "PS-02", title: "Chain snatching incidents rising",     area: "Jayanagar, Bengaluru", time: "1 hr ago",  level: "warning" as const },
  { id: "PS-03", title: "Festival crowd advisory — Dasara",     area: "Mysuru",     time: "2 hr ago",  level: "info" as const },
  { id: "PS-04", title: "Online fraud calls reported",          area: "Statewide",  time: "5 hr ago",  level: "warning" as const },
  { id: "PS-05", title: "Missing person — please share sightings", area: "Hubballi", time: "Yesterday", level: "info" as const },
];

export const emergencyContacts = [
  { name: "Police",                       number: "100",       desc: "All emergencies" },
  { name: "Women Helpline",               number: "1091",      desc: "24×7 women in distress" },
  { name: "Child Helpline",               number: "1098",      desc: "Children in need of care" },
  { name: "Ambulance",                    number: "108",       desc: "Medical emergency" },
  { name: "Fire",                         number: "101",       desc: "Fire & rescue" },
  { name: "Cybercrime",                   number: "1930",      desc: "Financial fraud helpline" },
  { name: "Traffic Police (Bengaluru)",   number: "080-22943322", desc: "Traffic & road issues" },
  { name: "Karnataka State Control Room", number: "112",       desc: "Unified emergency" },
  { name: "Senior Citizen Helpline",      number: "14567",     desc: "Elder support" },
  { name: "Anti-Poison",                  number: "1066",      desc: "Poison control" },
];

export const safetyTips = [
  { title: "Stay alert on late-night commutes",  body: "Prefer well-lit, busy roads. Share live location with a trusted contact." },
  { title: "Avoid sharing OTPs",                 body: "Karnataka Police / banks will never ask for your OTP or CVV over a call." },
  { title: "Verify online sellers",              body: "Pay only via trusted gateways. Screenshot chats before making any transfer." },
  { title: "Use the Suraksha app",               body: "Karnataka Police apps offer SOS, safe-route, and hotspot alerts." },
  { title: "Secure your two-wheeler",            body: "Use handle-lock plus disc-lock in parking lots — theft peaks 8 PM–11 PM." },
  { title: "Report chain-snatching patterns",    body: "Note vehicle number, colour, and direction. Every detail helps investigators." },
];
