import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import { CREATING_COURSE, UPDATING_COURSE } from '../../actions/types';

const renderButton = (event, isCreate, onSave) => {
  if (event === CREATING_COURSE || event === UPDATING_COURSE) {
    return (
      <button id="create-course-btn" className="btn btn-primary" disabled type="button" onClick={onSave}>
        {event === CREATING_COURSE ? 'Creating ' : 'Updating '}
        Course
      </button>
    );
  }

  return (
    <button id="create-course-btn" className="btn btn-primary" type="button" onClick={onSave}>
      {isCreate ? 'Create ' : 'Update '}
      Course
    </button>
  );
};
const CourseForm = ({
  onChange,
  onSave,
  create,
  errors,
  authors,
  courseEvent,
  course: {
    title, category, authorId, length
  }
}) => (
  <form>
    <TextInput
      size="12"
      label="Course Title"
      placeholder="eg: Introduction to Programming"
      name="title"
      onChange={onChange}
      value={title}
      errors={errors.title}
    />
    <TextInput
      size="12"
      label="Category"
      placeholder="eg: Software Development"
      name="category"
      onChange={onChange}
      value={category}
      errors={errors.category}
    />
    <TextInput
      size="12"
      label="Length"
      placeholder="eg: 5:57"
      name="length"
      onChange={onChange}
      value={length}
      errors={errors.length}
    />
    <SelectInput
      size="12"
      label="Select Author"
      options={authors}
      name="authorId"
      onChange={onChange}
      value={authorId}
    />
    {renderButton(courseEvent, create, onSave)}
  </form>
);

CourseForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  course: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    authorId: PropTypes.string,
    length: PropTypes.string
  }).isRequired,
  create: PropTypes.bool,
  errors: PropTypes.shape({
    title: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.arrayOf(PropTypes.string),
    length: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

CourseForm.defaultProps = {
  create: false
};

export default CourseForm;
