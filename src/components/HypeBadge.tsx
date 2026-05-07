import { ShieldCheck, Star, Crown, Flame, Compass, Sparkles } from "lucide-react";

const ICONS = {
  explorer: Compass,
  trusted: ShieldCheck,
  legend: Crown,
  streak: Flame,
  star: Star,
  vibe: Sparkles,
} as const;

type Tier = "bronze" | "silver" | "gold" | "legendary";

const TIER: Record<Tier, { from: string; to: string; ring: string; label: string }> = {
  bronze:    { from: "oklch(0.72 0.16 50)",  to: "oklch(0.55 0.15 30)",  ring: "var(--secondary)", label: "Lvl 1" },
  silver:    { from: "oklch(0.85 0.04 240)", to: "oklch(0.6 0.04 240)",  ring: "var(--cyber)",     label: "Lvl 2" },
  gold:      { from: "var(--neon)",          to: "oklch(0.72 0.18 90)",  ring: "var(--neon)",      label: "Lvl 3" },
  legendary: { from: "var(--hot)",           to: "var(--accent)",        ring: "var(--hot)",       label: "MAX"  },
};

export type BadgeProps = {
  icon: keyof typeof ICONS;
  tier: Tier;
  title: string;
  size?: "sm" | "md" | "lg";
  earned?: boolean;
};

export function HypeBadge({ icon, tier, title, size = "md", earned = true }: BadgeProps) {
  const Icon = ICONS[icon];
  const t = TIER[tier];
  const dim = size === "sm" ? 56 : size === "lg" ? 112 : 80;
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`relative grid place-items-center rounded-2xl border-2 border-foreground ${earned ? "" : "opacity-40 grayscale"}`}
        style={{
          width: dim,
          height: dim,
          background: `linear-gradient(135deg, ${t.from}, ${t.to})`,
          boxShadow: earned
            ? `4px 4px 0 0 var(--background), 4px 4px 0 2px ${t.ring}, 0 0 28px color-mix(in oklab, ${t.ring} 55%, transparent)`
            : "4px 4px 0 0 var(--background), 4px 4px 0 2px var(--border)",
        }}
      >
        <Icon className="text-background" style={{ width: dim * 0.45, height: dim * 0.45 }} strokeWidth={2.5} />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-md border-2 border-foreground bg-background px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider">
          {t.label}
        </div>
      </div>
      {size !== "sm" && (
        <div className="text-center text-[11px] font-bold uppercase tracking-wider text-foreground">{title}</div>
      )}
    </div>
  );
}
