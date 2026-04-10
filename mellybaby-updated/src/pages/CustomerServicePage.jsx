/**
 * CustomerServicePage.jsx
 * ─────────────────────────────────────────────────
 * Contact channels, FAQ, and link to AI chat assistant.
 *
 * Props:
 *   onOpenChat  {fn}  Opens the ChatBot widget
 */

import React from 'react';

const CONTACT_CHANNELS = [
  {
    icon: '📧',
    title: 'Email Us',
    detail: 'support@mellybaby.co.za',
    sub: 'Response within 24 hours',
  },
  {
    icon: '💬',
    title: 'Live Chat',
    detail: 'Use the chat bubble below',
    sub: 'Available 8 am – 8 pm',
  },
  {
    icon: '📞',
    title: 'Call Us',
    detail: '+27 21 000 0000',
    sub: 'Mon–Fri, 9 am – 5 pm',
  },
  {
    icon: '📍',
    title: 'Head Office',
    detail: 'Cape Town, South Africa',
    sub: 'Shipping worldwide 🌍',
  },
];

const FAQS = [
  {
    q: 'How long does shipping take?',
    a: 'South Africa: 3–5 business days. International: 7–14 business days depending on your country.',
  },
  {
    q: 'What is your return policy?',
    a: 'We accept returns within 30 days of purchase. Items must be unused and in their original packaging.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes! We ship to 50+ countries worldwide. Shipping rates are calculated at checkout.',
  },
  {
    q: 'How do I track my order?',
    a: 'Use the "Track Order" page and enter your order number from your confirmation email.',
  },
];

export default function CustomerServicePage({ onOpenChat }) {
  return (
    <div className="section" style={{ maxWidth: 800 }}>
      <h2 className="section-title" style={{ marginBottom: 8 }}>
        Customer <span>Service</span>
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 32 }}>
        We're here to help! Reach out through any channel below.
      </p>

      {/* Contact channels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 36,
        }}
      >
        {CONTACT_CHANNELS.map((c) => (
          <div
            key={c.title}
            style={{
              background: '#fff',
              borderRadius: 18,
              border: '1px solid var(--border)',
              padding: 22,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 10 }}>{c.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{c.title}</div>
            <div style={{ fontSize: 13, color: 'var(--peach-dark)', fontWeight: 600, marginBottom: 3 }}>
              {c.detail}
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 20,
          fontWeight: 800,
          marginBottom: 18,
        }}
      >
        Frequently Asked Questions
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
        {FAQS.map((faq) => (
          <div
            key={faq.q}
            style={{
              background: '#fff',
              borderRadius: 14,
              border: '1px solid var(--border)',
              padding: '16px 20px',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
              {faq.q}
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
              {faq.a}
            </div>
          </div>
        ))}
      </div>

      {/* Chat CTA */}
      <div
        style={{
          background: 'var(--peach-light)',
          borderRadius: 18,
          padding: 28,
          textAlign: 'center',
          border: '1px solid var(--peach)',
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 10 }}>🤖</div>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
          Chat with Melly AI
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
          Get instant answers in English, Afrikaans, Zulu & Patstaal
        </p>
        <button className="btn-primary" onClick={onOpenChat}>
          Open Chat Assistant
        </button>
      </div>
    </div>
  );
}
