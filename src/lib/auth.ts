// Minimal mock auth stored in localStorage. Replace with real auth later.
const KEY = "sentineliq_auth";

export type Session = { email: string; name: string; role: string };

export function login(email: string, _password: string): Session {
  const session: Session = {
    email,
    name: email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    role: "Commander",
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(session));
  }
  return session;
}

export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}
