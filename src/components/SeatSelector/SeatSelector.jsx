import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SeatSelector.scss';

const SeatSelector = ({ selectedSeat, setSelectedSeat, totalCount }) => {
  const [seatsData, setSeatsData] = useState([]);
  const { screeningId } = useParams();
  useEffect(() => {
    // fetch(
    //   `http://127.0.0.1:3000/booking/seatsInformation?screeningId=1${screeningId}`,
    // )
    fetch('/data/seatData.json')
      .then(res => res.json())
      .then(result => setSeatsData(result));
  }, []);

  const handleSeatClick = (seatRow, seatId, seatColumn) => {
    if (selectedSeat.length >= totalCount) {
      alert('최대 선택 가능 좌석 수를 초과하였습니다.');
      return;
    }
    const arr = [...selectedSeat];
    const clickedSeat = arr.find(
      seat =>
        seat.seatId === seatId &&
        seat.seatRow === seatRow &&
        seat.seatColumn === seatColumn,
    );

    if (clickedSeat) {
      const idx = arr.indexOf(clickedSeat);
      arr.splice(idx, 1);
      setSelectedSeat(arr);
    } else {
      setSelectedSeat(prev => [...prev, { seatId, seatRow, seatColumn }]);
    }
  };

  const Seat = ({ seat, selectedSeat, handleSeatClick, rowData }) => (
    <div
      className={`seatBlock ${seat.isSeatBooked ? 'booked' : 'common'} ${
        selectedSeat.some(
          s =>
            s.seatId === seat.seatId &&
            s.seatRow === rowData.seatRow &&
            s.seatColumn === seat.seatColumn,
        )
          ? 'selected'
          : ''
      }`}
      onClick={() =>
        handleSeatClick(rowData.seatRow, seat.seatId, seat.seatColumn)
      }
    ></div>
  );
  return (
    <div className="seatSelector">
      <div className="seatsContainer">
        <div className="screen">screen</div>
        <div className="seatGroup">
          {seatsData.map(rowData => (
            <div className={`row ${rowData.seatRow}`} key={rowData.seatRow}>
              <div className="rowBlock">{rowData.seatRow}</div>
              {rowData.seats.map(seat => (
                <Seat
                  key={seat.seatId}
                  seat={seat}
                  selectedSeat={selectedSeat}
                  handleSeatClick={handleSeatClick}
                  rowData={rowData}
                />
              ))}
            </div>
          ))}
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
