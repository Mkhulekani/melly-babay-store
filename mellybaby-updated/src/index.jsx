/**
 * index.jsx
 * ─────────────────────────────────────────────────
 * React DOM entry point. Mounts <App /> into #root.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
