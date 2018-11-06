import * as type from './types';
import courseApi from '../api/mockCourse';

export const fetchAllCourses = () => dispatch => courseApi.getAllCourses()
  .then(courses => dispatch({ type: type.FETCH_ALL_COURSES, courses }));
