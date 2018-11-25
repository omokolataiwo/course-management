import React from 'react';
import { shallow } from 'enzyme';
import Course from '../../src/components/course/Index';

const props = {
  match: { path: '' }
};

const wrapper = shallow(<Course {...props} />);

describe('Course Component', () => {
  it('should render component', () => {
    const routes = wrapper.find('Route');
    expect(routes.length).toEqual(3);
    expect(routes.last().prop('path')).toEqual('/');
  });
});
