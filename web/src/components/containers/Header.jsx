import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact Us</Link>
      <Link to="/course">Course</Link>
    </nav>
  </div>
);
