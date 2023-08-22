import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.scss';

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    memberId: '',
    memberPassword: '',
    memberName: '',
    memberPhonenumber: '',
    memberEmail: '',
    memberBirthday: '',
  });

  const [memberGender, setMemberGender] = useState('');
  const handleInputGender = e => {
    setMemberGender(e.target.value);
  };

  const [idMessage, setIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [phoneMessage, setPhoneMessage] = useState('');
  const [birthMessage, setBirthMessage] = useState('');

  const onClickSignup = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('memberId', userInfo.memberId);
    formData.append('memberPassword', userInfo.memberPassword);
    formData.append('memberEmail', userInfo.memberEmail);
    formData.append('memberName', userInfo.memberName);
    formData.append('memberPhonenumber', userInfo.memberPhonenumber);
    formData.append('memberBirthday', userInfo.memberBirthday);
    formData.append('memberGender', memberGender);

    for (const key of formData.keys()) {
      console.log(key);
    }
    for (const value of formData.values()) {
      console.log(value);
    }

    // fetch('API 주소', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     data: formData,
    //   },
    //   body: formData,
    // })
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log(result);
    //   });
  };

  const handleInput = e => {
    const { value, id } = e.target;
    setUserInfo(prev => ({ ...prev, [id]: value }));

    if (id === 'memberId') {
      const isIdValid = value.length >= 6;
      isIdValid ? setIdMessage(false) : setIdMessage(true);
    }

    if (id === 'memberPassword') {
      const isPasswordValid =
        value.length >= 8 && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);
      isPasswordValid ? setPasswordMessage(false) : setPasswordMessage(true);
    }

    if (id === 'memberName') {
      const isNameValid = value.length >= 1;
      isNameValid ? setNameMessage(false) : setNameMessage(true);
    }

    if (id === 'memberPhonenumber') {
      const isPhonenumberValid =
        /^(010|011|016|017|018|019)-[0-9]{3,4}-[0-9]{4}$/.test(value);
      isPhonenumberValid ? setPhoneMessage(false) : setPhoneMessage(true);
    }

    if (id === 'memberEmail') {
      const isEmailValid =
        /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/.test(
          value,
        );
      isEmailValid ? setEmailMessage(false) : setEmailMessage(true);
    }

    if (id === 'memberBirthday') {
      userInfo.memberBirthday == ''
        ? setBirthMessage(false)
        : setBirthMessage(true);
    }
  };

  const isInputValid =
    idMessage == false &&
    passwordMessage == false &&
    nameMessage == false &&
    emailMessage == false &&
    phoneMessage == false &&
    userInfo.memberBirthday !== '' &&
    userInfo.memberEmail.trim() !== '' &&
    userInfo.memberPassword.trim() !== '' &&
    userInfo.memberId.trim() !== '' &&
    userInfo.memberName.trim() !== '' &&
    userInfo.memberPhonenumber.trim() !== '' &&
    memberGender !== '' &&
    userInfo.memberBirthday.trim() !== '';

  return (
    <div className="contents">
      <h1>회원가입</h1>
      <Link to="/login" className="goToLogIn">
        이미 계정이 있으신가요?
      </Link>
      <form className="signUpWrap">
        <label htmlFor="memberId">아이디</label>
        {idMessage && <span className="error">6자 이상 입력해주세요.</span>}
        <input
          id="memberId"
          name="memberId"
          type="text"
          onChange={handleInput}
          placeholder="6자 이상"
        />
        <p className="message"> {idMessage} </p>
        <label htmlFor="memberPassword">패스워드</label>
        {passwordMessage && (
          <span className="error">
            숫자, 특수문자를 포함하여 8자 이상 입력해주세요.
          </span>
        )}
        <input
          id="memberPassword"
          name="memberPassword"
          type="password"
          onChange={handleInput}
          placeholder="특수문자를 포함하여 8자 이상"
        />
        <label htmlFor="memberName">이름</label>
        {nameMessage && <span className="error">입력을 확인해주세요.</span>}
        <input
          id="memberName"
          name="memberName"
          type="text"
          onChange={handleInput}
          placeholder=""
        />
        <label htmlFor="memberPhonenumber">휴대폰번호</label>
        {phoneMessage && (
          <span className="error">-를 포함하여 작성해주세요.</span>
        )}
        <input
          id="memberPhonenumber"
          name="memberPhonenumber"
          type="text"
          onChange={handleInput}
          placeholder="-를 포함하여 휴대폰번호를 입력해주세요."
        />
        <label htmlFor="memberEmail">이메일</label>
        {emailMessage && <span className="error">형식이 맞지 않습니다.</span>}
        <input
          id="memberEmail"
          name="memberEmail"
          type="email"
          onChange={handleInput}
          placeholder="이메일 주소를 입력해주세요."
        />
        <label htmlFor="memberBirthday">생년월일</label>
        {birthMessage && (
          <span className="error">생년월일을 선택해주세요.</span>
        )}
        <input
          id="memberBirthday"
          name="memberBirthday"
          type="date"
          onChange={handleInput}
          required
          placeholder="생년월일을 선택해주세요."
        />
        <label>성별</label>
        <div className="gender">
          <label htmlFor="male">
            <input
              id="male"
              value="male"
              name="memberGender"
              type="radio"
              onChange={handleInputGender}
            />
            남자
          </label>
          <label htmlFor="female">
            <input
              id="female"
              value="female"
              name="memberGender"
              onChange={handleInputGender}
              type="radio"
            />
            여자
          </label>
        </div>
        <button
          type="submit"
          onClick={onClickSignup}
          className="signUp"
          disabled={!isInputValid}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
