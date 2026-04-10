/**
 * LoginModal.jsx
 * ─────────────────────────────────────────────────
 * Login / Register modal overlay.
 *
 * Admin login:  admin@mellybaby.co.za  (any password)
 * Regular user: any other email
 *
 * Props:
 *   onClose   {fn}  Dismiss the modal
 *   onSuccess {fn}  Called with { name, email, admin } on successful auth
 */

import React, { useState } from 'react';

const ADMIN_EMAILS = ['admin@mellybaby.co.za', 'admin@melly.co.za'];

const inputStyle = {
  border: '1.5px solid var(--border)',
  borderRadius: 12,
  padding: '12px 16px',
  fontSize: 14,
  outline: 'none',
  width: '100%',
  fontFamily: 'var(--font-sans)',
  transition: 'border-color 0.2s',
};

export default function LoginModal({ onClose, onSuccess }) {
  const [mode, setMode]   = useState('login'); // 'login' | 'register'
  const [form, setForm]   = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAdmin = ADMIN_EMAILS.includes(form.email.toLowerCase());
    onSuccess({
      name:  mode === 'register' ? form.name : form.email.split('@')[0],
      email: form.email,
      admin: isAdmin,
    });
  };

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 22,
          width: '100%',
          maxWidth: 420,
          padding: 36,
          textAlign: 'center',
          animation: 'slideUp 0.25s ease',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 28,
            fontWeight: 900,
            color: 'var(--peach-dark)',
            marginBottom: 4,
          }}
        >
          MellyBaby
        </div>

        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 28 }}>
          {mode === 'login'
            ? 'Welcome back! Sign in to continue'
            : 'Create your MellyBaby account'}
        </p>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          {/* Name field — register only */}
          {mode === 'register' && (
            <FormGroup label="Full Name">
              <input
                style={inputStyle}
                type="text"
                value={form.name}
                onChange={update('name')}
                placeholder="Your name"
                required
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--peach-dark)')}
                onBlur={(e)  => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </FormGroup>
          )}

          <FormGroup label="Email Address">
            <input
              style={inputStyle}
              type="email"
              value={form.email}
              onChange={update('email')}
              placeholder="you@example.com"
              required
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--peach-dark)')}
              onBlur={(e)  => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </FormGroup>

          <FormGroup label="Password">
            <input
              style={inputStyle}
              type="password"
              value={form.password}
              onChange={update('password')}
              placeholder="••••••••"
              required
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--peach-dark)')}
              onBlur={(e)  => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </FormGroup>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: 14,
              background: 'var(--peach-dark)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: 4,
              fontFamily: 'var(--font-sans)',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'var(--rose)')}
            onMouseOut={(e)  => (e.currentTarget.style.background = 'var(--peach-dark)')}
          >
            {mode === 'login' ? 'Sign In →' : 'Create Account →'}
          </button>
        </form>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '20px 0' }} />

        <p style={{ fontSize: 13, color: 'var(--muted)' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--peach-dark)',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>

        <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 10 }}>
          Admin login: <strong style={{ color: 'var(--peach-dark)' }}>admin@mellybaby.co.za</strong> · any password
        </p>
      </div>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 16 }}>
      <label
        style={{
          fontSize: 12,
          fontWeight: 600,
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
