import React from 'react';
import { shallow } from 'enzyme';
import { AuthorList } from '../../src/components/author/AuthorList';
import { DELETE_AUTHOR_ERROR, DELETE_AUTHOR } from '../../src/actions/types';
import notie from '../__mocks__/notie';

const props = {
  deleteAuthor: jest.fn(() => { }),
  resetAuthorEvent: jest.fn(() => { })
};
const wrapper = shallow(<AuthorList {...props} />);
describe('AuthorList Component', () => {
  it('should render component', () => {
    expect(wrapper.find('h2').text()).toEqual('Registered Authors');
  });
  it('should should delete author', () => {
    const instance = wrapper.instance();
    instance.onDeleteAuthor('jmax');
    expect(props.deleteAuthor).toHaveBeenCalledWith('jmax');
  });
  it('should notify user when there is deletion error', () => {
    wrapper.setProps({ ...props, authorEvent: DELETE_AUTHOR_ERROR });
    expect(notie.alert).toHaveBeenCalledWith({
      type: 'error',
      text:
        'Author has course. You may want to delete the courses first!',
      time: 4
    });
  });
  it('should notify user when author is deleted', () => {
    wrapper.setProps({ ...props, authorEvent: DELETE_AUTHOR });
    expect(notie.alert).toHaveBeenCalledWith({
      type: 'success',
      text: 'Author Details Deleted'
    });
  });
});
