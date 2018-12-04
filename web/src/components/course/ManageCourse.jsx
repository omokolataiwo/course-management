import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import CourseForm from '../containers/CourseForm';
import PromptDialog from '../containers/Prompt';
import { fetchCourse, saveCourse, resetCourseEvent } from '../../actions/course';
import { COURSE_UPDATED, FETCH_ALL_COURSES } from '../../actions/types';
import courseConstraint from '../../validator/course';
import { PAGE_SIZE } from '../../const';

export class ManageCourse extends Component {
  static propTypes = {
    saveCourse: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired
    }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    courseEvent: PropTypes.symbol,
    course: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      category: PropTypes.string,
      length: PropTypes.string,
      author: PropTypes.string
    }),
    resetCourseEvent: PropTypes.func.isRequired,
    fetchCourse: PropTypes.func.isRequired,
    currentPage: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired
  };

  static defaultProps = {
    courseEvent: '',
    course: {
      id: '',
      title: '',
      category: '',
      length: '',
      authorId: 'cory_house'
    }
  };

  state = {
    course: this.props.course, //eslint-disable-line
    errors: {}
  };

  componentDidMount() {
    const {
      course,
      fetchCourse,
      match: {
        params: { id }
      }
    } = this.props;

    if (!course.title.length && id) {
      return fetchCourse(id, PAGE_SIZE);
    }

    return null;
  }

  componentDidUpdate(nextProps) {
    const {
      resetCourseEvent,
      course,
      courseEvent,
      currentPage,
      history: { push }
    } = this.props;

    if (nextProps.course !== course) {
      this.setState(() => ({ course })); // eslint-disable-line
    }

    if (courseEvent === COURSE_UPDATED) {
      resetCourseEvent();
      push(`/course/${currentPage}`);
    }

    if (courseEvent === FETCH_ALL_COURSES && !course.title.length) {
      push('/404');
    }

    return null;
  }

  onFormFieldChange = (event) => {
    const { name, value } = event.target;
    const { course } = this.state;
    const validationError = validate({ ...course, [name]: value }, courseConstraint);

    this.setState(prevState => ({
      course: { ...prevState.course, [name]: value },
      errors: validationError || {}
    }));
  };

  onSave = (event) => {
    const { saveCourse } = this.props;
    const { course } = this.state;
    const validationError = validate(course, courseConstraint);
    event.preventDefault();

    if (validationError) {
      this.setState(() => ({ errors: validationError }));
      return;
    }

    saveCourse(this.state.course); // eslint-disable-line
  };

  isDirty = () => {
    const { course } = this.state;
    const { course: loadedCourse, courseEvent } = this.props;

    if (courseEvent === COURSE_UPDATED) {
      return false;
    }

    return !!Object.keys(course).filter(key => course[key] !== loadedCourse[key]).length;
  };

  render() {
    const { course, errors } = this.state;
    const { authors, courseEvent } = this.props;

    return (
      <div>
        <div className="container">
          <h4>Manage Course*</h4>
          <PromptDialog when={this.isDirty()} />
          <CourseForm
            errors={errors}
            course={course}
            courseEvent={courseEvent}
            onChange={this.onFormFieldChange}
            onSave={this.onSave}
            authors={authors}
          />
        </div>
      </div>
    );
  }
}
const getCourse = (courses, id) => courses.find(course => course.id === id);

export const mapStateToProps = ({ author: { authors }, course }, props) => {
  const { event: courseEvent, courses, currentPage } = course;

  let selectedCourse;
  const courseId = props.match.params.id;

  if (courseId && courses.length > 0) {
    selectedCourse = getCourse(courses, courseId);
  }

  const formattedAuthors = authors.map(author => ({
    key: author.id,
    value: `${author.firstName} ${author.lastName}`
  }));

  return {
    authors: formattedAuthors,
    course: selectedCourse,
    courseEvent,
    currentPage
  };
};
export default connect(
  mapStateToProps,
  { fetchCourse, saveCourse, resetCourseEvent }
)(ManageCourse);
