// src/components/common/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>마인드<span>SET</span></h2>
            <p>자기개발 플랫폼</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>서비스</h4>
              <ul>
                <li><a href="/study">공부 기록</a></li>
                <li><a href="/workout">운동 기록</a></li>
                <li><a href="/diet">식단 관리</a></li>
                <li><a href="/community">커뮤니티</a></li>
              </ul>
            </div>
            <div className="link-group">
              <h4>고객지원</h4>
              <ul>
                <li><a href="/faq">자주 묻는 질문</a></li>
                <li><a href="/contact">문의하기</a></li>
                <li><a href="/privacy">개인정보처리방침</a></li>
                <li><a href="/terms">이용약관</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} 마인드SET. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;