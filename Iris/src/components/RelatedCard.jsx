import Icon from "./Icon";

const RelatedCard = ({ product }) => {
  return (
    <div className="related-card">
      <div
        className="related-media"
      >
        <img
          className="related-image"
          src={product.img}
          alt={product.name}
        />
        <button
          className="related-add"
          style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Icon name="add" style={{ color: "#313236", fontSize: "20px" }} />
        </button>
      </div>

      <h4 className="related-title">
        {product.name}
      </h4>
      <p className="related-price">
        {product.price}
      </p>
    </div>
  );
};

export default RelatedCard;
