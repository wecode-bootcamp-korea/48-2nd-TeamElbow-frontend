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
    searchParams.delete('timeId');
    searchParams.delete('dateId');
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
    searchParams.delete('timeId');
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
  const goToSelectSeats = e => {
    e.preventDefault();
    // 실제로 최종적으로 결제 시 백엔드에 보내줄 데이터는 searchParams로 저장, 페이지 이동 시에도 searchParams 달아서 이동
    // 각 페이지별로 보여줘야 하는 데이터(e.g. thumbnail, movieTitle)는 location 객체로 전달

    // 백엔드에 전달할 필요는 없지만, 각 페이지에 보여야 하기 때문에 쭉 전달해야 할 데이터
    // const movieInfo = {
    //   movieTitle,
    //   moviePosterImageUrl,
    // screeningId,
    //movieMinimumWatchingAge,
    //movieRunningTimeMinute
    // };

    navigate(`/select-seats?${searchParams}`);
    // navigate(`/select-seats?${searchParams}`, { state: movieInfo });
  };

  //다시 선택하기
  const handleReset = () => {
    setDateList([]);
    setSelectedMovie('');
    setSearchParams('');
  };

  //sorting
  const [activeSort, setActiveSort] = useState('bookingRate');
  const bookingRate = '';
  const alphabet = '';
  const [uri, setUri] = useState(bookingRate);
  // const API = 'API주소';

  const handleSort = sortType => {
    setActiveSort(sortType);
    if (sortType === 'bookingRate') {
      setUri(bookingRate);
    } else if (sortType === 'alphabet') {
      setUri(alphabet);
    }
  };

  useEffect(() => {
    fetch(uri)
      .then(response => response.json())
      .then(result => {
        setMovies(result);
      });
  }, [uri]);

  //선택영화
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    if (movieId) {
      fetch('/data/movieList.json', {})
        .then(res => res.json())
        .then(data => {
          const selectedMovieInfo = data.find(
            movie => movie.id === parseInt(movieId),
          );
          setSelectedMovie(selectedMovieInfo);
        });
    }
  }, [movieId]);

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
          <div className="selectMovieList movieListStyle">
            <p className="listName">영화</p>
            <div className="sortCategory">
              <button
                className={activeSort === 'bookingRate' ? 'select' : null}
                sort-type="bookingRate"
                onClick={() => handleSort('bookingRate')}
              >
                예매순
              </button>
              <button
                className={activeSort === 'alphabet' ? 'select' : null}
                sort-type="alphabet"
                onClick={() => handleSort('alphabet')}
              >
                가나다순
              </button>
            </div>
            <ul>
              {movies.map(({ id, movieTitle, movieMinimumWatchingAge }) => {
                return (
                  <li key={id}>
                    <button
                      className={movieId == id ? 'selected' : 'listBtn'}
                      onClick={() => handleSelect(id)}
                    >
                      <span>{movieMinimumWatchingAge}</span>
                      {movieTitle}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="dateList">
            <p className="listName">날짜</p>
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
          </div>
          <div className="timeList movieListStyle">
            <p className="listName">시간</p>
            <ul>
              {dateList
                .find(dateData => dateData.id == dateId)
                ?.theater.map(({ id, theaterId, timeList }) => {
                  return (
                    <div key={id}>
                      <p>{theaterId}관</p>
                      {timeList.map(({ id, time, seat }) => {
                        return (
                          <li key={id}>
                            <button
                              className={
                                timeId == id
                                  ? 'selectedTimeListBtn'
                                  : 'timeListBtn'
                              }
                              onClick={() => handleSelectTime(id)}
                            >
                              <p>{time}</p>
                              <p>{seat}석</p>
                            </button>
                          </li>
                        );
                      })}
                    </div>
                  );
                })}
            </ul>
          </div>
          <div className="selectedMovie movieListStyle">
            <p className="listName">선택내역</p>
            <div className="infoSelectMoive">
              {selectedMovie && (
                <div className="info">
                  <div className="poster">
                    <img src={selectedMovie.moviePosterImageUrl} />
                  </div>
                  <p className="movieTitle">{selectedMovie.movieTitle}</p>
                  <p className="movieInfo">
                    {selectedMovie.movieMinimumWatchingAge} 관람가
                  </p>
                  <p className="movieInfo">
                    상영시간
                    {selectedMovie.movieRunningTimeMinute}분
                  </p>
                </div>
              )}
              <button className="goToSeatSelect" onClick={goToSelectSeats}>
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
