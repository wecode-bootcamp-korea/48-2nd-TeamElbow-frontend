import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyTicket.scss';

const MyTicket = () => {
  const navigate = useNavigate();

  return (
    <div className="myTicket contents">
      <div className="boxWrap">
        <div className="qrWrap">
          <div className="title">
            <span className="age">12세 이상</span>
            <p>악마는 구라다를 입는다</p>
            <span>2023.9.1 (금) 18:15</span>
          </div>
          <div className="qr">
            <img src="/images/qr-code.png" alt="qr" />
          </div>
        </div>
        <div className="detailInfo">
          <p>
            예매번호<span>9626-274-22022</span>
          </p>
          <p>
            관람인원<span>성인 2명</span>
          </p>
          <p>
            좌석정보<span>G열 9~10</span>
          </p>
          <p>
            결제정보<span>28,000원</span>
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
