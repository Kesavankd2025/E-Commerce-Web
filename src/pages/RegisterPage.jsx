import { useState } from "react";
import Icon from "../components/Icon";

const RegisterPage = ({ setPage }) => {
  return (
    <main className="auth-main">
      <div className="auth-container">
        {/* Visual Panel */}
        <div className="auth-visual">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-_kpriEr-SoOeDbOZ1x8qqixigub7MUTHKScn77QGJJhB2muLAUYRB3NGpCER2XxBc6HQ5lvIKs3sKhZGwEM4s-7dwIZae7SIClIvLenF7FRJQmshtOFaiWmV9kCv95_IglCb0Ww7vLz0Ur2WOAXF-lUetm2Pjm0tgbSDquS-7q1CYhDsoLUIIZb92kp1-Ix9DzQ0gAt4r5UAup6KHpcVCSdluFZ1H7I99NlALt9_tmDeGHysPeUhp6WXtRWu_EdkF0u9WAC6iSc"
            alt="Atelier"
            className="auth-visual-image"
          />
          <div className="auth-visual-overlay">
            <div className="auth-visual-content">
              <span className="auth-kicker">Collection Joiner</span>
              <h2 className="auth-visual-title">The IRIS Circle</h2>
              <p className="auth-visual-text">
                Register to receive early access to seasonal edits and private collection previews.
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
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Begin your journey with IRIS today.</p>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="auth-input-group">
              <label className="auth-label">Full Name</label>
              <div className="auth-input-wrap">
                <Icon name="person_outline" className="auth-input-icon" />
                <input
                  type="text"
                  className="auth-input"
                  placeholder="Evelyn Thorne"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrap">
                <Icon name="mail_outline" className="auth-input-icon" />
                <input
                  type="email"
                  className="auth-input"
                  placeholder="evelyn@iris.com"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Choose Password</label>
              <div className="auth-input-wrap">
                <Icon name="lock_outline" className="auth-input-icon" />
                <input
                  type="password"
                  className="auth-input"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="auth-terms">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">I agree to the <a href="#">Terms of Discovery</a> and <a href="#">Privacy Policy</a></label>
            </div>

            <button className="auth-submit-btn">Create Account</button>

            <div className="auth-divider">
              <span>Or join with</span>
            </div>

            <div className="auth-social">
              <button className="social-btn">
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" />
              </button>
              <button className="social-btn apple">
                <Icon name="apple" style={{ color: "#ffffff" }} />
              </button>
            </div>

            <p className="auth-footer">
              Already a member?{" "}
              <button
                type="button"
                className="auth-toggle-btn"
                onClick={() => setPage("login")}
              >
                Sign In
              </button>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
