import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaFlask, FaHandHoldingHeart, FaCertificate } from 'react-icons/fa';
import './FeaturedSection.css';

const features = [
  {
    icon: <FaLeaf />,
    title: '100% Organic',
    desc: 'Every ingredient is sourced from certified organic farms — no pesticides, ever.',
    color: '#e8f5e9',
    iconColor: '#2e7d32',
  },
  {
    icon: <FaFlask />,
    title: 'Lab Tested',
    desc: 'Each batch is independently tested for purity, potency, and safety before reaching you.',
    color: '#e3f2fd',
    iconColor: '#1565c0',
  },
  {
    icon: <FaHandHoldingHeart />,
    title: 'Ethically Made',
    desc: 'Cruelty-free, sustainably packaged, and made with care for people and planet.',
    color: '#fce4ec',
    iconColor: '#c62828',
  },
  {
    icon: <FaCertificate />,
    title: 'Certified Quality',
    desc: 'ISO-certified manufacturing with Ayurvedic and FDA compliant processes.',
    color: '#fff8e1',
    iconColor: '#e65100',
  },
];

const categories = [
  { name: 'Skincare', emoji: '🌸', count: '24 products' },
  { name: 'Hair Care', emoji: '💆', count: '18 products' },
  { name: 'Wellness', emoji: '🌿', count: '32 products' },
  { name: 'Aromatherapy', emoji: '🕯️', count: '12 products' },
];

function FeaturedSection() {
  return (
    <section className="featured-section">
      {/* Why Choose Us */}
      <div className="why-us">
        <div className="section-label">Why HerbalStore?</div>
        <h2 className="section-title">Nature's Best, <span className="title-accent">Guaranteed</span></h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon" style={{ background: f.color, color: f.iconColor }}>
                {f.icon}
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Strip */}
      <div className="category-strip">
        <h2 className="strip-title">Shop by Category</h2>
        <div className="strip-cards">
          {categories.map((cat, i) => (
            <Link to="/products" key={i} className="strip-card">
              <span className="strip-emoji">{cat.emoji}</span>
              <span className="strip-name">{cat.name}</span>
              <span className="strip-count">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;
