import React from 'react';
import { shallow } from 'enzyme';
import { AllCourses } from '../../src/components/course/AllCourses';
import { PAGE_SIZE } from '../../src/const';
import { DELETE_COURSE, FETCH_ALL_COURSES } from '../../src/actions/types';

const props = {
  courses: [{
    id: 'dt', title: 'Dummy Title', authorId: 'jmax', length: '2:30'
  }],
  authors: [{ id: 'tmountain', firstName: 'Toni', lastName: 'Mountain' }],
  coursesSize: '6',
  currentPage: '1',
  history: {
    push: jest.fn(() => {})
  },
  match: { params: {} },
  fetchAllCourses: jest.fn(() => {}),
  deleteCourse: jest.fn(() => {})
};

const wrapper = shallow(<AllCourses {...props} />);

describe('AllCourse Component', () => {
  it('should render component', () => {
    expect(wrapper.find('h2').text()).toEqual('Available Courses');
  });

  it('redirect to 404 when paginated page is greater than available courses', () => {
    wrapper.setProps({ ...props, match: { params: { page: 20 } } });
    expect(props.history.push).toHaveBeenCalledWith('/404');
  });

  it('should fetch previous page content when no more courses in the current page that is greater than 1', () => {
    wrapper.setProps({ ...props, courses: [], currentPage: '3' });
    expect(props.fetchAllCourses).toHaveBeenCalledWith(2, PAGE_SIZE);
    expect(props.history.push).toHaveBeenCalledWith('/course/2');
  });

  it('should fetch next course when course is deleted', () => {
    wrapper.setProps({ ...props, courseEvent: DELETE_COURSE });
    expect(props.fetchAllCourses).toHaveBeenCalledWith('1', PAGE_SIZE);
  });

  it('should render empty course list', () => {
    wrapper.setProps({ ...props, courses: [], courseEvent: FETCH_ALL_COURSES });
    expect(wrapper.find('span').text()).toEqual('No registered course yet.');
  });

  it('should delete course', () => {
    const instance = wrapper.instance();
    instance.deleteCourse('first-course');
    expect(props.deleteCourse).toHaveBeenCalledWith('first-course');
  });

  it('should redirect to 404 if page is not a number', () => {
    wrapper.unmount();
    const newProps = { ...props, match: { params: { page: 'invalid page number' } } };
    shallow(<AllCourses {...newProps} />);
    expect(newProps.history.push).toHaveBeenCalledWith('/404');
  });
});
