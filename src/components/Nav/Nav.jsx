import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.scss';
import '../../styles/variables.scss';

const Nav = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  const goBooking = () => {
    navigate('/booking');
  };

  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);
  const [navFixed, setNavFixed] = useState(false);

  const scrollFixed = () => {
    if (scrollY > 100) {
      setScrollY(window.scrollY);
      setScrollActive(true);
    } else {
      setScrollY(window.scrollY);
      setScrollActive(false);
    }
  };

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener('scroll', scrollFixed);
    };
    scrollListener();
    return () => {
      window.removeEventListener('scroll', scrollFixed);
    };
  });

  return (
    <div className={`nav ${scrollActive ? 'fixed' : ''}`}>
      <div className="contents">
        <ul>
          <li onClick={goHome}>영화</li>
          <li onClick={goBooking}>예매</li>
          <li>극장</li>
          <li>스토어</li>
          <li>이벤트</li>
          <li>혜택</li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
