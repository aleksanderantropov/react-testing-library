import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <div>This is about</div>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>This is home</div>
    </div>
  );
};

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>
      <div>No such page</div>
    </div>
  );
};

export const Main = () => {
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};
