import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LogIn.scss';

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({
    memberSignInId: '',
    memberPassword: '',
  });

  const handleInput = e => {
    const { value, name } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = e => {
    e.preventDefault();

    fetch('http://10.58.52.212:3000/member/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        memberSignInId: userInfo.memberSignInId,
        memberPassword: userInfo.memberPassword,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.accessToken) {
          localStorage.setItem('token', result.accessToken);
          navigate(location.state?.from || '/');
        } else {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      });
  };

  return (
    <div className="logIn contents">
      <form className="logInWrap" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <input
          name="memberSignInId"
          value={userInfo.memberSignInId}
          onChange={handleInput}
          type="text"
          placeholder="아이디를 입력해주세요."
        />
        <input
          name="memberPassword"
          value={userInfo.memberPassword}
          onChange={handleInput}
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <button className="logIn">로그인</button>
        <p>아직 회원이 아니신가요?</p>
        <button className="goToSignUp">
          <Link to="/sign-up">엘보우시네마 회원가입 하기</Link>
        </button>
      </form>
    </div>
  );
};

export default LogIn;
