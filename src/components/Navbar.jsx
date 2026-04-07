import { useState } from "react";
import Icon from "./Icon";

const Navbar = ({ cartCount = 2, setPage, hasAnnouncement }) => {
  const [isLocationOpen, setLocationOpen] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [location, setLocation] = useState("Select Location");
  const locations = ["Bengaluru", "Delhi", "Mumbai", "Hyderabad"];

  const detectLocation = () => {
    setIsDetecting(true);
    // Simulate geo-detection
    setTimeout(() => {
      setLocation("Bengaluru, IN");
      setIsDetecting(false);
      setLocationOpen(false);
    }, 1500);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      if (setPage) setPage("shop");
    }
  };

  return (
    <nav className="navbar" style={{ top: hasAnnouncement ? "36px" : "0" }}>
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
            <Icon name="location_on" style={{ fontSize: 18, color: "var(--accent)" }} />
            {isLocationOpen ? "Choose Location" : location}
            <Icon name="keyboard_arrow_down" style={{ fontSize: 20 }} />
          </button>
          {isLocationOpen && (
            <div className="location-menu" role="listbox">
              <div className="location-menu-header">Select Boutique Area</div>

              <button
                className="location-detect-btn"
                onClick={detectLocation}
                disabled={isDetecting}
              >
                <Icon name={isDetecting ? "sync" : "my_location"} className={isDetecting ? "spin-icon" : ""} />
                {isDetecting ? "Detecting..." : "Detect Current Location"}
              </button>

              <div className="location-divider" />

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
                  <Icon name="near_me" style={{ fontSize: 14, opacity: 0.5 }} />
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          <button className="action-button" onClick={() => setPage && setPage("login")}>
            <Icon name="person" style={{ fontSize: 22, color: "#111827" }} />
            Login
          </button>
          <button className="action-button" onClick={() => setPage && setPage("wishlist")}>
            <Icon name="favorite_border" style={{ fontSize: 22, color: "#111827" }} />
            Wishlist
          </button>
          <button className="action-button action-cart" onClick={() => setPage && setPage("cart")}>
            <Icon name="shopping_cart" style={{ fontSize: 22, color: "#111827" }} />
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
