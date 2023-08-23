import React from 'react';
import './MovieList.scss';
import '../../styles/variables.scss';
import List from '../../components/List/List';

const MovieList = () => {
  return (
    <div className="movieList">
      <div className="contents">
        <h2 className="title">무비차트</h2>
        <div className="sortTab">
          <button type="button" class="btnSort on" sort-type="rate">
            예매율순
          </button>
          <button type="button" class="btnSort" sort-type="title">
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
