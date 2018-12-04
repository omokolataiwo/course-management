import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Pagination from '../../src/components/containers/Pagination';

const props = {
  totalItem: 4,
  pageSize: 2,
  currentPage: 2,
  onClick: jest.fn(() => {})
};
const wrapper = mount(<BrowserRouter><Pagination {...props} /></BrowserRouter>);

describe('Pagination Component', () => {
  it('should render two links', () => {
    const links = wrapper.find('Link');
    expect(links.length).toEqual(2);
  });

  it('should navigate', () => {
    wrapper.find('Link').first().simulate('click');
    expect(props.onClick).toHaveBeenCalled();
  });
});
