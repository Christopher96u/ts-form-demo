import { Link, Outlet } from '@tanstack/react-router';
import { createRootRoute } from '@tanstack/react-router';

const RootLayout = () => (
  <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-white">
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
          Guided setup
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Three easy steps to request your mobile service
        </h1>
        <p className="text-base text-white/70">
          Navigate through the steps below. Step 2 hosts the interactive TanStack Form demo.
        </p>
      </header>
      <nav className="flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
        {[
          { to: '/step-1', label: 'Step 1' },
          { to: '/step-2', label: 'Step 2' },
          { to: '/step-3', label: 'Step 3' },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            preload="intent"
            className="flex-1 rounded-2xl px-4 py-2 text-center text-sm font-semibold text-white/70 transition hover:text-white"
            activeProps={{
              className:
                'flex-1 rounded-2xl bg-sky-400/15 px-4 py-2 text-center text-sm font-semibold text-sky-100 shadow-[0_10px_40px_rgba(56,189,248,0.35)]',
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  </div>
);

export const Route = createRootRoute({
  component: RootLayout,
});
