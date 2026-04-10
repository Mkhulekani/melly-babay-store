/**
 * Footer.jsx
 * ─────────────────────────────────────────────────
 * Site footer with brand copy, nav links, and copyright.
 *
 * Props:
 *   onNavigate   {fn}  Navigate to a page
 *   onFilterCat  {fn}  Navigate to shop filtered by category
 */

import React from 'react';
import { CATEGORIES } from '../data/categories';

export default function Footer({ onNavigate, onFilterCat }) {
  const linkStyle = {
    display: 'block',
    fontSize: 12,
    color: 'rgba(255,255,255,.55)',
    marginBottom: 8,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: 0,
    fontFamily: 'var(--font-sans)',
    transition: 'color 0.2s',
  };

  return (
    <footer
      style={{
        background: 'var(--text)',
        color: 'rgba(255,255,255,.7)',
        padding: '44px 28px 24px',
        marginTop: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 32,
          marginBottom: 36,
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 20,
              fontWeight: 900,
              color: '#fff',
              marginBottom: 12,
            }}
          >
            MellyBabyShop
          </div>
          <p
            style={{
              fontSize: 12,
              lineHeight: 1.8,
              color: 'rgba(255,255,255,.5)',
              maxWidth: 260,
            }}
          >
            Premium baby products trusted by thousands of parents across South
            Africa and worldwide. Quality, love, and care in every product.
          </p>
        </div>

        {/* Shop links */}
        <div>
          <h4
            style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: '#fff',
              marginBottom: 14,
            }}
          >
            Shop
          </h4>
          {CATEGORIES.filter((c) => c.id !== 'all')
            .slice(0, 6)
            .map((c) => (
              <button
                key={c.id}
                style={linkStyle}
                onClick={() => onFilterCat(c.id)}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--peach)')}
                onMouseOut={(e)  => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}
              >
                {c.name}
              </button>
            ))}
        </div>

        {/* Company links */}
        <div>
          <h4
            style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: '#fff',
              marginBottom: 14,
            }}
          >
            Company
          </h4>
          {['About Us', 'Blog', 'Careers', 'Press'].map((label) => (
            <button
              key={label}
              style={linkStyle}
              onClick={() => onNavigate('about')}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--peach)')}
              onMouseOut={(e)  => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Help links */}
        <div>
          <h4
            style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: '#fff',
              marginBottom: 14,
            }}
          >
            Help
          </h4>
          {[
            { label: 'Customer Service', target: 'service' },
            { label: 'Track Order',      target: 'track'   },
            { label: 'Returns',          target: 'service' },
            { label: 'Shipping Info',    target: 'service' },
            { label: 'FAQ',              target: 'service' },
          ].map(({ label, target }) => (
            <button
              key={label}
              style={linkStyle}
              onClick={() => onNavigate(target)}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--peach)')}
              onMouseOut={(e)  => (e.currentTarget.style.color = 'rgba(255,255,255,.55)')}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,.1)',
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
          fontSize: 11,
          color: 'rgba(255,255,255,.35)',
        }}
      >
        <span>© 2026 MellyBabyShop. All rights reserved.</span>
        <span>🇿🇦 Made with love in South Africa</span>
      </div>
    </footer>
  );
}
