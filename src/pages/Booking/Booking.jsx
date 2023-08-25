import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Booking.scss';

const Booking = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  //영화선택
  const movieId = searchParams.get('movieId');
  const handleSelect = id => {
    searchParams.set('movieId', id);
    setSearchParams(searchParams);
  };
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch('/data/movieList.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setMovies(data);
      });
  }, []);

  //날짜선택
  const handleSelectDate = id => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('dateId', id);
    setSearchParams(newSearchParams);
  };
  const [movieDate, setMovieDate] = useState([]);
  const dateId = searchParams.get('dateId');
  useEffect(() => {
    if (setMovies) {
      fetch('/data/dateList.json', {})
        .then(res => res.json())
        .then(result => {
          setMovieDate(result);
        });
    }
  }, [movieId]);

  //시간선택
  const handleSelectTime = id => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('timeId', id);
    setSearchParams(newSearchParams);
  };
  const [timeList, setTimeList] = useState([]);
  const timeId = searchParams.get('dateId');
  useEffect(() => {
    fetch('/data/dateList.json', {})
      .then(res => res.json())
      .then(data => {
        setTimeList(data);
      });
  }, [movieId]);

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
              {movies.map(({ id, movieName, ageall }) => {
                return (
                  <li key={id}>
                    <button
                      className={movieId == id ? 'selected' : 'listBtn'}
                      onClick={() => handleSelect(id)}
                    >
                      <span>{ageall}</span>
                      {movieName}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="dateList">
            <p className="listName">날짜</p>
            <ul>
              {movieDate.map(({ id, date }) => {
                return (
                  <li key={id}>
                    <button
                      className={dateId == id ? 'selected' : 'listBtn'}
                      onClick={() => handleSelectDate(id)}
                    >
                      {date}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="timeList movieListStyle">
            <p className="listName">시간</p>
            <ul>
              {timeList.map(({ id, time, seat }) => {
                return (
                  <li key={id}>
                    <button
                      className={
                        timeId == id ? 'selectedTimeListBtn' : 'timeListBtn'
                      }
                      onClick={() => handleSelectTime(id)}
                    >
                      <p>{time}</p>
                      <p>{seat}</p>
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
