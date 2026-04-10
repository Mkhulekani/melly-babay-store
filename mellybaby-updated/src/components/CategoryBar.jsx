/**
 * CategoryBar.jsx
 * ─────────────────────────────────────────────────
 * Horizontally scrollable category filter bar below the navbar.
 *
 * Props:
 *   activeCategory  {string}  Currently selected category id
 *   onChange        {fn}      Called with category id when clicked
 */

import React from 'react';
import { CATEGORIES } from '../data/categories';

export default function CategoryBar({ activeCategory, onChange }) {
  return (
    <div
      style={{
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        padding: '0 28px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: 1100,
          margin: '0 auto',
          whiteSpace: 'nowrap',
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const isHot    = cat.id === 'sale';
          const isCombo  = cat.id === 'combo';

          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: isActive
                  ? '2px solid var(--peach-dark)'
                  : '2px solid transparent',
                padding: '13px 16px',
                fontSize: 12.5,
                fontWeight: isActive ? 600 : 500,
                color: isActive
                  ? 'var(--peach-dark)'
                  : isHot
                  ? 'var(--rose)'
                  : isCombo
                  ? 'var(--sage)'
                  : 'var(--muted)',
                cursor: 'pointer',
                transition: 'color 0.2s, border-color 0.2s',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {cat.icon} {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
