import React from 'react';
import { Link } from 'react-router-dom';
import Image404 from '../../images/not-found-animate.gif';

export default () => (
  <div className="error-404">
    <img src={Image404} alt="Page not found" />
    <h5 className="title">
      We can not find what you are looking for!
      {' '}
      <Link to="/">Click here to go the to home page</Link>
    </h5>
  </div>
);
