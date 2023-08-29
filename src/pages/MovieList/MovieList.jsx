import React, { useState, useEffect } from 'react';
import List from '../../components/List/List';
import './MovieList.scss';

const MovieList = () => {
  const [activeSort, setActiveSort] = useState('bookingRate');
  const [movieList, setMovieList] = useState([]);

  // const API = `http://10.58.52.200:3000/movies/list?sortBy=${activeSort}`;
  const API = `/data/movieData.json`;

  const handleSortClick = sortType => {
    setActiveSort(sortType);
  };

  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(result => {
        setMovieList(result);
      });
    // .catch(() => {
    //   alert('문제발생');
    // });
  }, [API]);

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
            {movieList.map(movie => (
              <List key={movie.id} movie={movie} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
