import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  const goBooking = () => {
    navigate('/booking');
  };

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const isNavFixed = scrollY > 100;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`nav ${isNavFixed ? 'fixed' : ''}`}>
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
