/**
 * HomePage.jsx
 * ─────────────────────────────────────────────────
 * Landing page: hero, search, category grid, featured products, promo banner.
 *
 * Props:
 *   products      {Array}   Full product list
 *   search        {string}  Current search string
 *   onSearch      {fn}      Update search string
 *   onNavigate    {fn}      Navigate to a page
 *   onFilterCat   {fn}      Set active category and go to shop
 *   onSelectProd  {fn}      Open product detail modal
 *   onAddToCart   {fn}      Add product to cart
 *   onWishlist    {fn}      Add product to wishlist
 *   getCatName    {fn}      (id) => category display name
 */

import React from 'react';
import { CATEGORIES } from '../data/categories';
import ProductCard from '../components/ProductCard';

export default function HomePage({
  products,
  search,
  onSearch,
  onNavigate,
  onFilterCat,
  onSelectProd,
  onAddToCart,
  onWishlist,
  getCatName,
  user,
  loggedIn,
}) {
  const featuredProducts = products.slice(0, 8);

  return (
    <>
      {/* ── Welcome back banner (logged in users) ────────── */}
      {loggedIn && user && (
        <div style={{
          background: 'linear-gradient(135deg, #E8F5E9, #F1F8E9)',
          borderBottom: '1px solid #C8E6C9',
          padding: '10px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <span style={{ fontSize: 13, color: '#2E7D32', fontWeight: 600 }}>
            👋 Welcome back, <strong>{user.name}</strong>! Ready to shop for your little one?
          </span>
          <button
            onClick={() => onNavigate('order-history')}
            style={{
              background: 'none', border: '1px solid #4CAF50',
              color: '#2E7D32', borderRadius: 20,
              padding: '4px 14px', fontSize: 12,
              fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            View My Orders →
          </button>
        </div>
      )}
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #FFF0E6 0%, #FDE8D8 40%, #F9D4C0 100%)',
          padding: '60px 28px 50px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div style={blob(true)}  />
        <div style={blob(false)} />

        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            alignItems: 'center',
          }}
        >
          {/* Left — copy */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(255,255,255,.7)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--gold)',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 18,
              }}
            >
              ✨ Premium Baby Products
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 44,
                fontWeight: 900,
                color: 'var(--text)',
                lineHeight: 1.1,
                marginBottom: 14,
              }}
            >
              Everything for your{' '}
              <em style={{ color: 'var(--peach-dark)', fontStyle: 'italic' }}>
                little one,
              </em>{' '}
              worldwide.
            </h1>

            <p
              style={{
                fontSize: 15,
                color: 'var(--muted)',
                lineHeight: 1.7,
                marginBottom: 28,
                maxWidth: 380,
              }}
            >
              Curated baby products trusted by thousands of parents across
              South Africa and beyond. Quality you can feel, prices you'll love.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                className="btn-primary"
                onClick={() => onNavigate('shop')}
              >
                Shop Now →
              </button>
              <button
                className="btn-outline"
                onClick={() => onNavigate('collections')}
              >
                View Collections
              </button>
            </div>
          </div>

          {/* Right — trust cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
            }}
          >
            {TRUST_CARDS.map((c) => (
              <div
                key={c.title}
                style={{
                  background: 'rgba(255,255,255,.85)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 18,
                  border: '1px solid rgba(255,255,255,.9)',
                  padding: '20px 14px',
                  textAlign: 'center',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform   = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow   = '0 12px 30px rgba(212,114,74,.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform   = '';
                  e.currentTarget.style.boxShadow   = '';
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Search ───────────────────────────────────────── */}
      <div style={{ padding: '28px 28px 0', maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            background: '#fff',
            borderRadius: 16,
            border: '1.5px solid var(--border)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
            maxWidth: 600,
          }}
        >
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('shop')}
            placeholder="Search for baby products…"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              padding: '14px 18px',
              fontSize: 14,
              fontFamily: 'var(--font-sans)',
              color: 'var(--text)',
              background: 'transparent',
            }}
          />
          <button
            onClick={() => onNavigate('shop')}
            style={{
              background: 'var(--peach-dark)',
              color: '#fff',
              border: 'none',
              padding: '14px 22px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'var(--rose)')}
            onMouseOut={(e)  => (e.currentTarget.style.background = 'var(--peach-dark)')}
          >
            Search
          </button>
        </div>
      </div>

      {/* ── Category grid ────────────────────────────────── */}
      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              Shop by <span>Category</span>
            </h2>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>
              Find exactly what your little one needs
            </p>
          </div>
          <button
            className="sec-link"
            onClick={() => onNavigate('shop')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 13,
              color: 'var(--peach-dark)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            View all →
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 14,
          }}
        >
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <div
              key={cat.id}
              onClick={() => onFilterCat(cat.id)}
              style={{
                background:
                  cat.id === 'sale'
                    ? 'linear-gradient(135deg,#FFF0F0,#FFE0E0)'
                    : cat.id === 'combo'
                    ? 'linear-gradient(135deg,#FFF0E6,#FDE8D8)'
                    : '#fff',
                borderRadius: 18,
                border: `1px solid ${
                  cat.id === 'sale'
                    ? '#F4AAAA'
                    : cat.id === 'combo'
                    ? 'var(--peach)'
                    : 'var(--border)'
                }`,
                padding: '20px 14px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform  = 'translateY(-4px)';
                e.currentTarget.style.boxShadow  = '0 10px 28px rgba(212,114,74,.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div style={{ fontSize: 34, marginBottom: 10 }}>{cat.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured products ─────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              Featured <span>Products</span>
            </h2>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>
              Handpicked by our team this week
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 13,
              color: 'var(--peach-dark)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            See all →
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 18,
          }}
        >
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              categoryName={getCatName(p.category)}
              onSelect={onSelectProd}
              onAddToCart={onAddToCart}
              onWishlist={onWishlist}
            />
          ))}
        </div>
      </section>

      {/* ── Promo banner ──────────────────────────────────── */}
      <div style={{ padding: '0 28px 40px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, var(--peach-dark), var(--rose))',
            borderRadius: 22,
            padding: '36px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 26,
                fontWeight: 900,
                color: '#fff',
                marginBottom: 6,
              }}
            >
              💝 Combo Deals — Save More!
            </h2>
            <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 14 }}>
              Bundle your favourites and save up to 30% on selected product combos
            </p>
          </div>
          <button
            onClick={() => onFilterCat('combo')}
            style={{
              background: '#fff',
              color: 'var(--peach-dark)',
              border: 'none',
              padding: '13px 28px',
              borderRadius: 30,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              fontFamily: 'var(--font-sans)',
              whiteSpace: 'nowrap',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseOut={(e)  => (e.currentTarget.style.transform = '')}
          >
            Shop Combos →
          </button>
        </div>
      </div>
    </>
  );
}

// ── Constants ─────────────────────────────────────────────────
const TRUST_CARDS = [
  { icon: '🚚', title: 'Free Shipping',   sub: 'Orders over R500'   },
  { icon: '🌍', title: 'Ships Worldwide', sub: '50+ countries'      },
  { icon: '↩️', title: 'Easy Returns',    sub: '30-day policy'      },
  { icon: '🔒', title: 'Secure Checkout', sub: '100% encrypted'     },
];

function blob(isTop) {
  return {
    content: '""',
    position: 'absolute',
    ...(isTop
      ? { top: -60, right: -60, width: 320, height: 320 }
      : { bottom: -40, left: -40, width: 200, height: 200 }),
    background: isTop
      ? 'radial-gradient(circle, rgba(244,160,122,.3), transparent 70%)'
      : 'radial-gradient(circle, rgba(201,150,58,.15), transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
  };
}
