import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import AdministrativeHeader from '../../src/components/containers/AdministrativeHeader';

const wrapper = mount(
  <BrowserRouter>
    <AdministrativeHeader />
  </BrowserRouter>
);

describe('AdministrativeHeader Component', () => {
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
