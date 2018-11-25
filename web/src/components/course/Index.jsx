import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import AllCourse from './AllCourses';
import NewCourse from './NewCourse';
import ManageCourse from './ManageCourse';
import AddAuthor from '../author/AddAuthor';
import Header from '../containers/Header';
import AdministrativeHeader from '../containers/AdministrativeHeader';
import AuthorList from '../author/AuthorList';
import ManageAuthor from '../author/ManageAuthor';

const courseIndex = (props) => {
  const {
    match: { path },
    totalCourses
  } = props;

  return (
    <div>
      <Header coursesLength={totalCourses} />
      <AdministrativeHeader />
      <Switch>
        <Route path={`${path}/author/manage/:id`} exact component={ManageAuthor} />
        <Route path={`${path}/add-author`} component={AddAuthor} />
        <Route path={`${path}/authors`} exact component={AuthorList} />
        <Route path={`${path}/add-course`} exact component={NewCourse} />
        <Route path={`${path}/manage/:id`} exact component={ManageCourse} />
        <Route path={`${path}/:page`} exact component={AllCourse} />
        <Route path={`${path}/`} exact component={AllCourse} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

courseIndex.propTypes = {
  match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired,
  totalCourses: PropTypes.number.isRequired
};
const mapStateToProps = ({ course: { courses, length: totalCourses } }) => ({ totalCourses });
export default connect(mapStateToProps)(courseIndex);
