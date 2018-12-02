import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CourseTableList from '../containers/CourseTableList';
import { FETCHNING_COURSES, DELETE_COURSE, FETCH_ALL_COURSES } from '../../actions/types';
import { deleteCourse, fetchAllCourses } from '../../actions/course';
import Pagination from '../containers/Pagination';

const PAGE_SIZE = 2;

export class AllCourses extends Component {
  static propTypes = {
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired
      })
    ).isRequired,
    courseEvent: PropTypes.symbol,
    deleteCourse: PropTypes.func.isRequired,
    fetchAllCourses: PropTypes.func.isRequired,
    currentPage: PropTypes.string.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    coursesSize: PropTypes.string.isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
    authors: PropTypes.arrayOf(PropTypes.shape()).isRequired
  };

  static defaultProps = {
    courseEvent: Symbol('DEFAULT_EVENT')
  };

  state = {};

  componentDidMount() {
    const {
      fetchAllCourses,
      currentPage,
      history: { push },
      match: {
        params: { page }
      }
    } = this.props;

    if (page && isNaN(+page)) {
      push('/404');
    }

    if (page && page !== currentPage) {
      fetchAllCourses(page, PAGE_SIZE);
    }
  }

  componentDidUpdate() {
    const {
      courses,
      currentPage,
      courseEvent,
      coursesSize,
      history: { push },
      match: {
        params: { page }
      }
    } = this.props;

    if (Math.ceil(coursesSize / PAGE_SIZE) < page) {
      push('/404');
    }
    if (courseEvent !== FETCHNING_COURSES && !courses.length && currentPage > 1) {
      this.fetchNextCourse(currentPage - 1, PAGE_SIZE);
      return push(`/course/${currentPage - 1}`);
    }

    if (courseEvent === DELETE_COURSE) {
      return this.fetchNextCourse(currentPage, PAGE_SIZE);
    }

    return null;
  }

  renderEmptyCourseList = () => <span>No registered course yet.</span>;

  deleteCourse = (courseId) => {
    const { deleteCourse } = this.props;
    deleteCourse(courseId);
  };

  renderCourseList = () => {
    const {
      courses, courseEvent, authors, currentPage
    } = this.props;

    if (courseEvent === FETCH_ALL_COURSES && (!courses.length && +currentPage === 1)) {
      return this.renderEmptyCourseList();
    }

    const formattedAuthor = {};
    authors.forEach((author) => {
      formattedAuthor[author.id] = `${author.firstName} ${author.lastName}`;
    });

    return (
      <CourseTableList
        courses={courses}
        authors={formattedAuthor}
        deleteCourse={this.deleteCourse}
      />
    );
  };

  fetchNextCourse = (currentPage) => {
    const { fetchAllCourses } = this.props;
    fetchAllCourses(currentPage, PAGE_SIZE);
  };

  render() {
    let { coursesSize, currentPage, courses } = this.props;
    currentPage = +currentPage;
    coursesSize = +coursesSize;
    return (
      <div>
        <h2>Available Courses</h2>

        <div className="container">
          {this.renderCourseList()}
          {courses.length ? (
            <Pagination
              onClick={this.fetchNextCourse}
              totalItem={coursesSize}
              pageSize={PAGE_SIZE}
              currentPage={currentPage}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ course, author }) => {
  const {
    courses, event: courseEvent, length: coursesSize, currentPage
  } = course;
  const { authors } = author;

  return {
    courses,
    courseEvent,
    coursesSize,
    currentPage,
    authors
  };
};

export default connect(
  mapStateToProps,
  { deleteCourse, fetchAllCourses }
)(AllCourses);
