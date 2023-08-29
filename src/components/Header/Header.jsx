import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const goLogIn = () => {
    navigate('/login');
  };

  const goLogOut = () => {
    localStorage.removeItem('authToken');
    setIsLogin(false);
    navigate('/');
  };

  const goSignUp = () => {
    navigate('/sign-up');
  };

  const goMyTicket = () => {
    if (isLogin) {
      navigate('/my-ticket');
    } else {
      sessionStorage.setItem('redirectPath', '/my-ticket');
      navigate('/login');
    }
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = !!localStorage.getItem('authToken');
      setIsLogin(isLoggedIn);

      const redirectPath = sessionStorage.getItem('redirectPath');
      if (isLoggedIn && redirectPath) {
        navigate(redirectPath);
        sessionStorage.removeItem('redirectPath');
      }
    };

    checkLoginStatus();
  }, [navigate]);

  return (
    <div className="header">
      <div className="contents">
        <h1 className="logo" onClick={goHome}>
          <img src="/images/logo.png" alt="씨네마 엘보우 로고" />
        </h1>
        <ul>
          {isLogin ? (
            <>
              <li onClick={goLogOut}>
                <img src="images/icon_login.png" alt="로그인 아이콘" />
                <span>로그아웃</span>
              </li>

              <li onClick={goMyTicket}>
                <img src="images/icon_myticket.png" alt="마이티켓 아이콘" />
                <span>마이티켓</span>
              </li>
            </>
          ) : (
            <>
              <li onClick={goLogIn}>
                <img src="images/icon_login.png" alt="로그인 아이콘" />
                <span>로그인</span>
              </li>
              <li onClick={goSignUp}>
                <img src="images/icon_signup.png" alt="회원가입 아이콘" />
                <span>회원가입</span>
              </li>
              <li onClick={goMyTicket}>
                <img src="images/icon_myticket.png" alt="마이티켓 아이콘" />
                <span>마이티켓</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
