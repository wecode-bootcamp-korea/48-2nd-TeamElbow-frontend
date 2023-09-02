import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './SelectResult.scss';

const SelectResult = ({ audienceType, counters, selectedSeat }) => {
  const token = localStorage.getItem('token');
  const [movie, setMovie] = useState({});
  const [price, setPrice] = useState({});
  const bookingId = movie.bookingId;
  const [searchParams, setSearchParams] = useSearchParams();
  const screeningId = searchParams.get('screeningId');

  const navigate = useNavigate();

  const movieInformation = async () => {
    const response = await fetch(
      `http://10.58.52.207:3000/booking/movieInformation?screeningId=${screeningId}`,
    );
    const result = await response.json();
    setMovie(result);
  };

  const ticketPrice = async () => {
    const response = await fetch(
      `http://10.58.52.207:3000/booking/ticketPrice?screeningId=${screeningId}`,
    );
    const result = await response.json();
    setPrice(result);
  };

  useEffect(() => {
    movieInformation();
    ticketPrice();
  }, []);

  const goPayments = () => {
    const isAllSelected =
      Object.values(counters).reduce((acc, cur) => cur + acc, 0) ===
        selectedSeat.length && selectedSeat.length !== 0;

    if (!isAllSelected) {
      alert('인원과 좌석을 선택해 주세요.');

      return;
    }

    fetch('API', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        seatId: selectedSeat,
        totalPrice: calculateTotalPrice(),
        screeningId: movie.screeningId,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          navigate(`/payments/${bookingId}`);
        } else {
          alert('좌석을 다시 선택하세요');
        }
      });
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    const isEarlybird = '${movie.isEarlybird}';

    Object.keys(audienceType).forEach(selectedAudienceKey => {
      const audiencePrice = isEarlybird
        ? morningPrices[selectedAudienceKey]
        : regularPrices[selectedAudienceKey];

      totalPrice += audiencePrice * counters[selectedAudienceKey];
    });

    return totalPrice;
  };

  const morningPrices = {
    adult: 18000,
    teenager: 8000,
    senior: 8000,
  };

  const regularPrices = {
    adult: 20000,
    teenager: 10000,
    senior: 10000,
  };

  return (
    <div className="selectResult">
      <div className="movieInfo">
        <div className="movieTitle">
          <span>{movie.movieMinimumWatchingAge}</span>
          <p>{movie.movieTitle}</p>
        </div>
        <div className="dateTime">
          <p>{movie.screeningDate}</p>
          <p>{movie.screeningTime}</p>
        </div>
        <div className="moviePoster">
          <img src={movie.moviePosterImageUrl} alt={movie.movieTitle} />
        </div>
      </div>

      <div className="seatsNumber">
        <p>선택좌석</p>
        <span>
          {selectedSeat
            .map(seat => `${seat.seatRow}${seat.seatColumn}`)
            .join(', ')}
        </span>
      </div>

      <div className="payInfo">
        {Object.keys(audienceType).map(selectedAudienceKey => (
          <p className="count" key={selectedAudienceKey}>
            {counters[selectedAudienceKey] > 0 && (
              <span>
                {audienceType[selectedAudienceKey]}
                <em>{counters[selectedAudienceKey]}</em>
              </span>
            )}
          </p>
        ))}
        <div className="price">
          <p>결제금액</p>
          <p>
            <span className="colored">
              {calculateTotalPrice().toLocaleString()}
            </span>
            원
          </p>
        </div>
      </div>
      <div className="buttonWrap">
        <button
          type="button"
          className="prev"
          onClick={() => {
            navigate('/booking');
          }}
        >
          이전
        </button>
        <button type="button" className="next" onClick={goPayments}>
          다음
        </button>
      </div>
    </div>
  );
};

export default SelectResult;
