import React, { useEffect, useState } from 'react';
import { showToast } from './Toast.jsx';
import { LayoutDashboard, LogOut, MapPin, Package, Settings } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.jsx';

const EMPTY_ADDRESS_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: ''
};

export default function MyAccountPage({ navigate }) {
  const { wishlistCount } = useWishlist();
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem('targetAccountTab') || 'overview';
  });
  const [orders, setOrders] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    name: 'SRS Twinkle star',
    address: 'No. 3/49, 1st Floor, S.T Shop',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600073',
    mobile: '9840242424'
  });
  const [details, setDetails] = useState({
    firstname: 'Admin',
    lastname: 'User',
    display: 'Admin',
    email: 'admin@youleggings.com',
    mobile: '',
    currentPass: '',
    newPass: '',
    confirmPass: ''
  });
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS_FORM);

  useEffect(() => {
    sessionStorage.removeItem('targetAccountTab');
    const stored = JSON.parse(localStorage.getItem('userOrders') || '[]');
    setOrders(stored);

    const storedAddr = localStorage.getItem('userShippingAddress');
    if (storedAddr) {
      setShippingAddress(JSON.parse(storedAddr));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('userLoggedIn');
    navigate('login');
  }

  function handleSaveDetails(e) {
    e.preventDefault();
    showToast('Account details saved!', 'success');
  }

  function openAddressModal(address = null) {
    setIsEditingAddress(Boolean(address));

    if (address) {
      const [firstName = '', ...lastNameParts] = (address.name || '').split(' ');
      setAddressForm({
        firstName,
        lastName: lastNameParts.join(' '),
        email: address.email || '',
        phone: address.mobile || '',
        address: address.address || '',
        city: address.city || '',
        state: address.state || '',
        pincode: address.pincode || ''
      });
    } else {
      setAddressForm(EMPTY_ADDRESS_FORM);
    }

    setShowAddressModal(true);
  }

  function closeAddressModal() {
    setShowAddressModal(false);
    setIsEditingAddress(false);
  }

  function handleDeleteAddress() {
    setShippingAddress(null);
    localStorage.removeItem('userShippingAddress');
    showToast('Address removed.', 'success');
  }

  const tabs = [
    { key: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { key: 'orders', label: 'My Orders', icon: <Package size={18} /> },
    { key: 'address', label: 'Addresses', icon: <MapPin size={18} /> },
    { key: 'details', label: 'Profile Settings', icon: <Settings size={18} /> }
  ];
  const fullName = `${details.firstname} ${details.lastname}`.trim();
  const initials = `${details.firstname.charAt(0)}${details.lastname.charAt(0)}`.trim() || 'AU';

  return (
    <section
      className="section page-view my-account-page my-account-redesign"
      style={{ display: 'block', background: '#f8f9fa', padding: '60px 0 100px' }}
    >
      <div className="container">
        <div className="account-layout">
          <aside className="account-sidebar-v2">
            <div className="profile-card">
              <div className="avatar-circle">{initials}</div>
              <div className="profile-copy">
                <h2 className="profile-name">{fullName}</h2>
                <p className="profile-email">{details.email}</p>
              </div>
            </div>

            <nav className="account-nav-v2" aria-label="My account sections">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.key}
                  className={`nav-btn-v2 ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span className="nav-icon">{tab.icon}</span>
                  <span className="nav-label">{tab.label}</span>
                </button>
              ))}
              <button type="button" className="nav-btn-v2 logout-btn" onClick={handleLogout}>
                <span className="nav-icon">
                  <LogOut size={18} />
                </span>
                <span className="nav-label">Logout</span>
              </button>
            </nav>
          </aside>

          <main className="account-content-v2">
            {activeTab === 'overview' && (
              <div className="panel-overview">
                <span className="panel-subtitle">Account Dashboard</span>
                <h1 className="welcome-heading">Welcome back, {details.firstname}!</h1>

                <div className="summary-grid">
                  <div className="summary-card">
                    <div className="summary-val">{orders.length}</div>
                    <div className="summary-label">TOTAL ORDERS</div>
                  </div>
                  <div className="summary-card">
                    <div className="summary-val">{wishlistCount}</div>
                    <div className="summary-label">WISHLIST</div>
                  </div>
                </div>

                <div className="account-summary-box">
                  <h3>Account Summary</h3>
                  <p>
                    From your account dashboard you can easily check and view your{' '}
                    <span className="pink-link" onClick={() => setActiveTab('orders')}>
                      recent orders
                    </span>
                    , manage your{' '}
                    <span className="text-link" onClick={() => setActiveTab('address')}>
                      shipping and billing addresses
                    </span>{' '}
                    and edit your{' '}
                    <span className="text-link" onClick={() => setActiveTab('details')}>
                      password and account details
                    </span>
                    .
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="panel-orders-v2">
                <h2 className="panel-heading-serif">My Orders</h2>
                {orders.length === 0 ? (
                  <div className="empty-state-v2">
                    <div className="empty-icon-box">
                      <Package size={64} strokeWidth={1} />
                    </div>
                    <h3>No Orders Yet</h3>
                    <p>You haven&apos;t placed any orders yet. Start shopping to fill your closet!</p>
                    <button className="btn-pink-rounded" onClick={() => navigate('shop')}>
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="orders-table-wrap">
                    <table className="orders-table-v2">
                      <thead>
                        <tr>
                          <th>Order Id</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td data-label="Order Id">{order.id}</td>
                            <td data-label="Date">{order.date}</td>
                            <td data-label="Status">
                              <span className="status-badge">{order.status}</span>
                            </td>
                            <td data-label="Total">Rs. {order.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'address' && (
              <div className="panel-address-v2">
                <div className="account-section-header">
                  <div className="account-section-copy">
                    <h2 className="panel-heading-serif">My Addresses</h2>
                    <p>Manage your saved shipping addresses for faster checkout.</p>
                  </div>
                  <button type="button" className="plus-btn-v2" onClick={() => openAddressModal()}>
                    <span className="plus-btn-icon">+</span>
                    Add New Address
                  </button>
                </div>

                {shippingAddress ? (
                  <div className="address-grid-list">
                    <div className="address-card-v2">
                      <div className="address-card-top">
                        <span className="address-type-badge">Primary Shipping</span>
                        <div className="address-actions">
                          <button
                            type="button"
                            className="addr-action-btn edit"
                            onClick={() => openAddressModal(shippingAddress)}
                          >
                            Edit
                          </button>
                          <button type="button" className="addr-action-btn delete" onClick={handleDeleteAddress}>
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="address-body">
                        <h4 className="addr-name">{shippingAddress.name}</h4>
                        <p className="address-text">
                          {shippingAddress.address}
                          <br />
                          {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
                          <br />
                          <strong>Ph:</strong> {shippingAddress.mobile}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="empty-state-card">
                    <div className="empty-state-v2">
                      <div className="empty-icon-box">
                        <img
                          src="/images/house-emoji.png"
                          alt="House"
                          style={{ width: '64px' }}
                          onError={(e) => {
                            e.target.src = 'https://cdn-icons-png.flaticon.com/512/619/619153.png';
                          }}
                        />
                      </div>
                      <h3>No Addresses Saved</h3>
                      <p>
                        You haven&apos;t saved any addresses yet. They will be saved automatically when you
                        place an order.
                      </p>
                      <button type="button" className="btn-pink-rounded" onClick={() => openAddressModal()}>
                        Add New Address
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'details' && (
              <div className="panel-details-v2">
                <h2 className="panel-heading-serif">Profile Settings</h2>
                <form className="profile-form-v2" onSubmit={handleSaveDetails}>
                  <div className="form-grid-v2">
                    <div className="input-group-v2">
                      <label>FULL NAME</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          const [firstName, ...lastNameParts] = e.target.value.split(' ');
                          setDetails({
                            ...details,
                            firstname: firstName || '',
                            lastname: lastNameParts.join(' ') || ''
                          });
                        }}
                      />
                    </div>
                    <div className="input-group-v2">
                      <label>EMAIL ADDRESS</label>
                      <input type="email" value={details.email} readOnly />
                    </div>
                    <div className="input-group-v2 full-width">
                      <label>PHONE NUMBER</label>
                      <input
                        type="tel"
                        value={details.mobile}
                        placeholder="Enter your mobile number"
                        onChange={(e) => setDetails({ ...details, mobile: e.target.value })}
                      />
                    </div>
                  </div>

                  <h3 className="subheading-v2">Change Password</h3>
                  <div className="form-grid-v2">
                    <div className="input-group-v2">
                      <label>CURRENT PASSWORD</label>
                      <input
                        type="password"
                        placeholder="********"
                        value={details.currentPass}
                        onChange={(e) => setDetails({ ...details, currentPass: e.target.value })}
                      />
                    </div>
                    <div className="input-group-v2">
                      <label>NEW PASSWORD</label>
                      <input
                        type="password"
                        placeholder="********"
                        value={details.newPass}
                        onChange={(e) => setDetails({ ...details, newPass: e.target.value })}
                      />
                    </div>
                    <div className="input-group-v2">
                      <label>CONFIRM PASSWORD</label>
                      <input
                        type="password"
                        placeholder="********"
                        value={details.confirmPass}
                        onChange={(e) => setDetails({ ...details, confirmPass: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="save-btn-v2">
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>

      {showAddressModal && (
        <div className="modal-overlay-v2" onClick={closeAddressModal}>
          <div
            className="address-modal-v2"
            role="dialog"
            aria-modal="true"
            aria-labelledby="address-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-v2">
              <h2 id="address-modal-title">{isEditingAddress ? 'Edit Address' : 'Add New Address'}</h2>
              <button type="button" className="close-modal" onClick={closeAddressModal}>
                Close
              </button>
            </div>
            <form
              className="address-form-v2"
              onSubmit={(e) => {
                e.preventDefault();
                const fullAddr = {
                  name: `${addressForm.firstName} ${addressForm.lastName}`.trim(),
                  email: addressForm.email,
                  mobile: addressForm.phone,
                  address: addressForm.address,
                  city: addressForm.city,
                  state: addressForm.state,
                  pincode: addressForm.pincode
                };
                setShippingAddress(fullAddr);
                localStorage.setItem('userShippingAddress', JSON.stringify(fullAddr));
                closeAddressModal();
                showToast('Address saved successfully!', 'success');
              }}
            >
              <div className="modal-form-grid">
                <div className="modal-input-group">
                  <label>FIRST NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={addressForm.firstName}
                    onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                  />
                </div>
                <div className="modal-input-group">
                  <label>LAST NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={addressForm.lastName}
                    onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                  />
                </div>
                <div className="modal-input-group">
                  <label>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={addressForm.email}
                    onChange={(e) => setAddressForm({ ...addressForm, email: e.target.value })}
                  />
                </div>
                <div className="modal-input-group">
                  <label>PHONE NUMBER</label>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                  />
                </div>
                <div className="modal-input-group full-width">
                  <label>COMPLETE ADDRESS</label>
                  <textarea
                    required
                    placeholder="House No, Street Name, Area..."
                    value={addressForm.address}
                    onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                  />
                </div>
                <div className="modal-form-row-three">
                  <div className="modal-input-group">
                    <label>CITY</label>
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    />
                  </div>
                  <div className="modal-input-group">
                    <label>STATE</label>
                    <input
                      type="text"
                      required
                      placeholder="State"
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    />
                  </div>
                  <div className="modal-input-group">
                    <label>PINCODE</label>
                    <input
                      type="text"
                      required
                      placeholder="Pincode"
                      value={addressForm.pincode}
                      onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer-v2">
                <button type="button" className="cancel-addr-btn" onClick={closeAddressModal}>
                  Cancel
                </button>
                <button type="submit" className="save-addr-btn">
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
