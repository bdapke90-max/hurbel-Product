import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaLeaf, FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Dropdown, message } from 'antd';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { user, logout, isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    message.success('Logged out successfully');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const userMenuItems = [
    {
      key: 'dashboard',
      label: <span onClick={() => navigate('/dashboard')}>Dashboard</span>,
      icon: <FaUserCircle />,
    },
    {
      key: 'logout',
      label: <span onClick={handleLogout}>Logout</span>,
      icon: <FaSignOutAlt />,
      danger: true,
    },
  ];

  return (
    <nav className={`header ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="header-logo">
        <div className="logo-leaf">
          <FaLeaf />
        </div>
        <span className="logo-text">Herbal<span className="logo-accent">Store</span></span>
      </Link>

      <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to="/products" className={isActive('/products') ? 'active' : ''}>Products</Link>
        </li>
        <li>
          <Link to="/cart" className={`cart-link ${isActive('/cart') ? 'active' : ''}`}>
            <Badge count={totalItems} size="small" color="#2e7d32">
              <ShoppingCartOutlined className="cart-icon" />
            </Badge>
            <span>Cart</span>
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <button className="user-btn">
                <FaUserCircle />
                <span>{user?.username}</span>
              </button>
            </Dropdown>
          ) : (
            <Link to="/login" className={`login-link ${isActive('/login') ? 'active' : ''}`}>
              Login
            </Link>
          )}
        </li>
      </ul>

      <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
}

export default Header;
