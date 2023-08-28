import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectSeats.scss';
import SelectResult from '../../components/SelectResult/SelectResult';
import CountSelector from '../../components/CountSelector/CountSelector';
import SeatSelector from '../../components/SeatSelector/SeatSelector';

const SelectSeats = () => {
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
          <CountSelector></CountSelector>
          <SeatSelector></SeatSelector>
        </div>
        <SelectResult></SelectResult>
      </div>
    </div>
  );
  //movieTitle, movieRunningTimeMinute, movieReleaseDate, seatPrice, seatId ,seatIsBooked, memberBirthday
};

export default SelectSeats;
