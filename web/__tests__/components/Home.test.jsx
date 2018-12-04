import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../src/components/pages/Home';

const wrapper = shallow(<Home />);

describe('Home', () => {
  it('should render Home component', () => {
    expect(wrapper.find('h1').text()).toEqual('Plurasight Administration');
  });
});
