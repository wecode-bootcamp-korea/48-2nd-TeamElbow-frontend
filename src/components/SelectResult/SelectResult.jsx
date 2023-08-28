import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectResult.scss';

const SelectResult = () => {
  return (
    <div className="selectResult">
      <div className="movieInfo">
        <div className="movieTitle">
          <span>15세 이상</span>
          <p>악마는 구라다를 입는다</p>
        </div>
        <div className="dateTime">
          <p>2023.08.28(월)</p>
          <p>12:00~14:00</p>
        </div>
        <div className="moviePoster">
          <img
            src="https://images.unsplash.com/photo-1692997262378-b44cdc69f54d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1978&q=80"
            alt="악마는 구라다를 입는다"
          />
        </div>
      </div>

      <div className="seatsNumber">
        <p>선택좌석</p>
        <span>D8</span>
      </div>

      <div className="payInfo">
        <p className="count">
          <span>
            성인 <em>2</em>
          </span>
        </p>
        <div className="price">
          <p>결제금액</p>
          <p>
            <span className="colored">0</span>원
          </p>
        </div>
      </div>
      <div className="buttonWrap">
        <button type="button" className="prev">
          이전
        </button>
        <button type="button" className="next">
          다음
        </button>
      </div>
    </div>
  );
  //movieTitle, movieRunningTimeMinute, movieReleaseDate, seatPrice, seatId ,seatIsBooked, memberBirthday
};

export default SelectResult;
