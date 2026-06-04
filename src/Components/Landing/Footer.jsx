import React, { useState } from 'react';
import { Row, Col, Input, Button, message } from 'antd';
import { FaFacebook, FaInstagram, FaTwitter, FaLeaf, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) {
      message.error('Please enter a valid email');
      return;
    }
    message.success('🌿 Subscribed! Thank you for joining us.');
    setEmail('');
  };

  return (
    <footer className="footer">
      {/* Newsletter Banner */}
      <div className="newsletter-bar">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <FaLeaf className="nl-icon" />
            <div>
              <h3>Join the Herbal Community</h3>
              <p>Get exclusive deals, wellness tips & early access to new products</p>
            </div>
          </div>
          <div className="newsletter-form">
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="nl-input"
              onPressEnter={handleSubscribe}
            />
            <Button type="primary" className="nl-btn" onClick={handleSubscribe}>
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <Row gutter={[40, 40]}>
          {/* Brand */}
          <Col xs={24} md={8}>
            <div className="footer-brand">
              <div className="footer-logo-icon"><FaLeaf /></div>
              <span className="footer-logo-text">HerbalStore</span>
            </div>
            <p className="footer-desc">
              Premium herbal products crafted from 100% organic, sustainably sourced ingredients.
              Bringing nature's wisdom to your daily wellness routine since 2020.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={12} md={5}>
            <h4 className="footer-heading">Shop</h4>
            <ul className="footer-links">
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products">Skincare</Link></li>
              <li><Link to="/products">Hair Care</Link></li>
              <li><Link to="/products">Wellness</Link></li>
              <li><Link to="/products">New Arrivals</Link></li>
            </ul>
          </Col>

          <Col xs={12} md={5}>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Our Story</Link></li>
              <li><Link to="/">Sustainability</Link></li>
              <li><Link to="/">Blog</Link></li>
              <li><Link to="/">Careers</Link></li>
            </ul>
          </Col>

          {/* Contact */}
          <Col xs={24} md={6}>
            <h4 className="footer-heading">Get in Touch</h4>
            <div className="footer-contact">
              <p>📧 support@herbalstore.com</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 Bhopal, Madhya Pradesh, India</p>
              <p>🕐 Mon–Sat: 9 AM – 6 PM</p>
            </div>
          </Col>
        </Row>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} HerbalStore. All rights reserved.</span>
        <div className="footer-bottom-links">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
