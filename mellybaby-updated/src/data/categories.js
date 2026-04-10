/**
 * categories.js
 * ─────────────────────────────────────────────────
 * Central definition of all product categories.
 * Import this wherever categories are needed.
 *
 * To add a new category:
 *   1. Add an entry to CATEGORIES below.
 *   2. Use the same `id` string when creating products.
 */

export const CATEGORIES = [
  { id: 'all',      name: 'All Categories',            icon: '🏪' },
  { id: 'mom',      name: 'Mom & Baby Essentials',      icon: '🤱' },
  { id: 'feeding',  name: 'Baby Feeding',               icon: '🍼' },
  { id: 'newborn',  name: 'Newborn Baby Products',      icon: '👶' },
  { id: 'toys',     name: 'Toys & Playtime',            icon: '🧸' },
  { id: 'nursery',  name: 'Nursery Items',              icon: '🛏️' },
  { id: 'travel',   name: 'Travel Gear',                icon: '🧳' },
  { id: 'bath',     name: 'Baby Bathing & Grooming',    icon: '🛁' },
  { id: 'combo',    name: 'Combo — Save Money',         icon: '💝' },
  { id: 'sale',     name: 'Sale 🔥 Hot',                icon: '🏷️' },
];

/**
 * Helper: look up a category object by its id.
 * Returns the 'All Categories' entry as fallback.
 */
export function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}
