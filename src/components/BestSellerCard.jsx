import { useState } from "react";
import Icon from "./Icon";

const BestSellerCard = ({ product, setPage }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="best-seller-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="best-seller-media"
      >
        <img
          className="best-seller-image"
          src={product.img}
          alt={product.name}
        />
        {/* Badge */}
        <div className="best-seller-badge">
          <span className="best-seller-badge-text">
            Best Seller
          </span>
        </div>
        {/* Add button */}
        <div
          className="best-seller-add"
          style={{
            transform: hovered ? "translateY(0)" : "translateY(48px)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <button
            onClick={() => setPage("product")}
            className="best-seller-add-btn"
          >
            <Icon name="add" />
          </button>
        </div>
      </div>

      <div className="best-seller-info">
        <div>
          <h3 className="best-seller-name">
            {product.name}
          </h3>
          <p className="best-seller-sub">
            {product.sub}
          </p>
        </div>
        <span className="best-seller-price">
          {product.price}
        </span>
      </div>
    </div>
  );
};

export default BestSellerCard;
