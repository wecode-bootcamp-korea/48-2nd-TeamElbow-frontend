import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CountSelector.scss';

const CountSelector = () => {
  // const {  }
  // const handleClick = () => {};
  return (
    <div className="countSelector">
      <div className="count">
        <p>성인</p>
        <div className="countBtn">
          <button className="decrease">-</button>
          <span className="number">0</span>
          <button className="increase">+</button>
        </div>
      </div>
      <div className="count">
        <p>청소년</p>
        <div className="countBtn">
          <button className="decrease">-</button>
          <span className="number">0</span>
          <button className="increase">+</button>
        </div>
      </div>
      <div className="count">
        <p>우대</p>
        <div className="countBtn">
          <button className="decrease">-</button>
          <span className="number">0</span>
          <button className="increase">+</button>
        </div>
      </div>
    </div>
  );
};

export default CountSelector;