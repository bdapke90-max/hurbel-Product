import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';
import './Auth.css';

function Register() {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    if (values.password !== values.confirm) {
      message.error('Passwords do not match');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    register(values.username, values.password);
    message.success('Account created! Please sign in. 🌿');
    navigate('/login');
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-leaf-icon"><FaLeaf /></div>
          <h1>HerbalStore</h1>
        </div>

        <h2 className="auth-title">Create Account</h2>
        <p className="auth-sub">Join our natural wellness community</p>

        <Form layout="vertical" onFinish={handleRegister} requiredMark={false}>
          <Form.Item name="username" rules={[
            { required: true, message: 'Please enter username' },
            { min: 3, message: 'Minimum 3 characters' }
          ]}>
            <Input
              prefix={<UserOutlined className="input-prefix" />}
              placeholder="Username"
              size="large"
              className="auth-input"
            />
          </Form.Item>
          <Form.Item name="password" rules={[
            { required: true, message: 'Please enter password' },
            { min: 4, message: 'Minimum 4 characters' }
          ]}>
            <Input.Password
              prefix={<LockOutlined className="input-prefix" />}
              placeholder="Password"
              size="large"
              className="auth-input"
            />
          </Form.Item>
          <Form.Item name="confirm" rules={[{ required: true, message: 'Please confirm password' }]}>
            <Input.Password
              prefix={<LockOutlined className="input-prefix" />}
              placeholder="Confirm Password"
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
            {loading ? 'Creating...' : 'Create Account'}
          </Button>
        </Form>

        <div className="auth-footer" style={{ marginTop: 20 }}>
          <span>Already have an account?</span>
          <Link to="/login" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
