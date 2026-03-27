import { useState } from "react";
import Icon from "./Icon";

const Navbar = ({ cartCount = 2, setPage }) => {
  const [isLocationOpen, setLocationOpen] = useState(false);
  const [location, setLocation] = useState("Select Location");
  const locations = ["Bengaluru", "Delhi", "Mumbai", "Hyderabad"];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo + Location */}
        <div className="navbar-left">
          <button
            type="button"
            onClick={() => setPage && setPage("home")}
            className="navbar-logo"
          >
            IRIS
          </button>
          <button
            type="button"
            onClick={() => setLocationOpen((prev) => !prev)}
            className="location-button"
            aria-expanded={isLocationOpen}
            aria-haspopup="listbox"
          >
            {location}
            <Icon name="keyboard_arrow_down" style={{ fontSize: 20 }} />
          </button>
          {isLocationOpen && (
            <div className="location-menu" role="listbox">
              {locations.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setLocation(city);
                    setLocationOpen(false);
                  }}
                  className="location-item"
                  role="option"
                  aria-selected={location === city}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="navbar-search">
          <div className="search-box">
            <Icon name="search" style={{ fontSize: 20, color: "#111827" }} />
            <input
              type="text"
              placeholder='Search for "Silk Dresses"'
              className="search-input"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          <button className="action-button">
            <Icon name="person" style={{ fontSize: 22, color: "#111827" }} />
            Login
          </button>
          <button className="action-button action-cart" onClick={() => setPage && setPage("cart")}>
            <Icon name="shopping_cart" style={{ fontSize: 18, color: "#111827" }} />
            Cart
            <span className="cart-badge">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
