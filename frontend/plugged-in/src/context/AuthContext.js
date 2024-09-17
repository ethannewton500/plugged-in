import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  // Function to log in the user
  const login = (token, userId) => {
    setIsAuthenticated(true);
    setUserId(userId);
    setToken(token);

    // Save token and userId to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  };

  // Function to log out the user
  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setToken(null);

    // Remove token and userId from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  // Check localStorage for token when the app starts
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken && storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setToken(storedToken);
    }
  }, []);  // The empty array ensures this runs only when the component mounts

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
