import React, { useState } from 'react';
import { Button, Form, Input, message, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';
import './Auth.css';

function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(values.username, values.password);
    if (result.success) {
      message.success(`Welcome back, ${values.username}! 🌿`);
      navigate(result.role === 'admin' ? '/dashboard' : '/');
    } else {
      message.error('Invalid credentials. Try admin / 123');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-leaf-icon"><FaLeaf /></div>
          <h1>HerbalStore</h1>
        </div>

        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Sign in to your account</p>

        <Form layout="vertical" onFinish={handleLogin} requiredMark={false}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please enter username' }]}>
            <Input
              prefix={<UserOutlined className="input-prefix" />}
              placeholder="Username"
              size="large"
              className="auth-input"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please enter password' }]}>
            <Input.Password
              prefix={<LockOutlined className="input-prefix" />}
              placeholder="Password"
              size="large"
              className="auth-input"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            className="auth-btn"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Form>

        <Divider style={{ margin: '20px 0' }}>
          <span style={{ fontSize: 12, color: '#aaa' }}>or</span>
        </Divider>

        <div className="auth-footer">
          <span>Don't have an account?</span>
          <Link to="/register" className="auth-link">Create Account</Link>
        </div>

        <div className="demo-hint">
          <span>Demo: <b>admin</b> / <b>123</b></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
