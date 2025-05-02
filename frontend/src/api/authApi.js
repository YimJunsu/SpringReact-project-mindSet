// src/api/authApi.js
import axios from 'axios';

// 기본 API URL
const API_URL = 'http://localhost:8080/api';

// 요청 인터셉터 설정
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 로그인 API
export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || '로그인에 실패했습니다.'
    );
  }
};

// 회원가입 API
export const registerApi = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || '회원가입에 실패했습니다.'
    );
  }
};

// 토큰 확인 API
export const checkTokenApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/check-token`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || '인증에 실패했습니다.'
    );
  }
};

// 로그아웃 API
export const logoutApi = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || '로그아웃에 실패했습니다.'
    );
  }
};