/**
 * EditProductModal.jsx
 * ─────────────────────────────────────────────────
 * Admin modal for editing an existing product.
 *
 * Props:
 *   product    {object}  Product to edit
 *   onClose    {fn}      Dismiss without saving
 *   onSave     {fn}      Called with updated product object
 */

import React, { useState, useRef } from 'react';
import { CATEGORIES } from '../data/categories';

export default function EditProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    ...product,
    oldPrice: product.oldPrice ?? '',
  });
  const fileRef = useRef();

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((prev) => ({ ...prev, img: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      price:    parseFloat(form.price),
      oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : null,
      stock:    form.stock === true || form.stock === 'true',
    });
  };

  return (
    <div className="overlay" onClick={onClose}>
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
            padding: '20px 24px 16px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>
            Edit Product
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
            }}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px 24px 28px' }}>
          <Row>
            <Field label="Product Name">
              <input
                className="form-input"
                value={form.name}
                onChange={update('name')}
                required
              />
            </Field>
            <Field label="Category">
              <select
                className="form-input"
                value={form.category}
                onChange={update('category')}
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
          </Row>

          <Row>
            <Field label="Price (R)">
              <input
                className="form-input"
                type="number"
                value={form.price}
                onChange={update('price')}
                required
                min="0"
              />
            </Field>
            <Field label="Old Price (optional)">
              <input
                className="form-input"
                type="number"
                value={form.oldPrice}
                onChange={update('oldPrice')}
                min="0"
                placeholder="Strike-through price"
              />
            </Field>
          </Row>

          <Row>
            <Field label="Badge">
              <select
                className="form-input"
                value={form.badge}
                onChange={update('badge')}
              >
                <option value="">None</option>
                <option value="new">New</option>
                <option value="sale">Sale</option>
                <option value="hot">Hot 🔥</option>
              </select>
            </Field>
            <Field label="Stock Status">
              <select
                className="form-input"
                value={String(form.stock)}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    stock: e.target.value === 'true',
                  }))
                }
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </Field>
          </Row>

          <Field label="Description" style={{ marginBottom: 14 }}>
            <textarea
              className="form-input"
              rows={3}
              value={form.desc}
              onChange={update('desc')}
            />
          </Field>

          {/* Image upload */}
          <Field label="Product Image">
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                border: '2px dashed var(--border)',
                borderRadius: 14,
                padding: 20,
                textAlign: 'center',
                cursor: 'pointer',
                background: 'var(--bg2)',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--peach-dark)';
                e.currentTarget.style.background   = 'var(--peach-light)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.background   = 'var(--bg2)';
              }}
            >
              {form.img ? (
                <img
                  src={form.img}
                  alt="preview"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 12,
                    margin: '0 auto 8px',
                    display: 'block',
                  }}
                />
              ) : (
                <div style={{ fontSize: 32, marginBottom: 6 }}>
                  {form.emoji || '🍼'}
                </div>
              )}
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                Click to change image
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </Field>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '13px 24px',
                background: 'var(--peach-light)',
                color: 'var(--peach-dark)',
                border: 'none',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Layout helpers ────────────────────────────────────────────
function Row({ children }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        marginBottom: 12,
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
        marginBottom: 14,
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
