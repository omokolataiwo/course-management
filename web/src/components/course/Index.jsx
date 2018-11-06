import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AllCourse from './AllCourses';

export default () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/add-course" component={AllCourse} />
        <Route path="/" component={AllCourse} />
      </Switch>
    </BrowserRouter>
  </div>
);
