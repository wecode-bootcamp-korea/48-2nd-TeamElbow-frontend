import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Payments.scss';

const ERROR_MESSAGES_MAP = {
  LOGIN_REQUIRED: '로그인이 필요합니다.',
  TOKEN_EXPIRED: '로그인이 필요합니다.',
};

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
    fetch('/data/userInfo.json', {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert(
            ERROR_MESSAGES_MAP[data.message] ||
              '예상치 못한 에러가 발생했습니다.',
          );
          navigate('/login');
          return;
        }

        setUserInfo({
          memberPoint: data.memberPoint,
          totalPrice: data.totalPrice,
          deductionPoint: '',
          // bookingId: data.bookingId,
        });
      });
  }, []);

  const [deductionAmount, setDeductionAmount] = useState(0);
  const [isInputValid, setIsInputValid] = useState(false);
  const point = parseFloat(userInfo.deductionPoint);
  const totalPrice = parseFloat(userInfo.totalPrice);
  const handleInputPoint = e => {
    e.preventDefault();
    const inputPoint = parseFloat(e.target.value);
    setDeductionAmount(inputPoint);

    if (inputPoint === totalPrice) {
      setIsInputValid(inputPoint === totalPrice);
    } else {
      setIsInputValid(false);
    }
    if (inputPoint > totalPrice) {
      alert('보유한 포인트보다 많습니다.');
    }
  };

  const completeBooking = e => {
    e.preventDefault();

    useEffect(() => {
      fetch('API주소', {
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
    }, [bookingId]);
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
