/**
 * ProductModal.jsx
 * ─────────────────────────────────────────────────
 * Full-screen overlay showing product details.
 *
 * Props:
 *   product       {object}  Product to display
 *   categoryName  {string}  Human-readable category
 *   onClose       {fn}      Dismiss the modal
 *   onAddToCart   {fn}      Add product to cart
 */

import React from 'react';

export default function ProductModal({
  product,
  categoryName,
  onClose,
  onAddToCart,
}) {
  if (!product) return null;

  const { name, price, oldPrice, emoji, img, badge, stock, desc } = product;

  return (
    <div
      className="overlay"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 22,
          width: '100%',
          maxWidth: 500,
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'slideUp 0.25s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px 0',
          }}
        >
          <span
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: 'var(--text)',
              fontFamily: 'var(--font-serif)',
            }}
          >
            {name}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'var(--cream)',
              border: 'none',
              width: 32,
              height: 32,
              borderRadius: '50%',
              fontSize: 18,
              cursor: 'pointer',
              color: 'var(--muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Image */}
        <div
          style={{
            width: '100%',
            height: 220,
            background: 'var(--peach-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 80,
            margin: '16px 0',
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
        </div>

        {/* Body */}
        <div style={{ padding: '0 24px 28px' }}>
          <div
            style={{
              fontSize: 11,
              color: 'var(--peach-dark)',
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: '0.6px',
              marginBottom: 5,
            }}
          >
            {categoryName}
          </div>

          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: 'var(--text)',
              marginBottom: 8,
              fontFamily: 'var(--font-serif)',
            }}
          >
            {name}
            {badge === 'new'  && <BadgePill bg="#E8F5E9" color="#2E7D32">NEW</BadgePill>}
            {badge === 'sale' && <BadgePill bg="var(--rose)" color="#fff">SALE</BadgePill>}
            {badge === 'hot'  && <BadgePill bg="#FF6B35" color="#fff">HOT 🔥</BadgePill>}
          </div>

          <div style={{ marginBottom: 12 }}>
            <span
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: 'var(--peach-dark)',
                fontFamily: 'var(--font-serif)',
              }}
            >
              R{price}
            </span>
            {oldPrice && (
              <span
                style={{
                  fontSize: 14,
                  color: 'var(--muted)',
                  textDecoration: 'line-through',
                  marginLeft: 10,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                R{oldPrice}
              </span>
            )}
          </div>

          <p
            style={{
              fontSize: 13,
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: 18,
            }}
          >
            {desc || 'A quality baby product from MellyBabyShop.'}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: stock ? 'var(--sage)' : 'var(--rose)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: stock ? 'var(--sage)' : 'var(--rose)',
              }}
            >
              {stock ? 'In stock — ready to ship' : 'Out of stock'}
            </span>
          </div>

          <button
            disabled={!stock}
            onClick={() => { onAddToCart(product); onClose(); }}
            style={{
              width: '100%',
              padding: 15,
              background: stock ? 'var(--peach-dark)' : '#DDD',
              color: stock ? '#fff' : '#999',
              border: 'none',
              borderRadius: 14,
              fontSize: 15,
              fontWeight: 700,
              cursor: stock ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s, transform 0.2s',
              fontFamily: 'var(--font-sans)',
            }}
            onMouseOver={(e) => {
              if (stock) {
                e.currentTarget.style.background = 'var(--rose)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseOut={(e) => {
              if (stock) {
                e.currentTarget.style.background = 'var(--peach-dark)';
                e.currentTarget.style.transform = '';
              }
            }}
          >
            {stock ? 'Add to Cart 🛒' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

function BadgePill({ bg, color, children }) {
  return (
    <span
      style={{
        fontSize: 11,
        marginLeft: 8,
        padding: '3px 10px',
        borderRadius: 999,
        background: bg,
        color,
        fontWeight: 700,
        fontFamily: 'var(--font-sans)',
        verticalAlign: 'middle',
      }}
    >
      {children}
    </span>
  );
}
