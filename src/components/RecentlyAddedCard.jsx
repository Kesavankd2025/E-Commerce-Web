const RecentlyAddedCard = ({ product, setPage }) => {
  return (
    <div className="recent-card" onClick={() => setPage("product")}>
      <div className="recent-card-media">
        <img
          className="recent-card-image"
          src={product.img}
          alt=""
        />
      </div>

      <div className="recent-card-info">
        <h3 className="recent-card-title">
          {product.name}
        </h3>
        <p className="recent-card-offer">
          {product.offer || "Min. 70% Off"}
        </p>
      </div>
    </div>
  );
};

export default RecentlyAddedCard;
