/**
 * AdminPage.jsx
 * ─────────────────────────────────────────────────
 * Admin panel: add new products and manage existing ones.
 * Only visible to users with isAdmin = true.
 *
 * Props:
 *   products       {Array}   Current product list
 *   isAdmin        {boolean} Gate — renders lock screen if false
 *   onAdd          {fn}      (newProduct) => void
 *   onEdit         {fn}      (product) => void — opens EditProductModal
 *   onDelete       {fn}      (id) => void
 *   onLoginClick   {fn}      Open login modal
 *   getCatName     {fn}      (id) => category display name
 */

import React, { useState, useRef } from 'react';
import { CATEGORIES } from '../data/categories';

const EMPTY_FORM = {
  name:     '',
  category: 'newborn',
  price:    '',
  oldPrice: '',
  emoji:    '🍼',
  img:      null,
  badge:    '',
  stock:    true,
  desc:     '',
};

export default function AdminPage({
  products,
  isAdmin,
  orders = [],
  onAdd,
  onEdit,
  onDelete,
  onLoginClick,
  getCatName,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [tab, setTab]   = useState('products'); // 'products' | 'add' | 'orders'
  const fileRef = useRef();

  // ── Lock screen ─────────────────────────────────────────
  if (!isAdmin) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 28px' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔒</div>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 22,
            fontWeight: 800,
            marginBottom: 8,
          }}
        >
          Admin Access Only
        </p>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>
          Log in with your admin account to access this page.
        </p>
        <button className="btn-primary" onClick={onLoginClick}>
          Log In
        </button>
      </div>
    );
  }

  // ── Handlers ────────────────────────────────────────────
  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((prev) => ({ ...prev, img: ev.target.result, emoji: '' }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...form,
      price:    parseFloat(form.price),
      oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : null,
      stock:    form.stock === true || form.stock === 'true',
    });
    setForm(EMPTY_FORM);
    setTab('products'); // Switch to products tab so admin can see the new product
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      onDelete(id);
    }
  };

  // ── Render ───────────────────────────────────────────────
  return (
    <div style={{ padding: '24px 28px', maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{
        fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 900,
        color: 'var(--peach-dark)', marginBottom: 20,
      }}>
        ⚙️ Admin Panel
      </h1>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { id: 'products', label: `📦 Products (${products.length})` },
          { id: 'add',      label: '➕ Add Product' },
          { id: 'orders',   label: `🧾 Orders (${orders.length})` },
          { id: 'chat',     label: '💬 Admin Chat' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '9px 18px', borderRadius: 12,
              border: '1.5px solid',
              borderColor: tab === t.id ? 'var(--peach-dark)' : 'var(--border)',
              background: tab === t.id ? 'var(--peach-dark)' : '#fff',
              color: tab === t.id ? '#fff' : 'var(--muted)',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'var(--font-sans)', transition: 'all 0.2s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Products tab ─────────────────────────────────── */}
      {tab === 'products' && (
        <section style={{ background: '#fff', borderRadius: 18, border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{
            padding: '16px 20px', fontSize: 13, fontWeight: 700,
            color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px',
            borderBottom: '1px solid var(--border)',
          }}>
            All Products ({products.length})
          </div>

          {products.map((p) => (
            <div key={p.id} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '13px 20px', borderBottom: '1px solid var(--bg2)',
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: 'var(--peach-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, overflow: 'hidden', flexShrink: 0,
              }}>
                {p.img
                  ? <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
                  : (p.emoji || '🍼')
                }
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong style={{ fontSize: 13, display: 'block', marginBottom: 2 }}>
                  {p.name}
                  {p.badge && (
                    <span style={{
                      fontSize: 10, marginLeft: 6, padding: '2px 7px', borderRadius: 8,
                      background: p.badge === 'new' ? '#E8F5E9' : p.badge === 'hot' ? '#FFF3E0' : 'var(--rose)',
                      color: p.badge === 'new' ? '#2E7D32' : p.badge === 'hot' ? '#E65100' : '#fff',
                      fontWeight: 700,
                    }}>
                      {p.badge.toUpperCase()}
                    </span>
                  )}
                </strong>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                  {getCatName(p.category)} · <strong style={{ color: 'var(--peach-dark)' }}>R{p.price}</strong> ·{' '}
                  <span style={{ color: p.stock ? 'var(--sage)' : 'var(--rose)', fontWeight: 600 }}>
                    {p.stock ? 'In stock' : 'Out of stock'}
                  </span>
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <ActionButton onClick={() => onEdit(p)} bg="var(--peach-light)" color="var(--peach-dark)">Edit</ActionButton>
                <ActionButton onClick={() => handleDelete(p.id, p.name)} bg="#FFEBEE" color="#C62828">Delete</ActionButton>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ── Add product tab ───────────────────────────────── */}
      {tab === 'add' && (
        <section style={{ background: '#fff', borderRadius: 18, border: '1px solid var(--border)', padding: 24 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 20 }}>
            Add New Product
          </h2>
          <form onSubmit={handleSubmit}>
            <FormRow>
              <Field label="Product Name">
                <input className="form-input" value={form.name} onChange={update('name')} placeholder="e.g. Baby Carrier" required />
              </Field>
              <Field label="Category">
                <select className="form-input" value={form.category} onChange={update('category')}>
                  {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </Field>
            </FormRow>
            <FormRow>
              <Field label="Price (R)">
                <input className="form-input" type="number" value={form.price} onChange={update('price')} placeholder="0.00" required min="0" />
              </Field>
              <Field label="Old Price (optional)">
                <input className="form-input" type="number" value={form.oldPrice} onChange={update('oldPrice')} placeholder="Strike-through price" min="0" />
              </Field>
            </FormRow>
            <FormRow>
              <Field label="Badge">
                <select className="form-input" value={form.badge} onChange={update('badge')}>
                  <option value="">None</option>
                  <option value="new">New</option>
                  <option value="sale">Sale</option>
                  <option value="hot">Hot 🔥</option>
                </select>
              </Field>
              <Field label="Stock Status">
                <select className="form-input" value={String(form.stock)} onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value === 'true' }))}>
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </Field>
            </FormRow>
            <Field label="Emoji icon (if no image)" style={{ marginBottom: 14 }}>
              <input className="form-input" value={form.emoji} onChange={update('emoji')} placeholder="🍼" maxLength={2} />
            </Field>
            <Field label="Description" style={{ marginBottom: 14 }}>
              <textarea className="form-input" rows={2} value={form.desc} onChange={update('desc')} placeholder="Short product description…" />
            </Field>
            <Field label="Product Image" style={{ marginBottom: 20 }}>
              <div
                onClick={() => fileRef.current?.click()}
                style={{
                  border: '2px dashed var(--border)', borderRadius: 14,
                  padding: 20, textAlign: 'center', cursor: 'pointer',
                  background: 'var(--bg2)', transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--peach-dark)'; e.currentTarget.style.background = 'var(--peach-light)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg2)'; }}
              >
                {form.img ? (
                  <img src={form.img} alt="preview" style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 12, margin: '0 auto 8px', display: 'block' }} />
                ) : (
                  <>
                    <div style={{ fontSize: 36, marginBottom: 6 }}>📷</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>Click to upload an image</div>
                  </>
                )}
                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
              </div>
            </Field>
            <button type="submit" className="btn-primary">+ Add Product</button>
          </form>
        </section>
      )}

      {/* ── Orders tab ───────────────────────────────────── */}
      {tab === 'orders' && (
        <section style={{ background: '#fff', borderRadius: 18, border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{
            padding: '16px 20px', fontSize: 13, fontWeight: 700,
            color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px',
            borderBottom: '1px solid var(--border)',
          }}>
            All Customer Orders ({orders.length})
          </div>

          {orders.length === 0 ? (
            <div style={{ padding: '48px 28px', textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
              No orders yet. They will appear here once customers place them.
            </div>
          ) : (
            orders.map((order, idx) => (
              <div key={order.id} style={{
                padding: '16px 20px',
                borderBottom: idx < orders.length - 1 ? '1px solid var(--bg2)' : 'none',
              }}>
                {/* Order header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>{order.id}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                      👤 {order.user} · 🕒 {order.date}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 9px',
                      borderRadius: 8, background: '#E8F5E9', color: '#2E7D32',
                    }}>
                      ✓ {order.status}
                    </span>
                    <strong style={{ fontSize: 15, color: 'var(--peach-dark)', fontFamily: 'var(--font-serif)' }}>
                      R{order.total.toLocaleString()}
                    </strong>
                  </div>
                </div>

                {/* Items row */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      background: 'var(--bg2)', borderRadius: 10,
                      padding: '6px 10px', fontSize: 12,
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 7,
                        background: 'var(--peach-light)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 16, overflow: 'hidden', flexShrink: 0,
                      }}>
                        {item.img
                          ? <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 7 }} />
                          : (item.emoji || '🍼')
                        }
                      </div>
                      <span style={{ color: 'var(--text)', fontWeight: 600 }}>{item.name}</span>
                      <span style={{ color: 'var(--muted)' }}>×{item.qty}</span>
                      <span style={{ color: 'var(--peach-dark)', fontWeight: 700 }}>R{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      )}

      {/* ── Admin Chat tab ───────────────────────────────── */}
      {tab === 'chat' && (
        <AdminChat products={products} orders={orders} />
      )}
    </div>
  );
}

// ── AdminChat ─────────────────────────────────────────────────
function AdminChat({ products, orders }) {
  const [messages, setMessages] = React.useState([
    {
      from: 'bot',
      text: "Hi Admin 👋 I'm your store assistant. Ask me anything about your products, orders, revenue, or customers!",
    },
  ]);
  const [input,   setInput]   = React.useState('');
  const [typing,  setTyping]  = React.useState(false);
  const bottomRef = React.useRef(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const QUICK = [
    'How many products do I have?',
    'What is my total revenue?',
    'How many orders today?',
    'Which products are out of stock?',
    'What is my best selling item?',
  ];

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    const updated = [...messages, { from: 'user', text: msg }];
    setMessages(updated);
    setInput('');
    setTyping(true);

    try {
      const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
      const outOfStock   = products.filter((p) => !p.stock).map((p) => p.name);
      const storeContext = `
Store summary:
- Total products: ${products.length}
- Out of stock: ${outOfStock.length > 0 ? outOfStock.join(', ') : 'none'}
- Total orders placed: ${orders.length}
- Total revenue: R${totalRevenue.toLocaleString()}
- Products: ${products.map((p) => `${p.name} (R${p.price}, ${p.stock ? 'in stock' : 'OUT OF STOCK'})`).join('; ')}
- Recent orders: ${orders.slice(0, 5).map((o) => `${o.id} — R${o.total} — ${o.items.length} items — ${o.date}`).join('; ')}
      `.trim();

      const history = updated.map((m) => ({
        role: m.from === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a smart store analytics assistant for MellyBaby, a South African baby products shop. 
Help the admin understand their store data, orders, revenue, and products. 
Be concise, insightful, and use ZAR (R) for currency. Here is the current store data:\n\n${storeContext}`,
          messages: history,
        }),
      });

      const data  = await res.json();
      const reply = data?.content?.[0]?.text || 'Sorry, I could not fetch a response right now.';
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Connection error. Please try again.' }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: 18,
      border: '1px solid var(--border)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: 560,
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
        color: '#fff',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
        }}>🤖</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Admin Assistant</div>
          <div style={{ fontSize: 11, opacity: 0.8 }}>
            {products.length} products · {orders.length} orders · R{orders.reduce((s, o) => s + o.total, 0).toLocaleString()} revenue
          </div>
        </div>
        <div style={{
          marginLeft: 'auto',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 12,
          padding: '4px 10px',
          fontSize: 11, fontWeight: 700,
        }}>
          ● Online
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: 16,
        display: 'flex', flexDirection: 'column', gap: 10,
        background: '#FAFAFA',
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            maxWidth: '80%',
            alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
            background: msg.from === 'user' ? '#2E7D32' : '#fff',
            color: msg.from === 'user' ? '#fff' : 'var(--text)',
            border: msg.from === 'bot' ? '1px solid var(--border)' : 'none',
            padding: '11px 14px',
            borderRadius: 16,
            borderBottomRightRadius: msg.from === 'user' ? 4 : 16,
            borderBottomLeftRadius:  msg.from === 'bot'  ? 4 : 16,
            fontSize: 13, lineHeight: 1.6,
            whiteSpace: 'pre-line',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            {msg.text}
          </div>
        ))}

        {typing && (
          <div style={{
            alignSelf: 'flex-start',
            background: '#fff',
            border: '1px solid var(--border)',
            padding: '11px 16px',
            borderRadius: 16, borderBottomLeftRadius: 4,
            fontSize: 13, color: 'var(--muted)', fontStyle: 'italic',
          }}>
            Thinking…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 6,
        padding: '8px 14px',
        borderTop: '1px solid var(--bg2)',
        background: '#fff',
      }}>
        {QUICK.map((q, i) => (
          <button
            key={i}
            onClick={() => send(q)}
            style={{
              background: '#E8F5E9', color: '#2E7D32',
              border: 'none', borderRadius: 12,
              padding: '5px 11px', fontSize: 11,
              fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#2E7D32'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={(e)  => { e.currentTarget.style.background = '#E8F5E9'; e.currentTarget.style.color = '#2E7D32'; }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{
        display: 'flex', gap: 8,
        padding: '10px 14px',
        borderTop: '1px solid var(--border)',
        background: '#fff',
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about your store, orders, revenue…"
          style={{
            flex: 1, border: '1.5px solid var(--border)',
            borderRadius: 20, padding: '10px 16px',
            fontSize: 13, outline: 'none',
            fontFamily: 'var(--font-sans)',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#2E7D32')}
          onBlur={(e)  => (e.currentTarget.style.borderColor = 'var(--border)')}
        />
        <button
          onClick={() => send()}
          style={{
            background: '#2E7D32', color: '#fff',
            border: 'none', borderRadius: '50%',
            width: 40, height: 40, fontSize: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#1B5E20')}
          onMouseOut={(e)  => (e.currentTarget.style.background = '#2E7D32')}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

// ── Local helpers ─────────────────────────────────────────────

function FormRow({ children }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function Field({ label, children, style = {} }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        ...style,
      }}
    >
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.4px',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function ActionButton({ onClick, bg, color, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 14px',
        background: bg,
        color,
        border: 'none',
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        transition: 'opacity 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.opacity = '0.75')}
      onMouseOut={(e)  => (e.currentTarget.style.opacity = '1')}
    >
      {children}
    </button>
  );
}
