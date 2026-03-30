import React, { useState, useEffect } from 'react';
import { getStoredCart, setStoredCart, formatMoney } from '../cartUtils.js';
import { showToast } from './Toast.jsx';
import { X, ArrowLeft, Plus, Minus, User, MapPin, CreditCard, Edit2, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage({ navigate, onCartUpdate }) {
  const [cartItems, setCartItems] = useState([]);
  const [stage, setStage] = useState('cart'); // 'cart' | 'checkout'
  const [couponCode, setCouponCode] = useState('');
  
  // Checkout form state
  const [shipForm, setShipForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  useEffect(() => {
    setCartItems(getStoredCart());
  }, []);

  function refreshCart(items) {
    setStoredCart(items);
    setCartItems(getStoredCart());
    onCartUpdate();
  }

  function handleQtyChange(index, action) {
    const items = [...cartItems];
    if (action === 'increase') items[index].qty += 1;
    else if (action === 'decrease') {
      if (items[index].qty > 1) items[index].qty -= 1;
      else items.splice(index, 1);
    } else if (action === 'remove') {
      items.splice(index, 1);
    }
    refreshCart(items);
  }

  function handleClearCart() {
    refreshCart([]);
    showToast('Cart cleared', 'success');
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal; // Simulating the image which shows total = subtotal

  function handleCheckoutClick() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    if (!isLoggedIn) {
      showToast('Please login to continue to checkout.', 'error');
      setTimeout(() => navigate('login'), 1500);
      return;
    }
    if (!cartItems.length) { showToast('Your cart is empty!', 'error'); return; }
    setStage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    if (stage === 'checkout') {
      // Basic validation
      if (!shipForm.firstName || !shipForm.phone || !shipForm.address) {
        showToast('Please fill in required shipping details.', 'error');
        return;
      }
      const newOrder = {
        id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Paid',
        total,
        items: cartItems,
        shipping: shipForm,
      };
      localStorage.setItem('userShippingAddress', JSON.stringify(shipForm));
      const existing = JSON.parse(localStorage.getItem('userOrders') || '[]');
      existing.unshift(newOrder);
      localStorage.setItem('userOrders', JSON.stringify(existing));
      localStorage.removeItem('youLeggingsCart');
      onCartUpdate();
      showToast('Order placed successfully! Delivery in 3-5 days.', 'success');
      setTimeout(() => {
        setStage('cart');
        setCartItems([]);
        navigate('my-account');
      }, 1500);
    }
  }

  return (
    <section className="section cart-redesign-page" style={{ backgroundColor: '#fafafa' }}>
      <div className="container">
        {/* Progress Bar */}
        <div className="cart-progress">
          <div className={`progress-step ${stage === 'cart' ? 'active' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-label">CART</span>
          </div>
          <div className={`progress-connector ${stage === 'checkout' ? 'active-connector' : ''}`}></div>
          <div className={`progress-step ${stage === 'checkout' ? 'active' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-label">CHECKOUT</span>
          </div>
          <div className="progress-connector"></div>
          <div className="progress-step">
            <span className="step-num">3</span>
            <span className="step-label">PAYMENT</span>
          </div>
        </div>

        <div className="cart-main-layout">
          {/* LEFT COLUMN */}
          <div className="cart-left-col">
            {stage === 'cart' ? (
              <>
                <div className="cart-card main-card">
                  <h2 className="card-title">Your Items</h2>
                  <div className="cart-items-list">
                    {!cartItems.length ? (
                      <p className="empty-msg">Your cart is empty.</p>
                    ) : (
                      cartItems.map((item, index) => (
                        <div key={index} className="cart-item-row">
                          <div className="item-thumb">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="item-details">
                            <h3>{item.name}</h3>
                            <p className="item-variant">Variant: {item.size}</p>
                            <p className="item-price">{formatMoney(item.price)}</p>
                          </div>
                          <div className="item-controls">
                            <div className="qty-selector-oval">
                              <button onClick={() => handleQtyChange(index, 'decrease')}><Minus size={14} /></button>
                              <span>{item.qty}</span>
                              <button onClick={() => handleQtyChange(index, 'increase')}><Plus size={14} /></button>
                            </div>
                            <button className="remove-btn" onClick={() => handleQtyChange(index, 'remove')}>
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="cart-actions-row">
                  <button className="text-btn continue-btn" onClick={() => navigate('shop')}>
                    <ArrowLeft size={16} /> Continue Shopping
                  </button>
                  <button className="text-btn clear-btn" onClick={handleClearCart}>
                    Clear all items
                  </button>
                </div>
              </>
            ) : (
              <div className="checkout-forms-wrap">
                <div className="checkout-card">
                  <div className="checkout-card-header">
                    <User size={20} className="checkout-icon" />
                    <h3 className="checkout-title">Personal Information</h3>
                  </div>
                  <div className="checkout-grid-2">
                    <div className="form-group">
                      <label>FIRST NAME</label>
                      <input type="text" placeholder="John" value={shipForm.firstName} onChange={(e) => setShipForm({...shipForm, firstName: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>LAST NAME</label>
                      <input type="text" placeholder="Doe" value={shipForm.lastName} onChange={(e) => setShipForm({...shipForm, lastName: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>EMAIL ADDRESS</label>
                      <input type="email" placeholder="john@example.com" value={shipForm.email} onChange={(e) => setShipForm({...shipForm, email: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>PHONE NUMBER</label>
                      <input type="tel" placeholder="+91 000 000 00" value={shipForm.phone} onChange={(e) => setShipForm({...shipForm, phone: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="checkout-card">
                  <div className="checkout-card-header">
                    <MapPin size={20} className="checkout-icon" />
                    <h3 className="checkout-title">Shipping Details</h3>
                  </div>
                  <div className="form-group block-group">
                    <label>STREET ADDRESS</label>
                    <input type="text" placeholder="House number and street name" value={shipForm.address} onChange={(e) => setShipForm({...shipForm, address: e.target.value})} />
                  </div>
                  <div className="checkout-grid-2">
                    <div className="form-group">
                      <label>TOWN / CITY</label>
                      <input type="text" placeholder="Bhubaneswar" value={shipForm.city} onChange={(e) => setShipForm({...shipForm, city: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>STATE</label>
                      <select value={shipForm.state} onChange={(e) => setShipForm({...shipForm, state: e.target.value})}>
                        <option value="">Select State</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>PINCODE</label>
                      <input type="text" placeholder="751001" value={shipForm.pincode} onChange={(e) => setShipForm({...shipForm, pincode: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>COUNTRY</label>
                      <input type="text" value={shipForm.country} readOnly />
                    </div>
                  </div>
                </div>

                <div className="checkout-card">
                  <div className="checkout-card-header">
                    <CreditCard size={20} className="checkout-icon" />
                    <h3 className="checkout-title">Payment Method</h3>
                  </div>
                  <div className="payment-options">
                    <label className={`payment-method-box ${paymentMethod === 'razorpay' ? 'selected' : ''}`}>
                      <input type="radio" name="payment" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} />
                      <div className="payment-method-info">
                        <ShieldCheck size={24} className="pm-icon" />
                        <div>
                          <strong>Razorpay Secure</strong>
                          <span>Pay via UPI, Cards, Netbanking</span>
                        </div>
                      </div>
                    </label>
                    <label className={`payment-method-box ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                      <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                      <div className="payment-method-info">
                        <Truck size={24} className="pm-icon" />
                        <div>
                          <strong>Cash on Delivery</strong>
                          <span>Pay when your order arrives</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Order Summary / Review */}
          <div className="cart-right-col">
            <div className="cart-card summary-card">
              {stage === 'cart' ? (
                <>
                  <h2 className="card-title">Order Summary</h2>
                  <div className="coupon-section-dashed">
                    <input 
                      type="text" 
                      placeholder="ENTER COUPON CODE" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button className="apply-btn">APPLY</button>
                  </div>
                  <div className="summary-details">
                    <div className="summary-line">
                      <span>Subtotal</span>
                      <span>{formatMoney(subtotal)}</span>
                    </div>
                    <div className="summary-line total-line">
                      <span>Total Payment</span>
                      <span>{formatMoney(total)}</span>
                    </div>
                    <p className="tax-note">Shipping & taxes calculated at checkout.</p>
                  </div>
                  <button className="btn btn-secure-checkout" onClick={handleCheckoutClick}>
                    SECURE CHECKOUT
                  </button>
                </>
              ) : (
                <>
                  <div className="review-header">
                    <h2 className="card-title">Order Review</h2>
                    <button className="text-btn change-btn" onClick={() => setStage('cart')}>
                      <Edit2 size={14} /> Change
                    </button>
                  </div>
                  <div className="checkout-review-items">
                    {cartItems.map((item, index) => (
                      <div key={index} className="review-item">
                        <img src={item.image} alt={item.name} />
                        <div className="review-item-txt">
                          <strong>{item.name}</strong>
                          <span>Variant: {item.size} | Qty: {item.qty}</span>
                          <span className="review-price">{formatMoney(item.price * item.qty)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="summary-details">
                    <div className="summary-line review-subtotal">
                      <span>Subtotal</span>
                      <span>{formatMoney(subtotal)}</span>
                    </div>
                    <div className="summary-line total-line">
                      <span>Total Amount</span>
                      <span className="big-total">{formatMoney(total)}</span>
                    </div>
                  </div>
                  <button className="btn btn-secure-checkout btn-dark" onClick={handlePlaceOrder}>
                    CONFIRM ORDER
                  </button>
                  <p className="terms-note">By placing your order, you agree to our <span>Terms & Conditions.</span></p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
