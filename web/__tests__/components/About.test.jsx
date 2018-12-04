import React from 'react';
import { shallow } from 'enzyme';
import About from '../../src/components/pages/About';

const store = {
  subscribe: jest.fn(() => {}),
  dispatch: jest.fn(() => {}),
  getState: jest.fn(() => ({ course: {} }))
};

const wrapper = shallow(
  <About store={store} />
).dive();

describe('About Component', () => {
  it('should render component', () => {
    expect(wrapper.find('h2').text()).toEqual('About');
  });
});
