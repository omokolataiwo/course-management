import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AllCourse from './AllCourses';

export default () => (
  <Switch>
    <Route path="/add-course" component={AllCourse} />
    <Route path="/" component={AllCourse} />
  </Switch>
);
