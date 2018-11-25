import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faMinusCircle);

const CourseTableList = ({ courses, deleteCourse, authors }) => (
  <table className="table" style={{ minHeight: '200px' }}>
    <thead>
      <tr>
        <th scope="col">Course Title</th>
        <th>Author Name</th>
        <th>Course Length</th>
        <th>Delete</th>
        <th>Watch</th>
      </tr>
    </thead>
    <tbody>
      {courses.map(course => (
        <tr key={course.id} className="course animated slideInUp">
          <td>
            <Link to={`/course/manage/${course.id}`}>{course.title}</Link>
          </td>
          <td>{authors[course.authorId]}</td>
          <td>{course.length}</td>
          <td>
            <span onClick={() => deleteCourse(course.id)} role="button" className="btn btn-danger">
              <FontAwesomeIcon icon="minus-circle" />
            </span>
          </td>
          <td>
            <a href={course.watchHref || ''} className="btn btn-success">
              Watch
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

CourseTableList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      authorId: PropTypes.string.isRequired,
      length: PropTypes.string.isRequired,
      publishedDate: PropTypes.string.isRequired
    })
  ),
  deleteCourse: PropTypes.func.isRequired
};

CourseTableList.defaultProps = {
  courses: []
};
export default CourseTableList;
