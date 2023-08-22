import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const goLogIn = () => {
    navigate('/login');
  };

  const goSignUp = () => {
    navigate('/sign-up');
  };

  const goMyTicket = () => {
    navigate('/my-ticket');
  };

  return (
    <div className="header">
      <div className="contents">
        <h1 className="logo" onClick={goHome}>
          <img src="/images/logo.png" alt="" />
        </h1>
        <ul>
          <li onClick={goLogIn}>
            <img src="images/icon_login.png" alt="" />
            <span>로그인</span>
          </li>
          <li onClick={goSignUp}>
            <img src="images/icon_signup.png" alt="" />
            <span>회원가입</span>
          </li>
          <li onClick={goMyTicket}>
            <img src="images/icon_myticket.png" alt="" />
            <span>마이티켓</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
