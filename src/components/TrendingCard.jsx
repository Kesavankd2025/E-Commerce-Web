import { useState } from "react";
import Icon from "./Icon";

const TrendingCard = ({ product, setPage }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="trending-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="trending-media"
        style={{
          boxShadow: hovered ? "0 20px 40px rgba(49,50,54,0.08)" : "none",
        }}
      >
        <img
          className="trending-image"
          src={product.img}
          alt={product.name}
        />
        <div
          className="trending-overlay"
          style={{
            background: "rgba(13,14,16,0.05)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <button className="trending-ghost-btn" onClick={() => setPage("product")}>
            <Icon name="visibility" />
          </button>
          <button
            onClick={() => setPage("product")}
            className="trending-primary-btn"
          >
            <Icon name="shopping_cart" />
          </button>
        </div>
      </div>

      <div className="trending-info">
        <div>
          <h3 className="trending-name">
            {product.name}
          </h3>
          <p className="trending-category">
            {product.category}
          </p>
        </div>
        <span className="trending-price">
          {product.price}
        </span>
      </div>
    </div>
  );
};

export default TrendingCard;
