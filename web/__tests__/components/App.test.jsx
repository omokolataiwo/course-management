import React from 'react';
import { mount } from 'enzyme';
import { App } from '../../src/App';

const props = {
  postMessage: jest.fn(() => {})
};

const wrapper = mount(<App {...props} />);

describe('App Component', () => {
  it('should render component', () => {
    expect(wrapper.find('h3').text()).toEqual('Simple React App');
  });
  it('should make post message clickable', () => {
    const postMessageBtn = wrapper.find('#post-message-btn');
    postMessageBtn.simulate('click');
    expect(props.postMessage).toHaveBeenCalled();
  });

  it('should submit form', () => {
    const messageForm = wrapper.find('#message-form');
    messageForm.simulate('submit');
    expect(props.postMessage).toHaveBeenCalled();
  });

  it('should be able to edit message', () => {
    const messageField = wrapper.find('#message');
    messageField.simulate('change', { target: { value: 'Hello, Mr. Green.' } });
    expect(wrapper.state().message).toEqual('Hello, Mr. Green.');
  });
});
