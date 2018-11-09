import * as type from './types';
import courseApi from '../api/mockCourse';

const fetchAllCoursesSuccess = courses => ({ type: type.FETCH_ALL_COURSES, courses });
const saveCourseSuccess = course => ({ type: type.NEW_COURSE_CREATED, course });
const creatingCourse = () => ({ type: type.CREATING_COURSE });

export const fetchAllCourses = () => dispatch => courseApi.getAllCourses()
  .then(courses => dispatch(fetchAllCoursesSuccess(courses)));

export const saveCourse = course => (dispatch) => {
  dispatch(creatingCourse());
  return courseApi.saveCourse(course)
    .then(course => dispatch(saveCourseSuccess(course)));
};
