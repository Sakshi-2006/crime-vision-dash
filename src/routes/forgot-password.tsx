import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ShieldCheck, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <AuthShell title="Reset your password" subtitle="We'll send a secure reset link to your agency email.">
      {sent ? (
        <div className="rounded-lg border border-success/30 bg-success/5 p-4 text-sm">
          Reset link sent to <b>{email}</b>. Check your inbox.
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Reset link sent");
            setSent(true);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Agency email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 pl-9" />
            </div>
          </div>
          <Button className="h-11 w-full">Send reset link</Button>
        </form>
      )}
      <Link to="/" className="mt-6 inline-flex items-center gap-1 text-sm text-info hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to sign in
      </Link>
    </AuthShell>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold">SentinelIQ</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Secure Access
            </div>
          </div>
        </div>
        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
