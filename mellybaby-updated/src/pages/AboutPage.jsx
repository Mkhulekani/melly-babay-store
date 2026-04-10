/**
 * AboutPage.jsx
 * ─────────────────────────────────────────────────
 * Brand story, mission, values, and global reach.
 */

import React from 'react';

const VALUES = [
  {
    icon: '💛',
    title: 'Our Mission',
    body:
      'To provide safe, high-quality, affordable baby products to families worldwide — because every baby deserves the best start in life.',
  },
  {
    icon: '🌍',
    title: 'Global Reach',
    body:
      'We ship to 50+ countries. From Cape Town to London to Lagos — MellyBaby travels with you no matter where you are.',
  },
  {
    icon: '🌿',
    title: 'Sustainability',
    body:
      'We prioritise organic, eco-friendly materials wherever possible. Good for your baby, great for the planet.',
  },
  {
    icon: '💌',
    title: 'Community',
    body:
      'Join 20 000+ parents in our community. Share tips, reviews, and support each other on the journey of parenthood.',
  },
];

export default function AboutPage() {
  return (
    <div className="section" style={{ maxWidth: 800 }}>
      {/* Heading */}
      <h2 className="section-title" style={{ marginBottom: 8 }}>
        About <span>MellyBaby</span>
      </h2>

      <p
        style={{
          color: 'var(--muted)',
          fontSize: 15,
          lineHeight: 1.8,
          maxWidth: 600,
          marginBottom: 36,
        }}
      >
        We're a South African baby brand on a mission to make premium baby
        products accessible to every family, locally and internationally.
        Founded by a mom who couldn't find the right products, MellyBaby was
        born from love — and a lot of late-night research.
      </p>

      {/* Values grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 20,
        }}
      >
        {VALUES.map((v) => (
          <div
            key={v.title}
            style={{
              background: '#fff',
              borderRadius: 20,
              border: '1px solid var(--border)',
              padding: 28,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 14 }}>{v.icon}</div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 17,
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              {v.title}
            </h3>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              {v.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
