import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LogIn.scss';

const LogIn = () => {
  const navigate = useNavigate();

  return (
    <div className="contents">
      <form className="logInWrap">
        <h1>로그인</h1>
        <input type="text" placeholder="아이디를 입력해주세요." />
        <input type="password" placeholder="비밀번호를 입력해주세요." />
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
