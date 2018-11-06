import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Contact from '../../src/components/pages/Contact';

const wrapper = mount(<BrowserRouter><Contact /></BrowserRouter>);

describe('Contact Component', () => {
  it('should render component', () => {
    expect(wrapper.find('h2').text()).toEqual('Contact Us');
  });
});
