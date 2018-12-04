import {
  FETCH_ALL_COURSES, NEW_COURSE_CREATED, COURSE_UPDATED, CREATING_COURSE,
  UPDATING_COURSE,
  RESET_COURSE_EVENT,
  FETCHNING_COURSES,
  DELETING_COURSE,
  DELETE_COURSE
} from '../actions/types';
import { course as defaultCourse, newState } from './default';

function course(state = defaultCourse, action) {
  switch (action.type) {
    case FETCH_ALL_COURSES:
      return newState(state, {
        courses: action.courses,
        length: action.length,
        currentPage: action.currentPage
      }, action.type);
    case NEW_COURSE_CREATED:
      return newState(state, { currentPage: action.inPage }, action.type);
    case COURSE_UPDATED:
      return newState(state, {
        courses: state
          .courses
          .filter(course => (course.id !== action.course.id)).concat(action.course)
      },
      action.type);
    case DELETE_COURSE:
      return newState(state, {
        courses: state.courses
          .filter(course => course.id !== action.courseId),
        length: state.length - 1
      }, action.type);
    case FETCHNING_COURSES:
    case CREATING_COURSE:
    case UPDATING_COURSE:
    case DELETING_COURSE:
    case RESET_COURSE_EVENT:
      return newState(state, {}, action.type);
    default:
      return state;
  }
}

export default course;
