import Icon from "../components/Icon";

const CartPage = ({ setPage, cartItems, updateQuantity, removeItem }) => {

  const subtotal = cartItems.reduce((acc, item) => {
    const priceStr = item.price.replace("₹", "").replace(",", "");
    return acc + parseFloat(priceStr) * item.quantity;
  }, 0);

  return (
    <main className="cart-main">
      <div className="cart-container">
        <h1 className="cart-page-title">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="cart-empty-state">
            <Icon name="shopping_bag" style={{ fontSize: "64px", color: "#b1b2b5", marginBottom: "24px" }} />
            <p className="cart-empty-text">Your cart is empty.</p>
            <button 
              className="cart-continue-btn"
              onClick={() => setPage("shop")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-section">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item-row">
                  <div className="cart-item-image-wrap">
                    <img src={item.img} alt="" className="cart-item-img" />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-header">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <button className="cart-item-remove" onClick={() => removeItem(index)}>
                        <Icon name="close" style={{ fontSize: "20px" }} />
                      </button>
                    </div>
                    <p className="cart-item-variant">Size: {item.size}</p>
                    <div className="cart-item-bottom">
                      <div className="cart-qty-control">
                        <button onClick={() => updateQuantity(index, -1)} className="qty-btn" disabled={item.quantity <= 1}>
                          <Icon name="remove" style={{ fontSize: "16px" }} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, 1)} className="qty-btn">
                          <Icon name="add" style={{ fontSize: "16px" }} />
                        </button>
                      </div>
                      <div className="cart-item-price">{item.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary-section">
              <h2 className="summary-heading">Order Summary</h2>
              <div className="summary-line">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-line summary-total">
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <button className="summary-checkout-btn" onClick={() => setPage("checkout")} style={{ background: "linear-gradient(135deg, rgb(241, 64, 100) 0%, rgb(255, 120, 150) 100%)" }}>
                Proceed to Checkout
              </button>
              <div className="summary-secure">
                <Icon name="lock" style={{ fontSize: "16px" }} />
                <span>Secure SSL Checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
