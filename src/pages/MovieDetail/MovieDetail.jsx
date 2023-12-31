import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetail.scss';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const realDate = movie.movieReleaseDate?.split('T')[0];

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://172.30.72.116:3000/movies/detail?movieId=${movieId}`)
      .then(res => res.json())
      .then(result => setMovie(result));
  }, []);

  return (
    <div className="movieDetail contents">
      <div className="moviePoster">
        <img
          className="moviePosterImage"
          src={movie.moviePosterImageUrl}
          alt={movie.movieTitle}
        />
      </div>

      <div className="textBox">
        <p className="movieTitle">{movie.movieTitle}</p>
        <div className="rateRank">
          <span className="rate">예매율 {movie.bookingRatePercent}%</span>
          <span className="rank">박스오피스 {movie.boxofficeRanking}위</span>
        </div>
        <div className="movieSpec">
          <p>감독 : {movie.movieDirector}</p>
          <p>출연진 : {movie.movieActor}</p>
          <p>등급 : {movie.movieMinimumWatchingAge} 관람가</p>
          <p>러닝타임 : {movie.movieRunningTimeMinute}분</p>
          <p>언어 : {movie.movieLanguage}</p>
          <p>개봉일 : {realDate}</p>
          <p className="spacingPhrase">줄거리 : {movie.movieDescription}</p>
          <button
            className="btnBooking"
            onClick={() => {
              navigate(`/booking?movieId=${movieId}`);
            }}
          >
            예매하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
