import React, { useState, useEffect, useCallback } from 'react';
import TopBar from './components/TopBar.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ToastContainer from './components/Toast.jsx';
import HomePage from './components/HomePage.jsx';
import AboutPage from './components/AboutPage.jsx';
import ShopPage from './components/ShopPage.jsx';
import ProductPage from './components/ProductPage.jsx';
import NewArrivalsPage from './components/NewArrivalsPage.jsx';
import BlogPage from './components/BlogPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import CartPage from './components/CartPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import MyAccountPage from './components/MyAccountPage.jsx';
import PrivacyPolicyPage from './components/PrivacyPolicyPage.jsx';
import TermsConditionsPage from './components/TermsConditionsPage.jsx';
import ShippingPolicyPage from './components/ShippingPolicyPage.jsx';
import WishlistPage from './components/WishlistPage.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { getCartCount } from './cartUtils.js';

const ROUTED_PAGES = ['about', 'shop', 'product', 'new-arrivals', 'blog', 'contact', 'cart', 'login', 'my-account', 'privacy-policy', 'terms-conditions', 'shipping-policy', 'wishlist'];

function getStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') || null;
  const product = params.get('product') || null;
  const search = params.get('search') || '';
  // my-account.html handled separately — detect via pathname
  if (window.location.pathname.includes('my-account')) {
    return { page: 'my-account', product: null, search: '' };
  }
  return { page, product, search };
}

function setUrlFromState(page, extra = {}) {
  const params = new URLSearchParams();
  if (page) params.set('page', page);
  if (extra.product) params.set('product', extra.product);
  if (extra.search) params.set('search', extra.search);
  const query = params.toString();
  const url = query ? `?${query}` : window.location.pathname;
  window.history.pushState({}, '', url);
}

export default function App() {
  const [{ page, product, search }, setRoute] = useState(getStateFromUrl);
  const [cartCount, setCartCount] = useState(getCartCount);

  useEffect(() => {
    // Force scroll to top on website refresh/mount
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Sync body class like the original
    document.body.className = '';
    if (page && ROUTED_PAGES.includes(page)) {
      document.body.classList.add(`${page}-page-active`);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    if (page === 'my-account') {
      document.body.classList.add('my-account-page-active');
    }
  }, [page]);

  useEffect(() => {
    const onPop = () => setRoute(getStateFromUrl());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((newPage, extra = {}) => {
    setUrlFromState(newPage, extra);
    setRoute({ page: newPage, product: extra.product || null, search: extra.search || '' });
  }, []);

  const refreshCartCount = useCallback(() => {
    setCartCount(getCartCount());
  }, []);

  function renderPage() {
    switch (page) {
      case 'about':      return <AboutPage />;
      case 'shop':       return <ShopPage navigate={navigate} initialSearch={search} onCartUpdate={refreshCartCount} />;
      case 'product':    return <ProductPage productSlug={product} navigate={navigate} onCartUpdate={refreshCartCount} />;
      case 'new-arrivals': return <NewArrivalsPage navigate={navigate} onCartUpdate={refreshCartCount} />;
      case 'blog':       return <BlogPage />;
      case 'contact':    return <ContactPage />;
      case 'cart':       return <CartPage navigate={navigate} onCartUpdate={refreshCartCount} />;
      case 'login':      return <LoginPage navigate={navigate} />;
      case 'my-account': return <MyAccountPage navigate={navigate} />;
      case 'wishlist':   return <WishlistPage navigate={navigate} onCartUpdate={refreshCartCount} />;
      case 'privacy-policy': return <PrivacyPolicyPage />;
      case 'terms-conditions': return <TermsConditionsPage />;
      case 'shipping-policy': return <ShippingPolicyPage />;
      default:           return <HomePage navigate={navigate} />;
    }
  }

  return (
    <WishlistProvider>
      <TopBar />
      <Header cartCount={cartCount} activePage={page} navigate={navigate} />
      <main>
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
      <ToastContainer />
    </WishlistProvider>
  );
}
