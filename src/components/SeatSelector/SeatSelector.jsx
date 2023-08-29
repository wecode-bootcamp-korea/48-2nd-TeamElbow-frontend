import React from 'react';
import './SeatSelector.scss';

const SeatSelector = () => {
  const Seat = () => <div className="seatBlock common" />;
  return (
    <div className="seatSelector">
      <div className="seatsContainer">
        <div className="screen">screen</div>
        <div className="seatGroup">
          <div className="row A">
            <div className="rowBlock">A</div>
            {Array.from({ length: 10 }, (_, index) => (
              <Seat key={index} />
            ))}
          </div>
          <div className="row B">
            <div className="rowBlock">B</div>
            {Array.from({ length: 10 }, (_, index) => (
              <Seat key={index} />
            ))}
          </div>
          <div className="row C">
            <div className="rowBlock">C</div>
            {Array.from({ length: 10 }, (_, index) => (
              <Seat key={index} />
            ))}
          </div>
          <div className="row D">
            <div className="rowBlock">D</div>
            {Array.from({ length: 10 }, (_, index) => (
              <Seat key={index} />
            ))}
          </div>
          <div className="row E">
            <div className="rowBlock">E</div>
            {Array.from({ length: 10 }, (_, index) => (
              <Seat key={index} />
            ))}
          </div>
          <div className="row F">
            <div className="rowBlock">F</div>
            {Array.from({ length: 10 }, (_, index) => (
              <Seat key={index} />
            ))}
          </div>
        </div>
      </div>
      <ul className="seatsState">
        <li>
          <div className="seatBlock selected"></div>
          <span>선택</span>
        </li>
        <li>
          <div className="seatBlock booked"></div>
          <span>예매완료</span>
        </li>
        <li>
          <div className="seatBlock blocked"></div>
          <span>선택불가</span>
        </li>
        <li>
          <div className="seatBlock common"></div>
          <span>일반</span>
        </li>
        <li>
          <div className="seatBlock disabled"></div>
          <span>장애인석</span>
        </li>
      </ul>
    </div>
  );
};

export default SeatSelector;
