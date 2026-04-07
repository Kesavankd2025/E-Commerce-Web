const RecentlyAddedCard = ({ product, setPage }) => {
  return (
    <div className="recent-card" onClick={() => setPage("product")}>
      <div
        className="recent-card-media"
      >
        <img
          className="recent-card-image"
          src={product.img}
          alt={product.name}
        />
        <div className="recent-badge">
          <span className="recent-badge-text">
            New
          </span>
        </div>
      </div>

      <h3 className="recent-card-title">
        {product.name}
      </h3>
      <div className="recent-card-prices">
        <span className="recent-card-price">
          {product.price}
        </span>
        {product.oldPrice && (
          <span className="recent-card-old">
            {product.oldPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default RecentlyAddedCard;
