import React, { useState, useEffect } from 'react';
import './MovieList.scss';
import List from '../../components/List/List';

const MovieList = () => {
  const [activeSort, setActiveSort] = useState('bookingRate');
  const [movieList, setMovieList] = useState([]);
  const bookingRate = 'http://10.58.52.200:3000/movies/list?sortBy=bookingRate';
  const alphabet = 'http://10.58.52.200:3000/movies/list?sortBy=alphabet';
  const [uri, setUri] = useState(bookingRate);

  const handleSortClick = sortType => {
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
        setMovieList(result);
      })
      .catch(() => {
        alert('문제발생');
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
