import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Home from '../../src/components/pages/Home';

const wrapper = mount(
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);

describe('Home', () => {
  it('should render Home component', () => {
    expect(wrapper.find('h2').text()).toEqual('Course Management');
  });
});
