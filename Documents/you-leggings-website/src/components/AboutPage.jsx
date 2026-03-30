import React from 'react';

export default function AboutPage() {
  return (
    <section className="section about-page" id="about-page" style={{ display: 'block' }}>
      <div className="about-main">
        <div className="about-main-overlay"></div>
        <div className="container about-main-content">
          <span className="hero-subtitle">About You Leggings</span>
          <h1 className="hero-title">Comfort Without <br />Compromise</h1>
        </div>
      </div>

      <div className="container page-body">
        <div className="about-hero">
          <span className="section-subtitle">Our Story</span>
          <h2 className="section-title">Built on TANTEX Legacy, Designed for Every Woman</h2>
        </div>

        <div className="about-story-split">
          <div className="about-story-card">
            <div className="about-story-content">
              <span className="about-story-tag">Our Promise</span>
              <h3>Everyday Comfort, Premium Feel</h3>
              <p>At You Legging, we believe every woman deserves comfort without compromise. Born from the trusted legacy of TANTEX, we create bottom wear that blends affordability with high-end quality.</p>
              <p>Our leggings are crafted with premium fabrics for a flattering fit, dependable stretch, and long-lasting durability that stays soft wash after wash.</p>
              <ul className="about-story-list">
                <li>A perfect fit that flatters every body type</li>
                <li>Stretch that adapts to your lifestyle</li>
                <li>Durability that lasts wash after wash</li>
              </ul>
              <p>Whether you are at work, running errands, or relaxing at home, You Legging moves with you.</p>
            </div>
            <div className="about-story-image">
              <img src="/images/Products/_DSC8682-Edit.jpg" alt="You Leggings Our Story" />
            </div>
          </div>
        </div>

        <div className="about-why">
          <h2 className="section-title">Why Choose You Leggings?</h2>
          <div className="about-why-grid">
            <article className="about-why-card">
              <h3>From TANTEX Legacy</h3>
              <p>A trusted brand foundation with years of quality experience.</p>
            </article>
            <article className="about-why-card">
              <h3>Zero Compromise Quality</h3>
              <p>Premium fabrics, carefully tested for fit, comfort, and durability.</p>
            </article>
            <article className="about-why-card">
              <h3>Affordable Luxury</h3>
              <p>High-end feel at market-friendly prices for everyday wear.</p>
            </article>
            <article className="about-why-card">
              <h3>Everyday Versatility</h3>
              <p>Designed for work, play, travel, and everything in between.</p>
            </article>
            <article className="about-why-card">
              <h3>Wide Range of Choices</h3>
              <p>Colors, styles, and fits made for every woman.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
