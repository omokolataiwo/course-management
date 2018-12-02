import React from 'react';
import { connect } from 'react-redux';
import Header from '../containers/Header';

export const About = ({ coursesLength }) => (
  <div>
    <Header coursesLength={coursesLength} />
    <h2>About</h2>
    <p>This application uses React, Redux, React Router and variety of other helpful libraries.</p>
  </div>
);

export default connect(({ course: { length: coursesLength } }) => ({ coursesLength }))(About);
