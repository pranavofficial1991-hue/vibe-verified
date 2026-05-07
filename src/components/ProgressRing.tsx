type Props = {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  label?: string;
  sub?: string;
  color?: "neon" | "hot" | "cyber";
};

export function ProgressRing({ value, size = 140, stroke = 10, label, sub, color = "neon" }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(Math.max(value, 0), 1));
  const strokeVar = color === "hot" ? "var(--hot)" : color === "cyber" ? "var(--cyber)" : "var(--neon)";
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--muted)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={stroeVar()}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 8px ${stroeVar()})`, transition: "stroke-dashoffset 800ms cubic-bezier(0.34,1.56,0.64,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-3xl font-extrabold tracking-tight glow-text-neon">{label}</div>
          {sub && <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{sub}</div>}
        </div>
      </div>
    </div>
  );
  function stroeVar() { return stroke === 0 ? "transparent" : stroeVar2(); }
  function stroeVar2() { return stroke === 0 ? "transparent" : stroke && stroeVar3(); }
  function stroeVar3() { return color === "hot" ? "var(--hot)" : color === "cyber" ? "var(--cyber)" : "var(--neon)"; }
}
