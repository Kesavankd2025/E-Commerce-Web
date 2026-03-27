import { useState } from "react";
import Icon from "./Icon";

const TrendingCard = ({ product, setPage, addToCart }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => setPage("product")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: hovered ? "0 10px 30px rgba(0,0,0,0.08)" : "0 4px 12px rgba(0,0,0,0.03)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)"
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#f4f3f5",
          marginRight: "20px",
          flexShrink: 0,
        }}
      >
        <img
          src={product.img}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ color: "#F14064", fontWeight: "700", fontSize: "16px", marginBottom: "4px" }}>
          {product.price}
        </div>
        <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: "700", color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {product.name}
        </h3>
        <p style={{ margin: "0", fontSize: "12px", color: "#b1b2b5", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {product.category}
        </p>
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          if (addToCart) addToCart(product);
          alert("Added to cart!");
        }}
        style={{
          border: "none",
          background: "transparent",
          color: hovered ? "#F14064" : "#ccc",
          cursor: "pointer",
          padding: "8px",
          marginLeft: "8px",
          transition: "all 0.3s",
        }}
      >
        <Icon name="shopping_cart" />
      </button>
    </div>
  );
};

export default TrendingCard;
