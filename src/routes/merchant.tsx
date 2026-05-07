import { createFileRoute } from "@tanstack/react-router";
import { Users, TrendingUp, ShieldCheck, MoreHorizontal, Camera, Sparkles } from "lucide-react";

export const Route = createFileRoute("/merchant")({
  component: MerchantPage,
});

const PROOFS = [
  { user: "Maya", handle: "@mayavibes", time: "2m", grad: "linear-gradient(135deg, oklch(0.78 0.18 145), oklch(0.62 0.2 180))", verified: true, type: "Reel" },
  { user: "Ravi", handle: "@ravisnaps", time: "14m", grad: "linear-gradient(135deg, oklch(0.72 0.28 350), oklch(0.62 0.28 305))", verified: true, type: "Photo" },
  { user: "Zoe", handle: "@zoeexplores", time: "1h", grad: "linear-gradient(135deg, oklch(0.78 0.18 60), oklch(0.62 0.24 25))", verified: true, type: "Bill" },
  { user: "Kai", handle: "@kaikonnect", time: "3h", grad: "linear-gradient(135deg, oklch(0.78 0.18 220), oklch(0.62 0.28 305))", verified: false, type: "Photo" },
];

function MerchantPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b-2 border-foreground bg-gradient-hero px-4 pb-5 pt-4">
        <div className="absolute right-4 top-4">
          <button className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground bg-background/80 backdrop-blur"><MoreHorizontal className="h-4 w-4" /></button>
        </div>
        <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-background/80">Merchant Dashboard</div>
        <h1 className="font-display text-3xl font-black uppercase leading-none text-background">Neon Noodle Bar</h1>
        <div className="mt-1 inline-flex items-center gap-1 rounded-md border-2 border-foreground bg-background px-2 py-0.5 font-mono text-[10px] font-black uppercase">
          <ShieldCheck className="h-3 w-3 text-neon" /> Verified Partner
        </div>
      </header>

      <div className="grid grid-cols-3 gap-2 px-4 py-4">
        <Kpi icon={<Users className="h-4 w-4" />} label="Footfall" value="248" delta="+18%" />
        <Kpi icon={<Sparkles className="h-4 w-4" />} label="Proofs" value="142" delta="+24%" tone="hot" />
        <Kpi icon={<TrendingUp className="h-4 w-4" />} label="Reach" value="38K" delta="+9%" tone="cyber" />
      </div>

      <section className="px-4 pb-4">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-black uppercase">Verified Proofs</h2>
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Live receipts of your hype</p>
          </div>
          <span className="rounded-md border-2 border-foreground bg-neon px-2 py-0.5 font-mono text-[10px] font-black uppercase text-neon-foreground">142 this wk</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {PROOFS.map((p, i) => (
            <article key={i} className="overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-brutal">
              <div className="relative aspect-[4/5]" style={{ background: p.grad }}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute left-2 top-2 rounded-md border-2 border-foreground bg-background px-1.5 py-0.5 font-mono text-[9px] font-black uppercase">{p.type}</div>
                {p.verified && (
                  <div className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full border-2 border-foreground bg-neon shadow-brutal">
                    <ShieldCheck className="h-3.5 w-3.5 text-neon-foreground" strokeWidth={3} />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded-lg border-2 border-foreground bg-background/85 px-2 py-1 backdrop-blur">
                  <div>
                    <div className="font-display text-xs font-black leading-none">{p.user}</div>
                    <div className="font-mono text-[9px] font-bold uppercase text-muted-foreground">{p.handle}</div>
                  </div>
                  <div className="font-mono text-[9px] font-bold uppercase text-muted-foreground">{p.time}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border-2 border-foreground bg-card p-4 shadow-brutal">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl border-2 border-foreground bg-gradient-hot">
              <Camera className="h-5 w-5 text-hot-foreground" />
            </div>
            <div className="flex-1">
              <div className="font-display text-sm font-black uppercase">Transparent Billing</div>
              <p className="text-xs text-muted-foreground">Every fee is backed by a verified user upload above. No POS, no guesswork.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Kpi({ icon, label, value, delta, tone = "neon" }: { icon: React.ReactNode; label: string; value: string; delta: string; tone?: "neon" | "hot" | "cyber" }) {
  const color = tone === "hot" ? "text-hot" : tone === "cyber" ? "text-cyber" : "text-neon";
  return (
    <div className="rounded-2xl border-2 border-foreground bg-card p-3 shadow-brutal">
      <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${color}`}>{icon} {label}</div>
      <div className="mt-1 font-display text-2xl font-black leading-none">{value}</div>
      <div className="mt-1 font-mono text-[10px] font-bold uppercase text-muted-foreground">{delta}</div>
    </div>
  );
}
