// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { loginApi, checkTokenApi, logoutApi } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 토큰이 있는지 확인하고 유효한지 검증
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const userData = await checkTokenApi();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          // 토큰이 유효하지 않으면 로컬스토리지에서 제거
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // 로그인 함수
  const login = async (email, password) => {
    const response = await loginApi(email, password);
    const { token, user } = response;

    // 토큰을 로컬스토리지에 저장
    localStorage.setItem('token', token);

    setUser(user);
    setIsAuthenticated(true);

    return user;
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    } finally {
      // 로컬스토리지에서 토큰 제거
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};