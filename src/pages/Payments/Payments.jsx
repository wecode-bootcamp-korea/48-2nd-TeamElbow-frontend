import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Payments.scss';

const Payments = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    memberPoint: '',
    totalPrice: '',
    deductionPoint: '',
    bookingId: '',
  });

  useEffect(() => {
    fetch('http://10.58.52.207:3000/booking/pay', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setUserInfo({
          memberPoint: data.memberPoint,
          totalPrice: data.totalPrice,
          deductionPoint: '',
          bookingId: '',
        });
      });
  }, []);

  const [deductionAmount, setDeductionAmount] = useState(0);
  const [isInputValid, setIsInputValid] = useState(false);
  const point = parseFloat(userInfo.deductionPoint);
  const totalPrice = parseFloat(userInfo.totalPrice);
  const handleInputPoint = e => {
    e.preventDefault();
    const inputValue = e.target.value;
    const inputPoint = parseFloat(inputValue) || 0;
    setDeductionAmount(inputPoint);

    if (inputPoint === totalPrice) {
      setIsInputValid(inputPoint === totalPrice);
    } else {
      setIsInputValid(false);
    }
  };

  const completeBooking = e => {
    e.preventDefault();

    fetch('http://10.58.52.207:3000/booking/pay', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        bookingId: bookingId,
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
                max={userInfo.totalPrice}
                defaultValue={0}
              />
              점
              {deductionAmount > userInfo.totalPrice && (
                <p className="warning">
                  입력된 포인트가 보유한 포인트보다 많습니다.
                </p>
              )}
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
            <p className="schedule">결제 예정 금액 : {deductionAmount}</p>
            <p className="totalPrice">최종 결제 금액 : {userInfo.totalPrice}</p>
            {!isInputValid && (
              <p className="warning">결제하실 금액을 확인해주세요.</p>
            )}
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
