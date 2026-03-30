import React, { useState, useEffect } from 'react';
import { Truck, BadgeCheck, Lock, RotateCcw } from 'lucide-react';
import { shopProducts, newArrivalProducts } from '../data.js';
import { slugifyProductName, buildProductProfile } from '../productUtils.js';
import { getStoredCart, setStoredCart, parseMoney } from '../cartUtils.js';
import { showToast } from './Toast.jsx';

function getAllProducts() {
  const all = [...shopProducts, ...newArrivalProducts];
  const seen = new Set();
  return all.filter((p) => {
    const slug = slugifyProductName(p.name);
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  }).map((p) => ({ ...p, slug: slugifyProductName(p.name) }));
}

export default function ProductPage({ productSlug, navigate, onCartUpdate }) {
  const allProducts = getAllProducts();
  const selectedProduct = allProducts.find((p) => p.slug === productSlug) || allProducts[0];
  const profile = selectedProduct ? buildProductProfile(selectedProduct, allProducts) : null;

  const [mainImage, setMainImage] = useState(profile?.gallery[0] || '');
  const [activeThumb, setActiveThumb] = useState(0);
  const [gallery, setGallery] = useState(profile?.gallery || []);
  const [selectedSize, setSelectedSize] = useState(profile?.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(profile?.colors[0]?.label || 'Standard');
  const [activeTab, setActiveTab] = useState('desc');
  const [addedToCart, setAddedToCart] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewStars, setReviewStars] = useState('★★★★★');
  const [reviews, setReviews] = useState([
    { name: 'Priya K.', stars: '★★★★★', text: "Absolutely love the fit and feel of these leggings. They are incredibly soft and the waistband doesn't roll down during workouts." },
    { name: 'Anita R.', stars: '★★★★☆', text: "Great quality for the price! Only taking off one star because I wish they had more color options in my size, but the comfort is undeniable." },
    { name: 'Meera S.', stars: '★★★★★', text: "I've washed them five times already and the color hasn't faded one bit. Truly a premium feel." },
  ]);

  useEffect(() => {
    if (profile) {
      setMainImage(profile.gallery[0]);
      setGallery(profile.gallery);
      setActiveThumb(0);
      setSelectedSize(profile.sizes[0] || 'M');
      setSelectedColor(profile.colors[0]?.label || 'Standard');
      setActiveTab('desc');
    }
  }, [productSlug]);

  function handleColorSelect(color) {
    setSelectedColor(color.label);
    if (profile?.colorVariants?.[color.label]) {
      const imgs = profile.colorVariants[color.label];
      setGallery(imgs);
      setMainImage(imgs[0]);
      setActiveThumb(0);
    }
  }

  function handleThumbClick(img, idx) {
    setMainImage(img);
    setActiveThumb(idx);
  }

  function handleAddToCart() {
    if (!selectedProduct) return;
    const cartItems = getStoredCart();
    const unitPrice = parseMoney(selectedProduct.price);
    const existingIndex = cartItems.findIndex(
      (item) => item.slug === selectedProduct.slug && item.size === selectedSize && item.color === selectedColor
    );
    if (existingIndex >= 0) {
      cartItems[existingIndex].qty += 1;
    } else {
      cartItems.push({ slug: selectedProduct.slug, name: selectedProduct.name, image: selectedProduct.image, price: unitPrice, size: selectedSize, color: selectedColor, qty: 1 });
    }
    setStoredCart(cartItems);
    onCartUpdate();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1000);
  }

  function handleSubmitReview() {
    if (!reviewName.trim() || !reviewText.trim()) {
      showToast('Please fill out your name and review text.', 'error');
      return;
    }
    setReviews((prev) => [{ name: reviewName, stars: reviewStars.split(' ')[0], text: reviewText }, ...prev]);
    showToast('Review submitted successfully!', 'success');
    setShowReviewForm(false);
    setReviewName(''); setReviewText(''); setReviewStars('★★★★★');
  }

  // Related products
  const related = allProducts
    .filter((p) => p.slug !== selectedProduct?.slug)
    .filter((p) => p.category === selectedProduct?.category)
    .concat(allProducts.filter((p) => p.slug !== selectedProduct?.slug && p.category !== selectedProduct?.category))
    .slice(0, 4);

  if (!selectedProduct || !profile) return null;

  const tabs = [
    { key: 'desc', label: 'Description' },
    { key: 'spec', label: 'Specifications' },
    { key: 'fabric', label: 'Fabrication' },
    { key: 'reviews', label: 'Reviews' },
  ];

  return (
    <section className="section page-view product-page" id="product-page" style={{ display: 'block' }}>
      <div className="page-main product-main" style={{ backgroundImage: 'none', backgroundColor: '#9f9f9f' }}>
        <div className="hero-overlay"></div>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/images/bg-less/_DSC8984-Photoroom.png")', backgroundSize: 'auto 110%', backgroundPosition: 'right 100% top 50%', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)', zIndex: 2 }}></div>
        <div className="container page-main-content">
          <span className="hero-subtitle">Product Details</span>
          <h1 className="hero-title">Buy Your <br />Perfect Fit</h1>
        </div>
      </div>

      <div className="container page-body">
        <div className="product-detail-layout">
          <div className="product-detail-gallery">
            <div className="product-thumb-row" id="productThumbRow">
              {gallery.map((img, idx) => (
                <button key={idx} className={`product-thumb${activeThumb === idx ? ' is-active' : ''}`} type="button"
                  onClick={() => handleThumbClick(img, idx)}>
                  <img src={img} alt={`${selectedProduct.name} thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
            <div className="product-detail-image-wrap">
              <img id="productDetailImage" src={mainImage} alt={selectedProduct.alt || selectedProduct.name} />
            </div>
          </div>

          <div className="product-detail-content">
            <p className="product-detail-category" id="productDetailCategory">{selectedProduct.category}</p>
            <h2 className="product-detail-title" id="productDetailName">{selectedProduct.name}</h2>
            <p className="product-detail-meta" id="productDetailMeta">{selectedProduct.meta || 'Sizes XS - 3XL'}</p>
            <div className="product-detail-price" id="productDetailPrice">{selectedProduct.price}</div>
            <p className="product-tax-line">Inclusive of all taxes</p>

            <div className="product-detail-block compact-block">
              <h3>Select Size</h3>
              <div className="product-size-list compact-size-list" id="productSizeList">
                {profile.sizes.map((size) => (
                  <button key={size} type="button" className={selectedSize === size ? 'is-active' : ''}
                    onClick={() => setSelectedSize(size)}>{size}</button>
                ))}
              </div>
            </div>

            <div className="product-detail-block compact-block">
              <h3>Select Color</h3>
              <div className="product-color-list" id="productColorList">
                {profile.colors.map((color) => (
                  <button key={color.label} type="button"
                    className={`product-color${selectedColor === color.label ? ' is-selected' : ''}`}
                    style={{ '--swatch': color.swatch }}
                    aria-label={color.label}
                    onClick={() => handleColorSelect(color)} />
                ))}
              </div>
            </div>

            <div className="product-detail-actions compact-actions">
              <button id="productAddToCartBtn" type="button" className="btn" onClick={handleAddToCart} disabled={addedToCart}>
                {addedToCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            <div className="product-service-strip compact-service-strip">
              <div className="product-service-item compact-service-item"><Truck size={18} /><h4>Free Shipping</h4></div>
              <div className="product-service-item compact-service-item"><BadgeCheck size={18} /><h4>Quality Mark</h4></div>
              <div className="product-service-item compact-service-item"><Lock size={18} /><h4>Secure Pay</h4></div>
              <div className="product-service-item compact-service-item"><RotateCcw size={18} /><h4>Easy Return</h4></div>
            </div>
          </div>
        </div>

        {/* Tab Section */}
        <div className="product-tab-section" style={{ marginTop: '50px', background: '#fff', padding: '30px', borderRadius: '14px', boxShadow: '0 10px 24px rgba(125,84,101,0.08)', border: '1px solid #f0dbe4' }}>
          <div className="product-tab-nav" role="tablist" aria-label="Product Information Tabs">
            {tabs.map((tab) => (
              <button key={tab.key} type="button" className={`product-tab-btn${activeTab === tab.key ? ' is-active' : ''}`}
                data-tab-target={tab.key} role="tab" aria-selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}>{tab.label}</button>
            ))}
          </div>
          <div className="product-tab-panels">
            <div className={`product-tab-panel${activeTab === 'desc' ? ' is-active' : ''}`} data-tab-panel="desc">
              <p id="productDetailTabDesc">{profile.description}</p>
            </div>
            <div className={`product-tab-panel${activeTab === 'spec' ? ' is-active' : ''}`} data-tab-panel="spec">
              <ul id="productDetailTabSpec">
                {profile.specifications.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className={`product-tab-panel${activeTab === 'fabric' ? ' is-active' : ''}`} data-tab-panel="fabric">
              <ul id="productDetailTabFabric">
                {profile.fabrication.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
            <div className={`product-tab-panel${activeTab === 'reviews' ? ' is-active' : ''}`} data-tab-panel="reviews">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', margin: 0 }}>Customer Reviews</h3>
                {!showReviewForm && (
                  <button type="button" className="btn" id="openReviewFormBtn" style={{ padding: '10px 20px', fontSize: '13px' }}
                    onClick={() => setShowReviewForm(true)}>Add a Review</button>
                )}
              </div>
              {showReviewForm && (
                <div id="reviewFormContainer" style={{ background: '#fff9fc', padding: '25px', borderRadius: '12px', border: '1px solid #f0dbe4', marginBottom: '30px' }}>
                  <h4 style={{ marginBottom: '20px', fontFamily: 'var(--font-serif)', fontSize: '18px', color: '#5d3f4c' }}>Write a Review</h4>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px', color: '#5d3f4c' }}>Your Name <span style={{ color: 'red' }}>*</span></label>
                    <input type="text" id="reviewName" style={{ width: '100%', padding: '12px', border: '1px solid #e7ccd8', borderRadius: '8px', fontFamily: 'inherit' }} placeholder="Enter your name" value={reviewName} onChange={(e) => setReviewName(e.target.value)} />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px', color: '#5d3f4c' }}>Rating <span style={{ color: 'red' }}>*</span></label>
                    <select id="reviewStars" style={{ width: '100%', padding: '12px', border: '1px solid #e7ccd8', borderRadius: '8px', fontFamily: 'inherit', color: '#f59e0b' }} value={reviewStars} onChange={(e) => setReviewStars(e.target.value)}>
                      <option value="★★★★★">★★★★★ (5 Stars)</option>
                      <option value="★★★★☆">★★★★☆ (4 Stars)</option>
                      <option value="★★★☆☆">★★★☆☆ (3 Stars)</option>
                      <option value="★★☆☆☆">★★☆☆☆ (2 Stars)</option>
                      <option value="★☆☆☆☆">★☆☆☆☆ (1 Star)</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '5px', color: '#5d3f4c' }}>Your Review <span style={{ color: 'red' }}>*</span></label>
                    <textarea id="reviewText" style={{ width: '100%', padding: '12px', border: '1px solid #e7ccd8', borderRadius: '8px', minHeight: '100px', fontFamily: 'inherit' }} placeholder="Share your experience..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <button type="button" className="btn" id="submitReviewBtn" onClick={handleSubmitReview}>Submit Review</button>
                    <button type="button" className="btn" id="cancelReviewBtn" style={{ background: 'transparent', color: '#5d3f4c', border: '1px solid #dfc5d0' }}
                      onClick={() => { setShowReviewForm(false); setReviewName(''); setReviewText(''); setReviewStars('★★★★★'); }}>Cancel</button>
                  </div>
                </div>
              )}
              <div id="productDetailTabReviews">
                {reviews.map((r, i) => (
                  <div key={i} style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: i < reviews.length - 1 ? '1px solid #f0dbe4' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '15px', color: '#5d3f4c' }}>{r.name}</strong>
                      <span style={{ color: '#f59e0b', fontSize: '14px' }}>{r.stars}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#6b5a63', marginTop: '5px' }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <div className="text-center">
            <span className="section-subtitle">You May Also Like</span>
            <h2 className="section-title">Related Products</h2>
          </div>
          <div className="products-grid related-products-grid" id="relatedProductsGrid">
            {related.map((item) => (
              <div key={item.slug} className="product-card shop-product-card" data-product={item.slug}
                style={{ cursor: 'pointer' }} onClick={() => navigate('product', { product: item.slug })}>
                <div className="product-image"><img src={item.image} alt={item.alt || item.name} /></div>
                <div className="product-details shop-product-details">
                  <p className="shop-product-category">{item.category}</p>
                  <h3 className="product-name">{item.name}</h3>
                  <div className="shop-product-bottom">
                    <div className="product-price">{item.price}</div>
                    <a href={`?page=product&product=${item.slug}`} className="shop-product-link"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('product', { product: item.slug }); }}>View</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
