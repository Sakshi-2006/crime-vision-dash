import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "./forgot-password";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";
import { toast } from "sonner";
import { login } from "@/lib/auth";

export const Route = createFileRoute("/verify-otp")({
  component: VerifyOTP,
});

function VerifyOTP() {
  const nav = useNavigate();
  const [code, setCode] = useState("");
  return (
    <AuthShell title="Enter verification code" subtitle="We sent a 6-digit code to your registered device.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (code.length !== 6) return toast.error("Enter all 6 digits");
          login("commander@sentineliq.gov", "otp");
          toast.success("Verified");
          nav({ to: "/app/dashboard" });
        }}
        className="space-y-6"
      >
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} className="h-12 w-12 text-lg" />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button className="h-11 w-full" type="submit">Verify & continue</Button>
        <p className="text-center text-xs text-muted-foreground">
          Didn't get it? <button type="button" className="text-info hover:underline" onClick={() => toast("Code resent")}>Resend</button>
        </p>
      </form>
      <Link to="/" className="mt-6 inline-block text-sm text-info hover:underline">
        Back to sign in
      </Link>
    </AuthShell>
  );
}
