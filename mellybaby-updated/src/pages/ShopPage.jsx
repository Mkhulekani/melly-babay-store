/**
 * ShopPage.jsx
 * ─────────────────────────────────────────────────
 * Full product catalog with search + category filtering.
 */

import React from 'react';
import ProductCard from '../components/ProductCard';

export default function ShopPage({
  products,
  search,
  onSearch,
  activeCategory,
  activeCategoryName,
  onSelectProd,
  onAddToCart,
  onWishlist,
  getCatName,
}) {
  return (
    <div className="section">
      {/* Search bar */}
      <div
        style={{
          display: 'flex',
          background: '#fff',
          borderRadius: 16,
          border: '1.5px solid var(--border)',
          overflow: 'hidden',
          maxWidth: 500,
          marginBottom: 20,
        }}
      >
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search products…"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            padding: '13px 18px',
            fontSize: 14,
            fontFamily: 'var(--font-sans)',
          }}
        />
        <button
          style={{
            background: 'var(--peach-dark)',
            color: '#fff',
            border: 'none',
            padding: '13px 20px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
          }}
        >
          Search
        </button>
      </div>

      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
        {products.length} product{products.length !== 1 ? 's' : ''} ·{' '}
        {activeCategoryName}
      </p>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>
            No products found
          </p>
          <p style={{ fontSize: 13, marginTop: 6 }}>
            Try a different search term or category
          </p>
          <button
            className="btn-primary"
            style={{ marginTop: 20 }}
            onClick={() => onSearch('')}
          >
            Clear search
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 18,
          }}
        >
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              categoryName={getCatName(p.category)}
              onSelect={onSelectProd}
              onAddToCart={onAddToCart}
              onWishlist={onWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
