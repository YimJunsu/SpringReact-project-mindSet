// src/components/home/MainBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './MainBanner.css';

const MainBanner = () => {
  return (
    <div className="main-banner">
      <div className="banner-content">
        <h1 className="main-title">당신의 성장을 위한 <span>마인드SET</span></h1>
        <p className="main-desc">공부와 운동, 식단 관리를 한 곳에서 효과적으로 기록하고 관리하세요.</p>
        <div className="banner-buttons">
          <Link to="/register" className="btn btn-primary">시작하기</Link>
          <Link to="/about" className="btn btn-secondary">더 알아보기</Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;