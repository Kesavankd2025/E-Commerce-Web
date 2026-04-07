import { useEffect, useRef, useState } from "react";
import Icon from "../components/Icon";
import TrendingCard from "../components/TrendingCard";
import RecentlyAddedCard from "../components/RecentlyAddedCard";
import { CATEGORIES, TRENDING_PRODUCTS, RECENTLY_ADDED, HIGHLIGHTS } from "../data/data";

const HomePage = ({ setPage }) => {
  const categoriesRef = useRef(null);
  const isPausedRef = useRef(false);
  const isCtaPausedRef = useRef(false);
  const recentlyRef = useRef(null);
  const isRecentlyPausedRef = useRef(false);
  const isRecentCtaPausedRef = useRef(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      badge: "New Season Arrival",
      title: <>The Ethereal <br /><span className="hero-title-accent">Collection</span></>,
      subtitle: "Discover curated pieces that blend architectural strength with fluid grace. Elevate your everyday silhouette with our latest atelier arrivals.",
      img: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    },
    {
      badge: "Atelier Edit",
      title: <>Sculpted <br /><span className="hero-title-accent">Silhouettes</span></>,
      subtitle: "A study in refined luxury. Explore our signature tailored essentials that transcend the seasons through impeccable craftsmanship.",
      img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    }
  ];

  const pauseTimeoutRef = useRef(null);
  const recentPauseTimeoutRef = useRef(null);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const el = categoriesRef.current;
    if (!el) return;

    let rafId;
    const speed = 0.4;

    const tick = () => {
      if (!el) return;
      if (!isPausedRef.current && !isCtaPausedRef.current) {
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
      if (!isRecentlyPausedRef.current && !isRecentCtaPausedRef.current) {
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

    // Pause auto-scroll to allow smooth manual scroll
    isCtaPausedRef.current = true;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isCtaPausedRef.current = false;
    }, 2000);

    // Calculate exact scroll distance dynamically to prevent orphan-half views
    let amount = 320;
    const firstChild = el.firstElementChild;
    const secondChild = firstChild?.nextElementSibling;
    if (firstChild && secondChild) {
      amount = secondChild.offsetLeft - firstChild.offsetLeft;
    } else if (firstChild) {
      amount = firstChild.offsetWidth + 24; // fallback gap
    }
    
    // Scroll exact amount
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const scrollRecently = (direction) => {
    const el = recentlyRef.current;
    if (!el) return;

    isRecentCtaPausedRef.current = true;
    if (recentPauseTimeoutRef.current) clearTimeout(recentPauseTimeoutRef.current);
    recentPauseTimeoutRef.current = setTimeout(() => {
      isRecentCtaPausedRef.current = false;
    }, 2000);

    // Calculate exact scroll distance dynamically to prevent orphan-half views
    let amount = 320;
    const firstChild = el.firstElementChild;
    const secondChild = firstChild?.nextElementSibling;
    if (firstChild && secondChild) {
      amount = secondChild.offsetLeft - firstChild.offsetLeft;
    } else if (firstChild) {
      amount = firstChild.offsetWidth + 24; // fallback gap
    }
    
    // Scroll exact amount
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <main className="home-main">
      {/* Hero Banner Area */}
      <section className="hero-section">
        {slides.map((slide, sIdx) => (
          <div
            key={sIdx}
            className={`hero-shell ${activeSlide === sIdx ? "active" : ""}`}
            style={{
              opacity: activeSlide === sIdx ? 1 : 0,
              visibility: activeSlide === sIdx ? "visible" : "hidden",
              transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
              position: sIdx === 0 ? "relative" : "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
            }}
          >
            <div
              className="hero-overlay"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)",
              }}
            />
            <img
              className="hero-image"
              src={slide.img}
              alt="Hero"
              style={{
                transform: activeSlide === sIdx ? "scale(1)" : "scale(1.05)",
                transition: "transform 8s linear"
              }}
            />
            <div className="hero-content">
              <span className="hero-badge">{slide.badge}</span>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <button
                onClick={() => setPage("shop")}
                className="hero-button"
                style={{ background: "linear-gradient(135deg, #6250ae 0%, #c5b8ff 100%)" }}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}

        <div className="hero-arrows">
          <button
            className="hero-arrow"
            onClick={() => setActiveSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)}
            style={{
              borderColor: "rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Icon name="chevron_left" />
          </button>
          <button
            className="hero-arrow"
            onClick={() => setActiveSlide(prev => prev === slides.length - 1 ? 0 : prev + 1)}
            style={{
              borderColor: "rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Icon name="chevron_right" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`slide-dot ${activeSlide === i ? "active" : ""}`}
              onClick={() => setActiveSlide(i)}
            />
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

      {/* Curated Categories */}
      <section className="categories-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Curated Categories</h2>
            <p className="section-subtitle">
              Explore our specialized ateliers by category
            </p>
          </div>
          <div
            className="section-actions"
            onMouseEnter={() => (isCtaPausedRef.current = true)}
            onMouseLeave={() => (isCtaPausedRef.current = false)}
          >
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
          <div
            className="section-actions"
            onMouseEnter={() => (isRecentCtaPausedRef.current = true)}
            onMouseLeave={() => (isRecentCtaPausedRef.current = false)}
          >
            {["arrow_back", "arrow_forward"].map((icon) => (
              <button
                key={icon}
                className="section-action-button"
                onClick={() => scrollRecently(icon === "arrow_back" ? -1 : 1)}
              >
                <Icon name={icon} />
              </button>
            ))}
          </div>
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
