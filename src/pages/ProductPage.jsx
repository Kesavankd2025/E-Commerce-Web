import { useState } from "react";
import Icon from "../components/Icon";
import RelatedCard from "../components/RelatedCard";
import { PRODUCT_THUMBS, PRODUCT_MAIN_IMG, RELATED_PRODUCTS } from "../data/data";

const FINISHES = ["#1a1a1a", "#f4f3f5", "#c5b8ff"];
const SIZES = ["S", "M", "L", "XL"];
const TABS = ["Description", "Specifications", "Shipping & Returns"];

const ProductPage = ({ setPage, addToCart, addToWishlist }) => {
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const allImages = [PRODUCT_MAIN_IMG, ...PRODUCT_THUMBS];

  const handleAction = (type) => {
    const productData = {
      name: "Midnight Saffron Eau de Parfum",
      price: "₹15,400",
      img: allImages[0],
      size: SIZES[selectedSize]
    };

    if (type === "cart" || type === "buy") {
      if (addToCart) addToCart(productData);
      if (type === "buy" && setPage) setPage("login");
    } else if (type === "wishlist") {
      if (addToWishlist) addToWishlist(productData);
    }
  };

  return (
    <main className="product-main">
      {/* Product Layout */}
      <div className="product-layout">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="product-main-image">
            <img
              className="product-main-img"
              src={allImages[selectedThumb]}
              alt="Product"
            />
            <div className="product-badge">
              <span className="product-badge-text">New Collection</span>
            </div>
          </div>

          {/* Thumbnails */}
          {allImages.slice(0, 4).map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedThumb(i)}
              className="product-thumb"
              style={{
                outline: selectedThumb === i ? "2px solid #6250ae" : "none",
              }}
            >
              <img className="product-thumb-img" src={img} alt="" />
            </div>
          ))}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div>
            <h2 className="product-kicker">L'Essence de IRIS</h2>
            <h1 className="product-title">Midnight Saffron Eau de Parfum</h1>
            <div className="product-rating">
              <div className="product-stars">
                {[1, 2, 3, 4].map((s) => (
                  <Icon
                    key={s}
                    name="star"
                    style={{
                      fontVariationSettings:
                        "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  />
                ))}
                <Icon
                  name="star"
                  style={{
                    fontVariationSettings:
                      "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                />
              </div>
              <span className="product-reviews">124 Verified Reviews</span>
            </div>
          </div>

          <div className="product-price">$185.00</div>

          <p className="product-description">
            A celestial blend of rare saffron, dark plum, and aged sandalwood.
            Designed for those who command the room with a whisper, Midnight
            Saffron is a journey through an ethereal night garden.
          </p>

          {/* Vessel Finish */}
          <div className="product-option-block">
            <span className="product-option-title">Vessel Finish</span>
            <div className="finish-options">
              {FINISHES.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedFinish(i)}
                  className="finish-swatch"
                  style={{
                    background: color,
                    outline:
                      selectedFinish === i
                        ? "2px solid #6250ae"
                        : "1px solid #b1b2b5",
                    outlineOffset: selectedFinish === i ? "2px" : "0px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Volume */}
          <div className="product-option-block">
            <span className="product-option-title">Size</span>
            <div className="size-grid">
              {SIZES.map((size, i) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(i)}
                  className="size-button"
                  style={{
                    border:
                      selectedSize === i
                        ? "2px solid #6250ae"
                        : "1px solid #b1b2b5",
                    color: selectedSize === i ? "#6250ae" : "#5e5f62",
                    background:
                      selectedSize === i
                        ? "rgba(98,80,174,0.05)"
                        : "transparent",
                    fontWeight: selectedSize === i ? 700 : 500,
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons - Restored & Prime Functional */}
          <div className="product-cta">
            <div className="cta-row">
              <button
                className="cta-primary"
                onClick={() => handleAction("cart")}
                style={{
                  background: "linear-gradient(to right, #6250ae, #7b68cc)",
                }}
              >
                Add to Cart
              </button>
              <button className="cta-wishlist" onClick={() => handleAction("wishlist")}>
                <Icon name="favorite_border" />
              </button>
            </div>
            <button 
              className="cta-secondary"
              onClick={() => handleAction("buy")}
            >
              Buy Now
            </button>
          </div>

          {/* Trust Badges */}
          <div
            className="trust-row"
            style={{
              color: "#5e5f62",
              borderColor: "rgba(177,178,181,0.1)",
            }}
          >
            {[
              { icon: "local_shipping", label: "Complimentary Shipping" },
              { icon: "verified", label: "2-Year Authenticity" },
              { icon: "eco", label: "Sustainably Sourced" },
            ].map((b) => (
              <div key={b.label} className="trust-item">
                <Icon name={b.icon} style={{ fontSize: "16px" }} />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Tabs + Buy Box */}
      <div className="product-bottom-layout">
        {/* Tabs */}
        <div className="product-tabs">
          <div
            className="tab-row"
            style={{ borderBottom: "1px solid rgba(177,178,181,0.1)" }}
          >
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={activeTab === i ? "tab-button active" : "tab-button"}
                style={{
                  fontWeight: activeTab === i ? 700 : 500,
                  color: activeTab === i ? "#313236" : "#5e5f62",
                  borderBottom:
                    activeTab === i
                      ? "2px solid #6250ae"
                      : "2px solid transparent",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 0 && (
            <div className="tab-content">
              <p>
                Midnight Saffron represents the pinnacle of IRIS's olfactory
                craftsmanship. Each bottle is hand-poured in small batches,
                ensuring the delicate balance of top notes - including bergamot
                and cracked black pepper - is preserved until the moment of
                application.
              </p>
              <p>
                The heart reveals a complex tapestry of Bulgarian rose and
                violet leaf, which slowly matures into the signature base of
                rare Kashmiri saffron and smoky amberwood.
              </p>
              <ul className="detail-list">
                {[
                  {
                    icon: "auto_awesome",
                    title: "Concentration",
                    value: "Eau de Parfum (22% Oil)",
                  },
                  {
                    icon: "schedule",
                    title: "Longevity",
                    value: "8-10 Hours Wear Time",
                  },
                ].map((item) => (
                  <li key={item.title} className="detail-item">
                    <Icon name={item.icon} style={{ color: "#6250ae" }} />
                    <div>
                      <span className="detail-title">{item.title}</span>
                      <span className="detail-value">{item.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 1 && (
            <p className="tab-text">
              Detailed specifications including dimensions, materials, and
              certifications are available upon request. Each piece is
              individually inspected prior to dispatch.
            </p>
          )}

          {activeTab === 2 && (
            <p className="tab-text">
              Complimentary shipping on all orders. Returns accepted within 30
              days of receipt. Items must be unused and in original packaging.
              Please contact our atelier team for assistance.
            </p>
          )}
        </div>

      </div>

      {/* Related Products */}
      <div className="related-section">
        <div className="related-header">
          <div>
            <h3 className="related-kicker">Complete the Aura</h3>
            <h2 className="related-title">You May Also Admire</h2>
          </div>
          <a href="#" className="related-link">
            View Boutique
          </a>
        </div>
        <div className="related-grid">
          {RELATED_PRODUCTS.map((p) => (
            <RelatedCard key={p.name} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
