import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn/LogIn';
import Booking from './pages/Booking/Booking';
import BookingDone from './pages/BookingDone/BookingDone';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import MovieList from './pages/MovieList/MovieList';
import SignUp from './pages/SignUp/SignUp';
import MyTicket from './pages/MyTicket/MyTicket';
import Payments from './pages/Payments/Payments';
import Footer from './components/Footer/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-done" element={<BookingDone />} />
        <Route path="/movie-detail" element={<MovieDetail />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/my-ticket" element={<MyTicket />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
