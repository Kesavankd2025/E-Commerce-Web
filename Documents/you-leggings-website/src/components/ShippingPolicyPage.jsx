import React from 'react';

export default function ShippingPolicyPage() {
  return (
    <section className="section page-view shipping-page" id="shipping-page" style={{ display: 'block' }}>
      <div className="page-main" style={{ backgroundImage: 'none', backgroundColor: '#fafafa', borderBottom: '1px solid #eee', padding: '100px 0 60px' }}>
        <div className="container page-main-content text-center">
          <span className="hero-subtitle">Support</span>
          <h1 className="hero-title" style={{ fontSize: '3rem', color: '#1a1a1a' }}>Shipping Policy</h1>
          <p style={{ marginTop: '15px', color: '#666' }}>Learn about our shipping rates, methods, and delivery timelines.</p>
        </div>
      </div>

      <div className="container page-body" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', lineHeight: '1.8', color: '#444' }}>
        
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>1. Shipping Locations</h3>
        <p>We offer reliable shipping services to most locations across India. Whether you're in a metropolitan city or a smaller town, we strive to bring You Leggings right to your doorstep.</p>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>2. Processing Time</h3>
        <p>Orders are typically processed and prepared for shipment within 1-2 business days (excluding Sundays and public holidays) after receiving your order confirmation email.</p>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>3. Delivery Timelines</h3>
        <ul style={{ paddingLeft: '20px', marginBottom: '10px' }}>
          <li style={{ marginBottom: '5px' }}><strong>Metro Cities:</strong> 3-5 business days.</li>
          <li style={{ marginBottom: '5px' }}><strong>Rest of India:</strong> 5-7 business days.</li>
        </ul>
        <p>Please note that delivery times are estimates and may vary due to external factors like weather conditions, courier delays, or peak seasons.</p>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>4. Shipping Charges</h3>
        <p>Shipping charges for your order will be calculated and displayed at checkout. We may offer free shipping on orders above a certain value as part of ongoing promotions.</p>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>5. Order Tracking</h3>
        <p>Once your order has shipped, you will receive an email notification with a tracking number that you can use to check its status. Tracking information may take up to 24 hours to become active.</p>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>6. Returns and Exchanges</h3>
        <p>We want you to love your leggings. If you receive a damaged or incorrect item, please contact us within 7 days of delivery. For more details, please refer to our full Returns Policy.</p>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '15px', marginTop: '30px' }}>7. Contact Information</h3>
        <p>If you have any questions about your shipment, please reach out to us at support@youleggings.com.</p>
        
      </div>
    </section>
  );
}
