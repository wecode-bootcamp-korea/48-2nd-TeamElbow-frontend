import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './MyTicket.scss';

const MyTicket = () => {
  const [bookings, setBookings] = useState([]);
  // const { memberId } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const memberId = searchParams.get('bookingId');

  useEffect(() => {
    fetch(`http://10.58.52.205:3000/booking/myTicket?memberId=${memberId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(result => {
        if (result && result.length > 0) {
          console.log(result);
          setBookings(result);
        } else {
          alert('예매 내역이 없습니다.');
          navigate('/');
        }
      });
  }, []);

  return (
    <div className="myTicket contents">
      {bookings.map(booking => (
        <div className="boxWrap">
          <div className="qrWrap" key={booking.bookingId}>
            <div className="title">
              <span className="age">{booking.movieMinimumWatchingAge}</span>
              <p>{booking.movieTitle}</p>
              <span>{booking.screeningTime}</span>
              <span>{booking.theaterName}</span>
            </div>
            <div className="qr">
              <img src="/images/qr-code.png" alt="qr" />
            </div>
          </div>
          <div className="detailInfo">
            <p>
              예매번호<span> {booking.bookingNumber}</span>
            </p>
            <p>
              관람인원
              <span> {booking.counters}명</span>
            </p>
            <p>
              좌석정보<span>{booking.seatId}</span>
            </p>
            <p>
              결제정보
              <span> {Number(booking.totalPrice).toLocaleString()} 원</span>
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
      ))}
    </div>
  );
};

export default MyTicket;
