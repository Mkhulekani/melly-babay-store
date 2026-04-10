/**
 * App.jsx
 * ─────────────────────────────────────────────────
 * Root application component.
 *
 * Responsibilities:
 *   - Holds all global state (products, cart, auth, UI)
 *   - Owns client-side "routing" via a `page` string
 *   - Passes data and callbacks down to pages and components
 *
 * To add a new page:
 *   1. Import the page component below.
 *   2. Add a case to renderPage().
 *   3. Add a nav link in Navbar.jsx.
 */

import React, { useState } from 'react';

// ── Styles ───────────────────────────────────────────────────
import './styles/globals.css';

// ── Data ─────────────────────────────────────────────────────
import { INITIAL_PRODUCTS }    from './data/products';
import { CATEGORIES, getCategoryById } from './data/categories';

// ── Hooks ────────────────────────────────────────────────────
import { useToast } from './hooks/useToast';

// ── Layout components ────────────────────────────────────────
import Navbar           from './components/Navbar';
import CategoryBar      from './components/CategoryBar';
import ChatBot          from './components/ChatBot';
import Toast            from './components/Toast';
import ProductModal     from './components/ProductModal';
import LoginModal       from './components/LoginModal';
import EditProductModal from './components/EditProductModal';
import WelcomePopup     from './components/WelcomePopup';

// ── Pages ────────────────────────────────────────────────────
import HomePage            from './pages/HomePage';
import ShopPage            from './pages/ShopPage';
import CollectionsPage     from './pages/CollectionsPage';
import AboutPage           from './pages/AboutPage';
import CustomerServicePage from './pages/CustomerServicePage';
import TrackOrderPage      from './pages/TrackOrderPage';
import CartPage            from './pages/CartPage';
import AdminPage           from './pages/AdminPage';
import OrdersPage          from './pages/OrdersPage';
import OrderHistoryPage    from './pages/OrderHistoryPage';

// ── Footer ───────────────────────────────────────────────────
import Footer from './components/Footer';

export default function App() {
  // ── Routing ───────────────────────────────────────────────
  const [page, setPage] = useState('home');

  // ── Product state ─────────────────────────────────────────
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [nextId,   setNextId]   = useState(INITIAL_PRODUCTS.length + 1);

  // ── Filter / search ───────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState('all');
  const [search,         setSearch]         = useState('');

  // ── Cart ──────────────────────────────────────────────────
  const [cart, setCart] = useState([]);

  // ── Auth ──────────────────────────────────────────────────
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin,  setIsAdmin]  = useState(false);
  const [user,     setUser]     = useState(null);

  // ── Modals ────────────────────────────────────────────────
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct,  setEditingProduct]  = useState(null);
  const [showLogin,       setShowLogin]       = useState(false);

  // ── Chat ──────────────────────────────────────────────────
  const [chatForceOpen, setChatForceOpen] = useState(false);

  // ── Welcome popup ─────────────────────────────────────────
  const [showPopup, setShowPopup] = useState(true);

  // ── Order history ─────────────────────────────────────────
  const [orders, setOrders] = useState([]);

  // ── Toast ─────────────────────────────────────────────────
  const { toast, showToast } = useToast();

  // ── Helpers ───────────────────────────────────────────────
  const getCatName = (id) => getCategoryById(id).name;

  /** Navigate to a page. 'sale' is a shortcut for shop + filter. */
  const navigate = (target) => {
    if (target === 'sale') {
      setActiveCategory('sale');
      setPage('shop');
    } else {
      setPage(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /** Go to shop with a specific category pre-selected. */
  const filterAndGo = (catId) => {
    setActiveCategory(catId);
    setPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Cart handlers ─────────────────────────────────────────
  const addToCart = (product) => {
    if (!product.stock) return;
    setCart((prev) => {
      const existing = prev.find((x) => x.id === product.id);
      if (existing) {
        return prev.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart! 🛒`);
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: Math.max(0, x.qty + delta) } : x))
        .filter((x) => x.qty > 0)
    );
  };

  const handleCheckout = () => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping  = subtotal >= 500 ? 0 : 60;
    const newOrder  = {
      id:        `ORD-${Date.now()}`,
      date:      new Date().toLocaleString('en-ZA'),
      items:     cart.map((i) => ({ ...i })),
      subtotal,
      shipping,
      total:     subtotal + shipping,
      user:      user?.name || 'Guest',
      status:    'Confirmed',
    };
    setOrders((prev) => [newOrder, ...prev]);
    showToast('Order placed! Thank you 🎉');
    setCart([]);
    navigate('order-history');
  };

  const cartCount = cart.reduce((sum, x) => sum + x.qty, 0);

  // ── Auth handlers ─────────────────────────────────────────
  const handleLoginSuccess = ({ name, email, admin }) => {
    setLoggedIn(true);
    setIsAdmin(admin);
    setUser({ name, email, admin });
    setShowLogin(false);
    showToast(`Welcome${admin ? ' Admin' : ''}, ${name}! 👋`);
    if (admin) navigate('admin');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    navigate('home');
    showToast('Logged out successfully.');
  };

  // ── Product handlers (admin) ──────────────────────────────
  const addProduct = (product) => {
    setProducts((prev) => [...prev, { ...product, id: nextId }]);
    setNextId((n) => n + 1);
    showToast('Product added! ✅');
  };

  const updateProduct = (updated) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingProduct(null);
    showToast('Product updated! ✅');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((x) => x.id !== id));
    showToast('Product deleted.');
  };

  // ── Filtered products for shop / search ───────────────────
  const filteredProducts = products.filter((p) => {
    const catMatch =
      activeCategory === 'all' ||
      p.category === activeCategory ||
      (activeCategory === 'sale' && p.badge === 'sale');

    const searchMatch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    return catMatch && searchMatch;
  });

  // ── Page renderer ─────────────────────────────────────────
  const renderPage = () => {
    // Shared props passed to multiple pages
    const shopProps = {
      products: filteredProducts,
      search,
      onSearch:    setSearch,
      onSelectProd: setSelectedProduct,
      onAddToCart:  addToCart,
      onWishlist:   () => showToast('Added to wishlist! 💛'),
      getCatName,
      user,
      loggedIn,
    };

    switch (page) {
      case 'home':
        return (
          <HomePage
            {...shopProps}
            onNavigate={navigate}
            onFilterCat={filterAndGo}
          />
        );

      case 'shop':
        return (
          <ShopPage
            {...shopProps}
            activeCategory={activeCategory}
            activeCategoryName={getCatName(activeCategory)}
          />
        );

      case 'collections':
        return (
          <CollectionsPage
            products={products}
            onFilterCat={filterAndGo}
          />
        );

      case 'about':
        return <AboutPage />;

      case 'service':
        return (
          <CustomerServicePage
            onOpenChat={() => setChatForceOpen(true)}
          />
        );

      case 'track':
        return <TrackOrderPage />;

      case 'cart':
        return (
          <CartPage
            cart={cart}
            onChangeQty={changeQty}
            onCheckout={handleCheckout}
            onNavigate={navigate}
          />
        );

      case 'orders':
        return (
          <OrdersPage
            cart={cart}
            onChangeQty={changeQty}
            onCheckout={handleCheckout}
            onNavigate={navigate}
            loggedIn={loggedIn}
            onLoginClick={() => setShowLogin(true)}
          />
        );

      case 'order-history':
        return (
          <OrderHistoryPage
            orders={orders}
            loggedIn={loggedIn}
            onLoginClick={() => setShowLogin(true)}
            onNavigate={navigate}
          />
        );

      case 'admin':
        return (
          <AdminPage
            products={products}
            isAdmin={isAdmin}
            orders={orders}
            onAdd={addProduct}
            onEdit={setEditingProduct}
            onDelete={deleteProduct}
            onLoginClick={() => setShowLogin(true)}
            getCatName={getCatName}
          />
        );

      default:
        return <HomePage {...shopProps} onNavigate={navigate} onFilterCat={filterAndGo} />;
    }
  };

  // ── Render ────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Welcome popup */}
      {showPopup && (
        <WelcomePopup
          onClose={() => setShowPopup(false)}
          onNavigate={navigate}
        />
      )}

      {/* Navigation */}
      <Navbar
        page={page}
        onNavigate={navigate}
        cartCount={cartCount}
        isAdmin={isAdmin}
        loggedIn={loggedIn}
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
      />

      {/* Category filter bar */}
      <CategoryBar
        activeCategory={activeCategory}
        onChange={(catId) => {
          setActiveCategory(catId);
          if (page !== 'shop') navigate('shop');
        }}
      />

      {/* Main content */}
      <main style={{ flex: 1, paddingBottom: 80 }}>
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} onFilterCat={filterAndGo} />

      {/* ── Overlays / Modals ─────────────────────────────── */}

      {/* Product detail */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          categoryName={getCatName(selectedProduct.category)}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Login */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {/* Edit product (admin) */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={updateProduct}
        />
      )}

      {/* AI Chatbot */}
      <ChatBot
        products={products}
        forceOpen={chatForceOpen}
        onForceOpenHandled={() => setChatForceOpen(false)}
      />

      {/* Toast notification */}
      <Toast message={toast} />
    </div>
  );
}
