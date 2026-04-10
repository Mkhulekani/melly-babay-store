/**
 * products.js
 * ─────────────────────────────────────────────────
 * Seed / demo product data.
 *
 * Each product has:
 *   id        {number}  Unique identifier
 *   name      {string}  Display name
 *   category  {string}  Must match a category id in categories.js
 *   price     {number}  Current price in ZAR (R)
 *   oldPrice  {number|null} Strike-through price (used when on sale)
 *   emoji     {string}  Fallback icon when no image is uploaded
 *   img       {string|null} Base64 or URL of product image
 *   badge     {'new'|'sale'|'hot'|''} Optional label shown on card
 *   stock     {boolean} Whether the product is available
 *   desc      {string}  Short product description
 */

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Organic Cotton Onesie Set',
    category: 'newborn',
    price: 189,
    oldPrice: null,
    emoji: '👶',
    img: null,
    badge: 'new',
    stock: true,
    desc: '5-pack of ultra-soft organic cotton onesies. Gentle on delicate newborn skin, available in sizes NB–12M.',
  },
  {
    id: 2,
    name: 'Natural Wooden Rattle',
    category: 'toys',
    price: 79,
    oldPrice: null,
    emoji: '🪀',
    img: null,
    badge: '',
    stock: true,
    desc: 'Hand-crafted safe wooden rattle. Stimulates sensory development in babies 3m+.',
  },
  {
    id: 3,
    name: 'Complete Feeding Set',
    category: 'feeding',
    price: 249,
    oldPrice: 320,
    emoji: '🍼',
    img: null,
    badge: 'sale',
    stock: true,
    desc: '7-piece BPA-free feeding set: bottles, spoon, bowl, bib & brush. Perfect from 4 months.',
  },
  {
    id: 4,
    name: 'Soft Plush Elephant',
    category: 'toys',
    price: 139,
    oldPrice: null,
    emoji: '🐘',
    img: null,
    badge: 'new',
    stock: true,
    desc: 'Hypoallergenic, machine-washable plush elephant. The perfect first cuddly friend.',
  },
  {
    id: 5,
    name: 'Botanical Swaddle Blanket',
    category: 'newborn',
    price: 199,
    oldPrice: null,
    emoji: '🌿',
    img: null,
    badge: '',
    stock: true,
    desc: 'Breathable muslin swaddle blanket with hand-illustrated botanical print.',
  },
  {
    id: 6,
    name: 'Smart Baby Monitor',
    category: 'nursery',
    price: 649,
    oldPrice: null,
    emoji: '📡',
    img: null,
    badge: '',
    stock: true,
    desc: 'HD wireless monitor with night vision, two-way audio & temperature alerts.',
  },
  {
    id: 7,
    name: 'Musical Crib Mobile',
    category: 'nursery',
    price: 279,
    oldPrice: null,
    emoji: '🎠',
    img: null,
    badge: '',
    stock: false,
    desc: 'Gentle rotating mobile with lullabies and soft plush animals.',
  },
  {
    id: 8,
    name: 'Ergonomic Bath Seat',
    category: 'bath',
    price: 169,
    oldPrice: 220,
    emoji: '🛁',
    img: null,
    badge: 'sale',
    stock: true,
    desc: 'Non-slip bath support seat for infants 6–18 months. Extra-wide stability base.',
  },
  {
    id: 9,
    name: 'Mama & Baby Gift Set',
    category: 'mom',
    price: 429,
    oldPrice: null,
    emoji: '🎁',
    img: null,
    badge: 'new',
    stock: true,
    desc: 'Curated gift box: organic body lotion, baby oil, bamboo swaddle & reusable breast pads.',
  },
  {
    id: 10,
    name: 'Stroller Travel System',
    category: 'travel',
    price: 1299,
    oldPrice: null,
    emoji: '🧳',
    img: null,
    badge: '',
    stock: true,
    desc: '3-in-1 system: stroller, carry cot & car seat adapter. Folds flat in one click.',
  },
  {
    id: 11,
    name: 'Feeding & Bath Combo',
    category: 'combo',
    price: 349,
    oldPrice: 389,
    emoji: '💝',
    img: null,
    badge: 'sale',
    stock: true,
    desc: 'Combo deal: Complete feeding set + bath seat. Save R40 vs buying separately!',
  },
  {
    id: 12,
    name: 'Baby Grooming Kit',
    category: 'bath',
    price: 129,
    oldPrice: null,
    emoji: '✂️',
    img: null,
    badge: '',
    stock: true,
    desc: '7-piece grooming kit: nail clippers, comb, brush, thermometer & more.',
  },
];
