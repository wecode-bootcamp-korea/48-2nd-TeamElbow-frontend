import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyTicket.scss';

const MyTicket = () => {
  const [booking, setBooking] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://10.58.52.244:3000/member/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        memberId: '',
      }),
    }).then(result => {
      if (result.message === 'SUCCESS') {
        fetch('bookingAPI')
          .then(res => res.json())
          .then(result => setBooking(result))
          .catch(error => {
            console.error('Error fetching booking:', error);
          });
      } else {
        alert('예매 내역이 없습니다.');
        navigate('/');
      }
    });
  }, []);

  return (
    <div className="myTicket contents">
      <div className="boxWrap">
        <div className="qrWrap">
          <div className="title">
            <span className="age">{booking.movieMinimumWatchingAge}</span>
            <p>{booking.movieTitle}</p>
            <span>
              {booking.screeningDate} {booking.screeningTime}
            </span>
            <span>{booking.theaterName}</span>
          </div>
          <div className="qr">
            <img src="/images/qr-code.png" alt="qr" />
          </div>
        </div>
        <div className="detailInfo">
          <p>
            예매번호<span>{booking.bookingNumber}</span>
          </p>
          <p>
            관람인원
            <span>
              {booking.audienceType} {booking.counters}
            </span>
          </p>
          <p>
            좌석정보<span>{booking.seatId}</span>
          </p>
          <p>
            결제정보<span>{booking.totalPrice}</span>
          </p>
        </div>
        <div className="notice">
          <p className="colored">
            영화 상영시작시간 15분 전까지 취소가 가능하며 캡쳐화면은 입장이
            제한될 수 있습니다.
          </p>
          <p>
            입장 지연에 따른 관람 불편을 최소화하기 위해 본 영화는 10분 후
            상영이 시작됩니다.
          </p>
        </div>
        <div className="banner">
          <img src="/images/img_banner.png" alt="멤버십 안내" />
        </div>
      </div>
    </div>
  );
};

export default MyTicket;
