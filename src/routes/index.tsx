import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("commander@sentineliq.gov");
  const [password, setPassword] = useState("demo-access");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      toast.success("Authenticated. Welcome back.");
      navigate({ to: "/app/dashboard" });
    }, 600);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-primary">
      {/* Ambient */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(1200px 500px at 20% -10%, oklch(0.66 0.11 200 / 0.35), transparent 60%), radial-gradient(900px 400px at 90% 110%, oklch(0.4 0.09 258 / 0.5), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative grid w-full max-w-6xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-2">
        {/* Brand column */}
        <div className="hidden flex-col justify-between text-primary-foreground lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/10 backdrop-blur">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight">SentinelIQ</div>
              <div className="text-xs uppercase tracking-widest opacity-70">
                Crime Intelligence Platform
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight leading-tight">
              Predictive intelligence for
              <br />
              <span className="text-info">modern law enforcement.</span>
            </h1>
            <p className="mt-4 max-w-md text-primary-foreground/70">
              Real-time analytics, interactive crime mapping, and explainable AI —
              built for agencies that need decisions in seconds, not hours.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-primary-foreground/10 pt-8">
              {[
                { k: "24.3K", v: "Cases analyzed" },
                { k: "92%", v: "AI accuracy" },
                { k: "1.2s", v: "Median response" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="text-2xl font-bold">{s.k}</dt>
                  <dd className="text-xs uppercase tracking-wider text-primary-foreground/60">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <p className="text-xs text-primary-foreground/50">
            Restricted use · Authorized personnel only
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-3xl p-8 shadow-2xl md:p-10"
        >
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-base font-bold">SentinelIQ</div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight">Secure sign in</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your credentials to access the intelligence dashboard.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Agency email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-info hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pl-9"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" defaultChecked />
              <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                Keep me signed in on this device
              </Label>
            </div>

            <Button
              type="submit"
              className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Authenticating…" : "Sign in"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              or verify via
              <div className="h-px flex-1 bg-border" />
            </div>

            <Button asChild variant="outline" className="h-11 w-full">
              <Link to="/verify-otp">Use one-time passcode</Link>
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing you accept the agency terms of use and acceptable-use policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
