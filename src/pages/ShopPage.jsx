import { useState } from "react";
import Icon from "../components/Icon";
import BestSellerCard from "../components/BestSellerCard";
import RecentlyAddedCard from "../components/RecentlyAddedCard";
import { BEST_SELLERS, RECENTLY_ADDED } from "../data/data";

const FILTER_CATEGORIES = [
  { label: "All Products", checked: true },
  { label: "Furniture" },
  { label: "Lighting" },
  { label: "Textiles" },
];

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
};

const ShopPage = ({ setPage }) => {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [maxPrice, setMaxPrice] = useState(2500);

  const handleCategoryChange = (label) => {
    setActiveCategory(label);
  };

  const allProducts = [...BEST_SELLERS, ...RECENTLY_ADDED];
  
  const filteredProducts = allProducts.filter(p => {
    // Investment Range Map
    const pPrice = parsePrice(p.price);
    if (maxPrice < 2500 && pPrice > maxPrice) return false;
    
    return true;
  });

  return (
    <main className="shop-main">
      {/* Prime Header */}
      <header className="shop-header">
        <div className="shop-header-overlay" />
        <div className="shop-header-inner">
          <span className="shop-eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>Signature Edits</span>
          <h1 className="shop-title">The <span className="shop-title-alt">Collection</span></h1>
          <p className="shop-subtitle">
            Curated essentials for the modern atelier. Designed with absolute precision,
            crafted for enduring longevity.
          </p>
        </div>
      </header>

      <div className="shop-body">
        {/* Sidebar */}
        <aside className="shop-sidebar">
          <div className="shop-sidebar-sticky">
            {/* Categories */}
            <div className="filter-block">
              <h3 className="filter-title">
                <Icon name="filter_list" style={{ fontSize: "18px" }} />
                Categories
              </h3>
              <div className="filter-list">
                {FILTER_CATEGORIES.map((cat) => (
                  <label key={cat.label} className="filter-item" onClick={() => handleCategoryChange(cat.label)}>
                    <div
                      className="filter-box"
                      style={{ borderColor: activeCategory === cat.label ? "#6250ae" : "#b1b2b5" }}
                    >
                      {activeCategory === cat.label && (
                        <div className="filter-dot" style={{ background: "#6250ae" }} />
                      )}
                    </div>
                    <span
                      className="filter-label"
                      style={{ color: activeCategory === cat.label ? "#313236" : "#5e5f62" }}
                    >
                      {cat.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="price-block">
              <h3 className="price-title">Investment Range</h3>
              <div className="price-slider-container">
                <div className="price-track-wrap">
                  <div className="price-track-static" />
                  <div 
                    className="price-track-active" 
                    style={{ width: `${(maxPrice / 2500) * 100}%` }} 
                  />
                  <input 
                    type="range" 
                    min="0" 
                    max="2500" 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="price-input-range"
                  />
                </div>
                <div className="price-labels">
                  <span>$0</span>
                  <span>${maxPrice.toLocaleString()}{maxPrice === 2500 ? "+" : ""}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="shop-content">
          {/* Collection Grid */}
          <section className="collection-grid-section">
            <div className="collection-header">
              <div className="collection-header-left">
                <h2 className="collection-grid-title">All Masterpieces</h2>
                <div className="collection-indicator" />
              </div>
              <div className="collection-header-right">
                <span className="collection-count">{filteredProducts.length} Atelier Items</span>
                <div className="collection-sort">
                  <span>Filtered Selection</span>
                  <Icon name="keyboard_arrow_down" />
                </div>
              </div>
            </div>
            
            <div className="shop-products-grid">
              {filteredProducts.map((p, idx) => (
                <div key={p.name + idx} className="shop-product-item">
                  <RecentlyAddedCard product={p} setPage={setPage} />
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="empty-filter-state" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "64px 0", color: "#5e5f62", fontStyle: "italic" }}>
                  No masterpieces found within this investment range.
                </div>
              )}
            </div>
          </section>

          {/* Newsletter Bento */}
          <section
            className="newsletter-bento"
            style={{
              background:
                "linear-gradient(135deg, #f7e1d7 0%, rgba(197,184,255,0.2) 100%)",
            }}
          >
            <div className="newsletter-content">
              <h2 className="newsletter-title">Stay in the Flow.</h2>
              <p className="newsletter-text">
                Join our mailing list to receive exclusive early access to seasonal
                drops and atelier stories.
              </p>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="newsletter-input"
                  style={{
                    background: "rgba(255,255,255,0.4)",
                    backdropFilter: "blur(8px)",
                  }}
                />
                <button className="newsletter-button" style={{ background: "#6250ae" }}>
                  Subscribe
                </button>
              </div>
            </div>
            <div
              className="newsletter-glow"
              style={{ background: "rgba(98,80,174,0.1)" }}
            />
          </section>
        </div>
      </div>

      {/* Masterpiece Banner */}
      <section className="masterpiece-section">
        <div className="masterpiece-card">
          <img
            className="masterpiece-image"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEL_ghDKswCwgfjlYLxZO5tAtjCxiESnkRu2vK0hjRGy9fKmk1BUJetSaTXa9McZ5UAG5hhIiWQMv_bVq1I7iOn-dZSVAPC_HjFMgGu4KPO-d2LO-ul62LZbviRpDCPk4Vt2BJ3NiOhUyjhGz9oQc6arliZRnKSatFnuOZvPxI1E7ib-BOtzAfelq-CjEeMdAfqvmgs4iuK0Xj_NKMiLEpXHKzelOG29qMLl58Y1cpzrVs02IStTPS7WJBWQ5gCfQeauudTkVkwz4"
            alt="Masterpiece"
          />
          <div className="masterpiece-overlay" />
          <div className="masterpiece-content-wrap">
            <div className="masterpiece-content">
              <span className="masterpiece-eyebrow">The Masterpiece Series</span>
              <h2 className="masterpiece-title">Sculpted Perfection</h2>
              <p className="masterpiece-text">
                A symphony of horological precision and avant-garde design. Each
                movement is hand-finished by master artisans.
              </p>
              <button
                onClick={() => setPage("product")}
                className="masterpiece-button"
              >
                <span className="masterpiece-button-text">Discover the Piece</span>
                <Icon name="arrow_forward" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShopPage;
