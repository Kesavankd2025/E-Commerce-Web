import Icon from "../components/Icon";

const CartPage = ({ setPage, cartItems, updateQuantity, removeItem }) => {
  const subtotal = cartItems.reduce((acc, item) => {
    const priceStr = item.price.replace("₹", "").replace(",", "");
    return acc + parseFloat(priceStr) * item.quantity;
  }, 0);

  return (
    <main className="cart-main">
      <div className="cart-container">
        {/* Prime Header */}
        <header className="cart-header">
          <div className="cart-header-left">
            <span className="cart-eyebrow">Your Selection</span>
            <h1 className="cart-title">Atelier <span className="cart-title-alt">Bag</span></h1>
          </div>
          <div className="cart-header-right">
            <button onClick={() => setPage("shop")} className="cart-back-link">
              <Icon name="arrow_back" />
              <span>Continue Discovery</span>
            </button>
          </div>
        </header>

        {cartItems.length === 0 ? (
          <div className="cart-empty-prime">
            <div className="cart-empty-visual">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJF8R1nBq53sEcgOHcr549ujX9f0nuqk5-DXWtl6Z9vx-xgwFM7D1QU_4H_KOIn0IR0VZEXI3o6qGBzoqTpOpcvUMgFEn8pTCrf5QKg0nRq6Ads6wUImeBhiMqP9eiofqLmdq7BcjiXhviSjM9ofUlhi7BONL-RSWXaWGPVEkKOI6MsLC_y1Mj_DwZhhnH2MdZK1xdKG4w10swphCF3OMCufGHcOIajATKF_mRWDgXG4rS1PuYfxEu4hBlxDAgKU7V848sYH1Xsxs" 
                alt="Empty Atelier" 
                className="cart-empty-img"
              />
              <div className="cart-empty-overlay" />
            </div>
            <div className="cart-empty-content">
              <h2 className="cart-empty-title">The bag is waiting.</h2>
              <p className="cart-empty-text">
                Your curated collection is currently empty. Explore our latest masterpieces 
                to begin your journey.
              </p>
              <button className="cart-shop-btn" onClick={() => setPage("shop")}>
                Browse Collection
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-prime-layout">
            <div className="cart-items-column">
              <div className="cart-items-list">
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item-museum">
                    <div className="cart-item-museum-media">
                      <img src={item.img} alt={item.name} className="cart-item-museum-img" />
                    </div>
                    <div className="cart-item-museum-info">
                      <div className="cart-item-museum-header">
                        <div className="cart-item-museum-name-wrap">
                          <h3 className="cart-item-museum-name">{item.name}</h3>
                          <span className="cart-item-museum-sku">ID: IRIS-{(index + 101).toString()}</span>
                        </div>
                        <button className="cart-item-museum-remove" onClick={() => removeItem(index)}>
                          <Icon name="delete" />
                        </button>
                      </div>
                      
                      <div className="cart-item-museum-details">
                        <div className="detail-pill">Size: {item.size}</div>
                        <div className="detail-pill">White Glove Delivery</div>
                      </div>

                      <div className="cart-item-museum-footer">
                        <div className="cart-item-museum-qty">
                          <button onClick={() => updateQuantity(index, -1)} className="qty-museum-btn" disabled={item.quantity <= 1}>
                            <Icon name="remove" />
                          </button>
                          <span className="qty-museum-value">{item.quantity}</span>
                          <button onClick={() => updateQuantity(index, 1)} className="qty-museum-btn">
                            <Icon name="add" />
                          </button>
                        </div>
                        <div className="cart-item-museum-price">{item.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-summary-column">
              <div className="cart-summary-prime">
                <h2 className="summary-prime-title">Order Value</h2>
                
                <div className="summary-prime-rows">
                  <div className="summary-prime-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="summary-prime-row">
                    <span>Atelier Prep</span>
                    <span className="summary-free">Complimentary</span>
                  </div>
                  <div className="summary-prime-row">
                    <span>Shipping</span>
                    <span>Calculated at Step 2</span>
                  </div>
                </div>

                <div className="summary-prime-divider" />
                
                <div className="summary-prime-total">
                  <span className="total-label">Total Estimate</span>
                  <span className="total-value">₹{subtotal.toLocaleString()}</span>
                </div>

                <button className="summary-prime-btn" onClick={() => setPage("login")}>
                  Secure Checkout
                  <Icon name="arrow_forward" />
                </button>

                <div className="summary-prime-security">
                  <div className="security-item">
                    <Icon name="verified_user" />
                    <span>IRIS Certified Authenticity</span>
                  </div>
                  <div className="security-item">
                    <Icon name="lock" />
                    <span>End-to-End Encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
