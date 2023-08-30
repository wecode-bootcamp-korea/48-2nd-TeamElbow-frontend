import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SelectResult.scss';

const SelectResult = ({ audienceType, counters }) => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const navigate = useNavigate();

  const goPayments = () => {
    // fetch('API', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     seatId: selectedSeatsId,
    //     totalPrice: totalPrice,
    //     screeningId: movie.screeningId,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(result => {
    //     if (result.message === 'SUCCESS') {
    //       localStorage.setItem('token', result.accessToken);
    //       navigate('/payments');
    //     } else {
    //       alert('좌석을 다시 선택하세요');
    //     }
    //   });
    navigate('/payments');
  };

  return (
    <div className="selectResult">
      <div className="movieInfo">
        <div className="movieTitle">
          <span>{movie.movieMinimumWatchingAge}</span>
          <p>{movie.movieTitle}</p>
        </div>
        <div className="dateTime">
          <p>{movie.movieDate}</p>
          <p>{movie.movieTime}</p>
        </div>
        <div className="moviePoster">
          <img src={movie.moviePosterImageUrl} alt={movie.movieTitle} />
        </div>
      </div>

      <div className="seatsNumber">
        <p>선택좌석</p>
        <span>D8</span>
        {/* <span>{selectedSeatsId}</span> */}
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
            <span className="colored">totalPrice</span>원
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
