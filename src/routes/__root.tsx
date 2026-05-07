import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { BottomNav } from "@/components/BottomNav";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-black text-stroke">404</h1>
        <h2 className="mt-4 font-display text-xl font-bold uppercase tracking-wide">Lost the vibe</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page hasn't been hyped yet.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl border-2 border-foreground bg-neon px-5 py-3 font-display text-sm font-extrabold uppercase tracking-wide text-neon-foreground shadow-brutal"
          >
            Back to Feed
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-bold uppercase">Vibe interrupted</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-2xl border-2 border-foreground bg-neon px-5 py-3 font-display text-sm font-extrabold uppercase text-neon-foreground shadow-brutal"
          >
            Try again
          </button>
          <a href="/" className="rounded-2xl border-2 border-foreground bg-card px-5 py-3 font-display text-sm font-bold uppercase">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "HypeTribe — Proof of Vibe" },
      { name: "description", content: "Verify your vibe, earn clout, unlock perks. Gen Z local discovery." },
      { name: "theme-color", content: "#0d0a1a" },
      { property: "og:title", content: "HypeTribe — Proof of Vibe" },
      { property: "og:description", content: "Snap the vibe. Earn the clout. Unlock the city." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto min-h-screen max-w-md bg-background pb-28">
        <Outlet />
        <BottomNav />
      </div>
    </QueryClientProvider>
  );
}
