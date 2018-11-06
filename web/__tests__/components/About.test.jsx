import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import About from '../../src/components/pages/About';

const wrapper = mount(<BrowserRouter><About /></BrowserRouter>);

describe('About Component', () => {
  it('should render component', () => {
    expect(wrapper.find('h2').text()).toEqual('About');
  });
});
