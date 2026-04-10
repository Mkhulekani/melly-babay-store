/**
 * Toast.jsx
 * ─────────────────────────────────────────────────
 * Fixed bottom-centre notification banner.
 * Rendered by App.jsx; controlled via useToast hook.
 *
 * Props:
 *   message  {string}  Text to display
 */

import React from 'react';

const styles = {
  toast: {
    position: 'fixed',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#2A1F1A',
    color: '#fff',
    padding: '10px 22px',
    borderRadius: 999,
    fontSize: 13,
    zIndex: 999,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    animation: 'toastFade 2.6s forwards',
  },
};

// Inject the keyframe once
if (typeof document !== 'undefined' && !document.getElementById('toast-kf')) {
  const s = document.createElement('style');
  s.id = 'toast-kf';
  s.textContent = `
    @keyframes toastFade {
      0%   { opacity: 0; transform: translateX(-50%) translateY(8px); }
      12%  { opacity: 1; transform: translateX(-50%) translateY(0); }
      80%  { opacity: 1; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(s);
}

export default function Toast({ message }) {
  if (!message) return null;
  return <div style={styles.toast}>{message}</div>;
}
