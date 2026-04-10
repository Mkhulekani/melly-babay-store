/**
 * WelcomePopup.jsx
 * ─────────────────────────────────────────────────
 * A beautiful popup that appears when the site loads.
 * Uses Claude AI to fetch a fresh baby tip, fun fact,
 * or seasonal advice every visit.
 *
 * Props:
 *   onClose     {fn}   Close the popup
 *   onNavigate  {fn}   Navigate to shop
 */

import React, { useState, useEffect } from 'react';

const POPUP_TYPES = [
  { type: 'tip',  label: '💡 Baby Tip',       color: '#FFF0E6', accent: '#D4724A' },
  { type: 'fact', label: '🌟 Did You Know?',   color: '#E8F4FD', accent: '#2980B9' },
  { type: 'rec',  label: '🛍️ Just For You',    color: '#F0FBF0', accent: '#27AE60' },
];

export default function WelcomePopup({ onClose, onNavigate }) {
  const [content, setContent]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [visible, setVisible]   = useState(false);
  const [popupMeta]             = useState(
    () => POPUP_TYPES[Math.floor(Math.random() * POPUP_TYPES.length)]
  );

  // Slide in after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Fetch from Claude API
  useEffect(() => {
    const prompts = {
      tip:  'Give me ONE practical, warm, and encouraging baby care tip for new parents. Keep it to 2-3 sentences max. Make it feel friendly and reassuring. No bullet points, just flowing text.',
      fact: 'Share ONE fascinating and delightful baby development fact that would surprise and delight new parents. Keep it to 2-3 sentences. Make it feel magical and wonderful.',
      rec:  'Give ONE warm product recommendation tip for parents shopping for baby products online. Keep it to 2-3 sentences. Focus on what to look for in quality baby items. Make it feel like advice from a trusted friend.',
    };

    async function fetchTip() {
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            system: 'You are a warm, knowledgeable baby care expert. Give concise, friendly advice.',
            messages: [{ role: 'user', content: prompts[popupMeta.type] }],
          }),
        });
        const data = await res.json();
        const text = data?.content?.[0]?.text || fallback(popupMeta.type);
        setContent(text);
      } catch {
        setContent(fallback(popupMeta.type));
      } finally {
        setLoading(false);
      }
    }

    fetchTip();
  }, [popupMeta.type]);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 300);
  }

  function handleShop() {
    handleClose();
    setTimeout(() => onNavigate('shop'), 320);
  }

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(30,20,15,0.55)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 28,
          maxWidth: 440,
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.22)',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${popupMeta.color}, #fff)`,
            padding: '28px 28px 20px',
            position: 'relative',
            borderBottom: '1px solid #f0e8e4',
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(0,0,0,0.08)', border: 'none',
              width: 32, height: 32, borderRadius: '50%',
              fontSize: 16, cursor: 'pointer', color: '#666',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.15)')}
            onMouseOut={(e)  => (e.currentTarget.style.background = 'rgba(0,0,0,0.08)')}
          >
            ✕
          </button>

          {/* Badge */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: popupMeta.accent,
              color: '#fff', borderRadius: 20,
              padding: '5px 14px', fontSize: 11,
              fontWeight: 700, letterSpacing: 0.5,
              marginBottom: 12,
            }}
          >
            {popupMeta.label}
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: 22, fontWeight: 800,
              color: '#2A1A0E', lineHeight: 1.2, margin: 0,
            }}
          >
            Welcome to MellyBaby! 🍼
          </h2>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
            We have something special just for you today
          </p>
        </div>

        {/* Body — AI content */}
        <div style={{ padding: '24px 28px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <LoadingDots color={popupMeta.accent} />
              <p style={{ fontSize: 13, color: '#aaa', marginTop: 14 }}>
                Fetching something lovely for you…
              </p>
            </div>
          ) : (
            <p
              style={{
                fontSize: 15, lineHeight: 1.75,
                color: '#3A2A20',
                margin: 0,
              }}
            >
              {content}
            </p>
          )}

          {/* Divider */}
          <div
            style={{
              height: 1, background: '#f0e8e4',
              margin: '20px 0',
            }}
          />

          {/* CTA row */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={handleShop}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #D4724A, #E8705A)',
                color: '#fff', border: 'none',
                borderRadius: 14, padding: '13px 20px',
                fontSize: 14, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'transform 0.15s, box-shadow 0.15s',
                boxShadow: '0 4px 16px rgba(212,114,74,0.35)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform  = 'translateY(-1px)';
                e.currentTarget.style.boxShadow  = '0 8px 24px rgba(212,114,74,0.45)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform  = '';
                e.currentTarget.style.boxShadow  = '0 4px 16px rgba(212,114,74,0.35)';
              }}
            >
              Shop Now →
            </button>
            <button
              onClick={handleClose}
              style={{
                background: '#f5f0ec', color: '#888',
                border: 'none', borderRadius: 14,
                padding: '13px 18px', fontSize: 13,
                fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#ece4df')}
              onMouseOut={(e)  => (e.currentTarget.style.background = '#f5f0ec')}
            >
              Maybe later
            </button>
          </div>

          <p style={{ fontSize: 11, color: '#bbb', textAlign: 'center', marginTop: 14 }}>
            ✨ Powered by AI — refreshed every visit
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Loading dots ───────────────────────────────────────────────
function LoadingDots({ color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 10, height: 10, borderRadius: '50%',
            background: color,
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── Fallback content if API fails ─────────────────────────────
function fallback(type) {
  const fallbacks = {
    tip:  'Always respond promptly to your baby\'s cues — you can\'t spoil a newborn! Quick responses help build a secure attachment and teach your little one that the world is a safe, loving place.',
    fact: 'Babies are born with about 300 bones, but adults only have 206! Many of those tiny bones fuse together as your child grows, which is why newborns are so wonderfully flexible.',
    rec:  'When shopping for baby products, always look for BPA-free materials and age-appropriate safety ratings. Quality matters more than price — invest in items your baby will use daily like feeding tools and sleep essentials.',
  };
  return fallbacks[type];
}
