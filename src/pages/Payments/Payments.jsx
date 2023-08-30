import React, { useState } from 'react';
import './Payments.scss';

const Payments = () => {
  const [usePoint, setUsePoint] = useState('');

  return (
    <div className="payments contents">
      <h1>결제</h1>
      <div className="usePoint">
        <p>포인트결제</p>
        <div>
          <span>사용 가능한 포인트</span>
          <input type="text"></input>
        </div>
        <div>
          <span>사용할 포인트</span>
          <input type="text" name="toUsePoint"></input>
        </div>
      </div>
      <div className="useCard">
        <p>카드결제</p>
      </div>
    </div>
  );
};

export default Payments;
