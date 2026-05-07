import { Lock, Ticket, Coffee, Pizza, Music, Sparkles } from "lucide-react";

type Perk = {
  id: string;
  spot: string;
  perk: string;
  expires: string;
  icon: typeof Coffee;
  tone: "neon" | "hot" | "cyber" | "accent";
  locked?: boolean;
};

const PERKS: Perk[] = [
  { id: "1", spot: "Brew & Co", perk: "Free Matcha", expires: "3d left", icon: Coffee, tone: "neon" },
  { id: "2", spot: "Neon Noodle Bar", perk: "15% OFF Bowl", expires: "5d left", icon: Pizza, tone: "hot" },
  { id: "3", spot: "Skyline Roof", perk: "BOGO Cocktails", expires: "7d left", icon: Sparkles, tone: "cyber" },
  { id: "4", spot: "Vinyl Lounge", perk: "VIP Entry", expires: "Locked", icon: Music, tone: "accent", locked: true },
];

export function VaultGrid() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border-2 border-foreground bg-gradient-vault p-4 shadow-brutal">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-background/80">Your Vault</div>
            <div className="font-display text-3xl font-black text-background">3 Live Perks</div>
          </div>
          <div className="grid h-14 w-14 place-items-center rounded-2xl border-2 border-background bg-background">
            <Ticket className="h-7 w-7 text-neon" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {PERKS.map((p) => <PerkCard key={p.id} perk={p} />)}
      </div>
    </div>
  );
}

function PerkCard({ perk }: { perk: Perk }) {
  const Icon = perk.icon;
  const bg =
    perk.tone === "hot" ? "bg-gradient-hot" :
    perk.tone === "cyber" ? "bg-cyber" :
    perk.tone === "accent" ? "bg-accent" :
    "bg-gradient-neon";
  return (
    <div className={`relative overflow-hidden rounded-2xl border-2 border-foreground bg-card p-4 shadow-brutal ${perk.locked ? "opacity-60" : ""}`}>
      <div className="flex items-center gap-4">
        <div className={`relative grid h-16 w-16 shrink-0 place-items-center rounded-xl border-2 border-foreground ${bg}`}>
          <Icon className="h-7 w-7 text-background" strokeWidth={2.5} />
          {perk.locked && (
            <div className="absolute inset-0 grid place-items-center rounded-xl bg-background/70 backdrop-blur">
              <Lock className="h-5 w-5" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="font-display text-lg font-black uppercase leading-tight">{perk.perk}</div>
          <div className="text-xs text-muted-foreground">at <span className="font-bold text-foreground">{perk.spot}</span></div>
          <div className="mt-1 inline-block rounded-md border-2 border-foreground bg-background px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest">
            {perk.expires}
          </div>
        </div>
      </div>

      {!perk.locked && (
        <button className="mt-3 w-full rounded-xl border-2 border-foreground bg-foreground px-4 py-2.5 font-display text-xs font-extrabold uppercase tracking-wider text-background">
          Redeem
        </button>
      )}

      {/* coupon notch */}
      <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-foreground bg-background" />
      <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-2 border-foreground bg-background" />
    </div>
  );
}
