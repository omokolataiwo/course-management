import React from 'react';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faBoxOpen, faUser);

export default () => (
  <div className="admin-navbar">
    <Link to="/course/add-course" className="btn btn-outline-dark">
      <FontAwesomeIcon icon="box-open" />
      {' '}
New Course
    </Link>
    <Link to="/course/add-author" className="btn btn-outline-dark">
      <FontAwesomeIcon icon="user" />
      {' '}
Add Author
    </Link>
  </div>
);
