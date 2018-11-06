import { FETCH_ALL_COURSES } from '../actions/types';
import { course as defaultCourse } from './default';

function message(state = defaultCourse, action) {
  switch (action.type) {
    case FETCH_ALL_COURSES:
      return { ...state, courses: action.courses };
    default:
      return state;
  }
}

export default message;
