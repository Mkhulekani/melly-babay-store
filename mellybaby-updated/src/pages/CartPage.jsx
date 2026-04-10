/**
 * CartPage.jsx
 * ─────────────────────────────────────────────────
 * Shopping cart with quantity controls, shipping calculator,
 * and checkout button.
 *
 * Props:
 *   cart          {Array}   Cart items [{ ...product, qty }]
 *   onChangeQty   {fn}      (id, delta) => void
 *   onCheckout    {fn}      Place order callback
 *   onNavigate    {fn}      Navigation helper (go to shop)
 */

import React from 'react';

const FREE_SHIPPING_THRESHOLD = 500;
const FLAT_SHIPPING_RATE      = 60;

export default function CartPage({ cart, onChangeQty, onCheckout, onNavigate }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping  = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
  const total     = subtotal + shipping;

  // ── Empty state ──────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 28px',
          color: 'var(--muted)',
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 16 }}>🛒</div>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: 8,
          }}
        >
          Your cart is empty
        </p>
        <p style={{ fontSize: 14 }}>Go find something cute for your little one!</p>
        <button
          className="btn-primary"
          style={{ marginTop: 24 }}
          onClick={() => onNavigate('shop')}
        >
          Start Shopping →
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px 28px', maxWidth: 700, margin: '0 auto' }}>
      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 28,
          fontWeight: 900,
          marginBottom: 28,
        }}
      >
        Your Cart 🛒
      </h2>

      {/* ── Line items ──────────────────────────────────── */}
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '14px 0',
            borderBottom: '1px solid var(--bg2)',
          }}
        >
          {/* Thumbnail */}
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              background: 'var(--peach-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {item.img ? (
              <img
                src={item.img}
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14 }}
              />
            ) : (
              item.emoji || '🍼'
            )}
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>
              {item.name}
            </div>
            <div style={{ fontSize: 13, color: 'var(--peach-dark)', fontWeight: 700 }}>
              R{item.price} × {item.qty} ={' '}
              <strong>R{(item.price * item.qty).toLocaleString()}</strong>
            </div>
          </div>

          {/* Quantity controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <QtyButton onClick={() => onChangeQty(item.id, -1)}>−</QtyButton>
            <span style={{ fontWeight: 800, minWidth: 24, textAlign: 'center' }}>
              {item.qty}
            </span>
            <QtyButton onClick={() => onChangeQty(item.id, +1)}>+</QtyButton>
          </div>
        </div>
      ))}

      {/* ── Order summary ────────────────────────────────── */}
      <div
        style={{
          background: 'var(--bg2)',
          borderRadius: 18,
          padding: 22,
          marginTop: 24,
          border: '1px solid var(--border)',
        }}
      >
        <SummaryRow label="Subtotal"  value={`R${subtotal.toLocaleString()}`} />
        <SummaryRow
          label="Shipping"
          value={
            <span style={{ color: shipping === 0 ? 'var(--sage)' : 'inherit' }}>
              {shipping === 0 ? 'FREE 🎉' : `R${shipping}`}
            </span>
          }
        />

        {shipping > 0 && (
          <p style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'right', marginTop: 4 }}>
            Add R{(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(0)} more for free shipping
          </p>
        )}

        {/* Total */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 14,
            fontSize: 18,
            fontWeight: 800,
            borderTop: '1.5px solid var(--border)',
            marginTop: 10,
            fontFamily: 'var(--font-serif)',
          }}
        >
          <span>Total</span>
          <span>R{total.toLocaleString()}</span>
        </div>
      </div>

      {/* Checkout button */}
      <button
        onClick={onCheckout}
        style={{
          width: '100%',
          padding: 16,
          background: 'var(--peach-dark)',
          color: '#fff',
          border: 'none',
          borderRadius: 14,
          fontSize: 16,
          fontWeight: 700,
          cursor: 'pointer',
          marginTop: 16,
          transition: 'background 0.2s, transform 0.2s',
          fontFamily: 'var(--font-sans)',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'var(--rose)';
          e.currentTarget.style.transform  = 'translateY(-1px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'var(--peach-dark)';
          e.currentTarget.style.transform  = '';
        }}
      >
        Place Order — R{total.toLocaleString()} 🎉
      </button>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────

function QtyButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: 'var(--peach-light)',
        border: 'none',
        fontSize: 16,
        fontWeight: 700,
        color: 'var(--peach-dark)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.background = 'var(--peach)')}
      onMouseOut={(e)  => (e.currentTarget.style.background = 'var(--peach-light)')}
    >
      {children}
    </button>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '6px 0',
        fontSize: 14,
        color: 'var(--muted)',
      }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
