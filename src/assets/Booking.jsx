import React, { useState, useEffect } from 'react';
import './Booking.scss';

const Booking = () => {
  const [movies, setMoives] = useState([]);
  useEffect(() => {
    fetch('/data/movieList.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setMoives(data);
      });
  }, []);

  const [movieDate, setMovieDate] = useState([]);
  useEffect(() => {
    fetch('/data/dateList.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setMovieDate(data);
      });
  }, []);

  const [timeList, setTimeList] = useState([]);
  useEffect(() => {
    fetch('/data/timeList.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setTimeList(data);
      });
  }, []);

  return (
    <div className="booking">
      <div className="contents">
        <div className="bookingTop">
          <h1>영화예매</h1>
          <button className="bookingNavi">예매 다시하기</button>
        </div>
        <div className="selectBox">
          <div className="movieList movieListStyle">
            <p className="listName">영화</p>
            <div className="sortCategory">
              <p className="select">예매순</p>
              <p>가나다순</p>
            </div>
            <ul>
              {movies.map(movie => {
                return (
                  <li key={movie.id}>
                    <button className="listBtn">
                      <span>{movie.ageall}</span>
                      {movie.movieName}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="dateList">
            <p className="listName">날짜</p>
            <ul>
              {movieDate.map(movie => {
                return (
                  <li key={movie.id}>
                    <button className="listBtn">{movie.date}</button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="timeList movieListStyle">
            <p className="listName">시간</p>
            <ul>
              {timeList.map(data => {
                return (
                  <li key={data.id}>
                    <button className="timeListBtn">
                      <p>{data.time}</p>
                      <p>{data.seat}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="selectedMovie movieListStyle">
            <p className="listName">선택내역</p>
            <div className="infoSelectMoive">
              <div className="poster"></div>
              <p className="movieTitle">영화제목</p>
              <p className="movieInfo">상영등급, 날짜, 상영시간</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
