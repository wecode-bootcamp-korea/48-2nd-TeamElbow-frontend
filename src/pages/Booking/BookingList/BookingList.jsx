import React from 'react';

const BookingList = () => {
  return (
    <ul>
      {movieDate.map(data => {
        return (
          <li key={data.key}>
            <button className={className}>{data.text}</button>
          </li>
        );
      })}
    </ul>
  );
};

export default BookingList;
