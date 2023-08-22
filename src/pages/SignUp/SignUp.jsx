import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.scss';

const SignUp = () => {
  return (
    <div className="contents">
      <form className="signUpWrap">
        <h1>회원가입</h1>
        <Link to="/LogIn" className="goToLogIn">
          이미 계정이 있으신가요?
        </Link>
        <label>아이디</label>
        <input type="text" placeholder="6자 이상" />
        <label>패스워드</label>
        <input type="password" placeholder="8자 이상" />
        <label>이름</label>
        <input type="text" placeholder="" />
        <label>이메일</label>
        <input type="email" placeholder="이메일 주소를 입력해주세요." />
        <label>생년월일</label>
        <input type="date" required placeholder="생년월일을 선택해주세요." />
        <label>성별</label>
        <div className="gender">
          <label>
            <input type="radio" /> 남자
          </label>
          <label>
            <input type="radio" /> 여자
          </label>
        </div>
        <button className="signUp">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;

// 버튼 1개 외 비활성화 https://onu0624.tistory.com/126
