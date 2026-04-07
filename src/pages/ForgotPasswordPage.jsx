import { useState } from "react";
import Icon from "../components/Icon";

const ForgotPasswordPage = ({ setPage }) => {
  const [emailSent, setEmailSent] = useState(false);

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
              <span className="auth-kicker">Account Recovery</span>
              <h2 className="auth-visual-title">Recovery Link</h2>
              <p className="auth-visual-text">
                Securely reset your password and return to your curated IRIS collections in just a few steps.
              </p>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="auth-form-panel">
          <div className="auth-form-header">
            <button
              className="auth-back-btn"
              onClick={() => setPage("login")}
            >
              <Icon name="arrow_back" />
              <span>Back to Sign In</span>
            </button>
            <h1 className="auth-title">Forgot Password?</h1>
            <p className="auth-subtitle">
              {emailSent ? "Check your email inbox for a recovery link." : "Enter your email to receive an account recovery link."}
            </p>
          </div>

          {!emailSent ? (
            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); setEmailSent(true); }}>
              <div className="auth-input-group">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrap">
                  <Icon name="mail_outline" className="auth-input-icon" />
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="evelyn@iris.com"
                    required
                  />
                </div>
              </div>

              <button className="auth-submit-btn">Send Recovery Link</button>

              <p className="auth-footer" style={{ marginTop: "32px", textAlign: "center", color: "#6b7280" }}>
                Need more help? <a href="#" style={{ color: "var(--accent)", fontWeight: "600" }}>Contact Atelier Support</a>
              </p>
            </form>
          ) : (
            <div className="auth-success-state">
              <div className="success-icon-wrap">
                <Icon name="mark_email_read" style={{ fontSize: "64px", color: "var(--accent)" }} />
              </div>
              <h2 style={{ fontSize: "24px", color: "#1a1a1a", marginBottom: "16px" }}>Email Dispatched</h2>
              <p style={{ color: "#5e5f62", marginBottom: "40px", lineHeight: "1.6" }}>
                We've sent a recovery link to your email. Please check your inbox (and spam folder) to reset your password.
              </p>
              <button 
                className="auth-submit-btn" 
                onClick={() => setPage("login")}
                style={{ background: "#f3f4f6", color: "#111827" }}
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
