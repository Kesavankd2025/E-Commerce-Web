import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer section">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Social section */}
          <div className="footer-column footer-brand">
            <div className="footer-logo">
              <img src="/images/logo-new.png" alt="You Leggings Logo" />
            </div>
            <p className="footer-desc">
              Premium quality leggings designed for the modern woman. Experience the perfect fit that moves with you every day.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="Linkedin"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Explore section */}
          <div className="footer-column footer-explore">
            <h3 className="footer-title">EXPLORE</h3>
            <ul className="footer-links">
              <li><a href="?page=home">Home</a></li>
              <li><a href="?page=about">About Us</a></li>
              <li><a href="?page=shop">Shop Selection</a></li>
              <li><a href="?page=new-arrivals">New Arrivals</a></li>
              <li><a href="?page=blog">Blog</a></li>
            </ul>
          </div>

          {/* Support section */}
          <div className="footer-column footer-support">
            <h3 className="footer-title">SUPPORT</h3>
            <ul className="footer-links">
              <li><a href="?page=privacy-policy">Privacy Policy</a></li>
              <li><a href="?page=terms-conditions">Terms & Conditions</a></li>
              <li><a href="?page=shipping-policy">Shipping Policy</a></li>
              <li><a href="#">Help Center</a></li>
            </ul>
          </div>

          {/* Contact section */}
          <div className="footer-column footer-contact-col">
            <h3 className="footer-title">CONTACT US</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <MapPin size={18} className="contact-icon" />
                <span>5/4, Surya Nagar, 2nd Street,<br />Bridgeway Colony Extn,<br />Tirupur - 641607</span>
              </div>
              <div className="contact-item">
                <Phone size={18} className="contact-icon" />
                <span>+91 740143 2496</span>
              </div>
              <div className="contact-item">
                <Mail size={18} className="contact-icon" />
                <span>youleggings@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-flex">
            <p className="footer-copyright">&copy; 2026 You Leggings. All rights reserved.</p>
            <p className="footer-dev">Developed & Maintained by <a href="https://www.oceansoftwares.com/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: 'inherit', textDecoration: 'underline' }}>Ocean Softwares.</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
