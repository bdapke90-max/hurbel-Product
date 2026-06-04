import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('herbal_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (username, password) => {
    // Admin login
    if (username === 'admin' && password === '123') {
      const adminUser = { username: 'admin', role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('herbal_user', JSON.stringify(adminUser));
      localStorage.setItem('loggedIn', 'true');
      return { success: true, role: 'admin' };
    }
    // Registered user login
    const stored = localStorage.getItem('herbal_registered');
    if (stored) {
      const reg = JSON.parse(stored);
      if (reg.username === username && reg.password === password) {
        const u = { username, role: 'user' };
        setUser(u);
        localStorage.setItem('herbal_user', JSON.stringify(u));
        localStorage.setItem('loggedIn', 'true');
        return { success: true, role: 'user' };
      }
    }
    return { success: false };
  };

  const register = (username, password) => {
    localStorage.setItem('herbal_registered', JSON.stringify({ username, password }));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('herbal_user');
    localStorage.removeItem('loggedIn');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
