import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MobileForm } from './mobile-form';

export default function App() {
  return (
    <div className="container mx-auto space-y-8">
      <h1 className="text-center text-lg font-bold">Complex Form Example</h1>
      <div className="border rounded-lg p-6">
      <MobileForm/>
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
