import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import PageNotFound from '../../src/components/containers/PageNotFound';

const wrapper = mount(<BrowserRouter><PageNotFound /></BrowserRouter>);

describe('PageNotFound Component', () => {
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
