import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CountSelector.scss';

const CountSelector = ({ setCounters, audienceType, counters }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedAudienceKey, setSelectedAudienceKey] = useState(null);

  const totalCount = counters.adult + counters.teenager + counters.senior;
  useEffect(() => {
    setIsActive(totalCount > 8);
  }, [counters]);

  const decrease = audienceKey => {
    if (counters[audienceKey] > 0) {
      setCounters(prev => ({ ...prev, [audienceKey]: prev[audienceKey] - 1 }));
      setIsActive(false);
    }
  };

  const increase = audienceKey => {
    if (totalCount < 8) {
      setCounters(prev => ({ ...prev, [audienceKey]: prev[audienceKey] + 1 }));
      setSelectedAudienceKey(audienceKey);
    } else if (totalCount === 8) {
      alert('최대 8인까지 예매가능합니다');
      setIsActive(false);
    }
  };

  return (
    <div className="countSelector">
      {Object.keys(audienceType).map(audienceKey => (
        <div className="count" key={audienceKey}>
          <p>{audienceType[audienceKey]}</p>
          <div className="countBtn">
            <button
              className="decrease"
              onClick={() => decrease(audienceKey)}
              disabled={isActive}
            >
              -
            </button>
            <span className="number">{counters[audienceKey]}</span>
            <button
              className="increase"
              onClick={() => increase(audienceKey)}
              disabled={isActive}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountSelector;
