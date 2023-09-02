import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Booking.scss';
const Booking = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //영화선택
  const [movies, setMovies] = useState([]);
  const movieId = searchParams.get('movieId');
  useEffect(() => {
    fetch('http://10.58.52.205:3000/booking/list?sortBy=bookingRate')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSelect = id => {
    searchParams.set('movieId', id);
    searchParams.delete('timeId');
    searchParams.delete('date');
    setSearchParams(searchParams);

    setDateList([]);
    setTimeList([]);

    fetch(`http://10.58.52.205:3000/booking/date?movieId=${id}`, {
      method: 'GET',
      header: JSON.stringify({
        movieId: id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        setDateList(result);
      })
      .catch(error => {
        console.error(error);
        setDateList([]);
      });
  };

  //날짜선택
  const [dateList, setDateList] = useState([]);
  const date = searchParams.get('date');

  const realDate = date?.split('T')[0];

  const handleSelectDate = id => {
    searchParams.set('date', id);
    searchParams.delete('timeId');
    setSearchParams(searchParams);

    if (realDate) {
      fetch(
        `http://10.58.52.205:3000/booking/schedule?movieId=${movieId}&date=${realDate}`,
        {
          method: 'GET',
        },
      )
        .then(res => res.json())
        .then(result => {
          setTimeList(result);
        })
        .catch(error => {
          console.error(error);
          setTimeList([]);
        });
    }
  };

  //시간선택
  const [timeList, setTimeList] = useState([]);
  const timeId = searchParams.get('timeId');
  const handleSelectTime = id => {
    searchParams.set('timeId', id);
    setSearchParams(searchParams);

    if (timeId) {
      setIsInputValid(true);
    }
  };

  //좌석선택하기로 이동
  const [isInputValid, setIsInputValid] = useState(false);
  const goToSelectSeats = e => {
    e.preventDefault();
    navigate(`/select-seats?screeningId=${timeId} `);
  };

  //다시 선택하기
  const handleReset = () => {
    setDateList([]);
    setTimeList([]);
    setSelectedMovie('');
    setSearchParams('');
    setIsInputValid(false);
  };

  //sorting
  const [activeSort, setActiveSort] = useState('bookingRate');
  const bookingRate =
    'http://10.58.52.205:3000/booking/list?sortBy=bookingRate';
  const alphabet = 'http://10.58.52.205:3000/booking/list?sortBy=alphabet';
  const [uri, setUri] = useState(bookingRate);

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
      fetch('http://10.58.52.205:3000/booking/list?sortBy=bookingRate', {})
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
              {dateList.map(result => {
                return (
                  <li key={result.date}>
                    <button
                      className={date == result.date ? 'selected' : 'listBtn'}
                      onClick={() => handleSelectDate(result.date)}
                    >
                      {result.date}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="timeList movieListStyle">
            <p className="listName">시간</p>
            <ul>
              {timeList.map(item => {
                return (
                  <div key={item.screeningId}>
                    <p className="theaterName">{item.theaterName}</p>
                    <li>
                      <button
                        className={
                          timeId == item.screeningId
                            ? 'selectedTimeListBtn'
                            : 'timeListBtn'
                        }
                        onClick={() => handleSelectTime(item.screeningId)}
                      >
                        <p>{item.screeningTime}</p>
                        <p>{item.remainingSeats}석</p>
                      </button>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="selectedMovie movieListStyle">
            <p className="listName">선택내역</p>
            <div className="infoSelectMoive">
              {!selectedMovie && <div className="info"></div>}
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
              <button
                className="goToSeatSelect"
                disabled={!isInputValid}
                onClick={goToSelectSeats}
              >
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
