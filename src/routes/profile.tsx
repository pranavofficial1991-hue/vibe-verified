import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Settings, Share2, Trophy, Sparkles, ShieldCheck, Crown, Compass, Flame, Star, Lock } from "lucide-react";
import { ProgressRing } from "@/components/ProgressRing";
import { HypeBadge } from "@/components/HypeBadge";
import { RewardUnlockModal } from "@/components/RewardUnlockModal";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

const BADGES = [
  { icon: "explorer" as const, tier: "gold" as const, title: "Explorer", earned: true },
  { icon: "trusted" as const, tier: "silver" as const, title: "Trusted Checker", earned: true },
  { icon: "legend" as const, tier: "legendary" as const, title: "Local Legend", earned: false },
  { icon: "streak" as const, tier: "gold" as const, title: "7-Day Streak", earned: true },
  { icon: "star" as const, tier: "bronze" as const, title: "First Vibe", earned: true },
  { icon: "vibe" as const, tier: "silver" as const, title: "Trendsetter", earned: false },
];

const MILESTONES = [
  { n: 1, label: "First Drop", reward: "Welcome perk", done: true },
  { n: 3, label: "3 Spots", reward: "Free coffee", done: true },
  { n: 5, label: "5 Spots", reward: "15% off", done: false, current: true },
  { n: 10, label: "10 Spots", reward: "VIP access", done: false },
  { n: 25, label: "Local Legend", reward: "Mystery box", done: false },
];

function ProfilePage() {
  const [tab, setTab] = useState<"badges" | "vault">("badges");
  const [reward, setReward] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden border-b-2 border-foreground bg-gradient-hero pb-6 pt-4">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative px-4">
          <div className="flex items-center justify-between">
            <button className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground bg-background/80 backdrop-blur"><Share2 className="h-4 w-4" /></button>
            <div className="rounded-full border-2 border-foreground bg-background/80 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest backdrop-blur">Hype Identity</div>
            <button className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground bg-background/80 backdrop-blur"><Settings className="h-4 w-4" /></button>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="ring-verified rounded-full p-[3px]">
              <div className="grid h-20 w-20 place-items-center rounded-full border-2 border-background bg-gradient-hot font-display text-2xl font-black text-hot-foreground">M</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 font-display text-2xl font-black">
                Maya K. <ShieldCheck className="h-5 w-5 text-neon" strokeWidth={2.8} />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-foreground/80">@mayavibes · Bandra</div>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border-2 border-foreground bg-neon px-2 py-0.5 font-mono text-[10px] font-black uppercase text-neon-foreground">
                <Crown className="h-3 w-3" /> Lvl 7 · Trusted Vibe Checker
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4 rounded-2xl border-2 border-foreground bg-background/85 p-4 shadow-brutal backdrop-blur">
            <ProgressRing value={0.62} size={110} stroke={10} label="62%" sub="To Lvl 8" color="neon" />
            <div className="flex-1 space-y-2">
              <Stat icon={<Sparkles className="h-3.5 w-3.5" />} label="Vibes" value="48" tone="neon" />
              <Stat icon={<Trophy className="h-3.5 w-3.5" />} label="XP" value="6,240" tone="hot" />
              <Stat icon={<Flame className="h-3.5 w-3.5" />} label="Streak" value="7d" tone="cyber" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-20 flex gap-2 border-b-2 border-border bg-background/90 px-4 py-3 backdrop-blur">
        {(["badges", "vault"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-xl border-2 border-foreground px-3 py-2 font-display text-xs font-extrabold uppercase tracking-wider ${tab === t ? "bg-neon text-neon-foreground shadow-brutal" : "bg-card text-foreground"}`}
          >
            {t === "badges" ? "Badges & Track" : "The Vault"}
          </button>
        ))}
      </div>

      {tab === "badges" ? (
        <div className="space-y-6 px-4 py-5">
          <Section title="Battle Pass" subtitle="Hype 5 spots. Unlock rewards.">
            <MilestoneTrack onClaim={() => setReward(true)} />
          </Section>

          <Section title="Earned Badges" subtitle="Flex your clout">
            <div className="grid grid-cols-3 gap-4">
              {BADGES.map((b, i) => <HypeBadge key={i} {...b} />)}
            </div>
          </Section>
        </div>
      ) : (
        <VaultPreview />
      )}

      <RewardUnlockModal open={reward} onClose={() => setReward(false)} perk="15% OFF" spot="Neon Noodle Bar" />
    </div>
  );
}

function Stat({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "neon" | "hot" | "cyber" }) {
  const color = tone === "hot" ? "text-hot" : tone === "cyber" ? "text-cyber" : "text-neon";
  return (
    <div className="flex items-center justify-between rounded-lg border-2 border-foreground bg-background px-3 py-2">
      <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${color}`}>{icon} {label}</div>
      <div className="font-mono text-base font-black">{value}</div>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="font-display text-xl font-black uppercase">{title}</h2>
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function MilestoneTrack({ onClaim }: { onClaim: () => void }) {
  return (
    <div className="rounded-2xl border-2 border-foreground bg-card p-4 shadow-brutal">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Progress</span>
        <span className="font-display text-sm font-black text-neon glow-text-neon">3 / 5 Spots Hyped</span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full border-2 border-foreground bg-background">
        <div className="h-full bg-gradient-neon shadow-glow-neon" style={{ width: "60%" }} />
      </div>

      <div className="mt-5 flex justify-between gap-1">
        {MILESTONES.map((m) => (
          <div key={m.n} className="flex flex-1 flex-col items-center gap-1">
            <div className={`grid h-10 w-10 place-items-center rounded-xl border-2 border-foreground font-display text-xs font-black ${
              m.done ? "bg-neon text-neon-foreground shadow-brutal" :
              m.current ? "bg-hot text-hot-foreground shadow-brutal-hot animate-pulse-glow" :
              "bg-card text-muted-foreground"
            }`}>
              {m.done ? "✓" : m.n}
            </div>
            <div className="text-center text-[9px] font-bold uppercase leading-tight tracking-wider text-muted-foreground">{m.label}</div>
          </div>
        ))}
      </div>

      <button onClick={onClaim} className="mt-5 w-full rounded-xl border-2 border-foreground bg-hot px-4 py-3 font-display text-sm font-extrabold uppercase tracking-wide text-hot-foreground shadow-brutal-hot">
        Preview Next Reward
      </button>
    </div>
  );
}

function VaultPreview() {
  return (
    <div className="px-4 py-5">
      <VaultGrid />
    </div>
  );
}

import { VaultGrid } from "@/components/VaultGrid";
