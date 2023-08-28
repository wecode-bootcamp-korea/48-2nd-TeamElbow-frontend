import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Booking.scss';

const Booking = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //영화선택
  const [movies, setMovies] = useState([]);
  const movieId = searchParams.get('movieId');
  const handleSelect = id => {
    searchParams.set('movieId', id);
    setSearchParams(searchParams);
  };
  useEffect(() => {
    fetch('/data/movieList.json', {})
      .then(res => res.json())
      .then(data => {
        setMovies(data);
      });
  }, []);

  //날짜선택
  const [dateList, setDateList] = useState([]);
  const handleSelectDate = id => {
    searchParams.set('dateId', id);
    setSearchParams(searchParams);
  };

  const dateId = searchParams.get('dateId');
  useEffect(() => {
    if (movieId) {
      fetch('/data/dateList.json', {})
        .then(res => res.json())
        .then(result => {
          setDateList(result);
        });
    }
  }, [movieId]);

  //시간선택
  const timeId = searchParams.get('timeId');
  const handleSelectTime = id => {
    searchParams.set('timeId', id);
    setSearchParams(searchParams);
  };

  //좌석선택하기로 이동
  const handleInputSelect = e => {
    e.preventDefault();

    const selectedAll = {
      selectedMovie: movieId,
      selectedDate: dateId,
      selectedTime: timeId,
    };

    fetch('API주소', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: selectedAll,
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(result => {
        console.log(result);
        if (result !== null) {
          navigate('/');
        }
      });
  };

  //다시 선택하기
  const handleReset = () => {
    setDateList([]);
    setSearchParams('');
  };

  return (
    <div className="booking">
      <div className="contents">
        <div className="bookingTop">
          <h1>영화예매</h1>
          <button className="bookingNavi" onClick={handleReset}>
            예매 다시하기
          </button>
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
            {dateList && dateList.length > 0 && (
              <ul>
                {dateList.map(({ id, date }) => {
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
            )}
          </div>
          <div className="timeList movieListStyle">
            <p className="listName">시간</p>
            <ul>
              {dateList
                .find(dateData => dateData.id == dateId)
                ?.timeList.map(({ id, time, seat }) => {
                  return (
                    <li key={id}>
                      <button
                        className={
                          timeId == id ? 'selectedTimeListBtn' : 'timeListBtn'
                        }
                        onClick={() => handleSelectTime(id)}
                      >
                        <p>{time}</p>
                        <p>{seat}석</p>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="selectedMovie movieListStyle">
            <p className="listName">선택내역</p>
            <div className="infoSelectMoive">
              <div>
                <div className="poster"></div>
                <p className="movieTitle">영화제목</p>
                <p className="movieInfo">상영등급, 날짜, 상영시간</p>
              </div>
              <button className="goToSeatSelect" onClick={handleInputSelect}>
                좌석선택하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
