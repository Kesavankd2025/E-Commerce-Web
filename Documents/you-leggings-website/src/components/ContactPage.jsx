import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { showToast } from './Toast.jsx';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', message: '' });

  function handleSubmit(e) {
    e.preventDefault();
    showToast('Message sent successfully!', 'success');
    setForm({ name: '', mobile: '', email: '', message: '' });
  }

  return (
    <section className="section page-view contact-page" id="contact-page" style={{ display: 'block' }}>
      <div className="page-main contact-main" style={{ backgroundImage: 'none', backgroundColor: '#9f9f9f' }}>
        <div className="hero-overlay"></div>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/images/bg-less/_DSC8937-Photoroom.png")', backgroundSize: 'auto 110%', backgroundPosition: 'right 100% top 50%', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)', zIndex: 2 }}></div>
        <div className="container page-main-content">
          <span className="hero-subtitle">Reach Us</span>
          <h1 className="hero-title">Contact <br />You Leggings</h1>
        </div>
      </div>

      <div className="container page-body">
        <div className="contact-grid">
          <div className="contact-panel">
            <span className="section-subtitle">Get in Touch</span>
            <h2 className="section-title">We're delighted to assist you</h2>
            <p className="section-desc">We're delighted to assist you with any inquiries you may have about our exquisite collections of clothing and accessories. Our commitment is to provide exceptional service and ensure your experience with You Leggings is enjoyable. Please reach out to us if you have any questions or need assistance. We look forward to hearing from you!</p>
            <ul className="contact-list">
              <li><strong>Support Hours:</strong> Monday to Saturday, 9:30 AM - 7:00 PM</li>
              <li><strong>Response Time:</strong> We usually respond within 24 hours</li>
              <li><strong>Order Help:</strong> Share your order number for faster support</li>
              <li><strong>Bulk Enquiries:</strong> Retail and wholesale requests are welcome</li>
            </ul>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" type="text" placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <label htmlFor="contact-mobile">Mobile Number</label>
            <input id="contact-mobile" type="tel" placeholder="+91 98765 43210" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
            <label htmlFor="contact-email">Email address</label>
            <input id="contact-email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" rows="5" placeholder="Write your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
            <button type="submit" className="btn">Send Message</button>
          </form>
        </div>

        <div className="contact-details-block">
          <article className="contact-detail-card">
            <div className="contact-detail-icon" aria-hidden="true"><Mail size={20} /></div>
            <h3>Email</h3>
            <p>youleggings@gmail.com</p>
          </article>
          <article className="contact-detail-card">
            <div className="contact-detail-icon" aria-hidden="true"><MapPin size={20} /></div>
            <h3>Address</h3>
            <p>5/4, Surya Nagar, 2nd Street,<br />Bridgeway Colony Extn,<br />Tirupur - 641607</p>
          </article>
          <article className="contact-detail-card">
            <div className="contact-detail-icon" aria-hidden="true"><Phone size={20} /></div>
            <h3>Phone</h3>
            <p>+91 740143 24967</p>
          </article>
        </div>
      </div>
    </section>
  );
}
