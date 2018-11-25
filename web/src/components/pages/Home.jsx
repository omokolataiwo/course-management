import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../containers/Header';

export default () => (
  <div>
    <Header />
    <div className="jumbotron">
      <h1>Plurasight Administration</h1>
      <p>React, Redux and React Router in ES6 for ultra responsive web apps.</p>
      <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
    </div>
  </div>
);
