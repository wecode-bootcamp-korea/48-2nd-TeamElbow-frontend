import React, { useState } from 'react';
import './Payments.scss';

const Payments = () => {
  const [userInfo, setUserInfo] = useState('');
  const [usePoint, setUsePoint] = useState('');

  return (
    <div className="payments contents">
      <h1>결제</h1>
      <div className="paymentsInfo">
        <div className="myPoint">
          <div className="usePoint">
            <p className="paymentTitle">포인트결제</p>
            <div>
              <span>사용 가능한 포인트</span>
              <span>100,000</span>
            </div>
            <div>
              <span>사용할 포인트</span>
              <input type="text" name="toUsePoint" />
            </div>
          </div>
          <div className="useCard">
            <p>카드결제</p>
          </div>
        </div>
        <div className="checkPayments">
          <div className="aboutSelectMovie">
            최종결제금액 <span>70,000원</span>
            <button>결제</button>
          </div>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default Payments;
