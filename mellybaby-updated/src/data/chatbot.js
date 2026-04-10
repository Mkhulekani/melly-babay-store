/**
 * chatbot.js
 * ─────────────────────────────────────────────────
 * All multilingual chatbot content and reply logic.
 *
 * Supported languages:
 *   en  – English
 *   af  – Afrikaans
 *   zu  – Zulu (isiZulu)
 *   pa  – Patstaal (Kaapse Afrikaans)
 *
 * To add a new language:
 *   1. Add a key to LANGUAGE_NAMES.
 *   2. Add a greeting to GREETINGS.
 *   3. Add quick-reply chips to QUICK_REPLIES.
 *   4. Add reply strings to the REPLIES map inside getBotReply().
 */

export const LANGUAGE_NAMES = {
  en: 'English',
  af: 'Afrikaans',
  zu: 'Zulu',
  pa: 'Patstaal',
};

export const GREETINGS = {
  en: "Hi there! 👋 I'm Melly, your baby shop assistant. How can I help you today?",
  af: "Hallo! 👋 Ek is Melly, jou baba-winkel assistent. Hoe kan ek jou help?",
  zu: "Sawubona! 👋 NginguMelly, umsizi wakho. Ngingakusiza kanjani?",
  pa: "Haai bru! 👋 Ek is Melly. Watse ding soek jy vir jou kleintjie?",
};

export const QUICK_REPLIES = {
  en: ['Track my order', 'Return policy', 'Sizing guide', 'Shipping info'],
  af: ['Volg bestelling',  'Teruggawe',     'Groottes',      'Versending'],
  zu: ['Landela i-order',  'Inqubomgomo',   'Amasize',       'Ukuthumela'],
  pa: ["Waar's my order?", 'Kan ek return?', 'Watter size?',  'Hoe stuur julle?'],
};

/**
 * getBotReply
 * Returns a localised reply string based on the user's message.
 *
 * @param {string}   message  - Raw user input
 * @param {string}   lang     - Language code (en / af / zu / pa)
 * @param {Array}    products - Current product list (for search)
 * @returns {string}
 */
export function getBotReply(message, lang, products) {
  const msg = message.toLowerCase();

  const REPLIES = {
    en: {
      order:   'Your order can be tracked using the order number in your confirmation email. SA orders: 3–5 days. International: 7–14 days. 📦',
      return:  'We accept returns within 30 days. Items must be unused and in original packaging. Email returns@mellybaby.co.za 💌',
      size:    'Sizes: NB (0–3m) · S (3–6m) · M (6–12m) · L (12–18m) · XL (18–24m). When unsure, size up! 👶',
      ship:    'SA: R60 flat rate, FREE over R500. International: R180–R350 by destination. We ship to 50+ countries! ✈️',
      pay:     'We accept Visa, Mastercard, PayPal, EFT & SnapScan. All payments are encrypted and secure. 🔒',
      hello:   'Hello! Great to see you 💛 How can I help — products, orders, or something else?',
      default: `I'm here to help! Ask me about:\n• Order tracking 📦\n• Returns & sizing 👶\n• Shipping worldwide ✈️\n• Products (${products.length} available)`,
    },
    af: {
      order:   'Gebruik jou bestellingsnommer uit die bevestigings-epos. SA: 3–5 werksdae. Internasionaal: 7–14 dae. 📦',
      return:  'Ons aanvaar teruggawes binne 30 dae. Items moet ongebruik wees. Stuur na returns@mellybaby.co.za 💌',
      size:    'Groottes: NB (0–3m) · S (3–6m) · M (6–12m) · L (12–18m) · XL (18–24m). Gaan groter as onseker! 👶',
      ship:    'SA: R60 (gratis oor R500). Internasionaal: R180–R350. Ons stuur na 50+ lande! ✈️',
      pay:     'Visa, Mastercard, PayPal, EFT & SnapScan. Alle betalings is veilig. 🔒',
      hello:   'Hallo! Bly om jou te sien 💛 Waarmee kan ek help?',
      default: `Vra my oor:\n• Bestellings 📦\n• Teruggawes & groottes 👶\n• Versending ✈️`,
    },
    zu: {
      order:   'Sebenzisa inombolo ye-order ku-imeyili. I-SA: izinsuku 3–5. Emhlabeni: 7–14. 📦',
      return:  'Samukela ukubuyiswa kwazo izinsuku eziyi-30. Zingasetshenziswa. returns@mellybaby.co.za 💌',
      size:    'NB (0–3m) · S (3–6m) · M (6–12m) · L (12–18m) · XL (18–24m). Uma ungaqinisekile, thatha elikhulu! 👶',
      ship:    'SA: R60 (mahhala phezu kuka-R500). Amazwe: R180–R350. Sithunyelwa emazweni angu-50+! ✈️',
      pay:     'Samukela Visa, Mastercard, PayPal ne-EFT. Zivikelekile. 🔒',
      hello:   'Sawubona! Ngiyajabula ukukubona 💛 Ngingakusiza ngani?',
      default: `Buza ngokuthi:\n• I-order yakho 📦\n• Ukubuyiswa 👶\n• Ukuthunywa ✈️`,
    },
    pa: {
      order:   "Gebruik die order nommer wat ons vir jou gestuur het bru. SA: 3–5 dae. Buite: 7–14 dae. 📦",
      return:  "Ja, 30 dae return maar die ding moet nog reg lyk. Stuur vir ons 'n epos bru. 💌",
      size:    'NB (0–3m) · S · M · L · XL. Gaan eerder groter as jy nie seker is nie! 👶',
      ship:    'SA kos R60 (gratis oor R500). Buite SA R180–R350. Ons stuur orals bru! ✈️',
      pay:     'Ons vat Visa, Mastercard, PayPal, EFT, SnapScan. Jou geld is veilig. 🔒',
      hello:   'Haai bru! Lekker jy\'s hier 💛 Wat soek jy?',
      default: `Vra my enigiets bru:\n• Order status 📦\n• Returns & groottes 👶\n• Versending ✈️`,
    },
  };

  const L = REPLIES[lang] ?? REPLIES.en;

  // Intent matching — extend patterns here as needed
  if (/track|order|bestell|status|waar.*order/i.test(msg))    return L.order;
  if (/return|terug|exchange|buya|refund/i.test(msg))         return L.return;
  if (/size|maat|groot|amasize/i.test(msg))                   return L.size;
  if (/ship|deliver|stuur|thuny|internat/i.test(msg))         return L.ship;
  if (/pay|betaal|khokha|card|snap|visa/i.test(msg))          return L.pay;
  if (/hi|hello|hallo|sawu|haai|hey/i.test(msg))              return L.hello;

  // Product search fallback
  const matches = products.filter(
    (p) =>
      p.name.toLowerCase().includes(msg) ||
      p.category.toLowerCase().includes(msg)
  );
  if (matches.length > 0) {
    const list = matches
      .slice(0, 4)
      .map((p) => `• ${p.name} — R${p.price}`)
      .join('\n');
    return `Found ${matches.length} product(s) for "${message}":\n${list}\n\nVisit the Shop to see them! 🛍️`;
  }

  return L.default;
}
