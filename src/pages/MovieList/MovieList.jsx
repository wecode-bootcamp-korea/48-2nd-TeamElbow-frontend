import React, { useState, useEffect } from 'react';
import './MovieList.scss';
import List from '../../components/List/List';

const MovieList = () => {
  const [activeSort, setActiveSort] = useState('bookingRate');
  const [uri, setUri] = useState('');
  const [movieList, setMovieList] = useState([]);
  const bookingRate = 'http://localhost:3000/movies/list?sortBy=bookingRate';
  const alphabet = 'http://localhost:3000/movies/list?sortBy=alphabet';

  const handleSortClick = sortType => {
    setActiveSort(sortType);
    if (sortType === bookingRate) {
      setUri('http://localhost:3000/movies/list?sortBy=bookingRate');
    } else if (sortType === alphabet) {
      setUri('http://localhost:3000/movies/list?sortBy=alphabet');
    }
  };

  useEffect(() => {
    fetch(uri)
      .then(response => response.json())
      .then(result => {
        setMovieList(result);
      });
  }, [uri]);

  return (
    <div className="movieList">
      <div className="contents">
        <h2 className="title">무비차트</h2>
        <div className="sortTab">
          <button
            type="button"
            className={activeSort === 'bookingRate' ? 'btnSort on' : 'btnSort'}
            sort-type="bookingRate"
            onClick={() => handleSortClick('bookingRate')}
          >
            예매율순
          </button>
          <button
            type="button"
            className={activeSort === 'alphabet' ? 'btnSort on' : 'btnSort'}
            sort-type="alphabet"
            onClick={() => handleSortClick('alphabet')}
          >
            가나다순
          </button>
        </div>
        <div className="listContainer">
          <ol className="listWrap">
            <List />
          </ol>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
