import { useState, useEffect, useRef } from "react";
import banner2 from "../assets/banner2.png";
import Icon from "../components/Icon";
import TrendingCard from "../components/TrendingCard";
import RecentlyAddedCard from "../components/RecentlyAddedCard";
import { CATEGORIES, TRENDING_PRODUCTS, RECENTLY_ADDED, HIGHLIGHTS } from "../data/data";

const HomePage = ({ setPage, addToCart }) => {
  const [currentBanner, setCurrentBannerIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All Products");

  const BANNERS = [
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA85xwBWdVSj0_apU1tRtyDAWP0iyNylWao3lJRqasVMJA9y8JGGRGSMx8zyIuq7J72Ud2OgEjQtb-T8xwwAXGwbM1EnDTwTUUWkzP1NzgzvbePEyqOEZccQvw4K--r3WjppxZtR-d2df8M1E54TXkNRwHughaGF2WA5nvNvQvcfd99ki20y8w3AC__VnpLzQPDBTPs9IsRIZghtUck2rMRkX7ouwvHhvcO1qD7ZjzgOuHHhV1I0v4ZhRdXmmdb25DllFENC4IjHR8",
      badge: "New Season Arrival",
      title: "The Ethereal Collection",
      subtitle: "Discover curated pieces that blend architectural strength with fluid grace. Elevate your everyday silhouette with our latest atelier arrivals.",
      accent: "Collection"
    },
    {
      img: banner2,
      badge: "Specialized Atelier",
      title: "Natural Essence Collection",
      subtitle: "Experience the purity of nature through our curated skincare and atelier pieces. Crafted with organic materials for a sustainable future.",
      accent: "Essence"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [BANNERS.length]);

  const nextBanner = () => setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
  const prevBanner = () => setCurrentBannerIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);

  const recentlyRef = useRef(null);
  const isRecentlyPausedRef = useRef(false);
  const premiumCatRef = useRef(null);
  const isPremiumPausedRef = useRef(false);


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

  useEffect(() => {
    const el = premiumCatRef.current;
    if (!el) return;

    let rafId;
    const speed = 0.4;

    const tick = () => {
      if (!el) return;
      if (!isPremiumPausedRef.current) {
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

  const scrollPremiumCategories = (direction) => {
    const el = premiumCatRef.current;
    if (!el) return;
    const amount = 300 * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
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
                "linear-gradient(to right, rgba(241, 64, 100, 0.4), rgba(255, 180, 196, 0.2))",
            }}
          />
          <img
            className="hero-image"
            src={BANNERS[currentBanner].img}
            alt="Hero"
            style={{ transition: 'opacity 0.8s ease-in-out' }}
          />
          <div className="hero-content">
            <span className="hero-badge">{BANNERS[currentBanner].badge}</span>
            <h1 className="hero-title">
              {BANNERS[currentBanner].title.replace(BANNERS[currentBanner].accent, "")} <br />
              <span className="hero-title-accent">{BANNERS[currentBanner].accent}</span>
            </h1>
            <p className="hero-subtitle">
              {BANNERS[currentBanner].subtitle}
            </p>
            <button
              onClick={() => setPage("shop")}
              className="hero-button"
              style={{ background: "linear-gradient(135deg, rgb(241, 64, 100) 0%, rgb(255, 120, 150) 100%)" }}
            >
              Shop Now
            </button>
          </div>

          <div className="hero-arrows">
            <button
              className="hero-arrow"
              onClick={prevBanner}
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon name="chevron_left" />
            </button>
            <button
              className="hero-arrow"
              onClick={nextBanner}
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon name="chevron_right" />
            </button>
          </div>
        </div>
      </section>


      {/* Specialized Ateliers (Categories) */}
      <section className="premium-categories-section">
        <div className="premium-categories-header">
          <div className="premium-categories-title-wrap">
            <div className="premium-categories-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <h2 className="premium-categories-title">Specialized Ateliers</h2>
          </div>
          <div className="section-actions">
            {["arrow_back", "arrow_forward"].map((icon) => (
              <button
                key={icon}
                className="section-action-button"
                onClick={() => scrollPremiumCategories(icon === "arrow_back" ? -1 : 1)}
                style={{ background: "#fff", border: "1px solid #eee" }}
              >
                <Icon name={icon} style={{ color: "#111", fontSize: "20px" }} />
              </button>
            ))}
          </div>
        </div>

        <div
          ref={premiumCatRef}
          onMouseEnter={() => (isPremiumPausedRef.current = true)}
          onMouseLeave={() => (isPremiumPausedRef.current = false)}
          className="premium-categories-row"
        >
          {CATEGORIES.map((cat, idx) => (
            <div 
              key={cat.name + idx} 
              className="premium-category-card"
              onClick={() => setPage("shop")}
            >
              <div className="premium-category-image-wrap">
                <img className="premium-category-image" src={cat.img} alt={cat.name} />
              </div>
              <h3 className="premium-category-name">{cat.name}</h3>
              <span className="premium-category-link">Shop Collection</span>
            </div>
          ))}
          {/* Duplicate for better filling if needed */}
          {CATEGORIES.map((cat, idx) => (
            <div 
              key={cat.name + "dup" + idx} 
              className="premium-category-card"
              onClick={() => setPage("shop")}
            >
              <div className="premium-category-image-wrap">
                <img className="premium-category-image" src={cat.img} alt={cat.name} />
              </div>
              <h3 className="premium-category-name">{cat.name}</h3>
              <span className="premium-category-link">Shop Collection</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products (Top selling Categories) */}
      <section className="trending-section" style={{ background: "#fef2f4" }}>
        <div className="trending-wrap">
          <div className="trending-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="trending-kicker" style={{ color: '#F14064', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '12px' }}>Most Selling Items</span>
              <h2 className="trending-title" style={{ fontSize: '32px', fontWeight: 700, margin: '8px 0 0' }}>Top selling Categories</h2>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {["All Products", "Best Selling", "Top Rating"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    backgroundColor: activeFilter === f ? '#F14064' : '#000',
                    color: '#fff',
                    borderRadius: '20px',
                    padding: '8px 24px',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="trending-grid">
            {TRENDING_PRODUCTS.slice(0, activeFilter === "All Products" ? 8 : 4).map((p, idx) => (
              <TrendingCard key={p.name + idx} product={{...p, img: banner2}} setPage={setPage} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added (Arrivals Banner) */}
      <section className="arrival-section">
        <div className="arrival-banner">
          <div className="arrival-banner-header">
            <h2 className="arrival-banner-title">Fresh Arrivals</h2>
            <button className="arrival-banner-arrow" onClick={() => setPage("shop")}>
              <Icon name="arrow_forward" style={{ fontSize: 20, color: "#fff" }} />
            </button>
          </div>
          
          <div className="arrival-products-wrap">
            <div
              ref={recentlyRef}
              onMouseEnter={() => {
                isRecentlyPausedRef.current = true;
              }}
              onMouseLeave={() => {
                isRecentlyPausedRef.current = false;
              }}
              className="arrival-row"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
              {RECENTLY_ADDED.map((p) => (
                <div key={p.name} className="recent-item">
                  <RecentlyAddedCard product={p} setPage={setPage} addToCart={addToCart} />
                </div>
              ))}
            </div>
          </div>
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
                  ? "linear-gradient(135deg, rgb(255, 240, 242) 0%, #fbf9fb 100%)"
                  : "#f4f3f5",
                border: "1px solid rgba(177,178,181,0.1)",
              }}
            >
              <div className="highlight-icon">
                <Icon name={h.icon} style={{ color: "var(--accent)", fontSize: "28px" }} />
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
                  style={{ background: "linear-gradient(135deg, rgb(241, 64, 100) 0%, rgb(255, 120, 150) 100%)" }}
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
                  <p className="premium-meta-title">IRIS Atelier Film</p>
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

