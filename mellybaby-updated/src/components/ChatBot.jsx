/**
 * ChatBot.jsx
 * ─────────────────────────────────────────────────
 * Floating AI chat assistant with multilingual support.
 * Sits in the bottom-right corner of every page.
 *
 * Props:
 *   products  {Array}  Current product list (used for search replies)
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  LANGUAGE_NAMES,
  GREETINGS,
  QUICK_REPLIES,
  getBotReply,
} from '../data/chatbot';

export default function ChatBot({ products }) {
  const [isOpen,   setIsOpen]   = useState(false);
  const [lang,     setLang]     = useState('en');
  const [messages, setMessages] = useState([]);
  const [input,    setInput]    = useState('');
  const [typing,   setTyping]   = useState(false);
  const bottomRef = useRef(null);

  // Show greeting when chat is first opened or language changes
  useEffect(() => {
    if (isOpen) {
      setMessages([{ from: 'bot', text: GREETINGS[lang] }]);
    }
  }, [isOpen, lang]);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    // Greeting will re-trigger via the useEffect above
  };

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg) return;

    const newMessages = [...messages, { from: 'user', text: msg }];
    setMessages(newMessages);
    setInput('');
    setTyping(true);

    try {
      const productList = products
        .slice(0, 20)
        .map((p) => `- ${p.name} (R${p.price}, ${p.stock ? 'in stock' : 'out of stock'})`)
        .join('\n');

      const history = newMessages.map((m) => ({
        role: m.from === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are Melly, a friendly and helpful assistant for MellyBaby — a South African online baby products store. 
You help parents find the right products, answer baby care questions, and assist with orders.
Be warm, concise, and encouraging. Use occasional emojis. Keep replies under 3 sentences unless listing products.
Current products available:\n${productList}
Respond in the same language the user writes in (English, Zulu, Sotho, or Afrikaans).`,
          messages: history,
        }),
      });

      const data = await res.json();
      const reply = data?.content?.[0]?.text || getBotReply(msg, lang, products);
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: getBotReply(msg, lang, products) },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* ── Floating action button ────────────────────────── */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        title="Chat with Melly"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 20,
          zIndex: 400,
          background: 'var(--peach-dark)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 54,
          height: 54,
          fontSize: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(212,114,74,.4)',
          cursor: 'pointer',
          transition: 'background 0.25s, transform 0.25s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'var(--rose)';
          e.currentTarget.style.transform = 'scale(1.08)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'var(--peach-dark)';
          e.currentTarget.style.transform = '';
        }}
      >
        {isOpen ? '×' : '💬'}
      </button>

      {/* ── Chat window ──────────────────────────────────── */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            zIndex: 400,
            width: 330,
            background: '#fff',
            borderRadius: 22,
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-chat)',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 480,
            overflow: 'hidden',
            animation: 'slideUp 0.2s ease',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, var(--peach-dark), var(--rose))',
              color: '#fff',
              padding: '14px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong style={{ fontSize: 14 }}>Melly Assistant 🤖</strong>
              <br />
              <small style={{ fontSize: 11, opacity: 0.85 }}>Online · Multilingual support</small>
            </div>

            {/* Language selector */}
            <select
              value={lang}
              onChange={(e) => changeLanguage(e.target.value)}
              style={{
                background: 'rgba(255,255,255,.25)',
                border: 'none',
                borderRadius: 8,
                color: '#fff',
                fontSize: 11,
                padding: '4px 7px',
                cursor: 'pointer',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {Object.entries(LANGUAGE_NAMES).map(([code, label]) => (
                <option key={code} value={code} style={{ color: '#333' }}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              minHeight: 220,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  maxWidth: '84%',
                  padding: '10px 13px',
                  borderRadius: 16,
                  fontSize: 13,
                  lineHeight: 1.55,
                  whiteSpace: 'pre-line',
                  alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  background:
                    msg.from === 'user' ? 'var(--peach-dark)' : 'var(--bg2)',
                  color: msg.from === 'user' ? '#fff' : 'var(--text)',
                  borderBottomRightRadius: msg.from === 'user' ? 4 : 16,
                  borderBottomLeftRadius:  msg.from === 'bot'  ? 4 : 16,
                }}
              >
                {msg.text}
              </div>
            ))}

            {typing && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  background: 'var(--bg2)',
                  color: 'var(--muted)',
                  fontStyle: 'italic',
                  padding: '10px 13px',
                  borderRadius: 16,
                  borderBottomLeftRadius: 4,
                  fontSize: 13,
                }}
              >
                Melly is typing…
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick reply chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 5,
              padding: '0 12px 8px',
            }}
          >
            {QUICK_REPLIES[lang]?.map((q, i) => (
              <button
                key={i}
                onClick={() => send(q)}
                style={{
                  background: 'var(--peach-light)',
                  color: 'var(--peach-dark)',
                  border: 'none',
                  borderRadius: 12,
                  padding: '5px 10px',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  fontFamily: 'var(--font-sans)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--peach)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'var(--peach-light)';
                  e.currentTarget.style.color = 'var(--peach-dark)';
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input row */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              padding: '10px 12px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type a message…"
              style={{
                flex: 1,
                border: '1.5px solid var(--border)',
                borderRadius: 20,
                padding: '9px 14px',
                fontSize: 13,
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--peach-dark)')}
              onBlur={(e)  => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
            <button
              onClick={() => send()}
              style={{
                background: 'var(--peach-dark)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'var(--rose)')}
              onMouseOut={(e)  => (e.currentTarget.style.background = 'var(--peach-dark)')}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
