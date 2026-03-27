import { useState } from "react";
import Icon from "../components/Icon";
import ShopProductCard from "../components/ShopProductCard";
import { RECENTLY_ADDED, SIZES, MATERIALS, BRANDS_IMG } from "../data/data";

const ShopPage = ({ setPage, addToCart }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(650);

  // Combine multiple arrays to match the visual grid from the previous mock
  const allProducts = [
    ...RECENTLY_ADDED,
    ...RECENTLY_ADDED.map(p => ({ ...p, id_suffix: "-2" })),
    ...RECENTLY_ADDED.map(p => ({ ...p, id_suffix: "-3" }))
  ];

  const filteredProducts = allProducts.filter(p => {
    const priceVal = parseFloat(p.price.replace("₹", "").replace(",", ""));
    return priceVal >= minPrice && priceVal <= maxPrice;
  });

  return (
    <main className="shop-main">
      <div className="shop-body">
        {/* Sidebar */}
        <aside className="shop-sidebar">
          <div className="shop-sidebar-sticky" style={{ position: "sticky", top: "100px" }}>
            <div className="shop-sidebar-header">
              <h2>Filters</h2>
              <span className="clear-btn" onClick={() => { setMinPrice(0); setMaxPrice(1000); }}>Clear All</span>
            </div>
            {/* Search Filter */}
            <div className="filter-block">
              <div style={{ position: "relative" }}>
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  style={{ 
                    width: "100%", 
                    padding: "12px 40px 12px 16px", 
                    borderRadius: "10px", 
                    border: "1px solid #eee",
                    background: "#f9f9f9",
                    fontSize: "14px",
                    outline: "none"
                  }} 
                />
                <Icon name="search" style={{ position: "absolute", right: "12px", top: "12px", fontSize: "20px", color: "#bbb" }} />
              </div>
            </div>

            {/* Categories */}
            <div className="filter-block">
              <h3 className="filter-title">
                Category
                <Icon name="add" style={{ fontSize: "16px" }} />
              </h3>
              <div className="category-filter-list">
                {[
                  { name: "Mens T-Shirts", count: 42 },
                  { name: "Denim Jeans", count: 18 },
                  { name: "Panjabi Sets", count: 12 },
                  { name: "Outerwear", count: 8 }
                ].map((cat) => (
                  <div key={cat.name} className="category-filter-item">
                    <span>{cat.name}</span>
                    <span className="category-count-badge">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="filter-block">
              <h3 className="filter-title">
                Size
                <Icon name="expand_more" style={{ fontSize: "16px" }} />
              </h3>
              <div className="size-grid">
                {SIZES.map((size) => (
                  <button 
                    key={size} 
                    className={`size-btn ${size === "XL" ? "active" : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div className="filter-block">
              <h3 className="filter-title">
                Material
                <Icon name="expand_less" style={{ fontSize: "16px" }} />
              </h3>
              <div className="radio-list">
                {MATERIALS.map((mat) => (
                  <label key={mat} className="radio-item">
                    <input type="radio" name="material" value={mat} checked={mat === "Poly-Cotton"} readOnly />
                    <span className="radio-label">{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="filter-block">
              <h3 className="filter-title">
                Color
                <Icon name="palette" style={{ fontSize: "16px" }} />
              </h3>
              <div className="color-grid">
                {[
                  { name: "Black", color: "#000" },
                  { name: "Grey", color: "#888" },
                  { name: "Beige", color: "#F5F5DC" },
                  { name: "Navy", color: "#000080" },
                  { name: "White", color: "#FFF" }
                ].map((c) => (
                  <div key={c.name} className="color-swatch-wrap">
                    <div className="color-swatch">
                      <div className="color-swatch-inner" style={{ backgroundColor: c.color }}></div>
                    </div>
                    <span className="color-label">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="filter-block">
              <h3 className="filter-title">
                Brand
                <Icon name="expand_more" style={{ fontSize: "16px" }} />
              </h3>
              <div className="brand-logo-container">
                 <img src={BRANDS_IMG} alt="Brands" className="brand-logos-img" style={{ opacity: 0.7 }} />
              </div>
            </div>

            {/* Price Range */}
            <div className="price-block">
              <h3 className="price-title">Price Range</h3>
              <div className="price-slider-fashion" style={{ marginTop: "32px", position: "relative" }}>
                <div className="price-track-fashion">
                  <div className="price-bubble left" style={{ left: `${(minPrice / 1000) * 100}%` }}>₹{minPrice}</div>
                  <div className="price-bubble right" style={{ left: `${(maxPrice / 1000) * 100}%` }}>₹{maxPrice}</div>
                  <div className="price-range-fashion" style={{ left: `${(minPrice / 1000) * 100}%`, right: `${100 - (maxPrice / 1000) * 100}%` }} />
                </div>
                
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={minPrice} 
                  onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 10))} 
                  style={{ position: "absolute", top: "-5px", width: "100%", opacity: 0, zIndex: 3, cursor: "pointer" }} 
                />
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 10))} 
                  style={{ position: "absolute", top: "-5px", width: "100%", opacity: 0, zIndex: 4, cursor: "pointer" }} 
                />

                {/* Visible Handles */}
                <div className="price-handle-fashion" style={{ left: `${(minPrice / 1000) * 100}%`, zIndex: 1, pointerEvents: "none" }} />
                <div className="price-handle-fashion" style={{ left: `${(maxPrice / 1000) * 100}%`, zIndex: 2, pointerEvents: "none" }} />
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="shop-content-fashion">
          <div className="product-grid-fashion">
            {filteredProducts.map((p, idx) => (
              <ShopProductCard key={`${p.name}-${p.id_suffix || idx}`} product={p} setPage={setPage} addToCart={addToCart} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div style={{ padding: "40px", textAlign: "center", color: "#b1b2b5" }}>
              No products found in this price range.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
