import React, { cloneElement } from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { NewCourse, mapStateToProps } from '../../src/components/course/NewCourse';
import { NEW_COURSE_CREATED, CREATING_COURSE } from '../../src/actions/types';

const simulate = (wrapper, event, name, value) => {
  wrapper.find(`#${name}`).simulate(event, { target: { value, name } });
};

const history = [];

const props = {
  history: { push: jest.fn(url => history.push(url)) },
  saveCourse: jest.fn(() => {}),
  currentPage: 1
};

const wrapper = mount(
  <BrowserRouter>
    <NewCourse {...props} />
  </BrowserRouter>
);

describe('NewCourse.test Component', () => {
  it('should render component', () => {
    expect(wrapper.find('h4').text()).toEqual('Add New Course');
  });

  it('should redirect to course index page when new course is created', () => {
    wrapper.setProps({
      children: cloneElement(wrapper.props().children, { courseEvent: NEW_COURSE_CREATED })
    });
    expect(history.pop()).toEqual('/course/1');
  });

  it('should create course', () => {
    simulate(wrapper, 'change', 'title', 'New Course');
    simulate(wrapper, 'change', 'category', 'Motivation');
    simulate(wrapper, 'change', 'length', '12:00');
    simulate(wrapper, 'change', 'authorId', 'Blec');
    expect(wrapper.find('NewCourse').state('course').title).toEqual('New Course');
    expect(wrapper.find('NewCourse').state('course').author).toEqual('Blec');
    simulate(wrapper, 'click', 'create-course-btn');
    expect(props.saveCourse).toHaveBeenCalledWith({
      author: 'Blec',
      category: 'Motivation',
      length: '12:00',
      title: 'New Course'
    });
  });

  it('should map state', () => {
    expect(mapStateToProps({ course: { event: CREATING_COURSE } })).toEqual({ courseEvent: CREATING_COURSE });
  });
});
