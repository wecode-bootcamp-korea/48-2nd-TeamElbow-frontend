import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SignUp.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    memberId: '',
    memberPassword: '',
    memberName: '',
    memberPhonenumber: '',
    memberEmail: '',
    memberBirthday: '',
    memberGender: '',
  });

  const {
    memberId,
    memberPassword,
    memberName,
    memberPhonenumber,
    memberEmail,
    memberBirthday,
    memberGender,
  } = userInfo;

  const onClickSignup = e => {
    e.preventDefault();

    fetch('API주소', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'CreateMember') {
          navigate('/login');
        }
      });
  };

  const handleInput = e => {
    const { value, name } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const isIdValid = memberId.length >= 6;
  const isPasswordValid =
    memberPassword.length >= 8 &&
    /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(memberPassword);
  const isNameValid = memberName.length >= 2;
  const isPhonenumberValid = /^01[0-9]-[0-9]{4}-[0-9]{4}$/.test(
    memberPhonenumber,
  );
  const isEmailValid =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/.test(
      memberEmail,
    );

  const isInputValid =
    isIdValid &&
    isPasswordValid &&
    isNameValid &&
    isEmailValid &&
    isPhonenumberValid &&
    memberBirthday !== '' &&
    memberEmail.trim() !== '' &&
    memberPassword.trim() !== '' &&
    memberId.trim() !== '' &&
    memberName.trim() !== '' &&
    memberPhonenumber.trim() !== '' &&
    memberGender !== '' &&
    memberBirthday.trim() !== '';

  return (
    <div className="signUp contents">
      <h1>회원가입</h1>
      <Link to="/login" className="goToLogIn">
        이미 계정이 있으신가요?
      </Link>
      <form className="signUpWrap" onChange={handleInput}>
        <label htmlFor="memberId">아이디</label>
        {memberId && !isIdValid && (
          <span className="error">6자 이상 입력해주세요.</span>
        )}
        <input name="memberId" type="text" placeholder="6자 이상" />
        <label htmlFor="memberPassword">패스워드</label>
        {memberPassword && !isPasswordValid && (
          <span className="error">
            숫자, 특수문자를 포함하여 8자 이상 입력해주세요.
          </span>
        )}
        <input
          name="memberPassword"
          type="password"
          placeholder="특수문자를 포함하여 8자 이상"
        />
        <label htmlFor="memberName">이름</label>
        {memberName && !isNameValid && (
          <span className="error">두 글자 이상 입력해주세요.</span>
        )}
        <input name="memberName" type="text" placeholder="" />
        <label htmlFor="memberPhonenumber">휴대폰번호</label>
        {memberPhonenumber && !isPhonenumberValid && (
          <span className="error">-를 포함하여 작성해주세요.</span>
        )}
        <input
          name="memberPhonenumber"
          type="text"
          placeholder="-를 포함하여 휴대폰번호를 입력해주세요."
        />
        <label htmlFor="memberEmail">이메일</label>
        {memberEmail && !isEmailValid && (
          <span className="error">형식이 맞지 않습니다.</span>
        )}
        <input
          name="memberEmail"
          type="email"
          placeholder="이메일 주소를 입력해주세요."
        />
        <label htmlFor="memberBirthday">생년월일</label>
        <input
          name="memberBirthday"
          type="date"
          required
          placeholder="생년월일을 선택해주세요."
        />
        <label>성별</label>
        <div className="gender">
          <label htmlFor="male">
            <input value="male" name="memberGender" type="radio" />
            남자
          </label>
          <label htmlFor="female">
            <input value="female" name="memberGender" type="radio" />
            여자
          </label>
        </div>
        <button
          onClick={onClickSignup}
          className="signUpBtn"
          disabled={!isInputValid}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
