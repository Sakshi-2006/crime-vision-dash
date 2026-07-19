// Lightweight theme controller for SentinelIQ.
// Persists preference in localStorage and toggles the `.dark` class on <html>.

export type Theme = "light" | "dark" | "system";
const KEY = "sentineliq_theme";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const v = localStorage.getItem(KEY) as Theme | null;
  return v ?? "system";
}

export function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme !== "system") return theme;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const resolved = resolveTheme(theme);
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function setTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, theme);
  applyTheme(theme);
}

/** Call once on client mount to sync UI with stored preference. */
export function initTheme() {
  if (typeof window === "undefined") return;
  const t = getStoredTheme();
  applyTheme(t);
  // React to OS changes when in "system" mode.
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const listener = () => {
    if (getStoredTheme() === "system") applyTheme("system");
  };
  mq.addEventListener?.("change", listener);
}
