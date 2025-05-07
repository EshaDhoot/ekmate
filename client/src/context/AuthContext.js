import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in on page load
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      setCurrentUser(JSON.parse(user));
      // We don't need to set default headers here as our axiosInstance
      // will handle this in its request interceptor
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError('');
      setLoading(true);

      const response = await axiosInstance.post('/auth/sign-in', { email, password });

      if (response.data.success) {
        // Based on the backend response structure
        const token = response.data.data;

        // Decode the JWT token to get user information
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const user = JSON.parse(jsonPayload);

        // Store user data and token
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Set default authorization header
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setCurrentUser(user);
        return { success: true, user };
      } else {
        setError(response.data.message || 'Login failed');
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // No need to delete headers as axiosInstance handles this
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
