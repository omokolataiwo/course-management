import React from 'react';
import { mount } from 'enzyme';
import { AddAuthor } from '../../src/components/author/AddAuthor';
import { CREATE_AUTHOR } from '../../src/actions/types';

const props = {
  history: { push: jest.fn(() => {}) },
  saveAuthor: jest.fn(() => {}),
  resetAuthorEvent: jest.fn(() => {})
};

const wrapper = mount(<AddAuthor {...props} />);

describe('AddAuthor Component', () => {
  it('should render component', () => {
    expect(wrapper.find('h4').text()).toEqual('Add New Author');
  });

  it('should map form field changes to component state', () => {
    const instance = wrapper.instance();
    instance.onFormFieldChange({ target: { name: 'firstName', value: 'Alex' } });
    expect(instance.state.author.firstName).toEqual('Alex');
  });

  it('should set error state with invalid fields', () => {
    const instance = wrapper.instance();
    instance.onCreate();
    expect(instance.state.errors.lastName).toEqual(['Last name is too short']);
  });

  it('should save author', () => {
    const instance = wrapper.instance();
    instance.onFormFieldChange({ target: { name: 'lastName', value: 'Toni' } });
    instance.onCreate();
    expect(props.saveAuthor).toHaveBeenCalledWith({ firstName: 'Alex', lastName: 'Toni' });
  });

  it('should redirect to authors page when author is created', () => {
    wrapper.setProps({ ...props, authorEvent: CREATE_AUTHOR });
    expect(props.history.push).toHaveBeenCalledWith('/course/authors');
  });
});
