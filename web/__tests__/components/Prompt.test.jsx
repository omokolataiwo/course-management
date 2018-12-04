import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Prompt from '../../src/components/containers/Prompt';

const wrapper = shallow(<BrowserRouter><Prompt /></BrowserRouter>).dive();

describe('Prompt Component', () => {
  it('should pop up modal', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
