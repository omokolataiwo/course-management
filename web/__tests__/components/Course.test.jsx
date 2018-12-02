import React from 'react';
import { shallow } from 'enzyme';
import { CourseIndex, mapStateToProps } from '../../src/components/course/Index';

const props = {
  match: { path: '' },
  totalCourses: 7
};

const wrapper = shallow(<CourseIndex {...props} />);

describe('Course Component', () => {
  it('should render component', () => {
    const routes = wrapper.find('Route');
    expect(routes.length).toEqual(7);
    expect(routes.last().prop('path')).toEqual('/');
  });

  it('should map store to props', () => {
    expect(mapStateToProps({ course: { length: 3 } })).toEqual({ totalCourses: 3 });
  });
});
