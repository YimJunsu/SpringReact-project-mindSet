// src/pages/Register.jsx
import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import './Register.css';

const Register = () => {
  return (
    <div className="register-page">
      <div className="register-container">
        <h2>회원가입</h2>
        <RegisterForm />
        <div className="auth-links">
          <p>
            이미 계정이 있으신가요? <a href="/login">로그인</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;