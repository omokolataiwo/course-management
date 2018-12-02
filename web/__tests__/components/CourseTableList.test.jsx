import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import CourseTableList from '../../src/components/containers/CourseTableList';
import { courses, authors } from '../__mocks__/mockData';

const props = { courses, authors, deleteCourse: jest.fn(() => {}) };
const wrapper = mount(
  <BrowserRouter>
    <CourseTableList {...props} />
  </BrowserRouter>
);

describe('CourseTableList Component', () => {
  it('should delete course', () => {
    wrapper.find('.btn-danger').simulate('click');
    expect(props.deleteCourse).toHaveBeenCalled();
  });
});
