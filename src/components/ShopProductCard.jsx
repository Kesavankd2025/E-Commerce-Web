import Icon from "./Icon";

const ShopProductCard = ({ product, setPage, addToCart }) => {
  return (
    <div className="shop-product-card" onClick={() => setPage("product")}>
      <div className="product-card-media">
        <img
          className="product-card-image"
          src={product.img}
          alt={product.name}
        />
      </div>

      <div className="product-card-info">
        <h3 className="product-card-title">{product.name}</h3>
        
        <div className="product-card-rating">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className="material-symbols-outlined star-icon"
              style={{ fontSize: '14px', color: i < (product.stars || 0) ? '#ffb400' : '#d1d1d1' }}
            >
              star
            </span>
          ))}
        </div>

        <div className="product-card-price">{product.price}</div>
        
        <button 
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (addToCart) addToCart(product);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ShopProductCard;
