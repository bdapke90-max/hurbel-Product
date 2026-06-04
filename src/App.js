import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Components/Context/CartContext';
import { AuthProvider } from './Components/Context/AuthContext';

import Landing from './Components/Landing/Landing';
import ProductPage from './Components/Landing/ProductPage';
import Categories from './Components/Landing/Categories';
import Login from './Components/Landing/Login';
import Register from './Components/Landing/Register';
import Cart from './Components/Cart/Cart';
import Dashboard from './Components/Dashboard/Dashboard';
import PrivateRouter from './Components/Auth/PrivateRouter';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
       
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRouter>
                  <Dashboard />
                </PrivateRouter>
              }
            />
           
          </Routes>
       

        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
