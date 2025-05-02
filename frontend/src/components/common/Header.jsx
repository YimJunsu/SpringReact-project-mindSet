// src/components/common/Header.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>마인드<span>SET</span></h1>
          </Link>
        </div>

        <nav className="nav-menu">
          <ul>
            {isAuthenticated && (
              <>
                <li className="dropdown">
                  <button onClick={() => toggleMenu('study')}>공부</button>
                  {openMenu === 'study' && (
                    <ul className="dropdown-menu">
                      <li><Link to="/study">기록</Link></li>
                      <li><Link to="/todos">To-Do</Link></li>
                      <li><Link to="/memos">메모장</Link></li>
                      <li><Link to="/questions">질문</Link></li>
                    </ul>
                  )}
                </li>
                <li className="dropdown">
                  <button onClick={() => toggleMenu('workout')}>운동</button>
                  {openMenu === 'workout' && (
                    <ul className="dropdown-menu">
                      <li><Link to="/workout">기록</Link></li>
                      <li><Link to="/diet">식단</Link></li>
                      <li><Link to="/community">오운완</Link></li>
                    </ul>
                  )}
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <Link to="/mypage" className="btn btn-user">마이페이지</Link>
              <button onClick={handleLogout} className="btn btn-logout">로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-login">로그인</Link>
              <Link to="/register" className="btn btn-register">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
