import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingDone.scss';

const BookingDone = () => {
  const navigate = useNavigate();

  return (
    <div className="bookingDone contents">
      <div className="boxWrap">
        <p className="checkImage"></p>
        <p className="text">예매가 완료되었습니다</p>
        <span>마이티켓 페이지에서 예매내역을 확인하세요</span>
      </div>
      <button
        className="btnConfirm"
        onClick={() => {
          navigate('/my-ticket');
        }}
      >
        마이티켓
      </button>
    </div>
  );
};

export default BookingDone;
