/**
 * OrdersPage.jsx
 * ─────────────────────────────────────────────────
 * Shows current cart as an order summary with:
 *  - Item image / emoji
 *  - Item name & category
 *  - Unit price
 *  - Quantity stepper (increases total price live)
 *  - Line total
 *  - Grand total
 *  - Place Order button
 *
 * Props:
 *   cart        {Array}   Cart items [{ ...product, qty }]
 *   onChangeQty {fn}      (id, delta) => void
 *   onCheckout  {fn}      Place order callback
 *   onNavigate  {fn}      Navigate helper
 *   loggedIn    {boolean} Gate — prompt login if false
 *   onLoginClick {fn}     Open login modal
 */

import React, { useState } from 'react';

const FREE_SHIP = 500;
const SHIP_FEE  = 60;

export default function OrdersPage({
  cart,
  onChangeQty,
  onCheckout,
  onNavigate,
  loggedIn,
  onLoginClick,
}) {
  const [placing, setPlacing] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = subtotal >= FREE_SHIP ? 0 : SHIP_FEE;
  const total     = subtotal + shipping;
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  // ── Not logged in ────────────────────────────────────────
  if (!loggedIn) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 28px' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔐</div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
          Sign in to view your order
        </p>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>
          You need to be logged in to place an order.
        </p>
        <button className="btn-primary" onClick={onLoginClick}>Sign In →</button>
      </div>
    );
  }

  // ── Empty cart ───────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 28px' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>📋</div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
          No items in your order
        </p>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>
          Add some products to your cart first!
        </p>
        <button className="btn-primary" onClick={() => onNavigate('shop')}>
          Browse Products →
        </button>
      </div>
    );
  }

  const handlePlace = () => {
    setPlacing(true);
    setTimeout(() => {
      onCheckout();
      setPlacing(false);
    }, 800);
  };

  return (
    <div style={{ padding: '32px 28px', maxWidth: 780, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 30, fontWeight: 900,
          color: 'var(--text)', marginBottom: 6,
        }}>
          Your Order 📋
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>
          {itemCount} item{itemCount !== 1 ? 's' : ''} — review and confirm below
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>

        {/* ── Left: item list ───────────────────────────── */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid var(--border)', overflow: 'hidden' }}>

          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 80px 100px 80px 36px',
            gap: 8,
            padding: '12px 20px',
            background: 'var(--peach-light)',
            borderBottom: '1px solid var(--border)',
            fontSize: 11, fontWeight: 700,
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            <span>Product</span>
            <span style={{ textAlign: 'center' }}>Unit Price</span>
            <span style={{ textAlign: 'center' }}>Qty</span>
            <span style={{ textAlign: 'right' }}>Total</span>
            <span />
          </div>

          {/* Items */}
          {cart.map((item, idx) => (
            <div
              key={item.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 80px 100px 80px 36px',
                gap: 8,
                padding: '14px 20px',
                alignItems: 'center',
                borderBottom: idx < cart.length - 1 ? '1px solid var(--bg2)' : 'none',
                transition: 'background 0.15s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#fdfaf8')}
              onMouseOut={(e)  => (e.currentTarget.style.background = '')}
            >
              {/* Product info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 52, height: 52,
                  borderRadius: 12,
                  background: 'var(--peach-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, overflow: 'hidden', flexShrink: 0,
                  border: '1px solid var(--border)',
                }}>
                  {item.img
                    ? <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
                    : (item.emoji || '🍼')
                  }
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
                    {item.name}
                  </div>
                  {item.badge && (
                    <span style={{
                      fontSize: 9, fontWeight: 700,
                      padding: '2px 6px', borderRadius: 6,
                      background: item.badge === 'new' ? '#E8F5E9' : item.badge === 'hot' ? '#FFF3E0' : '#FFE0E0',
                      color: item.badge === 'new' ? '#2E7D32' : item.badge === 'hot' ? '#E65100' : '#C62828',
                      textTransform: 'uppercase',
                    }}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Unit price */}
              <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--peach-dark)' }}>
                R{item.price.toLocaleString()}
              </div>

              {/* Qty stepper */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <QtyBtn onClick={() => onChangeQty(item.id, -1)}>−</QtyBtn>
                <span style={{ fontWeight: 800, fontSize: 14, minWidth: 22, textAlign: 'center' }}>
                  {item.qty}
                </span>
                <QtyBtn onClick={() => onChangeQty(item.id, +1)}>+</QtyBtn>
              </div>

              {/* Line total */}
              <div style={{ textAlign: 'right', fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>
                R{(item.price * item.qty).toLocaleString()}
              </div>

              {/* Remove */}
              <button
                onClick={() => onChangeQty(item.id, -item.qty)}
                title="Remove item"
                style={{
                  background: 'none', border: 'none',
                  fontSize: 16, cursor: 'pointer',
                  color: '#ccc', transition: 'color 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#C62828')}
                onMouseOut={(e)  => (e.currentTarget.style.color = '#ccc')}
              >
                ✕
              </button>
            </div>
          ))}

          {/* Continue shopping */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--bg2)' }}>
            <button
              onClick={() => onNavigate('shop')}
              style={{
                background: 'none', border: 'none',
                fontSize: 13, color: 'var(--peach-dark)',
                fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
              }}
            >
              ← Continue Shopping
            </button>
          </div>
        </div>

        {/* ── Right: summary ────────────────────────────── */}
        <div>
          <div style={{
            background: '#fff',
            borderRadius: 20,
            border: '1px solid var(--border)',
            padding: 22,
            position: 'sticky',
            top: 90,
          }}>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 17, fontWeight: 800,
              color: 'var(--text)', marginBottom: 18,
            }}>
              Order Summary
            </h3>

            {/* Line items summary */}
            <div style={{ marginBottom: 14 }}>
              {cart.map((item) => (
                <div key={item.id} style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 12, color: 'var(--muted)',
                  padding: '4px 0',
                }}>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 8 }}>
                    {item.name} × {item.qty}
                  </span>
                  <span style={{ fontWeight: 600, flexShrink: 0 }}>
                    R{(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />

            <Row label="Subtotal" value={`R${subtotal.toLocaleString()}`} />
            <Row
              label="Shipping"
              value={
                shipping === 0
                  ? <span style={{ color: '#27AE60', fontWeight: 700 }}>FREE 🎉</span>
                  : `R${shipping}`
              }
            />

            {shipping > 0 && (
              <p style={{ fontSize: 11, color: 'var(--muted)', margin: '4px 0 8px', lineHeight: 1.5 }}>
                Add R{(FREE_SHIP - subtotal).toFixed(0)} more for free shipping
              </p>
            )}

            <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />

            {/* Grand total */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline',
              fontSize: 20, fontWeight: 900,
              fontFamily: 'var(--font-serif)',
              color: 'var(--text)', marginBottom: 20,
            }}>
              <span>Total</span>
              <span style={{ color: 'var(--peach-dark)' }}>R{total.toLocaleString()}</span>
            </div>

            {/* Place order */}
            <button
              onClick={handlePlace}
              disabled={placing}
              style={{
                width: '100%',
                padding: '15px 20px',
                background: placing ? '#ccc' : 'var(--peach-dark)',
                color: '#fff', border: 'none',
                borderRadius: 14, fontSize: 15,
                fontWeight: 700, cursor: placing ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-sans)',
                transition: 'background 0.2s, transform 0.15s',
                boxShadow: '0 4px 16px rgba(212,114,74,0.3)',
              }}
              onMouseOver={(e) => { if (!placing) e.currentTarget.style.background = 'var(--rose)'; }}
              onMouseOut={(e)  => { if (!placing) e.currentTarget.style.background = 'var(--peach-dark)'; }}
            >
              {placing ? '⏳ Placing order…' : `Place Order — R${total.toLocaleString()} 🎉`}
            </button>

            <p style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', marginTop: 12 }}>
              🔒 Secure checkout · 30-day returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QtyBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 26, height: 26, borderRadius: '50%',
        background: 'var(--peach-light)',
        border: 'none', fontSize: 15, fontWeight: 800,
        color: 'var(--peach-dark)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.background = 'var(--peach)')}
      onMouseOut={(e)  => (e.currentTarget.style.background = 'var(--peach-light)')}
    >
      {children}
    </button>
  );
}

function Row({ label, value }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      fontSize: 13, color: 'var(--muted)', padding: '5px 0',
    }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
