import React from 'react';
import { shallow } from 'enzyme';
import Course from '../../src/components/course/Index';

const wrapper = shallow(<Course />);

describe('Course Component', () => {
  it('should render component', () => {
    const routes = wrapper.find('Route');
    expect(routes.length).toEqual(2);
    expect(routes.last().prop('path')).toEqual('/');
  });
});
