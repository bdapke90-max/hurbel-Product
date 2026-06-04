import React from 'react';
import { Button, Empty, InputNumber, message, Divider } from 'antd';
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf, FaLock, FaTruck } from 'react-icons/fa';
import { useCart } from '../Context/CartContext';
import './Cart.css';

function Cart() {
  const { items, removeItem, updateQty, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    message.success({ content: '🌿 Order placed successfully! Thank you.', duration: 3 });
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span className="empty-desc">Your cart is empty — explore our herbal products!</span>
          }
        >
          <Link to="/products">
            <Button type="primary" size="large" icon={<ShoppingOutlined />} className="shop-btn">
              Shop Now
            </Button>
          </Link>
        </Empty>
      </div>
    );
  }

  const shipping = totalPrice >= 999 ? 0 : 50;
  const tax = Math.round(totalPrice * 0.05);

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <span className="cart-count">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-img" />
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price-unit">₹{item.price} each</p>
              </div>
              <div className="item-controls">
                <InputNumber
                  min={1}
                  max={20}
                  value={item.qty}
                  onChange={(val) => updateQty(item.id, val)}
                  className="qty-input"
                />
                <span className="item-subtotal">₹{item.price * item.qty}</span>
                <Button
                  danger
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className={shipping === 0 ? 'free-tag' : ''}>
              {shipping === 0 ? 'FREE' : `₹${shipping}`}
            </span>
          </div>
          <div className="summary-row">
            <span>Tax (5%)</span>
            <span>₹{tax}</span>
          </div>
          <Divider style={{ margin: '14px 0' }} />
          <div className="summary-total">
            <span>Total</span>
            <span>₹{totalPrice + shipping + tax}</span>
          </div>

          {shipping > 0 && (
            <div className="free-shipping-note">
              <FaTruck /> Add ₹{999 - totalPrice} more for FREE shipping!
            </div>
          )}

          <Button
            type="primary"
            block
            size="large"
            className="checkout-btn"
            onClick={handleCheckout}
            icon={<FaLock style={{ marginRight: 6 }} />}
          >
            Secure Checkout
          </Button>

          <div className="trust-badges">
            <span><FaLeaf /> 100% Natural</span>
            <span><FaLock /> Secure Payment</span>
            <span><FaTruck /> Fast Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
