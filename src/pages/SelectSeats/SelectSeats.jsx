import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectSeats.scss';
import SelectResult from '../../components/SelectResult/SelectResult';
import CountSelector from '../../components/CountSelector/CountSelector';
import SeatSelector from '../../components/SeatSelector/SeatSelector';

const SelectSeats = () => {
  const [counters, setCounters] = useState({
    adult: 0,
    teenager: 0,
    senior: 0,
  });

  const audienceType = {
    adult: '성인',
    teenager: '청소년',
    senior: '우대',
  };

  return (
    <div className="selectSeats contents">
      <div className="bookingTop">
        <h1>영화예매</h1>
        <button type="button" className="resetButton">
          초기화
        </button>
      </div>
      <div className="seatSection">
        <div className="selectArea">
          <CountSelector
            audienceType={audienceType}
            counters={counters}
            setCounters={setCounters}
          ></CountSelector>
          <SeatSelector></SeatSelector>
        </div>
        <SelectResult
          audienceType={audienceType}
          counters={counters}
        ></SelectResult>
      </div>
    </div>
  );
  //movieTitle, movieRunningTimeMinute, movieReleaseDate, seatPrice, seatId ,seatIsBooked, memberBirthday
};

export default SelectSeats;
