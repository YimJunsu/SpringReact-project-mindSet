// src/pages/Login.jsx
import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import SocialLogin from '../components/auth/SocialLogin';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>로그인</h2>
        <LoginForm />
        <div className="divider">
          <span>또는</span>
        </div>
        <SocialLogin />
        <div className="auth-links">
          <p>
            계정이 없으신가요? <a href="/register">회원가입</a>
          </p>
          <p>
            <a href="/forgot-password">비밀번호를 잊으셨나요?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;