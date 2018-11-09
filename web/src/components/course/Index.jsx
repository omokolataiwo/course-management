import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import AllCourse from './AllCourses';
import NewCourse from './NewCourse';

const courseIndex = (props) => {
  const { match: { path } } = props;
  return (
    <Switch>
      <Route path={`${path}/add-course`} component={NewCourse} />
      <Route path="/" component={AllCourse} />
    </Switch>
  );
};

courseIndex.propTypes = {
  match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired
};
export default courseIndex;
