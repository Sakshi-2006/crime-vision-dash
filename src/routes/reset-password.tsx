import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "./forgot-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
});

function ResetPassword() {
  const nav = useNavigate();
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  return (
    <AuthShell title="Set a new password" subtitle="Use at least 12 characters with mixed case and symbols.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (p1 !== p2) return toast.error("Passwords don't match");
          toast.success("Password updated");
          nav({ to: "/" });
        }}
        className="space-y-4"
      >
        <Field id="p1" label="New password" v={p1} set={setP1} />
        <Field id="p2" label="Confirm password" v={p2} set={setP2} />
        <Button className="h-11 w-full">Update password</Button>
      </form>
      <Link to="/" className="mt-6 inline-block text-sm text-info hover:underline">
        Back to sign in
      </Link>
    </AuthShell>
  );
}

function Field({ id, label, v, set }: { id: string; label: string; v: string; set: (s: string) => void }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input id={id} type="password" required value={v} onChange={(e) => set(e.target.value)} className="h-11 pl-9" />
      </div>
    </div>
  );
}
