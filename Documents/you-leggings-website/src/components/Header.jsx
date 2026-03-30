import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, User, ShoppingBag, X, Menu } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.jsx';
import { shopProducts, newArrivalProducts } from '../data.js';
import { slugifyProductName } from '../productUtils.js';

function getSearchableProducts() {
  const all = [...shopProducts, ...newArrivalProducts];
  const seen = new Set();
  const catalog = [];
  all.forEach((item) => {
    const slug = slugifyProductName(item.name);
    if (!seen.has(slug)) {
      seen.add(slug);
      catalog.push({ ...item, slug });
    }
  });
  return catalog;
}

export default function Header({ cartCount, activePage, navigate }) {
  const { wishlistCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  function handleSearchInput(e) {
    const q = e.target.value;
    setSearchQuery(q);
    if (!q.trim()) { setSearchResults([]); return; }
    const matches = getSearchableProducts()
      .filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 6);
    setSearchResults(matches);
  }

  function handleSearchClose() {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  }

  function handleSearchResultClick(slug) {
    navigate('product', { product: slug });
    handleSearchClose();
  }

  function handleCartClick() { navigate('cart'); }
  function handleLoginClick() { navigate('login'); }
  function handleDashboardClick() { navigate('my-account'); }

  function handleNavClick(page) {
    navigate(page);
    setIsMobileMenuOpen(false);
  }

  const navLinks = [
    { label: 'Home', href: '#home', page: null },
    { label: 'About Us', page: 'about' },
    { label: 'Shop', page: 'shop' },
    { label: 'New Arrivals', page: 'new-arrivals' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contact Us', page: 'contact' },
  ];

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); navigate(null); }}>
          <img src="/images/logo-new.png" alt="You Leggings Logo" />
        </a>

        <nav className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.page ? `?page=${link.page}` : '#home'}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.page); }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-icons text-dark">
          <button id="searchToggleBtn" className="nav-icon-btn search-toggle-btn" type="button" aria-label="Search"
            onClick={() => setSearchOpen((o) => !o)}>
            <Search size={18} />
          </button>
          <button className="nav-icon-btn heart-btn" type="button" aria-label="Wishlist" onClick={() => navigate('wishlist')}>
            <Heart size={18} fill={wishlistCount > 0 ? "currentColor" : "none"} />
            <span className={`cart-count-badge${wishlistCount > 0 ? ' has-items' : ''}`} style={{ backgroundColor: '#ff4d4d' }}>
              {wishlistCount}
            </span>
          </button>
          {!isLoggedIn && (
            <div className="nav-tooltip-wrap">
              <button id="loginPageBtn" className="nav-icon-btn" type="button" aria-label="Account"
                onClick={handleLoginClick}>
                <User size={18} />
              </button>
              <span className="nav-tooltip">Login</span>
            </div>
          )}
          {isLoggedIn && (
            <div className="nav-tooltip-wrap">
              <button id="dashboardBtn" className="nav-icon-btn" type="button" aria-label="My Account"
                onClick={handleDashboardClick}>
                <User size={18} />
              </button>
              <span className="nav-tooltip">My Account</span>
            </div>
          )}
          <button id="cartPageBtn" className="nav-icon-btn" type="button" aria-label="Cart"
            onClick={handleCartClick}>
            <ShoppingBag size={18} />
            <span id="cartCountBadge" className={`cart-count-badge${cartCount > 0 ? ' has-items' : ''}`} aria-live="polite">
              {cartCount}
            </span>
          </button>
          <button id="mobileMenuToggle" className="nav-icon-btn burger-menu" type="button" aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div id="headerSearchBar" className={`header-search${searchOpen ? ' open' : ''}`} aria-hidden={!searchOpen}>
          <div className="header-search-row">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              aria-label="Search products"
              value={searchQuery}
              onChange={handleSearchInput}
            />
            <button id="searchCloseBtn" className="header-search-close" type="button" aria-label="Close Search"
              onClick={handleSearchClose}>
              <X size={16} />
            </button>
          </div>
          {searchResults.length > 0 && (
            <div id="headerSearchResults" className="header-search-results has-items" aria-label="Search Results">
              {searchResults.map((item) => (
                <button key={item.slug} className="header-search-item" type="button"
                  onClick={() => handleSearchResultClick(item.slug)}>
                  <img src={item.image} alt={item.alt || item.name} />
                  <span className="header-search-item-name">{item.name}</span>
                  <span className="header-search-item-price">{item.price}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`nav-mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">MENU</span>
          <button className="close-drawer" onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
        </div>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick(link.page); }}>{link.label}</a>
            </li>
          ))}
          {!isLoggedIn ? (
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('login'); }}>Login / Register</a></li>
          ) : (
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('my-account'); }}>My Account</a></li>
          )}
        </ul>
      </div>
    </header>
  );
}
