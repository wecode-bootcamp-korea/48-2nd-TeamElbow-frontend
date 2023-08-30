import React, { useState } from 'react';
import './Payments.scss';

const Payments = () => {
  const [userInfo, setUserInfo] = useState({
    memberPoint: '',
    totalPrice: '',
    deductionPoint: 0,
  });
  // const [usePoint, setUsePoint] = useState('');

  useEffect(() => {
    fetch('api주소').then(res => res.json())(result =>
      setUserInfo(prev => ({
        ...prev,
        memberPoint: result.memberPoint,
        totalPrice: result.totalPrice,
      })),
    );
  }, []);

  const handleInput = e => {
    const { value, name } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  // const memberPoint = userInfo.memberPoint;
  // if (memberPoint > 0 && memberPoint <= )

  const completeBooking = e => {
    e.preventDefault();

    const { deductionPoint } = userInfo;
    if (deductionPoint > 0 && deductionPoint <= userInfo.memberPoint) {
      // 여기서 API로 포인트 차감 및 결제를 처리하는 로직을 추가할 수 있습니다.
      // 현재 코드는 콘솔에 결과만 출력합니다.
      console.log(`차감된 포인트: ${deductionPoint}`);
      console.log(`남은 포인트: ${userInfo.memberPoint - deductionPoint}`);
    } else {
      console.log('잘못된 포인트 입력');
    }

    fetch('API주소', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userInfo.memberPoint),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      });
  };

  return (
    <div className="payments contents">
      <h1>결제</h1>
      <div className="paymentsInfo">
        <div className="myPoint">
          <div className="usePoint">
            <p className="paymentItem select">포인트결제</p>
            <p className="availablePoints">
              사용 가능한 포인트
              {/* <span> {userInfo.memberPoint}</span> */}
              <span> 1000점</span>
            </p>
            <div className="usingPoint">
              <span>사용할 포인트</span>
              <input
                type="text"
                onChange={handleInput}
                name="deductionPoint"
                value="deductionPoint"
                className="deduction"
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
            최종결제금액 <span>70,000원</span>
            {/* 최종결제금액 <span>{userInfo.totalPrice}</span> */}
          </div>
          <button onClick={completeBooking}>결제</button>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default Payments;
