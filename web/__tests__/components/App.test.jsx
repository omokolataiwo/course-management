import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/App';

const wrapper = shallow(<App />);

describe('App Component', () => {
  it('should render component', () => {
    expect(wrapper.find('.container-fluid').childAt(0).children().length).toEqual(6);
  });
});
