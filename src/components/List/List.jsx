import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.scss';
import movieData from './movieData.json';

const List = () => {
  return (
    <>
      {movieData.map((movie, index) => (
        <li className="list" key={index}>
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
            <button className="btnBooking">예매하기</button>
          </div>
        </li>
      ))}
    </>
  );
};

export default List;
