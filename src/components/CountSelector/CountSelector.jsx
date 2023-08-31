import React from 'react';
import './CountSelector.scss';

const CountSelector = ({ setCounters, audienceType, counters }) => {
  const totalCount = counters.adult + counters.teenager + counters.senior;

  const decrease = audienceKey => {
    if (counters[audienceKey] > 0) {
      setCounters(prev => ({ ...prev, [audienceKey]: prev[audienceKey] - 1 }));
    }
  };

  const increase = audienceKey => {
    if (totalCount < 8) {
      setCounters(prev => ({ ...prev, [audienceKey]: prev[audienceKey] + 1 }));
    } else if (totalCount === 8) {
      alert('최대 8인까지 예매가능합니다');
    }
  };

  return (
    <div className="countSelector">
      {Object.keys(audienceType).map(audienceKey => (
        <div className="count" key={audienceKey}>
          <p>{audienceType[audienceKey]}</p>
          <div className="countBtn">
            <button className="decrease" onClick={() => decrease(audienceKey)}>
              -
            </button>
            <span className="number">{counters[audienceKey]}</span>
            <button className="increase" onClick={() => increase(audienceKey)}>
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountSelector;
