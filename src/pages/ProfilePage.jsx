import { useState, useEffect } from "react";
import Icon from "../components/Icon";

const ProfilePage = ({ setPage, user, onUpdateUser }) => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    currency: user?.currency || ""
  });
  const [emailDiscovery, setEmailDiscovery] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [payments, setPayments] = useState([
    {
      id: "pay-mock",
      cardNumber: "•••• •••• •••• 4290",
      cardHolder: "",
      expiry: "12/28",
      type: "VISA",
      active: true
    }
  ]);

  // Synchronize discovery archives if the client state transitions
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        currency: user.currency || ""
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (editingAddress) {
      setAddresses(addresses.map(a => a.id === editingAddress.id ? {
        ...a,
        name: data.get("name"),
        phone: data.get("phone"),
        street: data.get("street"),
        city: data.get("city"),
        stateZip: `State - ${data.get("zip")}`
      } : a));
      setEditingAddress(null);
    } else {
      const newAddr = {
        id: `addr-${Date.now()}`,
        name: data.get("name"),
        phone: data.get("phone"),
        street: data.get("street"),
        city: data.get("city"),
        stateZip: `State - ${data.get("zip")}`,
        primary: false
      };
      setAddresses([...addresses, newAddr]);
    }
    setShowAddressForm(false);
  };

  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setShowAddressForm(true);
  };

  const removeAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const removePayment = (id) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    
    const number = data.get("cardNumber");
    const lastFour = number.slice(-4);
    const maskedNumber = `•••• •••• •••• ${lastFour.length === 4 ? lastFour : "0000"}`;
    
    const newPayment = {
      id: `pay-${Date.now()}`,
      cardNumber: maskedNumber,
      cardHolder: data.get("cardHolder"),
      expiry: data.get("expiryDate"),
      type: number.startsWith("5") ? "MASTERCARD" : "VISA",
      active: payments.length === 0
    };
    setPayments([...payments, newPayment]);
    setShowPaymentForm(false);
  };

  const MOCK_ORDERS = [
    { id: "IRIS-74920", name: "Iris Silk Atelier Scarf", date: "Thursday, 12 April", status: "In Transit", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgQvVSEZa9GQduWEo5NXFqnEa8eOVBt4M1BZKnwXXDfOZoOb_xGlPwfcCW7S7gZo1PkyinElT01tpprDpKKkOg5SRsElUz1ZXS7d8gqgQkkX00579-nYrqPqtzhs6fOURIVRkRzSHYVWGYbzb6awXiXw23GOZRoqbF4VkiaBnzFIBx3oHki1vI6lbunJhzkoX-oHkseZEJxUTbW0c1IN-Z_q1BhSN_TaQxF-5CLlQvRw6O6ZMPQz5X6Q_dvhEONXXRY3RaE2mqjYM", price: "₹15,400" },
    { id: "IRIS-72105", name: "Ethereal Velvet Gown", date: "Sunday, 25 March", status: "Delivered", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjR-r63B7n6fJ9aJ6_3kR9lG7M-pD9wz5CjZgGZ6z5CjZgGZ6z5CjZgGZ6z5CjZgGZ6z5CjZgGZ6z5CjZgGZ6z5CjZgGZ6z5CjZgGZ6z5CjZgGZ", price: "₹84,500" }
  ];

  const NAV_ITEMS = [
    { id: "profile", label: "Personal Profile", icon: "person_outline" },
    { id: "orders", label: "Order Archives", icon: "local_shipping" },
    { id: "wishlist", label: "My Wishlist", icon: "favorite_border" },
    { id: "addresses", label: "Atelier Addresses", icon: "location_on" },
    { id: "payments", label: "Payment Tributes", icon: "payments" },
    { id: "settings", label: "Atelier Settings", icon: "settings" }
  ];

  return (
    <main className="profile-main">
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">
              {user ? user.name?.charAt(0) : "G"}
            </div>
            <button className="avatar-edit-btn">
              <Icon name="edit" style={{ fontSize: 14 }} />
            </button>
          </div>
          <div className="profile-header-info">
            <h1 className="profile-name">{user?.name || "Atelier Guest"}</h1>
            <p className="profile-email">{user?.email || "Connect your atelier account"}</p>
            <div className="profile-badges">
              <span className="profile-badge">
                {user ? "Atelier Member" : "Guest Connoisseur"}
              </span>
              {user && <span className="profile-badge status-prime">Prime Connoisseur</span>}
            </div>
          </div>
        </div>
        <button className="profile-logout-btn" onClick={() => setPage("login")}>
          <Icon name="logout" />
          <span>Atelier Sign Out</span>
        </button>
      </div>

      <div className="profile-content">
        {/* Navigation Sidebar */}
        <aside className="profile-sidebar">
          <nav className="profile-nav">
            {NAV_ITEMS.map(item => (
              <button 
                key={item.id}
                className={`profile-nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => {
                  if (item.id === "wishlist") setPage("wishlist");
                  else setActiveSection(item.id);
                }}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Section */}
        <section className="profile-detail">
          {activeSection === "profile" && (
            <div className="detail-card">
              <div className="detail-card-header">
                <h2 className="detail-card-title">Personal Details</h2>
                <button 
                  className="detail-edit-link"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                >
                  {isEditingProfile ? "Cancel Review" : "Edit Atelier Profile"}
                </button>
              </div>

              {isEditingProfile ? (
                <form className="edit-form" onSubmit={(e) => { 
                  e.preventDefault(); 
                  onUpdateUser(formData);
                  setIsEditingProfile(false); 
                }}>
                  <div className="detail-grid editing">
                    <div className="detail-item">
                      <span className="detail-label">Full Boutique Name</span>
                      <input 
                        type="text" 
                        name="name"
                        className="edit-input" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Atelier Email</span>
                      <input 
                        type="email" 
                        name="email"
                        className="edit-input" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                       />
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Client Phone</span>
                      <input 
                        type="text" 
                        name="phone"
                        className="edit-input" 
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Preferred Currency</span>
                      <select 
                        name="currency"
                        className="edit-input select"
                        value={formData.currency}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled>Select Currency</option>
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="form-submit-btn profile-save">Save Atelier Discovery</button>
                </form>
              ) : (
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Full Boutique Name</span>
                    <p className="detail-value">{user?.name || ""}</p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Atelier Email</span>
                    <p className="detail-value">{user?.email || ""}</p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Client Phone</span>
                    <p className="detail-value">{user?.phone || ""}</p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Preferred Currency</span>
                    <p className="detail-value">
                      {user?.currency === "INR" ? "INR (₹)" : 
                       user?.currency === "USD" ? "USD ($)" :
                       user?.currency === "EUR" ? "EUR (€)" : ""}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSection === "orders" && (
            <div className="orders-section">
              <h2 className="section-title">Discovery Archives</h2>
              <div className="orders-list">
                {MOCK_ORDERS.map(order => (
                  <div key={order.id} className="order-summary-card">
                    <div className="order-media">
                      <img src={order.img} alt="" />
                    </div>
                    <div className="order-info">
                      <div className="order-meta">
                        <span className="order-number">#{order.id}</span>
                        <span className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
                          {order.status}
                        </span>
                      </div>
                      <h3 className="order-name">{order.name}</h3>
                      <p className="order-date">{order.status === 'Delivered' ? `Delivered on ${order.date}` : `Arriving by ${order.date}`}</p>
                    </div>
                    <div className="order-actions">
                      <span className="order-price">{order.price}</span>
                      <button className="order-track-btn" onClick={() => setPage("product")}>Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "addresses" && (
            <div className="addresses-section">
              <div className="section-header">
                <h2 className="section-title">Atelier Addresses</h2>
                <button 
                  className="add-btn"
                  onClick={() => {
                    setShowAddressForm(!showAddressForm);
                    if (showAddressForm) setEditingAddress(null);
                  }}
                >
                  {showAddressForm ? "Cancel Discovery" : "+ New Address"}
                </button>
              </div>

              {showAddressForm ? (
                <form className="address-form" onSubmit={handleAddressSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" name="name" className="form-input" placeholder="Evelyn Thorne" defaultValue={editingAddress?.name || ""} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Atelier Contact</label>
                      <input type="text" name="phone" className="form-input" placeholder="+91 98765 43210" defaultValue={editingAddress?.phone || ""} required />
                    </div>
                    <div className="form-group full">
                      <label className="form-label">Street Address</label>
                      <input type="text" name="street" className="form-input" placeholder="124, Orchard Road" defaultValue={editingAddress?.street || ""} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input type="text" name="city" className="form-input" placeholder="Bengaluru" defaultValue={editingAddress?.city || ""} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pin Code</label>
                      <input type="text" name="zip" className="form-input" placeholder="560038" defaultValue={editingAddress ? editingAddress.stateZip.replace("State - ", "") : ""} required />
                    </div>
                  </div>
                  <button type="submit" className="form-submit-btn">{editingAddress ? "Update Address" : "Register Address"}</button>
                </form>
              ) : (
                <div className="address-grid">
                  {addresses.map(addr => (
                    <div key={addr.id} className={`address-card ${addr.primary ? 'active' : ''}`}>
                      {addr.primary && <span className="address-badge">Primary Atelier</span>}
                      <div className="address-card-header">
                        <h3 className="address-client-name">{addr.name}</h3>
                        <div className="address-actions">
                          <button 
                            className="addr-btn-icon"
                            onClick={() => handleEditAddress(addr)}
                          >
                            <Icon name="edit" />
                          </button>
                          <button 
                            className="addr-btn-icon danger"
                            onClick={() => removeAddress(addr.id)}
                          >
                            <Icon name="delete_outline" />
                          </button>
                        </div>
                      </div>
                      <p className="address-text">
                        {addr.street}<br />
                        {addr.city}<br />
                        {addr.stateZip}
                      </p>
                      <div className="address-footer">
                        <span>{addr.primary ? "Preferred Archive Destination" : "Secondary Boutique Hub"}</span>
                      </div>
                    </div>
                  ))}
                  {addresses.length === 0 && (
                    <div className="addr-empty-state">No address archives discovered.</div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeSection === "payments" && (
            <div className="payments-section">
               <div className="section-header">
                <h2 className="section-title">Payment Tributes</h2>
                <button 
                  className="add-btn"
                  onClick={() => setShowPaymentForm(!showPaymentForm)}
                >
                  {showPaymentForm ? "Cancel Tribute" : "+ New Card"}
                </button>
              </div>

              {showPaymentForm ? (
                <form className="payment-form" onSubmit={handlePaymentSubmit}>
                  <div className="form-grid">
                    <div className="form-group full">
                      <label className="form-label">Card Number</label>
                      <input type="text" name="cardNumber" className="form-input" placeholder="•••• •••• •••• ••••" required />
                    </div>
                    <div className="form-group full">
                      <label className="form-label">Cardholder Name</label>
                      <input type="text" name="cardHolder" className="form-input" placeholder="Evelyn Thorne" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Expiry Date</label>
                      <input type="text" name="expiryDate" className="form-input" placeholder="MM/YY" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVC</label>
                      <input type="password" name="cvc" className="form-input" placeholder="•••" required />
                    </div>
                  </div>
                  <button type="submit" className="form-submit-btn tribute">Register Tribute</button>
                </form>
              ) : (
                <div className="payment-grid">
                  {payments.map(pay => (
                    <div key={pay.id} className={`payment-card ${pay.active ? 'active' : ''}`}>
                      <div className="card-top">
                        <div className="card-chip" />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span className="card-type">{pay.type}</span>
                          <button 
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'rgba(255, 255, 255, 0.6)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              padding: 0
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              removePayment(pay.id);
                            }}
                          >
                            <Icon name="delete_outline" />
                          </button>
                        </div>
                      </div>
                      <div className="card-number">{pay.cardNumber}</div>
                      <div className="card-bottom">
                        <div className="card-info-item">
                          <span className="card-label">Card Holder</span>
                          <span className="card-holder">{pay.cardHolder || user?.name || ""}</span>
                        </div>
                        <div className="card-info-item">
                          <span className="card-label">Expires</span>
                          <span className="card-expiry">{pay.expiry}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {payments.length === 0 && (
                    <div className="addr-empty-state">No payment tributes discovered.</div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeSection === "settings" && (
            <div className="settings-section">
              <h2 className="section-title">Atelier Settings</h2>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-icon-wrap">
                    <Icon name="mail_outline" />
                  </div>
                  <div className="setting-info">
                    <h3 className="setting-name">Email Discovery</h3>
                    <p className="setting-desc">Receive seasonal collection previews and private atelier events.</p>
                  </div>
                  <button 
                    className={`setting-toggle ${emailDiscovery ? 'active' : ''}`}
                    onClick={() => setEmailDiscovery(!emailDiscovery)}
                  />
                </div>
                <div className="setting-item">
                  <div className="setting-icon-wrap">
                    <Icon name="verified_user" />
                  </div>
                  <div className="setting-info">
                    <h3 className="setting-name">Two-Factor Authentication</h3>
                    <p className="setting-desc">Additional layer of security for your IRIS account.</p>
                  </div>
                  <button 
                    className={`setting-toggle ${twoFactor ? 'active' : ''}`}
                    onClick={() => setTwoFactor(!twoFactor)}
                  />
                </div>
                <div className="setting-item danger">
                  <div className="setting-icon-wrap danger">
                    <Icon name="delete_forever" />
                  </div>
                  <div className="setting-info">
                    <h3 className="setting-name">Deactivate Atelier Account</h3>
                    <p className="setting-desc">Permanently remove your data from the IRIS boutiques.</p>
                  </div>
                  <button className="danger-btn">Deactivate Account</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
