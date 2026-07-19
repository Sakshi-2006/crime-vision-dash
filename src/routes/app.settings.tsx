import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getStoredTheme, setTheme, type Theme } from "@/lib/theme";
import { Sun, Moon, Monitor, Check } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto max-w-[1000px] space-y-6">
      <PageHeader title="Settings" subtitle="Manage your profile, security, preferences, and system defaults." />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field id="name" label="Full name" defaultValue="Cmdr. Ava Reyes" />
              <Field id="email" label="Email" defaultValue="a.reyes@sentineliq.gov" />
              <Field id="badge" label="Badge #" defaultValue="A-1024" />
              <Field id="district" label="District" defaultValue="Central" />
              <div className="md:col-span-2">
                <Button onClick={() => toast.success("Profile updated")}>Save changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Security</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field id="cur" label="Current password" type="password" />
              <Field id="new" label="New password" type="password" />
              <Field id="conf" label="Confirm password" type="password" />
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <div className="font-medium">Two-factor authentication</div>
                  <div className="text-xs text-muted-foreground">Require OTP on new devices.</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Button onClick={() => toast.success("Security updated")}>Update</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time zone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {[
                "Push notifications for critical alerts",
                "Weekly report by email",
                "AI recommendation digests",
              ].map((s, i) => (
                <div key={s} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-sm">{s}</span>
                  <Switch defaultChecked={i !== 2} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
            <CardContent>
              <ThemePicker />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ThemePicker() {
  const [theme, setThemeState] = useState<Theme>("system");
  useEffect(() => { setThemeState(getStoredTheme()); }, []);

  const options: { value: Theme; name: string; desc: string; icon: typeof Sun }[] = [
    { value: "light",  name: "Light",  desc: "Default enterprise", icon: Sun },
    { value: "dark",   name: "Dark",   desc: "Command center",     icon: Moon },
    { value: "system", name: "System", desc: "Auto by OS",         icon: Monitor },
  ];

  const choose = (t: Theme) => {
    setThemeState(t);
    setTheme(t);
    toast.success(`Theme set to ${t}`);
  };

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {options.map((t) => {
        const Icon = t.icon;
        const active = theme === t.value;
        return (
          <button
            key={t.value}
            onClick={() => choose(t.value)}
            className={`relative rounded-xl border p-4 text-left transition hover:shadow-md ${
              active ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary"
            }`}
          >
            {active && (
              <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-3.5 w-3.5" />
              </span>
            )}
            <div className="mb-3 flex h-16 items-center justify-center rounded-md bg-gradient-to-br from-primary to-info text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <div className="font-semibold">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.desc}</div>
          </button>
        );
      })}
    </div>
  );
}

function Field({ id, label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...rest} />
    </div>
  );
}
