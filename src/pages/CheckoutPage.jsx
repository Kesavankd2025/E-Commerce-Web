import { useState } from "react";
import Icon from "../components/Icon";
import { BEST_SELLERS } from "../data/data";

const CheckoutPage = ({ setPage, cartItems = [] }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "United States",
    zipCode: ""
  });

  const subtotal = cartItems.reduce((acc, item) => {
    const priceStr = item.price.replace("₹", "").replace(",", "");
    return acc + parseFloat(priceStr) * item.quantity;
  }, 0);

  const shipping = cartItems.length > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (total === 0) {
      alert("Your cart is empty.");
      return;
    }

    const options = {
      key: "rzp_test_your_key_here", // Placeholder key for UI demo
      amount: total * 100, // Amount in paise
      currency: "INR",
      name: "Velora Atelier",
      description: "Order Processing",
      image: "https://lh3.googleusercontent.com/aida-public/...", // standard logo or blank
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        setPage("home");
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: "9999999999" // Dummy
      },
      theme: {
        color: "rgb(241, 64, 100)"
      }
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert("Razorpay SDK not loaded.");
    }
  };

  return (
    <main className="checkout-main">
      <div className="checkout-container">
        {/* Left Side: Forms */}
        <div className="checkout-form-section">
          <div className="checkout-header">
             <h1 className="checkout-title">Secure Checkout</h1>
             <div className="checkout-secure-badge">
               <Icon name="lock" style={{ fontSize: "16px", color: "#2E7D32" }} />
               <span>256-bit SSL Encrypted</span>
             </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Contact Details */}
            <section className="checkout-block">
              <h2 className="checkout-block-title">Contact Information</h2>
              <div className="input-group">
                <input required type="email" name="email" placeholder="Email Address" className="checkout-input" onChange={handleChange} />
              </div>
            </section>

            {/* Shipping Address */}
            <section className="checkout-block">
              <h2 className="checkout-block-title">Shipping Address</h2>
              <div className="input-row">
                <input required type="text" name="firstName" placeholder="First Name" className="checkout-input half" onChange={handleChange} />
                <input required type="text" name="lastName" placeholder="Last Name" className="checkout-input half" onChange={handleChange} />
              </div>
              <div className="input-group">
                <input required type="text" name="address" placeholder="Street Address" className="checkout-input" onChange={handleChange} />
              </div>
              <div className="input-row">
                <input required type="text" name="city" placeholder="City" className="checkout-input half" onChange={handleChange} />
                <input required type="text" name="zipCode" placeholder="ZIP / Postal Code" className="checkout-input half" onChange={handleChange} />
              </div>
            </section>


            <button type="submit" className="checkout-submit-btn" style={{ background: "linear-gradient(135deg, rgb(241, 64, 100) 0%, rgb(255, 120, 150) 100%)" }}>
              Pay ₹{total.toFixed(2)}
            </button>
            <button type="button" className="checkout-return-btn" onClick={() => setPage("cart")}>
              <Icon name="chevron_left" style={{ fontSize: "20px" }} />
              Return to Cart
            </button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <aside className="checkout-sidebar">
          <div className="checkout-sidebar-inner">
            <h2 className="checkout-summary-title">Order Summary</h2>
            <div className="checkout-items">
              {cartItems.map((item, index) => (
                <div key={index} className="checkout-item">
                  <div className="checkout-item-img-wrap">
                    <img src={item.img} alt="" className="checkout-item-img" />
                    <span className="checkout-item-qty">{item.quantity}</span>
                  </div>
                  <div className="checkout-item-info">
                    <h4 className="checkout-item-name">{item.name}</h4>
                    <p className="checkout-item-variant">{item.size}</p>
                  </div>
                  <span className="checkout-item-price">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="checkout-totals">
              <div className="checkout-total-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-total-row">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="checkout-total-row checkout-final-total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CheckoutPage;
