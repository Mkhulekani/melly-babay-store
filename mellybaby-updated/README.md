# 🍼 MellyBabyShop

A professional e-commerce web application for baby products, built with React.
Ships worldwide with multilingual AI chat support.

---

## 📁 Project Structure

```
mellybaby/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── CategoryBar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── CartItem.jsx
│   │   ├── ChatBot.jsx
│   │   ├── LoginModal.jsx
│   │   ├── EditProductModal.jsx
│   │   └── Toast.jsx
│   ├── pages/              # Full page views
│   │   ├── HomePage.jsx
│   │   ├── ShopPage.jsx
│   │   ├── CollectionsPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── CustomerServicePage.jsx
│   │   ├── TrackOrderPage.jsx
│   │   ├── CartPage.jsx
│   │   └── AdminPage.jsx
│   ├── data/
│   │   ├── products.js     # Initial product data
│   │   ├── categories.js   # Category definitions
│   │   └── chatbot.js      # Multilingual chatbot logic
│   ├── hooks/
│   │   └── useToast.js     # Toast notification hook
│   ├── styles/
│   │   └── globals.css     # Global CSS variables & base styles
│   ├── App.jsx             # Root app component & routing state
│   └── index.jsx           # React DOM entry point
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run
```bash
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
```

---

## 🔐 Admin Access

Use the following credentials to access the Admin Panel:
- **Email:** `admin@mellybaby.co.za`
- **Password:** any value (demo mode)

Admin features: add products, edit products, delete products, upload images.

---

## 🌍 Multilingual AI Chat

The Melly Assistant chatbot supports:
| Code | Language |
|------|----------|
| `en` | English |
| `af` | Afrikaans |
| `zu` | Zulu (isiZulu) |
| `pa` | Patstaal (Kaapse Afrikaans) |

To add a new language, edit `src/data/chatbot.js` and add a new entry.

---

## 🛍️ Product Categories

| ID | Name |
|----|------|
| `mom` | Mom & Baby Essentials |
| `feeding` | Baby Feeding |
| `newborn` | Newborn Baby Products |
| `toys` | Toys & Playtime |
| `nursery` | Nursery Items |
| `travel` | Travel Gear |
| `bath` | Baby Bathing & Grooming |
| `combo` | Combo — Save Money |
| `sale` | Sale 🔥 Hot |

---

## 🎨 Design System

CSS variables are defined in `src/styles/globals.css`:
- `--cream`, `--peach`, `--peach-dark`, `--rose`, `--gold`, `--sage`
- Fonts: **Playfair Display** (headings) + **DM Sans** (body)

---

## 🔧 Extending the App

### Add a new page
1. Create `src/pages/MyNewPage.jsx`
2. Import it in `src/App.jsx`
3. Add a nav link in `src/components/Navbar.jsx`
4. Add a route case in the `App.jsx` page switch

### Connect to a backend
Replace the `useState` product/cart arrays in `App.jsx` with API calls.
Recommended: **Supabase** (free tier, easy setup) or **Firebase**.

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| CSS Variables | Design tokens / theming |
| Google Fonts | Playfair Display + DM Sans |
| FileReader API | Local image upload preview |

---

## 📄 License

Built for MellyBabyShop. All rights reserved © 2026.
