import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../containers/Header';

class AllCourses extends Component {
  static propTypes = {
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired
      })
    ).isRequired
  };

  state = {};

  render() {
    const { courses } = this.props;
    return (
      <div>
        <Header />
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Course Title</th>
                <th>Author Name</th>
                <th>Course Length</th>
                <th>Published Date</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr>
                  <td>{course.title}</td>
                  <td>{course.authorId}</td>
                  <td>{course.length}</td>
                  <td>{course.publishedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ course }) => ({ courses: course.courses || [] });
export default connect(
  mapStateToProps,
  {}
)(AllCourses);
