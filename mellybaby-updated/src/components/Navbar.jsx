/**
 * Navbar.jsx
 * ─────────────────────────────────────────────────
 * Top navigation bar with logo, nav links, cart icon, and login button.
 *
 * Props:
 *   page        {string}   Currently active page
 *   onNavigate  {fn}       Called with page name string on link click
 *   cartCount   {number}   Number of items in cart (badge)
 *   isAdmin     {boolean}  Show Admin link if true
 *   loggedIn    {boolean}
 *   user        {object|null}  { name, email }
 *   onLoginClick  {fn}    Open login modal
 *   onLogout      {fn}    Log out the current user
 */

import React from 'react';

export default function Navbar({
  page,
  onNavigate,
  cartCount,
  isAdmin,
  loggedIn,
  user,
  onLoginClick,
  onLogout,
}) {
  const NavLink = ({ target, label, className = '' }) => (
    <button
      onClick={() => onNavigate(target)}
      style={{
        background: page === target ? 'var(--peach-light)' : 'none',
        color: page === target ? 'var(--peach-dark)' : 'var(--muted)',
        border: 'none',
        padding: '8px 12px',
        borderRadius: 20,
        fontSize: 13,
        fontWeight: page === target ? 600 : 500,
        cursor: 'pointer',
        transition: 'background 0.2s, color 0.2s',
        fontFamily: 'var(--font-sans)',
        whiteSpace: 'nowrap',
      }}
      className={className}
    >
      {label}
    </button>
  );

  return (
    <>
      {/* ── Announcement bar ───────────────────────────────── */}
      <div
        style={{
          background: 'var(--peach-dark)',
          color: '#fff',
          textAlign: 'center',
          padding: '9px 20px',
          fontSize: 12,
          letterSpacing: '0.5px',
          fontWeight: 500,
        }}
      >
        🌍 Worldwide shipping &nbsp;·&nbsp; Free shipping over R500 &nbsp;·&nbsp; 30-day returns &nbsp;·&nbsp; Secure payments 🔒
      </div>

      {/* ── Main navbar ────────────────────────────────────── */}
      <nav
        style={{
          background: 'var(--white)',
          borderBottom: '1px solid var(--border)',
          position: 'sticky',
          top: 0,
          zIndex: 300,
          padding: '0 28px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-serif)',
              fontSize: 22,
              fontWeight: 900,
              color: 'var(--peach-dark)',
              cursor: 'pointer',
              letterSpacing: '-0.5px',
            }}
          >
            MellyBaby
            <sup
              style={{
                fontSize: 10,
                color: 'var(--gold)',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginLeft: 2,
              }}
            >
              shop
            </sup>
          </button>

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <NavLink target="home"        label="Home" />
            <NavLink target="shop"        label="Shop" />
            <NavLink target="collections" label="Collections" />

            {/* On Sale — highlighted */}
            <button
              onClick={() => onNavigate('sale')}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 12px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--rose)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
              }}
            >
              On Sale 🔥
            </button>

            <NavLink target="about"   label="About Us" />
            <NavLink target="service" label="Support" />

            {/* Order history — logged-in users only */}
            {loggedIn && !isAdmin && (
              <NavLink target="order-history" label="My Orders 📦" />
            )}

            {/* Admin panel — admin only */}
            {isAdmin && (
              <button
                onClick={() => onNavigate('admin')}
                style={{
                  background: page === 'admin' ? '#2E7D32' : '#E8F5E9',
                  color: page === 'admin' ? '#fff' : '#2E7D32',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  transition: 'background 0.2s',
                }}
              >
                ⚙ Admin
              </button>
            )}
          </div>

          {/* Action icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Search */}
            <button
              onClick={() => onNavigate('shop')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 18,
                padding: 8,
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              title="Search"
            >
              🔍
            </button>

            {/* Cart */}
            <button
              onClick={() => onNavigate('orders')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 18,
                padding: 8,
                borderRadius: '50%',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s',
              }}
              title="Cart"
            >
              🛒
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    background: 'var(--rose)',
                    color: '#fff',
                    fontSize: 9,
                    borderRadius: '50%',
                    width: 16,
                    height: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login / user */}
            {loggedIn ? (
              <button
                onClick={onLogout}
                style={{
                  background: 'var(--peach-light)',
                  color: 'var(--peach-dark)',
                  border: 'none',
                  padding: '9px 18px',
                  borderRadius: 30,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                👤 {user?.name}
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                style={{
                  background: 'var(--peach-dark)',
                  color: '#fff',
                  border: 'none',
                  padding: '9px 20px',
                  borderRadius: 30,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
