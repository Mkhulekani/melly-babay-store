/**
 * CollectionsPage.jsx
 * ─────────────────────────────────────────────────
 * Visual grid of all product collections / categories.
 *
 * Props:
 *   products      {Array}  Full product list (used for counts)
 *   onFilterCat   {fn}     Navigate to shop filtered by category id
 */

import React from 'react';
import { CATEGORIES } from '../data/categories';

export default function CollectionsPage({ products, onFilterCat }) {
  const countForCategory = (catId) =>
    catId === 'sale'
      ? products.filter((p) => p.badge === 'sale').length
      : products.filter((p) => p.category === catId).length;

  return (
    <div className="section">
      <h2 className="section-title" style={{ marginBottom: 8 }}>
        Our <span>Collections</span>
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 32 }}>
        Carefully curated product lines for every stage of your baby's journey.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 20,
        }}
      >
        {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
          <div
            key={cat.id}
            onClick={() => onFilterCat(cat.id)}
            style={{
              background: '#fff',
              borderRadius: 20,
              border: '1px solid var(--border)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform  = 'translateY(-4px)';
              e.currentTarget.style.boxShadow  = 'var(--shadow-hover)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            {/* Banner */}
            <div
              style={{
                background: 'var(--peach-light)',
                height: 110,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 52,
              }}
            >
              {cat.icon}
            </div>

            {/* Info */}
            <div style={{ padding: '16px 18px' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                {cat.name}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
                {countForCategory(cat.id)} product
                {countForCategory(cat.id) !== 1 ? 's' : ''}
              </div>
              <div style={{ fontSize: 12, color: 'var(--peach-dark)', fontWeight: 700 }}>
                Shop now →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
