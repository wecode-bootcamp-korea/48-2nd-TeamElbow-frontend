import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payments.scss';

const Payments = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    memberPoint: '',
    totalPrice: '',
    deductionPoint: '',
    bookingId: '',
  });

  useEffect(() => {
    fetch('/data/userInfo.json')
      .then(res => res.json())
      .then(data => {
        setUserInfo({
          memberPoint: data.memberPoint,
          totalPrice: data.totalPrice,
          deductionPoint: '',
          bookingId: data.bookingId,
        });
      });
  }, []);

  const [isInputValid, setIsInputValid] = useState(false);
  // const point = parseFloat(userInfo.deductionPoint);
  const totalPrice = parseFloat(userInfo.totalPrice);

  const handleInputPoint = e => {
    e.preventDefault();
    const inputPoint = parseFloat(e.target.value);

    if (inputPoint === totalPrice) {
      console.log('결제가능');
      setIsInputValid(true);
    } else {
      console.log('잘못된 포인트 입력');
      setIsInputValid(false);
    }
  };

  const completeBooking = e => {
    e.preventDefault();

    fetch('API주소', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        bookingId: userInfo.bookingId,
        totalPrice: userInfo.totalPrice,
      }),
    })
      .then(res => res.json())
      .then(result => {
        console.log('결제성공:', result);
        navigate('/my-ticket');
      });
  };

  return (
    <div className="payments">
      <h1>결제</h1>
      <div className="paymentsInfo">
        <div className="myPoint">
          <div className="usePoint">
            <p className="paymentItem select">포인트결제</p>
            <p className="availablePoints">
              사용 가능한 포인트
              <span> {userInfo.memberPoint}</span>
            </p>
            <div className="usingPoint">
              <span>사용할 포인트</span>
              <input
                type="number"
                onChange={handleInputPoint}
                name="deductionPoint"
                className="deduction"
                min="1"
              />
              점
            </div>
          </div>
          <div className="useCard">
            <p className="paymentItem">카드결제</p>
          </div>
          <div className="useCard">
            <p className="paymentItem">간편결제</p>
          </div>
        </div>
        <div className="checkPayments">
          <div className="aboutSelectMovie">
            최종결제금액 <span>{userInfo.totalPrice}</span>
          </div>
          <button onClick={completeBooking} disabled={!isInputValid}>
            결제
          </button>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default Payments;
