/**
 * TrackOrderPage.jsx
 * ─────────────────────────────────────────────────
 * Order tracking form with step-by-step status display.
 */

import React, { useState } from 'react';

const STEPS = [
  { key: 'processing',        icon: '📋', label: 'Order Confirmed',    sub: 'We received your order'   },
  { key: 'shipped',           icon: '📦', label: 'Shipped',            sub: 'On its way to you'        },
  { key: 'out_for_delivery',  icon: '🚚', label: 'Out for Delivery',   sub: 'Almost there!'            },
  { key: 'delivered',         icon: '✅', label: 'Delivered',          sub: 'Enjoy your purchase!'     },
];

// Demo statuses cycled for different order numbers
const DEMO_STATUSES = ['processing', 'shipped', 'out_for_delivery', 'delivered'];

export default function TrackOrderPage() {
  const [orderNum, setOrderNum] = useState('');
  const [result,   setResult]   = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderNum.trim()) return;

    // Demo: derive a status deterministically from the order number
    const idx = orderNum.length % DEMO_STATUSES.length;
    setResult({
      num:    orderNum.toUpperCase(),
      status: DEMO_STATUSES[idx],
      date:   new Date().toLocaleDateString('en-ZA'),
      est:    '3–5 business days',
    });
  };

  const currentStepIndex = result
    ? STEPS.findIndex((s) => s.key === result.status)
    : -1;

  return (
    <div className="section" style={{ maxWidth: 600 }}>
      {/* Heading */}
      <h2 className="section-title" style={{ marginBottom: 6 }}>
        Track Your <span>Order</span>
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 32 }}>
        Enter your order number to see real-time status updates.
      </p>

      {/* Form card */}
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          border: '1px solid var(--border)',
          padding: 28,
        }}
      >
        <form onSubmit={handleSubmit}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              display: 'block',
              marginBottom: 8,
            }}
          >
            Order Number
          </label>

          <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
            <input
              className="form-input"
              placeholder="e.g. MB-20240001"
              value={orderNum}
              onChange={(e) => setOrderNum(e.target.value)}
              required
              style={{ flex: 1 }}
            />
            <button
              type="submit"
              style={{
                background: 'var(--peach-dark)',
                color: '#fff',
                border: 'none',
                padding: '10px 22px',
                borderRadius: 'var(--radius-md)',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'var(--rose)')}
              onMouseOut={(e)  => (e.currentTarget.style.background = 'var(--peach-dark)')}
            >
              Track →
            </button>
          </div>

          <p style={{ fontSize: 12, color: 'var(--muted)' }}>
            Find your order number in your confirmation email.
          </p>
        </form>

        {/* Result */}
        {result && (
          <div
            style={{
              background: 'var(--bg2)',
              borderRadius: 16,
              padding: 20,
              border: '1px solid var(--border)',
              marginTop: 20,
            }}
          >
            {/* Order meta */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Order Number</div>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{result.num}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Estimated delivery</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--peach-dark)' }}>
                  {result.est}
                </div>
              </div>
            </div>

            {/* Step tracker */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {STEPS.map((step, i) => {
                const isDone   = i < currentStepIndex;
                const isActive = i === currentStepIndex;
                const isPending = i > currentStepIndex;

                return (
                  <div key={step.key} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    {/* Dot */}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 16,
                        flexShrink: 0,
                        background: isDone
                          ? '#E8F5E9'
                          : isActive
                          ? 'var(--peach-light)'
                          : 'var(--cream)',
                        border: isActive ? '2px solid var(--peach-dark)' : 'none',
                        opacity: isPending ? 0.45 : 1,
                      }}
                    >
                      {step.icon}
                    </div>

                    {/* Label */}
                    <div>
                      <strong
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          display: 'block',
                          color: isActive
                            ? 'var(--peach-dark)'
                            : isDone
                            ? 'var(--sage)'
                            : 'var(--muted)',
                        }}
                      >
                        {step.label}
                      </strong>
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                        {step.sub}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
