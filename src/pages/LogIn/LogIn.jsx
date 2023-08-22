import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LogIn.scss';

const LogIn = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    memberId: '',
    memberPassword: '',
  });
  const handleInput = e => {
    const { value, id } = e.target;
    setUserInfo(prev => ({ ...prev, [id]: value }));
  };
  const onClick = () => {
    fetch('주소', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        memberId: userInfo.memberId,
        memberPassword: userInfo.memberPassword,
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        // if (result.message === 'SUCCESS') {
        //   localStorage.setItem('token', result.accessToken);
        //   navigate('/post-list');
        // } else {
        //   alert('이메일 또는 비밀번호가 일치하지 않습니다.');
        // }
      });
  };

  return (
    <div className="contents">
      <form className="logInWrap">
        <h1>로그인</h1>
        <input
          id="memberId"
          onChange={handleInput}
          type="text"
          placeholder="아이디를 입력해주세요."
        />
        <input
          id="memberPassword"
          onChange={handleInput}
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <button className="logIn" onClick={onClick}>
          로그인
        </button>
        <p>아직 회원이 아니신가요?</p>
        <button className="goToSignUp">
          <Link to="/sign-up">엘보우시네마 회원가입 하기</Link>
        </button>
      </form>
    </div>
  );
};

export default LogIn;
