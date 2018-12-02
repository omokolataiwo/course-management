import React from 'react';
import { shallow } from 'enzyme';
import { ManageCourse, mapStateToProps } from '../../src/components/course/ManageCourse';
import { FETCH_ALL_COURSES, COURSE_UPDATED, FETCH_COURSE } from '../../src/actions/types';
import { authors, courses } from '../__mocks__/mockData';

const course = {
  id: 'html',
  title: 'Introduction to HTML',
  authorId: 'jmax',
  category: 'frontend',
  length: '7:30'
};

const props = {
  fetchCourse: jest.fn(() => {}),
  saveCourse: jest.fn(() => {}),
  resetCourseEvent: jest.fn(() => {}),
  history: { push: jest.fn(() => {}) },
  match: { params: { id: 'first-course' } },
  course,
  currentPage: '1',
  authors: authors.map(author => ({ key: author.id, value: author.firstName })),
  courseEvent: FETCH_COURSE
};

let wrapper = shallow(<ManageCourse {...props} />);

describe('ManageCourse Component', () => {
  it('should render component', () => {
    expect(wrapper.find('h4').text()).toEqual('Manage Course*');
  });

  it('should update course state when course is loaded', () => {
    wrapper.setProps({ course });
    expect(wrapper.state().course).toEqual(course);
  });

  it('should redirect to 404 when course is not found', () => {
    wrapper.setProps({ course: { title: '' }, courseEvent: FETCH_ALL_COURSES });
    expect(props.history.push).toHaveBeenCalledWith('/404');
  });

  it('should redirect to course page when course is updated successfully', () => {
    wrapper.setProps({ courseEvent: COURSE_UPDATED, currentPage: '1' });
    expect(props.resetCourseEvent).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith('/course/1');
  });

  it('should update error state when form field is invalid', () => {
    wrapper.setProps({ course });
    const instance = wrapper.instance();
    instance.onFormFieldChange({ target: { name: 'title', value: '' } });
    expect(instance.state.errors.title).toEqual(['Title is too short']);
  });

  it('should update error state when all form fields are valid', () => {
    const instance = wrapper.instance();
    instance.onFormFieldChange({ target: { name: 'title', value: course.title } });
    expect(instance.state.errors).toEqual({});
  });

  it('should save course', () => {
    const instance = wrapper.instance();
    instance.onSave({ preventDefault: () => {} });
    expect(props.saveCourse).toHaveBeenCalledWith(course);
  });

  it('should not save with invalid fields', () => {
    wrapper.setProps({ course: { ...course, title: '' } });
    const instance = wrapper.instance();
    instance.onSave({ preventDefault: () => {} });
    expect(instance.state.errors.title).toEqual(['Title is too short']);
  });

  it('should fetch course when browser is refreshed', () => {
    wrapper.unmount();
    const newProps = { ...props, match: { params: { id: 'first-course' } }, course: { title: '' } };
    wrapper = shallow(<ManageCourse {...newProps} />);
  });

  it('should map properties', () => {
    const author = { authors };
    const course = { courses };
    const newProps = { ...props, match: { params: { id: 'first-course' } } };
    const storeProps = mapStateToProps({ author, course }, newProps);
    expect(storeProps.authors).toEqual([{ key: 'john-martins', value: 'John Martins' }]);
    expect(storeProps.course.title).toEqual(courses[0].title);
    expect(storeProps.course.category).toEqual(courses[0].category);
  });
});
