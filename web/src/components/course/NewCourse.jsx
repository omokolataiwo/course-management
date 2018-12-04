import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import notie from 'notie';
import { saveCourse } from '../../actions/course';
import { NEW_COURSE_CREATED, RESET_COURSE_EVENT } from '../../actions/types';
import CourseForm from '../containers/CourseForm';
import courseConstraint from '../../validator/course';

export class NewCourse extends Component {
  static propTypes = {
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    courseEvent: PropTypes.symbol
  };

  static defaultProps = {
    courseEvent: RESET_COURSE_EVENT
  };

  state = {
    course: {
      title: '',
      category: '',
      length: '',
      authorId: ''
    },
    errors: {}
  };

  componentDidUpdate() {
    const { history, courseEvent, currentPage } = this.props;
    if (courseEvent === NEW_COURSE_CREATED) {
      notie.alert({ type: 'success', text: 'New course created!' });
      history.push(`/course/${currentPage}`);
    }
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

  onCreate = (event) => {
    const { saveCourse } = this.props;
    const { course } = this.state;

    const validationError = validate(course, courseConstraint);

    if (validationError) {
      this.setState(() => ({ errors: validationError }));
      return;
    }

    saveCourse(course); // eslint-disable-line
  };

  render() {
    const { course, errors } = this.state;
    const { authors, courseEvent } = this.props;

    return (
      <div className="container">
        <h4>Add New Course</h4>
        <CourseForm
          course={course}
          courseEvent={courseEvent}
          errors={errors}
          onChange={this.onFormFieldChange}
          onSave={this.onCreate}
          create
          authors={authors}
        />
      </div>
    );
  }
}

export const mapStateToProps = ({
  author: { authors },
  course: { event: courseEvent, currentPage }
}) => {
  const formattedAuthors = authors.map(author => ({
    key: author.id,
    value: `${author.firstName} ${author.lastName}`
  }));
  return { authors: formattedAuthors, courseEvent, currentPage };
};
export default connect(
  mapStateToProps,
  { saveCourse }
)(NewCourse);
