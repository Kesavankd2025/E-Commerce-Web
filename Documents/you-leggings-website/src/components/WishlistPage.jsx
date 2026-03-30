import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { getStoredCart, setStoredCart } from '../cartUtils.js';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function WishlistPage({ navigate, onCartUpdate }) {
  const { wishlist: items, removeFromWishlist } = useWishlist();

  function handleRemove(slug) {
    removeFromWishlist(slug);
  }

  function handleMoveToCart(product) {
    const cart = getStoredCart();
    // Add item with default size 'M' and color 'Standard' if not specified
    const newItem = {
      slug: product.slug,
      name: product.name,
      price: product.price_num || 0,
      image: product.image,
      size: 'M',
      color: 'Standard',
      qty: 1
    };
    cart.push(newItem);
    setStoredCart(cart);
    handleRemove(product.slug);
    if (onCartUpdate) onCartUpdate();
    navigate('cart');
  }

  return (
    <section className="section page-view wishlist-page" style={{ display: 'block', backgroundColor: '#fdf7fa' }}>
      <div className="page-main wishlist-main" style={{ 
        height: '350px',
        backgroundColor: '#9f9f9f',
        position: 'relative'
      }}>
        <div className="hero-overlay" style={{ background: 'rgba(0,0,0,0.35)' }}></div>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'url("/images/Products/_DSC8789-Edit.jpg")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center 40%',
          opacity: 0.8
        }}></div>
        <div className="container page-main-content" style={{ textAlign: 'center', alignItems: 'center' }}>
          <span className="hero-subtitle" style={{ color: '#fff' }}>Saved for Later</span>
          <h1 className="hero-title" style={{ color: '#fff' }}>Your Favorites</h1>
        </div>
      </div>

      <div className="container page-body" style={{ marginTop: '60px' }}>
        {items.length === 0 ? (
          <div className="empty-wishlist" style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ marginBottom: '24px', opacity: 0.2 }}>
              <Heart size={100} strokeWidth={1} />
            </div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>No favorites yet</h2>
            <p style={{ color: '#7a6870', marginBottom: '32px', maxWidth: '400px', marginInline: 'auto' }}>
              Explore our collections and save your favorite styles to this list for easy access later.
            </p>
            <button 
              className="btn" 
              style={{ padding: '14px 36px' }}
              onClick={() => navigate('shop')}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
               <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px' }}>
                 Saved Items ({items.length})
               </h2>
               <button 
                 onClick={() => navigate('shop')}
                 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7a6870', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                 <ArrowLeft size={16} /> Continue Browsing
               </button>
            </div>

            <div className="wishlist-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '30px' 
            }}>
              {items.map((p) => (
                <div key={p.slug} className="product-card shop-product-card" style={{ height: 'auto' }}>
                  <div className="product-image" style={{ aspectRatio: '3/4', cursor: 'pointer' }} 
                    onClick={() => navigate('product', { product: p.slug })}>
                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button 
                      className="wishlist-remove" 
                      onClick={(e) => { e.stopPropagation(); handleRemove(p.slug); }}
                      style={{ 
                        position: 'absolute', 
                        top: '15px', 
                        right: '15px', 
                        background: 'rgba(255,255,255,0.9)', 
                        border: 'none', 
                        borderRadius: '50%', 
                        width: '36px', 
                        height: '36px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        color: '#333'
                      }}
                      title="Remove from favorites"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="product-details shop-product-details" style={{ padding: '20px', minHeight: 'auto' }}>
                    <p className="shop-product-category" style={{ marginBottom: '8px' }}>{p.category}</p>
                    <h3 className="product-name" style={{ fontSize: '18px', marginBottom: '12px' }}>{p.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                      <div className="product-price" style={{ color: 'var(--primary-dark)', fontWeight: '700', fontSize: '18px' }}>{p.price}</div>
                      <button 
                        className="btn"
                        onClick={(e) => { e.stopPropagation(); handleMoveToCart(p); }}
                        style={{ padding: '8px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <ShoppingBag size={14} /> Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
