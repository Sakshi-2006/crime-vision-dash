import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, EyeOff, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/public/report")({
  component: ReportPage,
});

function ReportPage() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [category, setCategory] = useState("theft");
  const [district, setDistrict] = useState("Bengaluru Urban");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = "KSP-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setSubmitted(ref);
    toast.success("Tip submitted anonymously. Thank you.");
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl">
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold">Tip received</h2>
            <p className="text-sm text-muted-foreground">
              Thank you for helping keep Karnataka safer. Your identity has not been recorded.
            </p>
            <div className="rounded-lg border border-border bg-muted/40 px-4 py-2 font-mono text-sm">
              Ref: {submitted}
            </div>
            <Button onClick={() => setSubmitted(null)} variant="outline">Submit another tip</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Report Anonymously</h1>
        <p className="text-sm text-muted-foreground">
          Share what you saw — no name, no phone, no login required.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-info/30 bg-info/10 p-4 text-sm">
        <EyeOff className="mt-0.5 h-5 w-5 shrink-0 text-info" />
        <div>
          <div className="font-semibold text-foreground">Your identity is protected</div>
          <div className="text-xs text-muted-foreground">
            We do not collect your name, IP, or contact information. In life-threatening emergencies, dial <b>100</b> or <b>112</b>.
          </div>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Incident details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theft">Theft / Burglary</SelectItem>
                    <SelectItem value="harassment">Harassment</SelectItem>
                    <SelectItem value="drugs">Narcotics</SelectItem>
                    <SelectItem value="cyber">Cybercrime / Fraud</SelectItem>
                    <SelectItem value="traffic">Traffic violation</SelectItem>
                    <SelectItem value="missing">Missing person</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>District</Label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Bengaluru Urban","Mysuru","Mangaluru (D.K.)","Hubballi-Dharwad","Belagavi","Kalaburagi","Shivamogga","Tumakuru","Ballari","Vijayapura"].map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="loc">Locality / landmark</Label>
              <Input id="loc" placeholder="e.g. near Lalbagh West Gate" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="when">When did it happen?</Label>
              <Input id="when" type="datetime-local" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Describe what you saw</Label>
              <Textarea id="desc" rows={5} placeholder="Do not include your name or contact details." required />
              <p className="text-xs text-muted-foreground">
                Please avoid naming individuals. Focus on time, location, vehicle numbers, and observable actions.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="ack" required />
              <Label htmlFor="ack" className="text-xs font-normal text-muted-foreground">
                I understand this submission is anonymous, is not a substitute for calling <b>100/112</b> in emergencies, and knowingly filing false information is punishable by law.
              </Label>
            </div>

            <Button type="submit" className="w-full">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Submit anonymously
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
