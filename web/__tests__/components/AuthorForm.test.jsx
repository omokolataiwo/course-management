import React from 'react';
import { mount } from 'enzyme';
import AuthorForm from '../../src/components/containers/AuthorForm';
import { CREATING_AUTHOR } from '../../src/actions/types';
import { author } from '../__mocks__/mockData';


const props = {
  author,
  errors: {}
};
const wrapper = mount(
  <AuthorForm {...props} />
);

describe('AuthorForm Component', () => {
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render creating button', () => {
    wrapper.setProps({ authorEvent: CREATING_AUTHOR });
    expect(wrapper).toMatchSnapshot();
  });
});
