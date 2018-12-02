import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Modal from '../../src/components/containers/Modal';

const props = {
  action: jest.fn(() => {})
};
const wrapper = mount(
  <BrowserRouter>
    <Modal {...props} />
  </BrowserRouter>
);

describe('Modal Component', () => {
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should confirm action', () => {
    wrapper.find('.btn-secondary').simulate('click');
    expect(props.action).toHaveBeenCalledWith(false);
  });

  it('should confirm action', () => {
    wrapper.find('.btn-primary').simulate('click');
    expect(props.action).toHaveBeenCalledWith(true);
  });
});
