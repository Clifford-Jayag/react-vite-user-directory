import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Task 2.2: Check localStorage when app loads to persist session
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Task 2.1: login(email, password) calls backend & stores token
  const login = async (email, password) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      password,
    });
    
    const { token: newToken, user: userData } = response.data;

    setToken(newToken);
    setUser(userData || { email });

    // Task 2.2: Save to localStorage[cite: 15]
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData || { email }));
    return response.data;
  };

  // Task 2.1: logout() clears token & resets state[cite: 15]
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Task 2.1: derived boolean indicating if user is logged in[cite: 15]
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};