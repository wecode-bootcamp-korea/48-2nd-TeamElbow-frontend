import React, { useState } from 'react';
import './MovieList.scss';
import List from '../../components/List/List';
import movieData from '../../components/List/movieData.json';

const MovieList = () => {
  const [activeSort, setActiveSort] = useState(null);
  const handleSortClick = sortType => {
    setActiveSort(sortType);
  };

  return (
    <div className="movieList">
      <div className="contents">
        <h2 className="title">무비차트</h2>
        <div className="sortTab">
          <button
            type="button"
            className={activeSort === 'rate' ? 'btnSort on' : 'btnSort'}
            sort-type="rate"
            onClick={() => handleSortClick('rate')}
          >
            예매율순
          </button>
          <button
            type="button"
            className={activeSort === 'title' ? 'btnSort on' : 'btnSort'}
            sort-type="title"
            onClick={() => handleSortClick('title')}
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
