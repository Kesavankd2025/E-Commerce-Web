import Icon from "../components/Icon";

const WishlistPage = ({ wishlistItems, setPage, removeFromWishlist, moveToCart }) => {
  return (
    <main className="wishlist-main">
      <header className="wishlist-header">
        <div className="wishlist-header-glow" />
        <div className="wishlist-header-inner">
          <span className="wishlist-eyebrow">Personal Curation</span>
          <h1 className="wishlist-title">My <span className="wishlist-title-alt">Wishlist</span></h1>
          <p className="wishlist-subtitle">A curated gallery of your most admired IRIS masterpieces, preserved for future discovery.</p>
        </div>
      </header>

      <div className="wishlist-content">
        {wishlistItems.length === 0 ? (
          <div className="wishlist-empty">
            <div className="empty-symbol">
              <Icon name="favorite_border" style={{ fontSize: "64px", opacity: 0.2 }} />
            </div>
            <h2 className="empty-title">Your Gallery is Elegant, but Empty</h2>
            <p className="empty-text">Begin your IRIS journey by adding pieces you admire to this personal collection.</p>
            <button className="empty-prime-btn" onClick={() => setPage("shop")}>
              Discover The Collection
              <Icon name="arrow_forward" />
            </button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item, idx) => (
              <div key={idx} className="wishlist-prime-card">
                <div className="wishlist-prime-media">
                  <img src={item.img} alt={item.name} />
                  <div className="wishlist-prime-overlay">
                    <button className="wishlist-action-btn remove" onClick={() => removeFromWishlist(idx)}>
                      <Icon name="close" />
                    </button>
                  </div>
                </div>
                <div className="wishlist-prime-info">
                  <div className="info-top">
                    <h3 className="wishlist-prime-name">{item.name}</h3>
                    <span className="wishlist-prime-price">{item.price}</span>
                  </div>
                  {item.size && <p className="wishlist-prime-size">Selection: {item.size}</p>}
                  
                  <div className="wishlist-prime-actions">
                    <button className="wishlist-prime-btn-main" onClick={() => moveToCart(idx)}>
                      Move to Bag
                      <Icon name="shopping_bag" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="wishlist-footer">
        <div className="wishlist-footer-divider" />
        <p className="wishlist-footer-note">
          Prices and availability are subject to atelier scheduling. 
          Saved items do not reserve stock.
        </p>
      </div>
    </main>
  );
};

export default WishlistPage;
