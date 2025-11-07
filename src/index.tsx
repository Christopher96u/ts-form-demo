import * as React from 'react';
import { createRoot } from 'react-dom/client';
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

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
