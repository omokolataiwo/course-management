import React from 'react';
import { shallow } from 'enzyme';
import { ManageAuthor, mapStateToProps } from '../../src/components/author/ManageAuthor';
import { UPDATE_AUTHOR } from '../../src/actions/types';
import { authors } from '../__mocks__/mockData';

const props = {
  match: { params: { id: 'tmax' } },
  history: { push: jest.fn(() => {}) },
  resetAuthorEvent: jest.fn(() => {}),
  saveAuthor: jest.fn(() => {})
};
const wrapper = shallow(<ManageAuthor {...props} />);

describe('ManageAuthor Component', () => {
  it('should render component', () => {
    expect(wrapper.find('h4').text()).toEqual('Manage Author');
  });

  it('should map form field to props', () => {
    const instance = wrapper.instance();
    instance.onFormFieldChange({ target: { name: 'lastName', value: 'Max' } });
    expect(instance.state.author.lastName).toEqual('Max');
  });

  it('should not save with invalid author field', () => {
    const instance = wrapper.instance();
    instance.onSave();
    expect(instance.state.errors.firstName).toEqual(['First name is too short']);
  });

  it('should update state when author is loaded', () => {
    wrapper.setProps({ ...props, author: { id: 'tmax', firstName: 'Toni', lastName: 'Maxwel' } });
    expect(wrapper.state().author.firstName).toEqual('Toni');
    expect(wrapper.state().author.lastName).toEqual('Maxwel');
  });

  it('should update author recorded', () => {
    const instance = wrapper.instance();
    instance.onSave();
    expect(props.saveAuthor).toHaveBeenCalledWith({
      id: 'tmax',
      firstName: 'Toni',
      lastName: 'Maxwel'
    });
  });

  it('should redirect to authors page when updated', () => {
    wrapper.setProps({ ...props, authorEvent: UPDATE_AUTHOR });
    expect(props.history.push).toHaveBeenCalledWith('/course/authors');
  });

  it('should redirect to 404 when author is not found', () => {
    mapStateToProps({ author: { authors } }, props);
    expect(props.history.push).toHaveBeenCalledWith('/404');
  });

  it('should extract author', () => {
    const storeProps = mapStateToProps({ author: { authors } }, { ...props, match: { params: { id: 'john-martins' } } });
    expect(storeProps.author.firstName).toEqual('John');
  });
});
