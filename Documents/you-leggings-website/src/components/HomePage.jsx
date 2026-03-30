import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { shopProducts } from '../data.js';
import { slugifyProductName } from '../productUtils.js';

const testimonials = [
  { name: 'Jeyanthi RK', text: 'Very good fabric and reasonable price. I am very satisfied to purchase.' },
  { name: 'CSJ Deepa', text: 'Very reasonable price, nice collections also. Jeni sister also very patience with the customers.' },
  { name: 'Priya S.', text: 'Absolutely amazing fit and the material is super soft. Will definitely buy again!' },
];

export default function HomePage({ navigate }) {
  const [tIndex, setTIndex] = useState(0);
  const tRef = useRef(null);
  const intervalRef = useRef(null);
  const featuredProducts = shopProducts.slice(0, 8);

  useEffect(() => {
    startAutoScroll();
    const handleResize = () => {
      if (tRef.current) {
        tRef.current.style.transition = 'none';
        tRef.current.style.transform = 'translateX(0)';
        setTIndex(0);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getCardOffset(index) {
    if (!tRef.current) return 0;
    const cards = tRef.current.querySelectorAll('.testimonial-card');
    if (!cards.length) return 0;
    const isMobile = window.innerWidth <= 768;
    const cardWidth = cards[0].offsetWidth;
    const gap = isMobile ? 0 : 32;
    return index * (cardWidth + gap);
  }

  function jumpTestimonial(index) {
    const next = index % testimonials.length;
    setTIndex(next);
    if (tRef.current) {
      tRef.current.style.transition = 'transform 0.5s ease';
      tRef.current.style.transform = `translateX(-${getCardOffset(next)}px)`;
    }
  }

  function startAutoScroll() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTIndex((prev) => {
        const next = (prev + 1) % testimonials.length;
        if (tRef.current) {
          tRef.current.style.transition = 'transform 0.5s ease';
          tRef.current.style.transform = `translateX(-${getCardOffset(next)}px)`;
        }
        return next;
      });
    }, 7000);
  }

  return (
    <>
      <section className="hero home-page-section" id="home">
        <video autoPlay muted loop playsInline className="hero-video" poster="/images/bg-less/_DSC8937-Photoroom.png">
          <source src="/LEGGINGS.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">EXPERIENCE TRUE COMFORT</span>
          <h1 className="hero-title">Premium Collection 2026</h1>
          <a href="?page=shop" className="btn hero-btn" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>EXPLORE COLLECTION</a>
        </div>
      </section>

      <section className="section home-page-section" id="shop">
        <div className="container">
          <div className="text-center">
            <span className="section-subtitle">Our Range</span>
            <h2 className="section-title">Curated Collections</h2>
            <div className="divider"></div>
          </div>
          <div className="products-grid">
            <a href="?page=product&product=premium-essence-set" className="product-card" onClick={(e) => { e.preventDefault(); navigate('product', { product: 'premium-essence-set' }); }}>
              <div className="product-image"><img src="/images/new-products/IMG_9066.jpg" alt="Premium Essence Set" /></div>
              <div className="product-details">
                <h3 className="product-name">Premium Essence Set</h3>
                <div className="product-price">View Details</div>
              </div>
            </a>
            <a href="?page=shop" className="product-card" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>
              <div className="product-image"><img src="/images/Products/_DSC8832.jpg" alt="Full Length Leggings" /></div>
              <div className="product-details">
                <h3 className="product-name">Full Length Leggings</h3>
                <div className="product-price">Shop Range</div>
              </div>
            </a>
            <a href="?page=shop" className="product-card" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>
              <div className="product-image"><img src="/images/Products/_DSC8128-Edit.jpg" alt="Ankle Length Leggings" /></div>
              <div className="product-details">
                <h3 className="product-name">Ankle Length Leggings</h3>
                <div className="product-price">Discover</div>
              </div>
            </a>
            <a href="?page=shop" className="product-card" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>
              <div className="product-image"><img src="/images/Products/_DSC8533-Edit.jpg" alt="Kids Leggings" /></div>
              <div className="product-details">
                <h3 className="product-name">Kids Leggings</h3>
                <div className="product-price">For Little Ones</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="section home-page-section" id="new-arrivals">
        <div className="container">
          <div className="text-center">
            <span className="section-subtitle">Trending Now</span>
            <h2 className="section-title">Featured Products</h2>
            <div className="divider"></div>
          </div>
          <div className="products-grid">
            {featuredProducts.map((p) => {
              const slug = slugifyProductName(p.name);
              return (
                <div key={slug} className="product-card" style={{ cursor: 'pointer' }} onClick={() => navigate('product', { product: slug })}>
                  <div className="product-image"><img src={p.image} alt={p.alt} /></div>
                  <div className="product-details">
                    <p className="shop-product-category">{p.category}</p>
                    <h3 className="product-name">{p.name}</h3>
                    <div className="product-price">{p.price}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center" style={{ marginTop: '30px' }}>
            <a href="?page=shop" className="btn" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>View All Products</a>
          </div>
        </div>
      </section>

      <section className="section home-page-section split-banner-section" style={{ padding: 0 }}>
        <div className="split-banner">
          <div className="split-content">
            <span className="section-subtitle" style={{ marginBottom: '15px' }}>Limited Edition</span>
            <h2 className="split-title">The Art of <br />Comfort</h2>
            <p className="split-desc">Discover a collection of premium leggings that feel like a second skin. Each piece is meticulously crafted with precision and designed to move with you effortlessly.</p>
            <div><a href="?page=shop" className="btn" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Explore Shop</a></div>
          </div>
          <div className="split-image"></div>
        </div>
      </section>

      <section className="section home-page-section" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div className="text-center">
            <span className="section-subtitle">Testimonials</span>
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <div className="container" style={{ padding: 0 }}>
            <div className="testimonials-carousel-wrap">
              <div className="testimonials-carousel" id="testimonialsCarousel" ref={tRef}>
                {[...testimonials, ...testimonials].map((t, i) => (
                  <div className="testimonial-card" key={i} aria-hidden={i >= testimonials.length}>
                    <div className="quote-icon">"</div>
                    <p className="testimonial-text">{t.text}</p>
                    <div className="client-name">{t.name}</div>
                    <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>Happy Client</div>
                    <div style={{ color: '#f59e0b', marginTop: '10px' }}>★★★★★</div>
                  </div>
                ))}
              </div>
              <div className="testimonial-dots" id="testimonialDots" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px', paddingBottom: '20px' }}>
                {testimonials.map((_, i) => (
                  <button key={i} className={`testimonial-dot${tIndex === i ? ' is-active' : ''}`} data-index={i} aria-label={`Testimonial ${i + 1}`} onClick={() => { jumpTestimonial(i); startAutoScroll(); }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
