import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Heart, MessageCircle, Send, MapPin, Flame, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: FeedPage,
});

type Post = {
  id: string;
  user: string;
  handle: string;
  avatar: string;
  spot: string;
  caption: string;
  img: string;
  likes: number;
  verified: boolean;
  badge: string;
  perk?: string;
};

const POSTS: Post[] = [
  {
    id: "1", user: "Maya", handle: "@mayavibes", avatar: "M",
    spot: "Brew & Co · 0.4mi", caption: "matcha hit different here ☕✨ #provedthevibe",
    img: "linear-gradient(135deg, oklch(0.78 0.18 145), oklch(0.62 0.2 180))",
    likes: 1284, verified: true, badge: "Local Legend", perk: "15% OFF",
  },
  {
    id: "2", user: "Ravi", handle: "@ravisnaps", avatar: "R",
    spot: "Neon Noodle Bar · 1.2mi", caption: "ramen so good i had to drop a reel 🍜",
    img: "linear-gradient(135deg, oklch(0.72 0.28 350), oklch(0.62 0.28 305))",
    likes: 842, verified: true, badge: "Trusted Vibe Checker",
  },
  {
    id: "3", user: "Zoe", handle: "@zoeexplores", avatar: "Z",
    spot: "Skyline Roof · 2.0mi", caption: "sunset > everything 🌇",
    img: "linear-gradient(135deg, oklch(0.78 0.18 60), oklch(0.62 0.24 25))",
    likes: 521, verified: false, badge: "Explorer",
  },
];

function FeedPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Stories />
      <div className="space-y-5 px-4 pb-6">
        {POSTS.map((p) => <PostCard key={p.id} post={p} />)}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-border bg-background/85 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <div className="font-display text-2xl font-black leading-none">
            <span className="text-foreground">Hype</span><span className="shimmer-text">Tribe</span>
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <MapPin className="h-3 w-3 text-neon" /> Bandra West
          </div>
        </div>
        <Link to="/profile" className="grid h-11 w-11 place-items-center rounded-full border-2 border-foreground bg-gradient-hot font-display text-sm font-black text-hot-foreground shadow-brutal-hot">
          M
        </Link>
      </div>
    </header>
  );
}

function Stories() {
  const items = [
    { name: "You", color: "var(--neon)" },
    { name: "Maya", color: "var(--hot)" },
    { name: "Ravi", color: "var(--cyber)" },
    { name: "Zoe", color: "var(--accent)" },
    { name: "Kai", color: "var(--neon)" },
    { name: "Sia", color: "var(--hot)" },
  ];
  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-4">
      {items.map((s, i) => (
        <div key={i} className="flex shrink-0 flex-col items-center gap-1.5">
          <div className="ring-verified rounded-full p-[2px]">
            <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-background bg-card font-display text-base font-black" style={{ color: s.color }}>
              {s.name[0]}
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.name}</span>
        </div>
      ))}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-brutal">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className={`rounded-full ${post.verified ? "ring-verified p-[2px]" : "p-[2px]"}`}>
            <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-background bg-gradient-hot font-display text-sm font-black text-hot-foreground">
              {post.avatar}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 font-display text-sm font-bold">
              {post.user}
              {post.verified && (
                <span title="Authorized Vibe">
                  <ShieldCheck className="h-4 w-4 text-neon" strokeWidth={2.8} />
                </span>
              )}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{post.spot}</div>
          </div>
        </div>
        <div className="rounded-md border-2 border-foreground bg-background px-2 py-1 font-mono text-[9px] font-bold uppercase">
          {post.badge}
        </div>
      </div>

      <div className="relative aspect-square w-full" style={{ background: post.img }}>
        <div className="absolute inset-0 grid-bg opacity-30" />
        {post.verified && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full border-2 border-foreground bg-background/90 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-widest backdrop-blur">
            <Sparkles className="h-3 w-3 text-neon" /> Proof of Vibe
          </div>
        )}
        {post.perk && (
          <div className="absolute right-3 top-3 rounded-md border-2 border-foreground bg-neon px-2 py-1 font-mono text-[10px] font-black uppercase text-neon-foreground shadow-brutal">
            {post.perk}
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full border-2 border-foreground bg-hot px-2 py-1 font-mono text-[9px] font-black uppercase text-hot-foreground">
          <Flame className="h-3 w-3" /> Hyped
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-foreground"><Heart className="h-5 w-5" /> <span className="font-mono text-xs font-bold">{post.likes}</span></button>
          <button className="flex items-center gap-1.5 text-foreground"><MessageCircle className="h-5 w-5" /> <span className="font-mono text-xs font-bold">42</span></button>
          <button className="ml-auto"><Send className="h-5 w-5" /></button>
        </div>
        <p className="mt-2 text-sm">
          <span className="font-bold">{post.handle}</span> <span className="text-muted-foreground">{post.caption}</span>
        </p>
      </div>
    </article>
  );
}
