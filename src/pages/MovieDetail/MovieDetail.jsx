import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.scss';
import movieData from '../../components/List/movieData.json';

const MovieDetail = () => {
  // const { movieId } = useParams();
  // const [movie, setMovie] = useState({});

  // console.log(params);

  // useEffect(() => {
  //   fetch(`api/movie-datail/${movieId}`)
  //     .then(response => response.json())
  //     .then(result => setMovie(result));
  // }, []);

  // const isEmpty = Object.keys(movie).length === 0;
  // if (isEmpty) return null;

  return (
    <>
      {movieData((movie, index) => (
        <div className="movieDetail">
          <div className="contents">
            <div className="moviePoster">
              <img
                className="moviePosterImage"
                src={movie.moviePosterImageUrl}
                alt={movie.movieTitle}
              />
            </div>
            <div className="movieInfo">
              <p className="movieTitle">{movie.movieTitle}</p>
              <div className="rateRank">
                <span className="rate">예매율 {movie.bookingRatePercent}%</span>
                <span className="rank">박스오피스 {index + 1}위</span>
              </div>
              <div className="movieSpec">
                <p className="movieDirector">감독 : {movie.movieDirector}</p>
                <p className="movieActor">출연진 : {movie.movieActor}</p>
                <p className="movieAge">
                  등급 : {movie.movieMinimumWatchingAge}세 이상 관람가
                </p>
                <p className="movieTime">
                  러닝타임 : {movie.movieRunningTimeMinute}분
                </p>
                <p className="movieLanguage">국가 : {movie.movieLanguage}</p>
              </div>

              <button className="btnBooking">예매하기</button>
            </div>
          </div>
        </div>
      ))}
    </>
    // movieDescription, movieRunningTimeMinute, movieMinimumWatchingAge, movieLanguage
    //감독 : 크리스토퍼 놀란 장르 : 드라마, 스릴러 / 180 분 등급 : 15세이상관람가 개봉일 : 2023.08.15
    //출연진 : 킬리언 머피, 에밀리 블런트, 맷 데이먼, 로버트 다우니 주니어, 플로렌스 퓨, 조쉬 하트넷, 케에시 에플렉, 라미 말렉, 케네스 브레스너
  );
};

export default MovieDetail;
