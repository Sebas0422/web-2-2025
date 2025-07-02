import { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login, logout, register } from '../services/authService';

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateAuthData = useCallback((token) => {
    if (!token) {
      setIsAuthenticated(false);
      setPermissions([]);
      setLoading(false);
      return;
    }
    try {
      const payload = jwtDecode(token);
      setIsAuthenticated(true);
      setPermissions(payload.permissions || []);
      setLoading(false);
    } catch {
      setIsAuthenticated(false);
      setPermissions([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    updateAuthData(token);
  }, [token, updateAuthData]);

  const loginUser = async (user) => {
    try {
      const response = await login(user);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      return response;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      setToken(null);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  };

  const registerUser = async (user) => {
    try {
      const response = await register(user);
      localStorage.setItem('token', response.token);
      setToken(response.token);
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  return {
    isAuthenticated,
    permissions,
    loading,
    login: loginUser,
    logout: logoutUser,
    register: registerUser,
    token,
  };
}
