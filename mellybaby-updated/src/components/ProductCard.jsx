/**
 * ProductCard.jsx
 * ─────────────────────────────────────────────────
 * Displays a single product in the grid.
 *
 * Props:
 *   product       {object}  Product data object
 *   onSelect      {fn}      Opens product detail modal
 *   onAddToCart   {fn}      Adds product to cart
 *   onWishlist    {fn}      Adds product to wishlist (toast only, demo)
 *   categoryName  {string}  Human-readable category label
 */

import React from 'react';

export default function ProductCard({
  product,
  onSelect,
  onAddToCart,
  onWishlist,
  categoryName,
}) {
  const { name, price, oldPrice, emoji, img, badge, stock } = product;

  return (
    <div
      onClick={() => onSelect(product)}
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.25s, box-shadow 0.25s',
        position: 'relative',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {/* ── Product image / emoji ───────────────────────── */}
      <div
        style={{
          width: '100%',
          height: 180,
          background: 'var(--peach-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 60,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {img ? (
          <img
            src={img}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span>{emoji || '🍼'}</span>
        )}

        {/* Badge */}
        {badge === 'new'  && <span style={badgeStyle('#E8F5E9', '#2E7D32')}>NEW</span>}
        {badge === 'sale' && <span style={badgeStyle('var(--rose)', '#fff')}>SALE</span>}
        {badge === 'hot'  && <span style={badgeStyle('#FF6B35', '#fff')}>HOT 🔥</span>}

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(product); }}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 30,
            height: 30,
            fontSize: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,.1)',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
          onMouseOut={(e)  => (e.currentTarget.style.transform = '')}
          title="Add to wishlist"
        >
          🤍
        </button>
      </div>

      {/* ── Product info ───────────────────────────────── */}
      <div style={{ padding: '14px' }}>
        <div
          style={{
            fontSize: 10,
            color: 'var(--peach-dark)',
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          {categoryName}
        </div>

        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--text)',
            marginBottom: 6,
            lineHeight: 1.35,
          }}
        >
          {name}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <div>
            <span
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: 'var(--peach-dark)',
                fontFamily: 'var(--font-serif)',
              }}
            >
              R{price}
            </span>
            {oldPrice && (
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--muted)',
                  textDecoration: 'line-through',
                  marginLeft: 6,
                }}
              >
                R{oldPrice}
              </span>
            )}
          </div>

          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: 999,
              background: stock ? '#E8F5E9' : '#FFEBEE',
              color: stock ? '#2E7D32' : '#C62828',
            }}
          >
            {stock ? '✓ In stock' : 'Out'}
          </span>
        </div>

        {/* Add to cart button */}
        <button
          disabled={!stock}
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          style={{
            width: '100%',
            padding: 10,
            background: stock ? 'var(--peach-dark)' : '#DDD',
            color: stock ? '#fff' : '#999',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: 13,
            fontWeight: 600,
            cursor: stock ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s',
            fontFamily: 'var(--font-sans)',
          }}
          onMouseOver={(e) => {
            if (stock) e.currentTarget.style.background = 'var(--rose)';
          }}
          onMouseOut={(e) => {
            if (stock) e.currentTarget.style.background = 'var(--peach-dark)';
          }}
        >
          {stock ? 'Add to Cart 🛒' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────
function badgeStyle(bg, color) {
  return {
    position: 'absolute',
    top: 10,
    left: 10,
    background: bg,
    color,
    padding: '4px 10px',
    borderRadius: 999,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.3px',
  };
}
