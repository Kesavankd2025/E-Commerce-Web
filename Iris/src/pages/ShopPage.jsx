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

const ShopPage = ({ setPage }) => {
  return (
    <main className="shop-main">
      {/* Header */}
      <header className="shop-header">
        <div className="shop-header-grid">
          <div className="shop-header-spacer" />
          <div>
            <h1 className="shop-title">The Collection</h1>
            <p className="shop-subtitle">
              Curated essentials for the modern atelier. Designed with precision,
              crafted for longevity.
            </p>
          </div>
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
                  <label key={cat.label} className="filter-item">
                    <div
                      className="filter-box"
                      style={{ borderColor: cat.checked ? "#6250ae" : "#b1b2b5" }}
                    >
                      {cat.checked && (
                        <div className="filter-dot" style={{ background: "#6250ae" }} />
                      )}
                    </div>
                    <span
                      className="filter-label"
                      style={{ color: cat.checked ? "#313236" : "#5e5f62" }}
                    >
                      {cat.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="price-block">
              <h3 className="price-title">Price Range</h3>
              <div className="price-slider">
                <div className="price-track" style={{ background: "#eeedf0" }}>
                  <div
                    className="price-range"
                    style={{ background: "#6250ae" }}
                  />
                  <div
                    className="price-handle"
                    style={{ borderColor: "#6250ae" }}
                  />
                  <div
                    className="price-handle price-handle-right"
                    style={{ borderColor: "#6250ae" }}
                  />
                </div>
                <div className="price-labels" style={{ color: "#5e5f62" }}>
                  <span>$0</span>
                  <span>$2,500+</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="shop-content">
          {/* Top Selling */}
          <section>
            <div className="top-selling-header">
              <h2 className="top-selling-title">Top Selling</h2>
              <div className="top-selling-actions">
                {["chevron_left", "chevron_right"].map((icon) => (
                  <button key={icon} className="arrow-btn">
                    <Icon name={icon} />
                  </button>
                ))}
              </div>
            </div>
            <div
              className="top-selling-row"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
              {BEST_SELLERS.map((p) => (
                <BestSellerCard key={p.name} product={p} setPage={setPage} />
              ))}
            </div>
          </section>

          {/* Recently Added */}
          <section>
            <div className="recently-header">
              <h2 className="recently-title">Recently Added</h2>
              <div className="recently-underline" style={{ background: "#6250ae" }} />
            </div>
            <div className="recently-grid">
              {RECENTLY_ADDED.map((p) => (
                <RecentlyAddedCard key={p.name} product={p} setPage={setPage} />
              ))}
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
