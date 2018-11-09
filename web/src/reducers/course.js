import { FETCH_ALL_COURSES, NEW_COURSE_CREATED, CREATING_COURSE } from '../actions/types';
import { course as defaultCourse } from './default';

function course(state = defaultCourse, action) {
  switch (action.type) {
    case FETCH_ALL_COURSES:
      return { ...state, courses: action.courses };
    case CREATING_COURSE:
      return { ...state, event: CREATING_COURSE };
    case NEW_COURSE_CREATED:
      return { ...state, courses: [...state.courses, action.course], event: NEW_COURSE_CREATED };
    default:
      return state;
  }
}

export default course;
