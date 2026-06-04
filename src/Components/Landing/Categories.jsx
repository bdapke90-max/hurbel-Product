import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Tag, message, Tabs, Rate } from 'antd';
import { ShoppingCartOutlined, ArrowLeftOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { FaLeaf, FaShieldAlt, FaTruck, FaUndo } from 'react-icons/fa';
import { useCart } from '../Context/CartContext';
import './Categories.css';

const benefits = {
  Skincare: ['Nourishes skin deeply', 'Free from parabens', 'Dermatologically tested', 'Suitable for all skin types'],
  'Hair Care': ['Strengthens hair roots', 'Reduces hair fall', 'Adds natural shine', 'No sulphates or silicones'],
  Wellness: ['Boosts immunity', 'All-natural ingredients', 'Non-GMO certified', 'Lab tested for purity'],
};

function Categories() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [wishlist, setWishlist] = useState(new Set());
  const [qty, setQty] = useState(1);

  const products = location.state || [];

  if (!products.length) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <p>No product selected.</p>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  const product = products[0];
  const productBenefits = benefits[product.category] || benefits['Wellness'];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    message.success({ content: `${product.name} ×${qty} added to cart! 🌿`, duration: 2 });
  };

  const toggleWishlist = () => {
    setWishlist(prev => {
      const s = new Set(prev);
      if (s.has(product.id)) { s.delete(product.id); message.info('Removed from wishlist'); }
      else { s.add(product.id); message.success('Added to wishlist ❤️'); }
      return s;
    });
  };

  return (
    <div className="category-page">
      <button className="back-btn" onClick={() => navigate('/products')}>
        <ArrowLeftOutlined /> Back to Products
      </button>

      <div className="product-detail">
        {/* Left: Image */}
        <div className="detail-img-wrap">
          <img src={product.image} alt={product.name} className="detail-img" />
          <button className="wishlist-btn" onClick={toggleWishlist}>
            {wishlist.has(product.id) ? <HeartFilled style={{ color: '#e53935' }} /> : <HeartOutlined />}
          </button>
          <div className="organic-badge"><FaLeaf /> Certified Organic</div>
        </div>

        {/* Right: Info */}
        <div className="detail-info">
          {product.category && <Tag color="green" className="cat-tag">{product.category}</Tag>}
          <h1 className="detail-name">{product.name}</h1>

          <div className="rating-row">
            <Rate disabled defaultValue={product.rating || 4.8} allowHalf style={{ fontSize: 16 }} />
            <span className="rating-text">{product.rating || 4.8} ({product.reviews || 128} reviews)</span>
          </div>

          <div className="detail-price">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{Math.round(product.price * 1.3)}</span>
            <Tag color="red" style={{ fontSize: 13, padding: '2px 10px' }}>
              {Math.round(((product.price * 1.3 - product.price) / (product.price * 1.3)) * 100)}% OFF
            </Tag>
          </div>

          <p className="detail-desc">
            Experience the power of nature with our premium <strong>{product.name}</strong>.
            Crafted from 100% organic herbs, this product is free from harmful chemicals, parabens,
            and artificial fragrances — suitable for daily use.
          </p>

          {/* Qty + CTA */}
          <div className="qty-row">
            <div className="qty-control">
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="qty-val">{qty}</span>
              <button className="qty-btn" onClick={() => setQty(q => Math.min(10, q + 1))}>+</button>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              className="detail-add-btn"
              onClick={handleAddToCart}
              block
            >
              Add to Cart — ₹{product.price * qty}
            </Button>
          </div>

          {/* Trust Icons */}
          <div className="trust-row">
            {[
              { icon: <FaTruck />, text: 'Free delivery ₹999+' },
              { icon: <FaUndo />, text: '7-day returns' },
              { icon: <FaShieldAlt />, text: 'Secure checkout' },
            ].map((t, i) => (
              <div key={i} className="trust-item">
                <span className="trust-icon">{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>

          {/* Tabs: Benefits, Usage, Ingredients */}
          <Tabs
            className="detail-tabs"
            items={[
              {
                key: 'benefits',
                label: 'Benefits',
                children: (
                  <ul className="benefits-list">
                    {productBenefits.map((b, i) => (
                      <li key={i}><FaLeaf className="benefit-icon" /> {b}</li>
                    ))}
                  </ul>
                ),
              },
              {
                key: 'usage',
                label: 'How to Use',
                children: (
                  <ol className="usage-list">
                    <li>Cleanse the area of application thoroughly</li>
                    <li>Apply a small amount and gently massage in circular motions</li>
                    <li>Leave for 10–15 minutes or as directed</li>
                    <li>Rinse with lukewarm water for best results</li>
                    <li>Use twice daily for optimal results</li>
                  </ol>
                ),
              },
              {
                key: 'ingredients',
                label: 'Ingredients',
                children: (
                  <p className="ingredients-text">
                    Aloe Vera Extract, Neem Oil, Turmeric Root Extract, Rose Hip Seed Oil,
                    Vitamin E, Green Tea Extract, Shea Butter, Jojoba Oil, Essential Oils blend,
                    Aqua (distilled water). Free from parabens, sulphates, and artificial colorants.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Categories;
