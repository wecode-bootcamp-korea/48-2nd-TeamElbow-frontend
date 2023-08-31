import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SelectResult.scss';

const SelectResult = ({ audienceType, counters, selectedSeat }) => {
  const token = localStorage.getItem('token');
  const [movie, setMovie] = useState({});
  const [price, setPrice] = useState({});
  const { screeningId } = useParams();
  const navigate = useNavigate();

  const movieInformation = async () => {
    const response = await fetch(
      `http://127.0.0.1:3000/booking/movieInformation?screeningId=${screeningId}`,
    );
    const result = await response.json();

    setMovie({ ...result, isEarlybird: result.isEarlybird });

    return result;
  };

  const ticketPrice = async () => {
    return await fetch(
      'http://127.0.0.1:3000/booking/ticketPrice?screeningId=1&seatId=1&audienceType=normal&seatId=11&audienceType=teenager',
    );
  };

  useEffect(() => {
    movieInformation()
      .then(res => res.json())
      .then(result => setMovie(result));

    ticketPrice()
      .then(res => res.json())
      .then(result => setPrice(result));
  }, []);

  const goPayments = () => {
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
          navigate('/payments');
        } else {
          alert('좌석을 다시 선택하세요');
        }
      });
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    const isEarlybird = movie.isEarlybird;

    Object.keys(audienceType).forEach(selectedAudienceKey => {
      const audiencePrice = isEarlybird
        ? morningPrices[selectedAudienceKey]
        : regularPrices[selectedAudienceKey];

      totalPrice += audiencePrice * counters[selectedAudienceKey];
    });
    return totalPrice;
  };

  const morningPrices = {
    normal: 18000,
    teenager: 8000,
    senior: 8000,
  };

  const regularPrices = {
    normal: 20000,
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
            <span className="colored">{calculateTotalPrice()}</span>원
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
