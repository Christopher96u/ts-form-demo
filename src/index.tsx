import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MobileForm } from './mobile-form';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
            Mobile onboarding
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Seamless number transfer with confidence
          </h1>
          <p className="text-base text-white/70">
            Conditional flows, async verification, and schema-backed validation combined in a single responsive experience.
          </p>
        </header>
        <MobileForm />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root')!;
const queryClient = new QueryClient();

createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>
);
