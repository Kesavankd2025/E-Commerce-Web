import { useEffect, useRef } from "react";
import Icon from "../components/Icon";
import TrendingCard from "../components/TrendingCard";
import RecentlyAddedCard from "../components/RecentlyAddedCard";
import { CATEGORIES, TRENDING_PRODUCTS, RECENTLY_ADDED, HIGHLIGHTS } from "../data/data";

const HomePage = ({ setPage }) => {
  const categoriesRef = useRef(null);
  const isPausedRef = useRef(false);
  const recentlyRef = useRef(null);
  const isRecentlyPausedRef = useRef(false);

  useEffect(() => {
    const el = categoriesRef.current;
    if (!el) return;

    let rafId;
    const speed = 0.4;

    const tick = () => {
      if (!el) return;
      if (!isPausedRef.current) {
        el.scrollLeft += speed;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const el = recentlyRef.current;
    if (!el) return;

    let rafId;
    const speed = 0.35;

    const tick = () => {
      if (!el) return;
      if (!isRecentlyPausedRef.current) {
        el.scrollLeft += speed;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const scrollCategories = (direction) => {
    const el = categoriesRef.current;
    if (!el) return;
    const amount = Math.min(320, Math.floor(el.clientWidth * 0.8));
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <main className="home-main">
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-shell">
          <div
            className="hero-overlay"
            style={{
              background:
                "linear-gradient(to right, rgba(98,80,174,0.4), rgba(247,225,215,0.2))",
            }}
          />
          <img
            className="hero-image"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA85xwBWdVSj0_apU1tRtyDAWP0iyNylWao3lJRqasVMJA9y8JGGRGSMx8zyIuq7J72Ud2OgEjQtb-T8xwwAXGwbM1EnDTwTUUWkzP1NzgzvbePEyqOEZccQvw4K--r3WjppxZtR-d2df8M1E54TXkNRwHughaGF2WA5nvNvQvcfd99ki20y8w3AC__VnpLzQPDBTPs9IsRIZghtUck2rMRkX7ouwvHhvcO1qD7ZjzgOuHHhV1I0v4ZhRdXmmdb25DllFENC4IjHR8"
            alt="Hero"
          />
          <div className="hero-content">
            <span className="hero-badge">New Season Arrival</span>
            <h1 className="hero-title">
              The Ethereal <br />
              <span className="hero-title-accent">Collection</span>
            </h1>
            <p className="hero-subtitle">
              Discover curated pieces that blend architectural strength with
              fluid grace. Elevate your everyday silhouette with our latest
              atelier arrivals.
            </p>
            <button
              onClick={() => setPage("shop")}
              className="hero-button"
              style={{ background: "linear-gradient(135deg, #6250ae 0%, #c5b8ff 100%)" }}
            >
              Shop Now
            </button>
          </div>

          <div className="hero-arrows">
            {["chevron_left", "chevron_right"].map((icon) => (
              <button
                key={icon}
                className="hero-arrow"
                style={{
                  borderColor: "rgba(255,255,255,0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Icon name={icon} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Categories */}
      <section className="categories-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Curated Categories</h2>
            <p className="section-subtitle">
              Explore our specialized ateliers by category
            </p>
          </div>
          <div className="section-actions">
            {["arrow_back", "arrow_forward"].map((icon) => (
              <button
                key={icon}
                className="section-action-button"
                onClick={() => scrollCategories(icon === "arrow_back" ? -1 : 1)}
              >
                <Icon name={icon} />
              </button>
            ))}
          </div>
        </div>

        <div
          ref={categoriesRef}
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
          }}
          className="categories-row"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          {[...CATEGORIES, ...CATEGORIES].map((cat, idx) => (
            <div key={cat.name + idx} className="category-card">
              <div className="category-image-wrap">
                <img className="category-image" src={cat.img} alt={cat.name} />
              </div>
              <h3 className="category-name">{cat.name}</h3>
              <p className="category-count">{cat.count} Items</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="trending-section" style={{ background: "#f4f3f5" }}>
        <div className="trending-wrap">
          <div className="trending-header">
            <span className="trending-kicker">Shop the Look</span>
            <h2 className="trending-title">Trending Now</h2>
          </div>
          <div className="trending-grid">
            {TRENDING_PRODUCTS.map((p) => (
              <TrendingCard key={p.name} product={p} setPage={setPage} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added */}
      <section className="recent-section">
        <div className="recent-header">
          <div>
            <span className="recent-kicker">Fresh Arrivals</span>
            <h2 className="recent-title">Recently Added</h2>
          </div>
          <div className="recent-line" style={{ background: "#6250ae" }} />
        </div>
        <div
          ref={recentlyRef}
          onMouseEnter={() => {
            isRecentlyPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isRecentlyPausedRef.current = false;
          }}
          className="recent-row"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          {RECENTLY_ADDED.map((p) => (
            <div key={p.name} className="recent-item">
              <RecentlyAddedCard product={p} setPage={setPage} />
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="highlights-section">
        <div className="highlights-grid">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.title}
              className="highlight-card"
              style={{
                background: h.light
                  ? "linear-gradient(135deg, #f7e1d7 0%, #fbf9fb 100%)"
                  : "#f4f3f5",
                border: "1px solid rgba(177,178,181,0.1)",
              }}
            >
              <div className="highlight-icon">
                <Icon name={h.icon} style={{ color: "#6250ae", fontSize: "28px" }} />
              </div>
              <h4 className="highlight-title">{h.title}</h4>
              <p className="highlight-desc">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Feature Video */}
      <section className="premium-section">
        <div
          className="premium-shell"
          style={{
            background: "linear-gradient(135deg, #0d0e10 0%, #1c1a26 100%)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <div className="premium-grid">
            <div className="premium-copy">
              <span className="premium-eyebrow">Atelier Film</span>
              <h2 className="premium-title">Sculpted For The Everyday</h2>
              <p className="premium-text">
                A quiet study in contrast and craft. Discover the signature piece
                of the season through our short atelier film.
              </p>
              <div className="premium-actions">
                <button
                  onClick={() => setPage("product")}
                  className="premium-primary"
                  style={{ background: "linear-gradient(135deg, #6250ae 0%, #c5b8ff 100%)" }}
                >
                  Shop the Piece
                </button>
                <button className="premium-secondary">Watch Trailer</button>
              </div>
            </div>
            <div className="premium-media">
              <video
                className="premium-video"
                autoPlay
                muted
                loop
                playsInline
                poster="https://lh3.googleusercontent.com/aida-public/AB6AXuDBKnye8p6dkKItmaudXrN9GRWur10MLLU4VWhDd1S_D0YGFXR2yB_G_2L3feuLjAqFzqkNn8M19HHmHOWbg1uNM-6A4_7Siqfed-EGZi2Dd9O-x1yjdlGbcyPAB9kvzSEOWJZIWUfI0Iw8ZpRKntYnX6lPJccBTUoxmBvUWa3JIOooKgGovBYOHcOTdeP0Pw74JIj6TQhzHAgtvCD5YFpwsQoxHxtAMsHny7qxcZaPPaAXVcnL6kNrzbcXdmSoKK4iB6KCzorzGh0"
              >
                <source src="/video/product-ad.mp4" type="video/mp4" />
              </video>
              <div
                className="premium-overlay"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 60%)",
                }}
              />
              <div className="premium-meta">
                <div className="premium-play" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <Icon name="play_arrow" style={{ color: "#ffffff" }} />
                </div>
                <div>
                  <p className="premium-meta-title">Velora Atelier Film</p>
                  <p className="premium-meta-sub" style={{ color: "rgba(255,255,255,0.7)" }}>
                    0:38 - Signature Edit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

