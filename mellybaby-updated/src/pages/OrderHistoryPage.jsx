/**
 * OrderHistoryPage.jsx
 * ─────────────────────────────────────────────────
 * Shows a user's past placed orders, each with:
 *   - Order ID, date, status
 *   - Itemized list with images, qty, price
 *   - Subtotal, shipping, total
 *
 * Props:
 *   orders       {Array}   Placed orders
 *   loggedIn     {boolean} Gate
 *   onLoginClick {fn}      Open login modal
 *   onNavigate   {fn}      Navigation helper
 */

import React, { useState } from 'react';

export default function OrderHistoryPage({ orders, loggedIn, onLoginClick, onNavigate }) {
  const [expanded, setExpanded] = useState(null);

  if (!loggedIn) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 28px' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔐</div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
          Sign in to view your orders
        </p>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>
          Your order history will appear here after signing in.
        </p>
        <button className="btn-primary" onClick={onLoginClick}>Sign In →</button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 28px' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>📦</div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
          No orders yet
        </p>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>
          Once you place an order it will show up here!
        </p>
        <button className="btn-primary" onClick={() => onNavigate('shop')}>
          Start Shopping →
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px 28px', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 30, fontWeight: 900,
        marginBottom: 6, color: 'var(--text)',
      }}>
        My Orders 📦
      </h1>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 28 }}>
        {orders.length} order{orders.length !== 1 ? 's' : ''} placed
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {orders.map((order) => {
          const isOpen = expanded === order.id;
          return (
            <div
              key={order.id}
              style={{
                background: '#fff',
                borderRadius: 20,
                border: '1px solid var(--border)',
                overflow: 'hidden',
                boxShadow: isOpen ? '0 6px 24px rgba(212,114,74,.1)' : 'none',
                transition: 'box-shadow 0.2s',
              }}
            >
              {/* Order header row */}
              <div
                onClick={() => setExpanded(isOpen ? null : order.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 20px',
                  cursor: 'pointer',
                  background: isOpen ? 'var(--peach-light)' : '#fff',
                  transition: 'background 0.2s',
                }}
              >
                {/* Thumbnail strip */}
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  {order.items.slice(0, 3).map((item, i) => (
                    <div key={i} style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: 'var(--peach-light)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, overflow: 'hidden', flexShrink: 0,
                      border: '1px solid var(--border)',
                    }}>
                      {item.img
                        ? <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} />
                        : (item.emoji || '🍼')
                      }
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: 'var(--peach-light)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: 'var(--peach-dark)',
                      border: '1px solid var(--border)',
                    }}>
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
                    {order.id}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                    {order.date} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {/* Status badge */}
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  padding: '4px 10px', borderRadius: 10,
                  background: '#E8F5E9', color: '#2E7D32',
                  flexShrink: 0,
                }}>
                  ✓ {order.status}
                </span>

                {/* Total */}
                <div style={{
                  fontSize: 16, fontWeight: 900,
                  color: 'var(--peach-dark)', flexShrink: 0,
                  fontFamily: 'var(--font-serif)',
                }}>
                  R{order.total.toLocaleString()}
                </div>

                {/* Chevron */}
                <div style={{
                  fontSize: 12, color: 'var(--muted)',
                  transition: 'transform 0.2s',
                  transform: isOpen ? 'rotate(180deg)' : '',
                  flexShrink: 0,
                }}>▼</div>
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--bg2)' }}>

                  {/* Item rows */}
                  <div style={{ marginTop: 16, marginBottom: 16 }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 0',
                        borderBottom: i < order.items.length - 1 ? '1px solid var(--bg2)' : 'none',
                      }}>
                        {/* Image */}
                        <div style={{
                          width: 52, height: 52, borderRadius: 12,
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

                        {/* Name */}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{item.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                            R{item.price} × {item.qty}
                          </div>
                        </div>

                        {/* Line total */}
                        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>
                          R{(item.price * item.qty).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div style={{
                    background: 'var(--bg2)',
                    borderRadius: 14, padding: '14px 16px',
                  }}>
                    <SummaryRow label="Subtotal" value={`R${order.subtotal.toLocaleString()}`} />
                    <SummaryRow
                      label="Shipping"
                      value={order.shipping === 0
                        ? <span style={{ color: '#27AE60', fontWeight: 700 }}>FREE 🎉</span>
                        : `R${order.shipping}`
                      }
                    />
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontSize: 16, fontWeight: 900,
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--text)',
                      borderTop: '1px solid var(--border)',
                      paddingTop: 10, marginTop: 6,
                    }}>
                      <span>Total</span>
                      <span style={{ color: 'var(--peach-dark)' }}>
                        R{order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      fontSize: 13, color: 'var(--muted)', padding: '4px 0',
    }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
