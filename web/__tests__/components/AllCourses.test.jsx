import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { AllCourses } from '../../src/components/course/AllCourses';

const props = {
  courses: [{ id: 'dt', title: 'Dummy Title' }]
};

const wrapper = mount(
  <BrowserRouter>
    <AllCourses {...props} />
  </BrowserRouter>
);

describe('AllCourse Component', () => {
  it('should render component', () => {
    expect(wrapper.find('h2').text()).toEqual('Available Courses');
    expect(wrapper.find('tr.course').length).toEqual(1);
  });
});
