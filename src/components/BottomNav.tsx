import { Link, useLocation } from "@tanstack/react-router";
import { Compass, User, Vault, Camera, Store } from "lucide-react";

const items = [
  { to: "/", label: "Feed", icon: Compass },
  { to: "/vault", label: "Vault", icon: Vault },
  { to: "/verify", label: "Verify", icon: Camera, primary: true },
  { to: "/profile", label: "Hype", icon: User },
  { to: "/merchant", label: "Shop", icon: Store },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-end justify-between px-4 pb-3 pt-2">
        {items.map(({ to, label, icon: Icon, primary }) => {
          const active = pathname === to;
          if (primary) {
            return (
              <Link key={to} to={to} className="-mt-8">
                <div className="flex flex-col items-center gap-1">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-foreground bg-gradient-hot shadow-brutal-hot animate-pulse-glow">
                    <Icon className="h-7 w-7 text-hot-foreground" strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">{label}</span>
                </div>
              </Link>
            );
          }
          return (
            <Link key={to} to={to} className="flex flex-col items-center gap-1 px-2 py-1">
              <Icon className={`h-5 w-5 ${active ? "text-neon" : "text-muted-foreground"}`} strokeWidth={2.5} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? "text-neon glow-text-neon" : "text-muted-foreground"}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
