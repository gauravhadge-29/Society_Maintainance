import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // start loading until we check cookie
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by hitting the /me endpoint
    // The browser will automatically send the HttpOnly cookie
    const checkUser = async () => {
      try {
        const response = await api.get('/users/me');
        setUser(response.data.data);
      } catch (error) {
        // If 401, we are not logged in, which is fine on load
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user } = response.data.data;
      setUser(user);
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/resident/dashboard');
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      await api.post('/auth/register', userData);
      navigate('/login');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      setUser(null);
      navigate('/login');
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  // Prevent rendering protected routes until we finish checking the session
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface gap-4">
        <div className="spinner" style={{ width: '2.5rem', height: '2.5rem' }} />
        <p className="text-sm text-slate-400 font-medium">Loading...</p>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
