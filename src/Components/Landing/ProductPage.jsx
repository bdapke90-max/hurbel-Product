import React, { useState, useMemo } from 'react';
import { Card, Button, Row, Col, Input, Tag, Empty, message } from 'antd';
import { ShoppingCartOutlined, CheckOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useCart } from '../Context/CartContext';

import './ProductPage.css';
import ProductImg1 from './Image/product1.jpg';
import ProductImg2 from './Image/product2.jpg';
import ProductImg3 from './Image/product3.jpg';
import ProductImg4 from './Image/product4.jpeg';
import ProductImg5 from './Image/product5.jpg';
import ProductImg6 from './Image/product6.jpg';
import ProductImg7 from './Image/product7.jpg';

const products = [
  { id: 1, name: 'Herbal Face Cream', price: 299, image: ProductImg1, category: 'Skincare', rating: 4.8, reviews: 128 },
  { id: 2, name: 'Aloe Vera Gel', price: 199, image: ProductImg2, category: 'Skincare', rating: 4.9, reviews: 214 },
  { id: 3, name: 'Neem Face Wash', price: 149, image: ProductImg3, category: 'Skincare', rating: 4.6, reviews: 87 },
  { id: 4, name: 'Herbal Shampoo', price: 349, image: ProductImg4, category: 'Hair Care', rating: 4.7, reviews: 163 },
  { id: 5, name: 'Green Tea Powder', price: 249, image: ProductImg5, category: 'Wellness', rating: 4.8, reviews: 96 },
  { id: 6, name: 'Herbal Hair Oil', price: 399, image: ProductImg6, category: 'Hair Care', rating: 4.9, reviews: 201 },
  { id: 7, name: 'Turmeric Soap', price: 99, image: ProductImg7, category: 'Skincare', rating: 4.5, reviews: 74 },
  { id: 8, name: 'Rose Water', price: 129, image: ProductImg1, category: 'Skincare', rating: 4.7, reviews: 112 },
  { id: 9, name: 'Herbal Capsules', price: 499, image: ProductImg2, category: 'Wellness', rating: 4.8, reviews: 45 },
  { id: 10, name: 'Organic Honey', price: 259, image: ProductImg3, category: 'Wellness', rating: 4.9, reviews: 189 },
  { id: 11, name: 'Ashwagandha Oil', price: 359, image: ProductImg4, category: 'Wellness', rating: 4.6, reviews: 67 },
  { id: 12, name: 'Herbal Conditioner', price: 279, image: ProductImg5, category: 'Hair Care', rating: 4.7, reviews: 88 },
];

const CATEGORIES = ['All', ...new Set(products.map(p => p.category))];
const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
];

function StarRating({ value }) {
  return (
    <div className="star-row">
      {'★'.repeat(Math.round(value))}{'☆'.repeat(5 - Math.round(value))}
      <span className="rating-val">{value}</span>
    </div>
  );
}

function ProductPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');
  const [addedIds, setAddedIds] = useState(new Set());
  const { addItem } = useCart();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || p.category === category;
      return matchSearch && matchCat;
    });
    if (sort === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, sort]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addItem(product);
    setAddedIds(prev => new Set(prev).add(product.id));
    message.success({ content: `${product.name} added to cart!`, icon: '🌿' });
    setTimeout(() => {
      setAddedIds(prev => { const s = new Set(prev); s.delete(product.id); return s; });
    }, 1500);
  };

  return (
    <div className="product-page">
      {/* Search & Filter Bar */}
      <div className="filter-bar">
        <div className="search-wrap">
          <FaSearch className="search-icon" />
          <Input
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            allowClear
          />
        </div>
        <div className="sort-wrap">
          <FaFilter className="filter-icon" />
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="category-pills">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`pill ${category === cat ? 'pill-active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-header">
        <h1 className="page-title">Our Herbal Products</h1>
        <span className="results-count">{filtered.length} products</span>
      </div>

      {filtered.length === 0 ? (
        <Empty description="No products found" style={{ margin: '60px 0' }} />
      ) : (
        <Row gutter={[24, 28]}>
          {filtered.map(product => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <div className="product-card" onClick={() => navigate('/categories', { state: [product] })}>
                <div className="product-img-wrap">
                  <img alt={product.name} src={product.image} className="product-img" />
                  <div className="product-badge">{product.category}</div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <StarRating value={product.rating} />
                  <div className="reviews-count">{product.reviews} reviews</div>
                  <div className="product-footer">
                    <span className="price">₹{product.price}</span>
                    <Button
                      type="primary"
                      icon={addedIds.has(product.id) ? <CheckOutlined /> : <ShoppingCartOutlined />}
                      className={`add-btn ${addedIds.has(product.id) ? 'added' : ''}`}
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      {addedIds.has(product.id) ? 'Added' : 'Add'}
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default ProductPage;





