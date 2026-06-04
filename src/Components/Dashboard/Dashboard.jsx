// import React, { useState } from 'react';
// import {
//   Card, Row, Col, Button, Form, Input, InputNumber,
//   Table, Tag, message, Select, Statistic, Modal, Popconfirm
// } from 'antd';
// import {
//   PlusOutlined, DeleteOutlined, EditOutlined,
//   DashboardOutlined, ShoppingOutlined, UsergroupAddOutlined,
//   RiseOutlined, LogoutOutlined
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { FaLeaf, FaBox, FaChartLine, FaUsers, FaTruck } from 'react-icons/fa';
// import { useAuth } from '../Context/AuthContext';
// import './Dashboard.css';

// const CATEGORIES = ['Skincare', 'Hair Care', 'Wellness', 'Aromatherapy', 'Supplements'];

// const initProducts = [
//   { key: '1', id: 1, name: 'Herbal Face Cream', category: 'Skincare', price: 299, stock: 45, status: 'active' },
//   { key: '2', id: 2, name: 'Aloe Vera Gel', category: 'Skincare', price: 199, stock: 62, status: 'active' },
//   { key: '3', id: 3, name: 'Neem Face Wash', category: 'Skincare', price: 149, stock: 38, status: 'active' },
//   { key: '4', id: 4, name: 'Herbal Shampoo', category: 'Hair Care', price: 349, stock: 12, status: 'low' },
//   { key: '5', id: 5, name: 'Green Tea Powder', category: 'Wellness', price: 249, stock: 55, status: 'active' },
// ];

// const recentOrders = [
//   { id: '#ORD-001', customer: 'Priya S.', product: 'Aloe Vera Gel', amount: '₹199', status: 'Delivered' },
//   { id: '#ORD-002', customer: 'Rahul M.', product: 'Herbal Shampoo', amount: '₹349', status: 'Shipped' },
//   { id: '#ORD-003', customer: 'Sneha K.', product: 'Turmeric Soap', amount: '₹99', status: 'Processing' },
//   { id: '#ORD-004', customer: 'Amit P.', product: 'Organic Honey', amount: '₹259', status: 'Delivered' },
// ];

// const orderColumns = [
//   { title: 'Order ID', dataIndex: 'id', key: 'id', render: t => <span className="order-id">{t}</span> },
//   { title: 'Customer', dataIndex: 'customer', key: 'customer' },
//   { title: 'Product', dataIndex: 'product', key: 'product' },
//   { title: 'Amount', dataIndex: 'amount', key: 'amount', render: t => <strong style={{ color: '#2e7d32' }}>{t}</strong> },
//   {
//     title: 'Status', dataIndex: 'status', key: 'status',
//     render: s => <Tag color={s === 'Delivered' ? 'green' : s === 'Shipped' ? 'blue' : 'orange'}>{s}</Tag>
//   },
// ];

// function Dashboard() {
//   const [products, setProducts] = useState(initProducts);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [form] = Form.useForm();
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     message.success('Logged out successfully');
//     navigate('/');
//   };

//   const openAddModal = () => {
//     setEditingProduct(null);
//     form.resetFields();
//     setModalOpen(true);
//   };

//   const openEditModal = (record) => {
//     setEditingProduct(record);
//     form.setFieldsValue(record);
//     setModalOpen(true);
//   };

//   const handleSave = (values) => {
//     if (editingProduct) {
//       setProducts(prev => prev.map(p => p.key === editingProduct.key ? { ...p, ...values } : p));
//       message.success('Product updated!');
//     } else {
//       const newProduct = {
//         ...values,
//         key: String(Date.now()),
//         id: products.length + 1,
//         status: values.stock < 20 ? 'low' : 'active',
//       };
//       setProducts(prev => [...prev, newProduct]);
//       message.success('Product added! 🌿');
//     }
//     setModalOpen(false);
//   };

//   const handleDelete = (key) => {
//     setProducts(prev => prev.filter(p => p.key !== key));
//     message.success('Product removed');
//   };

//   const productColumns = [
//     { title: 'Name', dataIndex: 'name', key: 'name', render: t => <strong>{t}</strong> },
//     { title: 'Category', dataIndex: 'category', key: 'category', render: c => <Tag color="green">{c}</Tag> },
//     { title: 'Price', dataIndex: 'price', key: 'price', render: p => <span className="dash-price">₹{p}</span> },
//     {
//       title: 'Stock', dataIndex: 'stock', key: 'stock',
//       render: s => <Tag color={s < 20 ? 'red' : s < 30 ? 'orange' : 'green'}>{s} units</Tag>
//     },
//     {
//       title: 'Actions', key: 'actions',
//       render: (_, record) => (
//         <div style={{ display: 'flex', gap: 8 }}>
//           <Button size="small" icon={<EditOutlined />} onClick={() => openEditModal(record)}>Edit</Button>
//           <Popconfirm title="Delete this product?" onConfirm={() => handleDelete(record.key)} okText="Yes" cancelText="No">
//             <Button size="small" danger icon={<DeleteOutlined />}>Delete</Button>
//           </Popconfirm>
//         </div>
//       ),
//     },
//   ];

//   const totalRevenue = products.reduce((s, p) => s + p.price * p.stock, 0);

//   return (
//     <div className="dashboard">
//       {/* Sidebar */}
//       <div className="dash-sidebar">
//         <div className="dash-brand">
//           <FaLeaf />
//           <span>HerbalStore</span>
//         </div>
//         <nav className="dash-nav">
//           {[
//             { key: 'overview', icon: <DashboardOutlined />, label: 'Overview' },
//             { key: 'products', icon: <ShoppingOutlined />, label: 'Products' },
//             { key: 'orders', icon: <FaTruck />, label: 'Orders' },
//           ].map(item => (
//             <button
//               key={item.key}
//               className={`dash-nav-item ${activeTab === item.key ? 'active' : ''}`}
//               onClick={() => setActiveTab(item.key)}
//             >
//               {item.icon}
//               <span>{item.label}</span>
//             </button>
//           ))}
//         </nav>
//         <button className="dash-logout" onClick={handleLogout}>
//           <LogoutOutlined />
//           <span>Logout</span>
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="dash-main">
//         <div className="dash-topbar">
//           <div>
//             <h1 className="dash-page-title">
//               {activeTab === 'overview' && 'Dashboard Overview'}
//               {activeTab === 'products' && 'Product Management'}
//               {activeTab === 'orders' && 'Recent Orders'}
//             </h1>
//             <p className="dash-subtitle">Welcome back, <strong>{user?.username}</strong> 👋</p>
//           </div>
//         </div>

//         {/* OVERVIEW TAB */}
//         {activeTab === 'overview' && (
//           <>
//             <Row gutter={[20, 20]} style={{ marginBottom: 28 }}>
//               {[
//                 { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: <FaChartLine />, color: '#2e7d32', bg: '#e8f5e9' },
//                 { title: 'Total Products', value: products.length, icon: <FaBox />, color: '#1565c0', bg: '#e3f2fd' },
//                 { title: 'Total Orders', value: 47, icon: <FaTruck />, color: '#e65100', bg: '#fff3e0' },
//                 { title: 'Customers', value: 312, icon: <FaUsers />, color: '#6a1b9a', bg: '#f3e5f5' },
//               ].map((stat, i) => (
//                 <Col xs={24} sm={12} lg={6} key={i}>
//                   <div className="stat-tile">
//                     <div className="stat-tile-icon" style={{ background: stat.bg, color: stat.color }}>
//                       {stat.icon}
//                     </div>
//                     <div>
//                       <div className="stat-tile-value" style={{ color: stat.color }}>{stat.value}</div>
//                       <div className="stat-tile-label">{stat.title}</div>
//                     </div>
//                   </div>
//                 </Col>
//               ))}
//             </Row>

//             <Row gutter={[20, 20]}>
//               <Col xs={24} lg={16}>
//                 <div className="dash-card">
//                   <div className="dash-card-header">
//                     <h3>Recent Orders</h3>
//                     <Tag color="green">Live</Tag>
//                   </div>
//                   <Table
//                     dataSource={recentOrders}
//                     columns={orderColumns}
//                     pagination={false}
//                     size="small"
//                     rowKey="id"
//                   />
//                 </div>
//               </Col>
//               <Col xs={24} lg={8}>
//                 <div className="dash-card">
//                   <h3 className="dash-card-header-text">Low Stock Alert</h3>
//                   {products.filter(p => p.stock < 20).map(p => (
//                     <div key={p.key} className="low-stock-item">
//                       <span>{p.name}</span>
//                       <Tag color="red">{p.stock} left</Tag>
//                     </div>
//                   ))}
//                   {products.filter(p => p.stock < 20).length === 0 && (
//                     <p style={{ color: '#aaa', fontSize: 13 }}>All products well stocked ✓</p>
//                   )}
//                 </div>
//               </Col>
//             </Row>
//           </>
//         )}

//         {/* PRODUCTS TAB */}
//         {activeTab === 'products' && (
//           <div className="dash-card">
//             <div className="dash-card-header">
//               <h3>All Products ({products.length})</h3>
//               <Button type="primary" icon={<PlusOutlined />} className="add-product-btn" onClick={openAddModal}>
//                 Add Product
//               </Button>
//             </div>
//             <Table
//               dataSource={products}
//               columns={productColumns}
//               pagination={{ pageSize: 8 }}
//               rowKey="key"
//             />
//           </div>
//         )}

//         {/* ORDERS TAB */}
//         {activeTab === 'orders' && (
//           <div className="dash-card">
//             <div className="dash-card-header">
//               <h3>All Orders (47)</h3>
//               <Tag color="blue">Updated just now</Tag>
//             </div>
//             <Table dataSource={recentOrders} columns={orderColumns} rowKey="id" />
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Product Modal */}
//       <Modal
//         title={editingProduct ? 'Edit Product' : 'Add New Product'}
//         open={modalOpen}
//         onCancel={() => setModalOpen(false)}
//         footer={null}
//         destroyOnClose
//       >
//         <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 16 }}>
//           <Form.Item label="Product Name" name="name" rules={[{ required: true }]}>
//             <Input placeholder="e.g. Lavender Essential Oil" />
//           </Form.Item>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item label="Category" name="category" rules={[{ required: true }]}>
//                 <Select options={CATEGORIES.map(c => ({ label: c, value: c }))} placeholder="Select category" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label="Price (₹)" name="price" rules={[{ required: true }]}>
//                 <InputNumber min={1} style={{ width: '100%' }} placeholder="299" />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Form.Item label="Stock Units" name="stock" rules={[{ required: true }]}>
//             <InputNumber min={0} style={{ width: '100%' }} placeholder="50" />
//           </Form.Item>
//           <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
//             <Button onClick={() => setModalOpen(false)}>Cancel</Button>
//             <Button type="primary" htmlType="submit" className="add-product-btn">
//               {editingProduct ? 'Save Changes' : 'Add Product'}
//             </Button>
//           </div>
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// export default Dashboard;





import React, { useState } from 'react';
import {
  Card, Row, Col, Button, Form, Input, InputNumber,
  Table, Tag, message, Select, Modal, Popconfirm, Upload
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, EditOutlined,
  DashboardOutlined, ShoppingOutlined, 
  LogoutOutlined, UploadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaBox, FaChartLine, FaUsers, FaTruck } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';
import './Dashboard.css';

const CATEGORIES = ['Skincare', 'Hair Care', 'Wellness', 'Aromatherapy', 'Supplements'];

const initProducts = [
  { 
    key: '1', 
    id: 1, 
    name: 'Herbal Face Cream', 
    category: 'Skincare', 
    price: 299, 
    stock: 45, 
    status: 'active',
    imageUrl: 'https://via.placeholder.com/100x100?text=Face+Cream'
  },
  { 
    key: '2', 
    id: 2, 
    name: 'Aloe Vera Gel', 
    category: 'Skincare', 
    price: 199, 
    stock: 62, 
    status: 'active',
    imageUrl: 'https://via.placeholder.com/100x100?text=Aloe+Vera'
  },
  { 
    key: '3', 
    id: 3, 
    name: 'Neem Face Wash', 
    category: 'Skincare', 
    price: 149, 
    stock: 38, 
    status: 'active',
    imageUrl: 'https://via.placeholder.com/100x100?text=Neem+Wash'
  },
  { 
    key: '4', 
    id: 4, 
    name: 'Herbal Shampoo', 
    category: 'Hair Care', 
    price: 349, 
    stock: 12, 
    status: 'low',
    imageUrl: 'https://via.placeholder.com/100x100?text=Shampoo'
  },
  { 
    key: '5', 
    id: 5, 
    name: 'Green Tea Powder', 
    category: 'Wellness', 
    price: 249, 
    stock: 55, 
    status: 'active',
    imageUrl: 'https://via.placeholder.com/100x100?text=Green+Tea'
  },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'Priya S.', product: 'Aloe Vera Gel', amount: '₹199', status: 'Delivered' },
  { id: '#ORD-002', customer: 'Rahul M.', product: 'Herbal Shampoo', amount: '₹349', status: 'Shipped' },
  { id: '#ORD-003', customer: 'Sneha K.', product: 'Turmeric Soap', amount: '₹99', status: 'Processing' },
  { id: '#ORD-004', customer: 'Amit P.', product: 'Organic Honey', amount: '₹259', status: 'Delivered' },
];

const orderColumns = [
  { title: 'Order ID', dataIndex: 'id', key: 'id', render: t => <span className="order-id">{t}</span> },
  { title: 'Customer', dataIndex: 'customer', key: 'customer' },
  { title: 'Product', dataIndex: 'product', key: 'product' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount', render: t => <strong style={{ color: '#2e7d32' }}>{t}</strong> },
  {
    title: 'Status', dataIndex: 'status', key: 'status',
    render: s => <Tag color={s === 'Delivered' ? 'green' : s === 'Shipped' ? 'blue' : 'orange'}>{s}</Tag>
  },
];

function Dashboard() {
  const [products, setProducts] = useState(initProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [imageUrl, setImageUrl] = useState('');
  const [form] = Form.useForm();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    message.success('Logged out successfully');
    navigate('/');
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setImageUrl('');
    form.resetFields();
    setModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditingProduct(record);
    setImageUrl(record.imageUrl || '');
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      // For demo, using placeholder. In real app, get URL from response
      const url = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(url);
      message.success(`${info.file.name} image uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} image upload failed.`);
    }
  };

  const handleSave = (values) => {
    const productData = {
      ...values,
      imageUrl: imageUrl || 'https://via.placeholder.com/100x100?text=No+Image',
      status: values.stock < 20 ? 'low' : 'active',
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.key === editingProduct.key ? { ...p, ...productData } : p
      ));
      message.success('Product updated successfully!');
    } else {
      const newProduct = {
        ...productData,
        key: String(Date.now()),
        id: products.length + 1,
      };
      setProducts(prev => [...prev, newProduct]);
      message.success('Product added successfully! 🌿');
    }
    setModalOpen(false);
    setImageUrl('');
  };

  const handleDelete = (key) => {
    setProducts(prev => prev.filter(p => p.key !== key));
    message.success('Product removed');
  };

  const productColumns = [
    { 
      title: 'Image', 
      dataIndex: 'imageUrl', 
      key: 'imageUrl',
      width: 100,
      render: (url) => (
        <img 
          src={url} 
          alt="product" 
          style={{ 
            width: 50, 
            height: 50, 
            objectFit: 'cover',
            borderRadius: 8,
            border: '1px solid #f0f0f0'
          }} 
        />
      )
    },
    { title: 'Name', dataIndex: 'name', key: 'name', render: t => <strong>{t}</strong> },
    { title: 'Category', dataIndex: 'category', key: 'category', render: c => <Tag color="green">{c}</Tag> },
    { title: 'Price', dataIndex: 'price', key: 'price', render: p => <span className="dash-price">₹{p}</span> },
    {
      title: 'Stock', dataIndex: 'stock', key: 'stock',
      render: s => <Tag color={s < 20 ? 'red' : s < 30 ? 'orange' : 'green'}>{s} units</Tag>
    },
    {
      title: 'Actions', key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEditModal(record)}>Edit</Button>
          <Popconfirm title="Delete this product?" onConfirm={() => handleDelete(record.key)} okText="Yes" cancelText="No">
            <Button size="small" danger icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const totalRevenue = products.reduce((s, p) => s + p.price * p.stock, 0);

  // Product card view for products tab
  const ProductCardView = () => (
    <Row gutter={[16, 16]}>
      {products.map(product => (
        <Col xs={24} sm={12} md={8} lg={6} key={product.key}>
          <Card
            hoverable
            cover={
              <img 
                alt={product.name} 
                src={product.imageUrl}
                style={{ height: 200, objectFit: 'cover' }}
              />
            }
            actions={[
              <EditOutlined key="edit" onClick={() => openEditModal(product)} />,
              <Popconfirm
                title="Delete this product?"
                onConfirm={() => handleDelete(product.key)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined key="delete" style={{ color: '#ff4d4f' }} />
              </Popconfirm>
            ]}
          >
            <Card.Meta
              title={<strong>{product.name}</strong>}
              description={
                <div>
                  <Tag color="green">{product.category}</Tag>
                  <div style={{ marginTop: 8 }}>
                    <span style={{ fontSize: 18, color: '#2e7d32', fontWeight: 'bold' }}>
                      ₹{product.price}
                    </span>
                    <br />
                    <Tag color={product.stock < 20 ? 'red' : 'green'}>
                      Stock: {product.stock} units
                    </Tag>
                  </div>
                </div>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="dash-sidebar">
        <div className="dash-brand">
          <FaLeaf />
          <span>HerbalStore</span>
        </div>
        <nav className="dash-nav">
          {[
            { key: 'overview', icon: <DashboardOutlined />, label: 'Overview' },
            { key: 'products', icon: <ShoppingOutlined />, label: 'Products' },
            { key: 'orders', icon: <FaTruck />, label: 'Orders' },
          ].map(item => (
            <button
              key={item.key}
              className={`dash-nav-item ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="dash-logout" onClick={handleLogout}>
          <LogoutOutlined />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="dash-main">
        <div className="dash-topbar">
          <div>
            <h1 className="dash-page-title">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'products' && 'Product Management'}
              {activeTab === 'orders' && 'Recent Orders'}
            </h1>
            <p className="dash-subtitle">Welcome back, <strong>{user?.username}</strong> 👋</p>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            <Row gutter={[20, 20]} style={{ marginBottom: 28 }}>
              {[
                { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: <FaChartLine />, color: '#2e7d32', bg: '#e8f5e9' },
                { title: 'Total Products', value: products.length, icon: <FaBox />, color: '#1565c0', bg: '#e3f2fd' },
                { title: 'Total Orders', value: 47, icon: <FaTruck />, color: '#e65100', bg: '#fff3e0' },
                { title: 'Customers', value: 312, icon: <FaUsers />, color: '#6a1b9a', bg: '#f3e5f5' },
              ].map((stat, i) => (
                <Col xs={24} sm={12} lg={6} key={i}>
                  <div className="stat-tile">
                    <div className="stat-tile-icon" style={{ background: stat.bg, color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="stat-tile-value" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="stat-tile-label">{stat.title}</div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <Row gutter={[20, 20]}>
              <Col xs={24} lg={16}>
                <div className="dash-card">
                  <div className="dash-card-header">
                    <h3>Recent Orders</h3>
                    <Tag color="green">Live</Tag>
                  </div>
                  <Table
                    dataSource={recentOrders}
                    columns={orderColumns}
                    pagination={false}
                    size="small"
                    rowKey="id"
                  />
                </div>
              </Col>
              <Col xs={24} lg={8}>
                <div className="dash-card">
                  <h3 className="dash-card-header-text">Low Stock Alert</h3>
                  {products.filter(p => p.stock < 20).map(p => (
                    <div key={p.key} className="low-stock-item">
                      <span>{p.name}</span>
                      <Tag color="red">{p.stock} left</Tag>
                    </div>
                  ))}
                  {products.filter(p => p.stock < 20).length === 0 && (
                    <p style={{ color: '#aaa', fontSize: 13 }}>All products well stocked ✓</p>
                  )}
                </div>
              </Col>
            </Row>
          </>
        )}

        {/* PRODUCTS TAB - Card View with Images */}
        {activeTab === 'products' && (
          <div className="dash-card">
            <div className="dash-card-header">
              <h3>All Products ({products.length})</h3>
              <Button type="primary" icon={<PlusOutlined />} className="add-product-btn" onClick={openAddModal}>
                Add Product
              </Button>
            </div>
            
            {/* Toggle between Table and Card View */}
            <div style={{ marginBottom: 20, textAlign: 'right' }}>
              <Button.Group>
                <Button>Card View</Button>
                <Button>Table View</Button>
              </Button.Group>
            </div>
            
            {/* Product Cards View */}
            <ProductCardView />
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="dash-card">
            <div className="dash-card-header">
              <h3>All Orders (47)</h3>
              <Tag color="blue">Updated just now</Tag>
            </div>
            <Table dataSource={recentOrders} columns={orderColumns} rowKey="id" />
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal with Image Upload */}
      <Modal
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setImageUrl('');
        }}
        footer={null}
        destroyOnClose
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 16 }}>
          <Form.Item label="Product Image" required>
            <Upload
              listType="picture-card"
              showUploadList={false}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
              onChange={handleImageUpload}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith('image/');
                if (!isImage) {
                  message.error('You can only upload image files!');
                  return false;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                  message.error('Image must be smaller than 2MB!');
                  return false;
                }
                return true;
              }}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>
              Click to upload product image (max 2MB)
            </div>
          </Form.Item>

          <Form.Item label="Product Name" name="name" rules={[{ required: true, message: 'Please enter product name' }]}>
            <Input placeholder="e.g. Lavender Essential Oil" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select category' }]}>
                <Select options={CATEGORIES.map(c => ({ label: c, value: c }))} placeholder="Select category" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Price (₹)" name="price" rules={[{ required: true, message: 'Please enter price' }]}>
                <InputNumber min={1} style={{ width: '100%' }} placeholder="299" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Stock Units" name="stock" rules={[{ required: true, message: 'Please enter stock quantity' }]}>
            <InputNumber min={0} style={{ width: '100%' }} placeholder="50" />
          </Form.Item>

          {imageUrl && (
            <div style={{ marginBottom: 16, padding: 8, background: '#f5f5f5', borderRadius: 4 }}>
              <div style={{ fontSize: 12, color: '#666' }}>Preview:</div>
              <img src={imageUrl} alt="preview" style={{ width: 80, height: 80, objectFit: 'cover', marginTop: 8, borderRadius: 4 }} />
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
            <Button onClick={() => {
              setModalOpen(false);
              setImageUrl('');
            }}>Cancel</Button>
            <Button type="primary" htmlType="submit" className="add-product-btn">
              {editingProduct ? 'Save Changes' : 'Add Product'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Dashboard;
