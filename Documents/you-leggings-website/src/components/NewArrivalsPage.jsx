import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.jsx';
import { newArrivalProducts } from '../data.js';
import { slugifyProductName } from '../productUtils.js';

export default function NewArrivalsPage({ navigate, onCartUpdate }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(newArrivalProducts.length / itemsPerPage);
  const paginatedProducts = newArrivalProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  function handlePageChange(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
    const grid = document.querySelector('.arrivals-products-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
  }

  function handleCardClick(slug, e) {
    if (e.target.closest('.shop-product-link') || e.target.closest('.wishlist-toggle')) {
        return;
    }
    navigate('product', { product: slug });
  }

  return (
    <section className="section page-view new-arrivals-page" id="new-arrivals-page" style={{ display: 'block' }}>
      <div className="page-main arrivals-main" style={{ backgroundImage: 'none', backgroundColor: '#9f9f9f' }}>
        <div className="hero-overlay"></div>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/images/bg-less/_DSC8984-Photoroom.png")', backgroundSize: 'auto 110%', backgroundPosition: 'right 100% top 50%', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)', zIndex: 2 }}></div>
        <div className="container page-main-content">
          <span className="hero-subtitle">Latest Drop</span>
          <h1 className="hero-title">New Arrivals <br />Just Landed</h1>
        </div>
      </div>

      <div className="container page-body">
        <div className="text-center">
          <span className="section-subtitle">Season Edit</span>
          <h2 className="section-title">Fresh Styles This Month</h2>
        </div>
        <div className="arrivals-layout">
          <div className="products-grid arrivals-products-grid">
            {paginatedProducts.map((p, idx) => {
              const slug = slugifyProductName(p.name) + (idx > 0 && paginatedProducts.slice(0, idx).some((x) => slugifyProductName(x.name) === slugifyProductName(p.name)) ? `-${idx}` : '');
              const realSlug = slugifyProductName(p.name);
              return (
                <div key={idx} className="product-card shop-product-card"
                  style={{ cursor: 'pointer' }} onClick={(e) => handleCardClick(realSlug, e)}>
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
                        toggleWishlist({ ...p, slug: realSlug, price_num: parseInt(String(p.price).replace(/[^0-9]/g, ''), 10) });
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
                        className={isInWishlist(realSlug) ? "heart-icon-filled" : "heart-icon-outline"} 
                        fill={isInWishlist(realSlug) ? "#f14064" : "none"} 
                      />
                    </button>
                  </div>
                  <div className="product-details shop-product-details">
                    <p className="shop-product-category">{p.category}</p>
                    <h3 className="product-name">{p.name}</h3>
                    <div className="shop-product-bottom">
                      <div className="product-price">{p.price}</div>
                      <a href={`?page=product&product=${realSlug}`} className="shop-product-link"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('product', { product: realSlug }); }}>Add to Cart</a>
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
    </section>
  );
}
