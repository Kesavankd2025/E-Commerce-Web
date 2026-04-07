import { useState } from "react";
import Icon from "../components/Icon";

const LoginPage = ({ setPage, onLogin }) => {


  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin({ 
        name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1), 
        email: email || "connoisseur@iris.com" 
      });
    }
    setPage("profile");
  };

  return (
    <main className="auth-main">
      <div className="auth-container">
        {/* Visual Panel */}
        <div className="auth-visual">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJF8R1nBq53sEcgOHcr549ujX9f0nuqk5-DXWtl6Z9vx-xgwFM7D1QU_4H_KOIn0IR0VZEXI3o6qGBzoqTpOpcvUMgFEn8pTCrf5QKg0nRq6Ads6wUImeBhiMqP9eiofqLmdq7BcjiXhviSjM9ofUlhi7BONL-RSWXaWGPVEkKOI6MsLC_y1Mj_DwZhhnH2MdZK1xdKG4w10swphCF3OMCufGHcOIajATKF_mRWDgXG4rS1PuYfxEu4hBlxDAgKU7V848sYH1Xsxs"
            alt="Atelier"
            className="auth-visual-image"
          />
          <div className="auth-visual-overlay">
            <div className="auth-visual-content">
              <span className="auth-kicker">Est. 2024</span>
              <h2 className="auth-visual-title">The Ethereal Atelier</h2>
              <p className="auth-visual-text">
                Your journey through curated luxury begins here. Join our circle of connoisseurs.
              </p>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="auth-form-panel">
          <div className="auth-form-header">
            <button
              className="auth-back-btn"
              onClick={() => setPage("home")}
            >
              <Icon name="arrow_back" />
              <span>Boutique</span>
            </button>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to access your curated collections.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Name field removed (now in RegisterPage) */}

            <div className="auth-input-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrap">
                <Icon name="mail_outline" className="auth-input-icon" />
                <input
                  type="email"
                  className="auth-input"
                  placeholder="evelyn@iris.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <div className="auth-label-row">
                <label className="auth-label">Password</label>
                <button 
                  type="button" 
                  className="auth-forgot"
                  onClick={() => setPage("forgot")}
                >
                  Forgot?
                </button>
              </div>
              <div className="auth-input-wrap">
                <Icon name="lock_outline" className="auth-input-icon" />
                <input
                  type="password"
                  className="auth-input"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="auth-submit-btn" 
            >
              Sign In
            </button>

            <div className="auth-divider">
              <span>Or join with</span>
            </div>

            <div className="auth-social-row">
              <button type="button" className="auth-social-btn">
                <img
                  src="https://www.google.com/favicon.ico"
                  className="auth-social-icon"
                  alt=""
                />
                <span>Google</span>
              </button>
              <button type="button" className="auth-social-btn">
                <Icon name="apple" className="auth-social-icon" />
                <span>Apple</span>
              </button>
            </div>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an account?{" "}
              <button
                className="auth-toggle-btn"
                onClick={() => setPage("register")}
              >
                Join now
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
