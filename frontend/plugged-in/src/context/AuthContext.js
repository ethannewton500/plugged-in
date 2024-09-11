import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userId, setUserId] = useState(null);
	const [token, setToken] = useState(null);

	const login = (token, userId) => {
		setIsAuthenticated(true);
		setUserId(userId);
		setToken(token);
		localStorage.setItem('token', token);
		localStorage.setItem('userId', userId);
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUserId(null);
		setToken(null);
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, userId, token, login, logout }}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
