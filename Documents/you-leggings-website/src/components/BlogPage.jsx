import React from 'react';
import { CalendarDays } from 'lucide-react';

const articles = [
  { image: '/images/Products/_DSC8716-Edit.jpg', date: '29-Jan-2026', title: 'How to Build a Versatile Leggings Wardrobe for Every Day' },
  { image: '/images/Products/_DSC8785-Edit.jpg', date: '21-Jan-2026', title: 'Why Every Modern Closet Needs Performance Bottom Wear' },
  { image: '/images/Cobalt Core Legging/_DSC8962.jpg', date: '25-Dec-2025', title: 'How Fabric Quality Improves Comfort and Long-Term Fit' },
  { image: '/images/Products/_DSC8910.jpg', date: '23-Dec-2025', title: 'Choosing the Right Legging Length for Every Occasion' },
  { image: '/images/Products/_DSC8922.jpg', date: '23-Dec-2025', title: 'Color Styling Guide: Matching Kurtis with Solid Leggings' },
  { image: '/images/Products/_DSC8810.jpg', date: '18-Dec-2025', title: 'Care Tips to Keep Stretch Fabrics Soft and Lasting Longer' },
];

export default function BlogPage() {
  return (
    <section className="section page-view blog-page" id="blog-page" style={{ display: 'block' }}>
      <div className="page-main blog-main" style={{ backgroundImage: 'none', backgroundColor: '#9f9f9f' }}>
        <div className="hero-overlay"></div>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/images/bg-less/_DSC8285-Photoroom.png")', backgroundSize: 'auto 120%', backgroundPosition: 'right -20% top 50%', backgroundRepeat: 'no-repeat', zIndex: 2 }}></div>
        <div className="container page-main-content">
          <span className="hero-subtitle">Insights &amp; Style</span>
          <h1 className="hero-title">The You Leggings <br />Journal</h1>
        </div>
      </div>

      <div className="container page-body">
        <div className="blog-top-layout">
          <article className="blog-highlight-card">
            <div className="blog-highlight-image">
              <img src="/images/Products/_DSC8716-Edit.jpg" alt="Featured Blog Post" />
            </div>
            <div className="blog-highlight-content">
              <h2>How to Build a Versatile Leggings Wardrobe for Every Day</h2>
              <p>Create effortless looks for work, travel, and casual outings with a few high-quality essentials and smart color pairings.</p>
              <span className="blog-date">29-Jan-2026</span>
            </div>
          </article>

          <aside className="blog-most-read">
            <h3>Most Read</h3>
            <ul>
              {articles.map((a, i) => (
                <li key={i}>
                  <a href="#">{a.title}</a>
                  <span>{a.date}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="blog-articles-head">
          <h2>View All Articles</h2>
        </div>

        <div className="blog-articles-grid">
          {articles.map((a, i) => (
            <article key={i} className="blog-article-card">
              <div className="blog-article-image">
                <img src={a.image} alt="Blog article" />
              </div>
              <div className="blog-article-content">
                <p className="blog-article-date">
                  <CalendarDays size={20} />{a.date}
                </p>
                <h3>{a.title}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="blog-show-more-wrap">
          <button className="btn blog-show-more-btn" type="button">Show More</button>
        </div>
      </div>
    </section>
  );
}
