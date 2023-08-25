import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './List.scss';

const List = () => {
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/movieData.json')
      .then(res => res.json())
      .then(result => setMovieList(result));
  }, []);

  return (
    <>
      {movieList.map((movie, index) => (
        <li
          className="list"
          key={index}
          onClick={() => navigate(`/movie-detail/${movie.id}`)}
        >
          <div className="moviePoster">
            <p className="rank">{index + 1}</p>
            <img
              className="moviePosterImage"
              src={movie.moviePosterImageUrl}
              alt={movie.movieTitle}
            />
          </div>
          <div className="movieInfo">
            <p className="movieTitle">{movie.movieTitle}</p>
            <div className="rateDate">
              <span className="rate">예매율 {movie.bookingRatePercent}%</span>
              <span className="date">개봉일 {movie.movieReleaseDate}</span>
            </div>
            <button
              className="btnBooking"
              onClick={e => {
                e.stopPropagation();
                navigate('/booking');
              }}
            >
              예매하기
            </button>
          </div>
        </li>
      ))}
    </>
  );
};

export default List;
