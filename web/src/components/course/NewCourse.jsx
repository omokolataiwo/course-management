import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../containers/Header';
import TextInput from '../containers/TextInput';
import SelectInput from '../containers/SelectInput';
import { saveCourse } from '../../actions/course';
import { NEW_COURSE_CREATED } from '../../actions/types';

export class NewCourse extends Component {
  static propTypes = {
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    courseEvent: PropTypes.string
  };

  static defaultProps = {
    courseEvent: ''
  };

  state = {
    course: {
      title: 'NewCourse',
      category: 'Motivation',
      length: '12:00',
      author: 'john_blec'
    }
  };

  componentDidUpdate() {
    const { history, courseEvent } = this.props;
    if (courseEvent === NEW_COURSE_CREATED) {
      history.push('/course');
    }
  }

  onFormFieldChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      course: { ...prevState.course, [name]: value }
    }));
  };

  onCreate = (event) => {
    const { saveCourse } = this.props;
    event.preventDefault();
    saveCourse(this.state.course); // eslint-disable-line
  };

  render() {
    const {
      course: {
        title, length, author, category
      }
    } = this.state;
    return (
      <div>
        <Header />
        <div className="container">
          <h4>Add New Course*</h4>
          <form>
            <TextInput
              size="6"
              placeholder="Course Title"
              name="title"
              onChange={this.onFormFieldChange}
              value={title}
            />
            <TextInput
              size="6"
              placeholder="Category"
              name="category"
              onChange={this.onFormFieldChange}
              value={category}
            />
            <TextInput
              size="6"
              placeholder="Length"
              name="length"
              onChange={this.onFormFieldChange}
              value={length}
            />
            <SelectInput
              size="6"
              label="Select Author"
              options={[
                { id: 'cory_house', text: 'Cory House' },
                { id: 'john_blec', text: 'John Blec' }
              ]}
              name="author"
              onChange={this.onFormFieldChange}
              value={author}
            />
            <button id="create-course-btn" className="btn btn-primary" type="button" onClick={this.onCreate}>
              Create Course
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ({ course }) => {
  const courseEvent = course.event;
  return { courseEvent };
};
export default connect(
  mapStateToProps,
  { saveCourse }
)(NewCourse);
