import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, Zap, Receipt, Film, X, MapPin, Check, Sparkles } from "lucide-react";
import { RewardUnlockModal } from "@/components/RewardUnlockModal";

export const Route = createFileRoute("/verify")({
  component: VerifyPage,
});

type Mode = "vibe" | "bill" | "reel";
type Stage = "capture" | "uploading" | "success";

const MODES: { id: Mode; label: string; sub: string; icon: typeof Camera }[] = [
  { id: "vibe", label: "Show the Vibe", sub: "Snap the scene", icon: Sparkles },
  { id: "bill", label: "Snap the Bill", sub: "Verify your visit", icon: Receipt },
  { id: "reel", label: "Drop a Reel", sub: "15s of energy", icon: Film },
];

function VerifyPage() {
  const [mode, setMode] = useState<Mode>("vibe");
  const [stage, setStage] = useState<Stage>("capture");
  const [progress, setProgress] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const navigate = useNavigate();

  const startUpload = () => {
    setStage("uploading");
    setProgress(0);
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(t); setStage("success"); return 100; }
        return p + 7;
      });
    }, 80);
  };

  if (stage === "success") {
    return (
      <SuccessScreen
        onClose={() => { setStage("capture"); navigate({ to: "/profile" }); }}
        onClaim={() => setShowReward(true)}
        modal={<RewardUnlockModal open={showReward} onClose={() => setShowReward(false)} perk="15% OFF" spot="Neon Noodle Bar" />}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-foreground">
      {/* fake camera viewfinder */}
      <div className="absolute inset-0 bg-gradient-hero opacity-70" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 scanlines" />
      <div className="scan-line absolute inset-x-0 top-0 h-full" />

      {/* corners */}
      {[
        "top-20 left-4 border-l-4 border-t-4",
        "top-20 right-4 border-r-4 border-t-4",
        "bottom-64 left-4 border-l-4 border-b-4",
        "bottom-64 right-4 border-r-4 border-b-4",
      ].map((c, i) => (
        <div key={i} className={`pointer-events-none absolute h-10 w-10 border-neon ${c}`} style={{ filter: "drop-shadow(0 0 6px var(--neon))" }} />
      ))}

      {/* top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-4">
        <button onClick={() => navigate({ to: "/" })} className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground bg-background/80 backdrop-blur">
          <X className="h-5 w-5" />
        </button>
        <div className="rounded-full border-2 border-foreground bg-background/80 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest backdrop-blur">
          <MapPin className="-mt-0.5 mr-1 inline h-3 w-3 text-neon" /> Neon Noodle Bar
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground bg-background/80 backdrop-blur">
          <Zap className="h-5 w-5 text-neon" />
        </div>
      </div>

      {/* center prompt */}
      <div className="relative z-10 mt-32 px-6 text-center">
        <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-background/80 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-hot" /> Live · Verify the Vibe
        </div>
        <h1 className="text-balance font-display text-4xl font-black uppercase leading-none glow-text-neon">
          {MODES.find((m) => m.id === mode)!.label}
        </h1>
        <p className="mt-2 text-sm font-medium text-foreground/80">
          {MODES.find((m) => m.id === mode)!.sub}
        </p>
      </div>

      {/* bottom controls */}
      <div className="absolute inset-x-0 bottom-28 z-10 px-4">
        <div className="mb-5 flex justify-center gap-2">
          {MODES.map((m) => {
            const active = m.id === mode;
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-1.5 rounded-full border-2 border-foreground px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition ${active ? "bg-neon text-neon-foreground shadow-brutal" : "bg-background/80 text-foreground backdrop-blur"}`}
              >
                <Icon className="h-3.5 w-3.5" /> {m.label.split(" ")[0]}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-around">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border-2 border-foreground bg-background/80 backdrop-blur">
            <Film className="h-5 w-5" />
          </div>
          <button
            onClick={startUpload}
            disabled={stage === "uploading"}
            className="relative grid h-24 w-24 place-items-center rounded-full border-4 border-foreground bg-background"
          >
            <div className="ring-verified absolute inset-0 rounded-full" />
            <div className="absolute inset-1 rounded-full bg-background" />
            {stage === "uploading" ? (
              <div className="relative font-mono text-sm font-black">{progress}%</div>
            ) : (
              <div className="relative h-16 w-16 rounded-full bg-gradient-hot shadow-brutal-hot" />
            )}
          </button>
          <div className="grid h-12 w-12 place-items-center rounded-2xl border-2 border-foreground bg-background/80 backdrop-blur">
            <Camera className="h-5 w-5" />
          </div>
        </div>

        {stage === "uploading" && (
          <div className="mt-5">
            <div className="h-3 overflow-hidden rounded-full border-2 border-foreground bg-background">
              <div className="h-full bg-gradient-neon transition-[width] duration-150" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-2 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/80">
              Uploading proof · verifying vibe
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SuccessScreen({ onClose, onClaim, modal }: { onClose: () => void; onClaim: () => void; modal: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      <div className="absolute inset-0 grid-bg" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="animate-pop-in">
          <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border-4 border-foreground bg-neon shadow-brutal animate-pulse-glow">
            <Check className="h-14 w-14 text-neon-foreground" strokeWidth={3.5} />
          </div>
        </div>

        <h1 className="mt-8 font-display text-5xl font-black uppercase leading-none">
          <span className="shimmer-text">Vibe</span><br /> Verified
        </h1>
        <p className="mt-3 max-w-xs text-sm text-muted-foreground">
          Your proof was logged. +120 XP added to your Hype Identity.
        </p>

        <div className="mt-8 w-full max-w-sm rounded-2xl border-2 border-foreground bg-card p-4 shadow-brutal">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
            <span className="text-muted-foreground">Milestone Track</span>
            <span className="text-neon">3 / 5 Spots Hyped</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full border-2 border-foreground bg-background">
            <div className="h-full bg-gradient-neon shadow-glow-neon" style={{ width: "60%", transition: "width 1.2s ease-out" }} />
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            2 more vibes to unlock <span className="font-bold text-foreground">15% off at Neon Noodle Bar</span>
          </div>
        </div>

        <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
          <button onClick={onClaim} className="rounded-2xl border-2 border-foreground bg-hot px-5 py-4 font-display text-lg font-extrabold uppercase tracking-wide text-hot-foreground shadow-brutal-hot">
            Preview Reward
          </button>
          <button onClick={onClose} className="rounded-2xl border-2 border-foreground bg-card px-5 py-3 font-display text-sm font-bold uppercase tracking-wide hover:bg-muted">
            See My Profile
          </button>
        </div>
      </div>
      {modal}
    </div>
  );
}
