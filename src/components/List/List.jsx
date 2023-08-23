import React from 'react';
import { useNavigate } from 'react-router-dom';
import './List.scss';

const List = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="list"></div>;
    </>
  );
  //movieTitle, bookingRatePercent, movieReleaseDate, moviePosterImageUrl
};

export default List;
