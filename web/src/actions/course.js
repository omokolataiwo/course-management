import * as type from './types';
import courseApi from '../api/mockCourse';
import { PAGE_SIZE } from '../const';

const fetchAllCoursesSuccess = ({ courses, length }, currentPage) => ({
  type: type.FETCH_ALL_COURSES,
  courses,
  length,
  currentPage
});
const saveCourseSuccess = ({ course, courseIndex }) => {
  const inPage = Math.floor(courseIndex / PAGE_SIZE) + 1;
  return { type: type.NEW_COURSE_CREATED, course, inPage };
};
const updateCourseSuccess = course => ({ type: type.COURSE_UPDATED, course });
const fetchingCourses = () => ({ type: type.FETCHNING_COURSES });
const creatingCourse = () => ({ type: type.CREATING_COURSE });
const updatingCourse = () => ({ type: type.UPDATING_COURSE });
const resetAction = () => ({ type: type.RESET_COURSE_EVENT });
const deletingCourse = () => ({ type: type.DELETING_COURSE });
const deleteCourseSuccess = courseId => ({ type: type.DELETE_COURSE, courseId });

// Todo: chore rename fetchAllCourses -> fetchCourses
export const fetchAllCourses = (currentPage, pageSize) => (dispatch) => {
  dispatch(fetchingCourses());

  courseApi
    .getCoursesByPage(currentPage, pageSize)
    .then(courses => dispatch(fetchAllCoursesSuccess(courses, currentPage || 1)));
};

export const fetchCourse = (courseId, pageSize) => (dispatch) => {
  dispatch(fetchingCourses());
  courseApi
    .getCoursesByCourse(courseId, pageSize)
    .then(courses => dispatch(fetchAllCoursesSuccess(courses, courses.currentPage)));
};

export const saveCourse = courseDetails => (dispatch) => {
  const COURSE_ID = courseDetails.id;

  dispatch(COURSE_ID ? updatingCourse() : creatingCourse());
  return courseApi
    .saveCourse(courseDetails)
    .then(course => (COURSE_ID
      ? dispatch(updateCourseSuccess(course))
      : dispatch(saveCourseSuccess(course))));
};
export const deleteCourse = courseId => (dispatch) => {
  dispatch(deletingCourse());
  return courseApi.deleteCourse(courseId).then(() => dispatch(deleteCourseSuccess(courseId)));
};
export const resetCourseEvent = () => dispatch => dispatch(resetAction());
