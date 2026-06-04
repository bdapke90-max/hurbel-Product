import React, { useState, useEffect } from 'react';  // ← React.Fragment ke liye React import hona chahiye
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FaLeaf, FaStar, FaShieldAlt, FaTruck } from 'react-icons/fa';
import { ShoppingOutlined } from '@ant-design/icons';
import IMG1 from './Image/img1.jpg';
import IMG2 from './Image/img2.jpg';
import IMG3 from './Image/img3.jpg';
import './HeroSection.css';

const slides = [
  { 
    src: IMG1, 
    tag: 'Pure & Organic', 
    headline: 'Harness the Power\nof Nature', 
    sub: 'Premium herbal products crafted from 100% natural ingredients' 
  },
  { 
    src: IMG2, 
    tag: 'Ayurvedic Formula', 
    headline: 'Ancient Wisdom,\nModern Science', 
    sub: 'Time-tested herbal remedies blended with cutting-edge extraction' 
  },
  { 
    src: IMG3, 
    tag: 'Zero Chemicals', 
    headline: 'Nourish Your Body\nThe Natural Way', 
    sub: 'From the heart of nature, straight to your doorstep' 
  },
];

const stats = [
  { icon: <FaLeaf />, value: '200+', label: 'Products' },
  { icon: <FaStar />, value: '4.9★', label: 'Avg Rating' },
  { icon: <FaShieldAlt />, value: '100%', label: 'Organic' },
  { icon: <FaTruck />, value: 'Free', label: 'Delivery ₹999+' },
];

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextIndex, setNextIndex] = useState(null);  // ← NEW: Next slide track karne ke liye

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const changeSlide = () => {
    if (isAnimating) return;
    
    const next = (currentIndex + 1) % slides.length;
    setNextIndex(next);  // Next image set karo
    setIsAnimating(true);
    
    // Zoom out animation complete hone ke baad
    setTimeout(() => {
      setCurrentIndex(next);
      setNextIndex(null);
      setIsAnimating(false);
    }, 600);  // CSS animation duration ke equal
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    
    setNextIndex(index);
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setNextIndex(null);
      setIsAnimating(false);
    }, 600);
  };

  const nextSlide = () => {
    changeSlide();
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    const prev = (currentIndex - 1 + slides.length) % slides.length;
    setNextIndex(prev);
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex(prev);
      setNextIndex(null);
      setIsAnimating(false);
    }, 600);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="hero-section">
      <div className="hero-slider-container">
        {/* Background Image with Zoom Effect */}
        <div className="hero-image-wrapper">
          {/* Current Image - Zoom out ho rahi hai */}
          <img 
            src={currentSlide.src} 
            alt={currentSlide.tag} 
            className={`hero-bg-img ${isAnimating ? 'zoom-out-effect' : ''}`}
          />
          
          {/* Next Image - Zoom in ho rahi hai */}
          {nextIndex !== null && (
            <img 
              src={slides[nextIndex].src} 
              alt={slides[nextIndex].tag} 
              className="hero-bg-img zoom-in-effect"
            />
          )}
          
          <div className="hero-overlay" />
        </div>

        {/* Content with Fade Effect */}
        <div className={`hero-slide-content ${isAnimating ? 'content-fade-out' : 'content-fade-in'}`}>
          <span className="hero-tag">
            <FaLeaf style={{ marginRight: 6 }} />
            {currentSlide.tag}
          </span>
          <h1 className="hero-headline">
            {currentSlide.headline.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < currentSlide.headline.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="hero-sub">{currentSlide.sub}</p>
          <div className="hero-ctas">
            <Link to="/products">
              <Button type="primary" size="large" icon={<ShoppingOutlined />} className="hero-btn-primary">
                Shop Now
              </Button>
            </Link>
            <Link to="/products">
              <Button size="large" className="hero-btn-ghost">Explore All</Button>
            </Link>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="hero-arrow hero-arrow-left" onClick={prevSlide}>
          ‹
        </button>
        <button className="hero-arrow hero-arrow-right" onClick={nextSlide}>
          ›
        </button>

        {/* Custom Dots Indicator */}
        <div className="hero-dots-custom">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`hero-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="hero-stats">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon">{s.icon}</div>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HeroSection;