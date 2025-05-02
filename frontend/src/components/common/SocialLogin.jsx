// src/components/auth/SocialLogin.jsx
import React from 'react';
import './SocialLogin.css';

const SocialLogin = () => {
  const handleKakaoLogin = () => {
    // 카카오 로그인 연동 로직 (추후 구현)
    console.log('카카오 로그인 시도');
  };

  const handleNaverLogin = () => {
    // 네이버 로그인 연동 로직 (추후 구현)
    console.log('네이버 로그인 시도');
  };

  return (
    <div className="social-login">
      <button
        className="social-btn kakao-btn"
        onClick={handleKakaoLogin}
      >
        <span className="icon">K</span>
        <span>카카오로 로그인</span>
      </button>

      <button
        className="social-btn naver-btn"
        onClick={handleNaverLogin}
      >
        <span className="icon">N</span>
        <span>네이버로 로그인</span>
      </button>
    </div>
  );
};

export default SocialLogin;