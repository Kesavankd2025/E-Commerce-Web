import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <section className="section page-view privacy-page" id="privacy-page" style={{ display: 'block' }}>
      <div className="page-main" style={{ backgroundImage: 'none', backgroundColor: '#fafafa', borderBottom: '1px solid #eee', padding: '100px 0 60px' }}>
        <div className="container page-main-content text-center">
          <span className="hero-subtitle">Legal</span>
          <h1 className="hero-title" style={{ fontSize: '3rem', color: '#1a1a1a' }}>Privacy Policy</h1>
          <p style={{ marginTop: '15px', color: '#666' }}>Your privacy is important to us. Learn how we handle your data.</p>
        </div>
      </div>

      <div className="container page-body" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', lineHeight: '1.8', color: '#444' }}>
        
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>1. Information We Collect</h3>
        <p>At You Leggings, we collect information that you provide directly to us. This includes your name, email address, shipping address, billing address, and payment information when you make a purchase or create an account. We also collect data about your interactions with our website through cookies and similar technologies.</p>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>2. How We Use Your Information</h3>
        <p>We use the information we collect to:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
          <li style={{ marginBottom: '10px' }}>Process and fulfill your orders, including sending emails to confirm your order status and shipment.</li>
          <li style={{ marginBottom: '10px' }}>Communicate with you about products, services, offers, and promotions.</li>
          <li style={{ marginBottom: '10px' }}>Improve our website, products, and overall customer experience.</li>
          <li style={{ marginBottom: '10px' }}>Protect against, identify, and prevent fraud and other unlawful activity.</li>
        </ul>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>3. Information Sharing and Disclosure</h3>
        <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>4. Data Security</h3>
        <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.</p>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>5. Cookies and Similar Technologies</h3>
        <p>We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits, and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>6. Changes to Our Privacy Policy</h3>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>7. Contact Us</h3>
        <p>If there are any questions regarding this privacy policy, you may contact us using our contact form or via email at support@youleggings.com.</p>
        
      </div>
    </section>
  );
}
