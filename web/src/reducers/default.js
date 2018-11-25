import { RESET_COURSE_EVENT, RESET_AUTHOR_EVENT } from '../actions/types';

export const course = {
  courses: [],
  event: RESET_COURSE_EVENT,
  length: 0,
  currentPage: 1
};

export const authors = {
  authors: [],
  event: RESET_AUTHOR_EVENT
};

export const newState = (currentState, newState, event) => ({
  ...currentState,
  ...newState,
  event
});
