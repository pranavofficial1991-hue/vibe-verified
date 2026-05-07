import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, Sparkles, MapPin } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  perk: string;
  spot: string;
};

export function RewardUnlockModal({ open, onClose, perk, spot }: Props) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (open) setShow(true); }, [open]);
  const confetti = useMemo(
    () => Array.from({ length: 28 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      hue: ["var(--neon)", "var(--hot)", "var(--cyber)", "var(--accent)"][i % 4],
      rotate: Math.random() * 360,
    })),
    [open],
  );
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-md p-4">
      {/* confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((c, i) => (
          <div
            key={i}
            className="absolute h-3 w-2 animate-confetti"
            style={{
              left: `${c.left}%`,
              top: -20,
              background: c.hue,
              transform: `rotate(${c.rotate}deg)`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </div>

      <div className={`relative w-full max-w-sm rounded-3xl border-2 border-foreground bg-card p-6 shadow-brutal-hot ${show ? "animate-pop-in" : ""}`}>
        <button onClick={onClose} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border-2 border-foreground bg-background hover:bg-muted">
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 flex justify-center">
          <div className="rounded-full border-2 border-foreground bg-gradient-hot px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-hot-foreground">
            <Sparkles className="-mt-0.5 mr-1 inline h-3 w-3" /> Milestone Hit
          </div>
        </div>

        <h2 className="text-balance text-center font-display text-4xl font-black uppercase leading-none">
          You <span className="shimmer-text">unlocked</span><br />
          <span className="text-hot glow-text-hot">{perk}</span>
        </h2>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Redeem at <span className="font-bold text-foreground">{spot}</span> on your next vibe check.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button className="w-full rounded-2xl border-2 border-foreground bg-neon px-5 py-4 font-display text-lg font-extrabold uppercase tracking-wide text-neon-foreground shadow-brutal transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none">
            Claim Now
          </button>
          <Link
            to="/vault"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-foreground bg-card px-5 py-3 font-display text-sm font-bold uppercase tracking-wide hover:bg-muted"
          >
            <MapPin className="h-4 w-4" /> Add to Itinerary
          </Link>
        </div>
      </div>
    </div>
  );
}
