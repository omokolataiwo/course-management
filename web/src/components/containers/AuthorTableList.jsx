import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faEraser, faMinusCircle);

const AuthorTableList = ({ authors, onDeleteAuthor }) => (
  <table className="table container">
    <thead>
      <tr>
        <th>Authors ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Delete</th>
        <th>Manage</th>
      </tr>
    </thead>
    <tbody>
      {authors.map(author => (
        <tr key={author.id}>
          <td>
            <Link to={`/course/author/manage/${author.id}`}>{author.id}</Link>
          </td>
          <td>
            <Link to={`/course/author/manage/${author.id}`}>{author.firstName}</Link>
          </td>
          <td>{author.lastName}</td>
          <td>
            <span
              onClick={() => onDeleteAuthor(author.id)}
              onKeyDown={() => onDeleteAuthor(author.id)}
              role="button"
              className="btn btn-danger"
              tabIndex="-1"
            >
              <FontAwesomeIcon icon="minus-circle" />
            </span>
          </td>
          <td>
            <Link to={`/course/author/manage/${author.id}`} className="btn btn-secondary">
              <FontAwesomeIcon icon="eraser" />
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

AuthorTableList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    })
  ).isRequired,
  onDeleteAuthor: PropTypes.func.isRequired
};

export default AuthorTableList;
