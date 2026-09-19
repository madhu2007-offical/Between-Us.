import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AppProvider } from './context/AppContext';
import './index.css';

// Global error catcher for diagnosing startup issues
window.addEventListener('error', (e) => {
  console.error('Global Application Error:', e.error || e.message);
  const root = document.getElementById('root');
  if (root && !root.hasChildNodes()) {
    root.innerHTML = `
      <div style="padding: 24px; font-family: sans-serif; background: #FFF5F5; color: #9B1C1C; min-height: 100vh;">
        <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">Startup Error</h2>
        <p style="font-size: 14px; margin-bottom: 12px;">${e.message || 'An error occurred during startup.'}</p>
        <pre style="background: white; padding: 12px; border-radius: 8px; font-size: 11px; overflow-x: auto; border: 1px solid #FED7D7;">${e.error?.stack || ''}</pre>
        <button onclick="localStorage.clear(); sessionStorage.clear(); window.location.reload();" style="margin-top: 16px; padding: 8px 16px; background: #E02424; color: white; border: none; border-radius: 9999px; font-weight: bold; cursor: pointer;">Reset Storage & Reload</button>
      </div>
    `;
  }
});

// Register Service Worker for PWA offline resiliency
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.log('Service Worker registration skipped:', err);
    });
  });
}

try {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  );
} catch (err: any) {
  console.error('Failed to mount React application:', err);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 24px; font-family: sans-serif; background: #FFF5F5; color: #9B1C1C; min-height: 100vh;">
        <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">Mount Error</h2>
        <p style="font-size: 14px; margin-bottom: 12px;">${err.message || 'React mount failed.'}</p>
        <pre style="background: white; padding: 12px; border-radius: 8px; font-size: 11px; overflow-x: auto; border: 1px solid #FED7D7;">${err.stack || ''}</pre>
      </div>
    `;
  }
}
