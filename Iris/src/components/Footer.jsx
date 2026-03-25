import Icon from "./Icon";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <span className="footer-logo">Velora</span>
          <p className="footer-text">
            Curating the finest essential pieces for your lifestyle and space since 2024.
          </p>
          <div className="footer-social">
            {["public", "alternate_email"].map((icon) => (
              <a key={icon} href="#" className="footer-social-link">
                <Icon name={icon} style={{ fontSize: "18px" }} />
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="footer-title">Shop</h4>
          <ul className="footer-links">
            {["Furniture", "Lighting", "Textiles", "Ceramics"].map((item) => (
              <li key={item}>
                <a href="#" className="footer-link">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Atelier */}
        <div>
          <h4 className="footer-title">Atelier</h4>
          <ul className="footer-links">
            {["Our Story", "Journal", "Sustainability", "Contact"].map((item) => (
              <li key={item}>
                <a href="#" className="footer-link">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="footer-title">Newsletter</h4>
          <p className="footer-news">Join for updates and new releases.</p>
          <div className="footer-form">
            <input type="email" placeholder="Email" className="footer-input" />
            <button className="footer-submit">
              <Icon name="arrow_forward" style={{ fontSize: "18px" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span>(c) 2024 Velora. All rights reserved.</span>
        <div className="footer-bottom-links">
          {["Privacy Policy", "Terms of Service"].map((l) => (
            <a key={l} href="#" className="footer-bottom-link">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
