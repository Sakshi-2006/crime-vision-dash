import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/assistant")({
  component: AssistantPage,
});

type Msg = { role: "user" | "ai"; text: string };

const SEED: Msg[] = [
  { role: "ai", text: "Good morning, Commander. I'm SentinelIQ Assistant. Ask me anything about crime trends, hotspots, or predictions." },
];

const SUGGESTED = [
  "Show theft hotspots this week",
  "Compare crime between January and June",
  "Predict next week's risk in District 4",
  "Which districts need more patrol coverage?",
];

const CANNED: Record<string, string> = {
  "theft":
    "Theft hotspots this week concentrate in **Eastfield Sector 4** (38% of incidents) and **Central Market St** (22%). Most incidents occur between 8–11 PM. I recommend +12 officers on evening patrol.",
  "compare":
    "Between January and June, total incidents rose from 1,820 → 2,280 (+25%). Fraud grew fastest (+41%), while vandalism declined (-8%). Clearance rate stayed steady at ~65%.",
  "predict":
    "Next-week forecast shows District 4 risk climbing from 74 → 82. Primary drivers: repeat-offender cluster + festival window. 92% model confidence.",
  "patrol":
    "Districts needing more coverage: Eastfield (risk 88), Central (82), Southbay (74). Suggested reallocation: shift 15 officers from Uptown and Westhill.",
};

function reply(q: string): string {
  const k = q.toLowerCase();
  for (const key of Object.keys(CANNED)) if (k.includes(key)) return CANNED[key];
  return "I'll pull that from the data lake. In the demo, try asking about **theft**, **compare** months, **predict** next week, or **patrol** coverage.";
}

function AssistantPage() {
  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: reply(text) }]);
      setTyping(false);
    }, 700);
  };

  return (
    <div className="mx-auto max-w-[1000px] space-y-6">
      <PageHeader
        title="AI Assistant"
        subtitle="Natural-language querying of crime intelligence data."
        actions={<Badge variant="outline"><Sparkles className="mr-1 h-3 w-3 text-info" /> Model v4.2</Badge>}
      />

      <Card className="flex h-[70vh] flex-col overflow-hidden">
        <CardContent className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
          {messages.map((m, i) => <Bubble key={i} m={m} />)}
          {typing && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary text-primary-foreground"><ShieldCheck className="h-4 w-4" /></AvatarFallback></Avatar>
              <span className="inline-flex gap-1">
                <Dot /><Dot delay={0.15} /><Dot delay={0.3} />
              </span>
            </div>
          )}
          <div ref={endRef} />
        </CardContent>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTED.map((s) => (
              <Badge key={s} variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => send(s)}>
                {s}
              </Badge>
            ))}
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask SentinelIQ anything…"
              className="h-11"
            />
            <Button type="submit" className="h-11" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

function Bubble({ m }: { m: Msg }) {
  const isUser = m.role === "user";
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-8 w-8">
        <AvatarFallback className={isUser ? "bg-muted" : "bg-primary text-primary-foreground"}>
          {isUser ? "U" : <ShieldCheck className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
        dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") }} />
    </motion.div>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground"
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}
