import { createFileRoute } from "@tanstack/react-router";
import { VaultGrid } from "@/components/VaultGrid";

export const Route = createFileRoute("/vault")({
  component: VaultPage,
});

function VaultPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b-2 border-border bg-background/85 px-4 py-4 backdrop-blur-xl">
        <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Your stash</div>
        <h1 className="font-display text-3xl font-black uppercase leading-none">
          The <span className="shimmer-text">Vault</span>
        </h1>
      </header>
      <div className="px-4 py-5">
        <VaultGrid />
      </div>
    </div>
  );
}
