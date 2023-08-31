import React, { useState } from 'react';
import SelectResult from '../../components/SelectResult/SelectResult';
import CountSelector from '../../components/CountSelector/CountSelector';
import SeatSelector from '../../components/SeatSelector/SeatSelector';
import './SelectSeats.scss';

const DEFAULT_COUNTERS = {
  adult: 0,
  teenager: 0,
  senior: 0,
};

const SelectSeats = () => {
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [counters, setCounters] = useState(DEFAULT_COUNTERS);

  const audienceType = {
    adult: '성인',
    teenager: '청소년',
    senior: '우대',
  };

  const handleReset = () => {
    setSelectedSeat([]);
    setCounters(DEFAULT_COUNTERS);
  };

  const totalCount = counters.adult + counters.teenager + counters.senior;

  return (
    <div className="selectSeats contents">
      <div className="bookingTop">
        <h1>영화예매</h1>
        <button type="button" className="resetButton" onClick={handleReset}>
          초기화
        </button>
      </div>
      <div className="seatSection">
        <div className="selectArea">
          <CountSelector
            audienceType={audienceType}
            counters={counters}
            setCounters={setCounters}
          />
          <SeatSelector
            selectedSeat={selectedSeat}
            setSelectedSeat={setSelectedSeat}
            totalCount={totalCount}
          />
        </div>
        <SelectResult
          audienceType={audienceType}
          counters={counters}
          selectedSeat={selectedSeat}
        />
      </div>
    </div>
  );
};

export default SelectSeats;
