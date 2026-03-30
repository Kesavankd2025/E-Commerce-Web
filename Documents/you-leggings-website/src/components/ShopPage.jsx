import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.jsx';
import { shopProducts, productFilterMeta } from '../data.js';
import { slugifyProductName } from '../productUtils.js';

function parsePriceNum(value) {
  const num = String(value || '').replace(/[^0-9]/g, '');
  return num ? parseInt(num, 10) : 0;
}
export default function ShopPage({ navigate, initialSearch, onCartUpdate }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [priceMax, setPriceMax] = useState(2500);
  const [toggleState, setToggleState] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const categoryOptions = ['YOU FULL LENGTH LEGGINGS', 'YOU ANKLE LENGTH LEGGINGS', 'YOU KIDS LEGGINGS', 'MERLYN FULL LENGTH LEGGINGS'];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

  const productsWithSlug = shopProducts.map((p) => ({ ...p, slug: slugifyProductName(p.name) }));

  const filteredProducts = productsWithSlug.filter((p) => {
    const meta = productFilterMeta[p.slug] || {};
    const price = parsePriceNum(p.price);
    const cat = meta.category || 'YOU FULL LENGTH LEGGINGS';
    const sizes = meta.sizes || ['S', 'M', 'L', 'XL'];
    const stock = meta.availability || 'in';
    const search = `${p.name} ${p.category}`.toLowerCase();

    const matchPrice = price <= priceMax;
    const matchCat = !selectedCategories.length || selectedCategories.includes(cat);
    const matchSize = !selectedSizes.length || selectedSizes.some((s) => sizes.includes(s));
    const matchAvail = !selectedAvailability.length ||
      (selectedAvailability.includes('In Stock') && stock === 'in') ||
      (selectedAvailability.includes('Out of Stock') && stock === 'out');
    const matchSearch = !searchQuery || search.includes(searchQuery.toLowerCase());

    return matchPrice && matchCat && matchSize && matchAvail && matchSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price') return parsePriceNum(a.price) - parsePriceNum(b.price);
    if (sortBy === 'Discount') {
      const da = productFilterMeta[slugifyProductName(a.name)]?.discount || 0;
      const db = productFilterMeta[slugifyProductName(b.name)]?.discount || 0;
      return db - da;
    }
    return 0;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [priceMax, selectedCategories, selectedSizes, selectedAvailability, sortBy, searchQuery]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  function handlePageChange(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
    // Smooth scroll back to top of product section
    const productGrid = document.querySelector('.shop-products');
    if (productGrid) {
      productGrid.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function clearFilters() {
    setPriceMax(2500);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedAvailability([]);
    setSortBy('');
    setSearchQuery('');
  }

  function toggleCheck(list, setList, val) {
    setList((prev) => prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]);
  }

  function handleCardClick(slug, e) {
    if (e.target.closest('.shop-product-link') || e.target.closest('.wishlist-toggle')) return;
    navigate('product', { product: slug });
  }

  return (
    <section className="section page-view shop-page" id="shop-page" style={{ display: 'block' }}>
      <style>{`
        @keyframes heartPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .heart-pulse { animation: heartPulse 0.4s ease-out; }
        .wishlist-toggle { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid transparent; }
        .wishlist-toggle:hover { background: #fff !important; transform: scale(1.15); box-shadow: 0 8px 24px rgba(241, 64, 100, 0.15) !important; border-color: rgba(241, 64, 100, 0.1); }
        .heart-icon-filled { fill: #f14064; color: #f14064; }
        .heart-icon-outline { color: #1a1a1a; }
      `}</style>
      <div className="page-main shop-main" style={{ backgroundImage: 'none', backgroundColor: '#9f9f9f' }}>
        <div className="hero-overlay"></div>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/images/bg-less/_DSC8937-Photoroom.png")', backgroundSize: 'auto 110%', backgroundPosition: 'right 100% top 50%', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)', zIndex: 2 }}></div>
        <div className="container page-main-content">
          <span className="hero-subtitle">Shop Collection</span>
          <h1 className="hero-title">Premium Leggings <br />For Every Move</h1>
        </div>
      </div>

      <div className="container page-body">
        <div className="text-center">
          <span className="section-subtitle">Curated Picks</span>
          <h2 className="section-title">Shop Products</h2>
        </div>
        <div className="shop-layout">
          <aside className="shop-filters">
            <div className="filter-group">
              <h3>Price Filter</h3>
              <p className="filter-range">₹0 — ₹{priceMax.toLocaleString('en-IN')}</p>
              <input type="range" min="0" max="2500" value={priceMax} onChange={(e) => setPriceMax(parseInt(e.target.value, 10))} />
            </div>
            <div className="filter-group">
              <h3>Categories</h3>
              <ul className="filter-list">
                {categoryOptions.map((cat) => (
                  <li key={cat}><label><input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCheck(selectedCategories, setSelectedCategories, cat)} /> {cat}</label></li>
                ))}
              </ul>
            </div>
            <div className="filter-group">
              <h3>Sort</h3>
              <ul className="filter-list">
                {['Discount', 'Price'].map((s) => (
                  <li key={s}><label><input type="radio" name="sort" checked={sortBy === s} onChange={() => setSortBy(s)} /> {s}</label></li>
                ))}
              </ul>
            </div>
            <div className="filter-group">
              <h3>Availability</h3>
              <ul className="filter-list">
                {['In Stock', 'Out of Stock'].map((a) => (
                  <li key={a}><label><input type="checkbox" checked={selectedAvailability.includes(a)} onChange={() => toggleCheck(selectedAvailability, setSelectedAvailability, a)} /> {a}</label></li>
                ))}
              </ul>
            </div>
            <div className="filter-group">
              <h3>Size</h3>
              <ul className="filter-list filter-size">
                {sizeOptions.map((sz) => (
                  <li key={sz}><label><input type="checkbox" checked={selectedSizes.includes(sz)} onChange={() => toggleCheck(selectedSizes, setSelectedSizes, sz)} /> {sz}</label></li>
                ))}
              </ul>
            </div>
            <button id="clearShopFiltersBtn" className="shop-clear-filters" type="button" onClick={clearFilters}>Clear Filters</button>
          </aside>
          <div className="shop-products">
            <div className="shop-results-meta" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0e0e8', paddingBottom: '10px' }}>
              <span style={{ fontSize: '14px', color: '#7a6870', fontWeight: '500' }}>
                Showing {paginatedProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} results
              </span>
            </div>
            <div className="products-grid">
              {paginatedProducts.map((p) => {
                return (
                  <div key={p.slug} className="product-card shop-product-card" data-product={p.slug}
                    style={{ cursor: 'pointer' }} onClick={(e) => handleCardClick(p.slug, e)}>
                    <div className="product-image">
                      <img src={p.image} alt={p.alt} />
                      <button className="wishlist-toggle" 
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
                          if (!isLoggedIn) {
                            navigate('login');
                            return;
                          }
                          toggleWishlist({ ...p, price_num: parsePriceNum(p.price) });
                          e.currentTarget.classList.add('heart-pulse');
                          setTimeout(() => e.currentTarget.classList.remove('heart-pulse'), 400);
                        }}
                        style={{ 
                          position: 'absolute', top: '12px', right: '12px', 
                          width: '32px', height: '32px', borderRadius: '50%', 
                          background: 'rgba(255,255,255,0.95)', border: 'none', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center', 
                          cursor: 'pointer', zIndex: 10
                        }}>
                        <Heart 
                          size={16} 
                          className={isInWishlist(p.slug) ? "heart-icon-filled" : "heart-icon-outline"} 
                          fill={isInWishlist(p.slug) ? "#f14064" : "none"} 
                        />
                      </button>
                    </div>
                    <div className="product-details shop-product-details">
                    <p className="shop-product-category">{p.category}</p>
                    <h3 className="product-name">{p.name}</h3>
                    <div className="shop-product-bottom">
                      <div className="product-price">{p.price}</div>
                      <a href={`?page=product&product=${p.slug}`} className="shop-product-link"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('product', { product: p.slug }); }}>
                        Buy Now
                      </a>
                    </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {totalPages > 1 && (
              <div className="product-pagination">
                <button
                  className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="page-btn-icon" size={18} />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="page-btn-icon" size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
