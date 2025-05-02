// src/api/quoteApi.js
import axios from 'axios';

// 기본 API URL
const API_URL = 'http://localhost:8080/api';

// 랜덤 명언 가져오기
export const fetchRandomQuote = async () => {
  try {
    const response = await axios.get(`${API_URL}/cheerup/random`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || '명언을 가져오는데 실패했습니다.'
    );
  }
};