import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import AuthorTableList from '../../src/components/containers/AuthorTableList';
import { authors } from '../__mocks__/mockData';

const props = {
  authors,
  onDeleteAuthor: jest.fn(() => {})
};

const wrapper = mount(<BrowserRouter><AuthorTableList {...props} /></BrowserRouter>);

describe('AuthorTableList Component', () => {
  it('should click delete author', () => {
    wrapper.find('.btn-danger').simulate('click');
    wrapper.find('.btn-danger').simulate('keydown');
  });
});
