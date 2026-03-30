import React, { useState } from 'react';
import { showToast } from './Toast.jsx';

export default function LoginPage({ navigate }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'register'
  
  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  function handleSignIn(e) {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      showToast('Please enter both email and password.', 'error');
      return;
    }
    // Simulate login
    localStorage.setItem('userLoggedIn', 'true');
    sessionStorage.setItem('justLoggedIn', 'true');
    showToast('Login successful! Welcome back.', 'success');
    setTimeout(() => navigate(null), 1000);
  }

  function handleRegister(e) {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      showToast('Please fill in required fields.', 'error');
      return;
    }
    // Simulate register
    localStorage.setItem('userLoggedIn', 'true');
    sessionStorage.setItem('justLoggedIn', 'true');
    showToast('Registration successful! Welcome to You Leggings.', 'success');
    setTimeout(() => navigate(null), 1000);
  }

  return (
    <section className="section page-view login-new-page" style={{ backgroundColor: '#fafafa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      <div className="login-card-modern">
        
        {/* Logo */}
        <div className="login-logo-wrap">
          <img src="/images/logo-new.png" alt="You Leggings Logo" />
        </div>

        {/* Toggle Bar */}
        <div className="login-toggle-bar">
          <button 
            type="button"
            className={`toggle-btn ${mode === 'signin' ? 'active' : ''}`}
            onClick={() => setMode('signin')}
          >
            SIGN IN
          </button>
          <button 
            type="button"
            className={`toggle-btn ${mode === 'register' ? 'active' : ''}`}
            onClick={() => setMode('register')}
          >
            REGISTER
          </button>
        </div>

        {/* Header Texts */}
        <div className="login-header-text">
          <h2 className="login-title">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="login-subtitle">
            {mode === 'signin' ? 'Access your account and orders.' : 'Join us to enjoy premium leggings.'}
          </p>
        </div>

        {/* Forms */}
        {mode === 'signin' ? (
          <form className="login-form-modern" onSubmit={handleSignIn}>
            <div className="form-group-modern">
              <label>EMAIL ADDRESS</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                value={signInEmail} 
                onChange={e => setSignInEmail(e.target.value)} 
              />
            </div>
            <div className="form-group-modern">
              <label>PASSWORD</label>
              <input 
                type="password" 
                placeholder="********" 
                value={signInPassword} 
                onChange={e => setSignInPassword(e.target.value)} 
              />
            </div>
            <button type="submit" className="login-btn-dark">
              SIGN IN
            </button>
          </form>
        ) : (
          <form className="login-form-modern" onSubmit={handleRegister}>
            <div className="form-group-modern">
              <label>FULL NAME</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                value={regName} 
                onChange={e => setRegName(e.target.value)} 
              />
            </div>
            <div className="form-group-modern">
              <label>EMAIL ADDRESS</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                value={regEmail} 
                onChange={e => setRegEmail(e.target.value)} 
              />
            </div>
            <div className="form-group-modern">
              <label>PHONE NUMBER</label>
              <input 
                type="tel" 
                placeholder="+91 000 000 0000" 
                value={regPhone} 
                onChange={e => setRegPhone(e.target.value)} 
              />
            </div>
            <div className="form-group-modern">
              <label>PASSWORD</label>
              <input 
                type="password" 
                placeholder="********" 
                value={regPassword} 
                onChange={e => setRegPassword(e.target.value)} 
              />
            </div>
            <button type="submit" className="login-btn-dark">
              REGISTER
            </button>
          </form>
        )}

        {/* Footer Note */}
        <div className="login-footer-note">
          PREMIUM LEGGINGS SINCE 2024
        </div>
      </div>
    </section>
  );
}
