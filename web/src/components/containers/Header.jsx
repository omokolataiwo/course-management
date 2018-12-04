import React from 'react';
import { Link } from 'react-router-dom';
import PluraSightLogo from '../../images/plurasight-logo.png';

export const Header = ({ coursesLength }) => (
  <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#010101' }}>
    <Link className="navbar-brand" to="/">
      <img src={PluraSightLogo} alt="PluraSight Logo" />
      PluraSight
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/course" className="nav-link">
            {coursesLength || ''}
            {' '}
Courses
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/course/authors" className="nav-link">
            Authors
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
