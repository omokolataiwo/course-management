import {
  FETCH_ALL_AUTHOR, CREATE_AUTHOR, CREATING_AUTHOR,
  UPDATING_AUTHOR,
  RESET_AUTHOR_EVENT,
  UPDATE_AUTHOR,
  DELETING_AUTHOR,
  DELETE_AUTHOR_ERROR,
  DELETE_AUTHOR
} from '../actions/types';
import { authors as defaultAuthor, newState } from './default';

export default (state = defaultAuthor, action) => {
  switch (action.type) {
    case FETCH_ALL_AUTHOR:
      return newState(state, { authors: action.authors }, action.type);
    case CREATE_AUTHOR:
      return newState(state, { authors: [...state.authors, action.author] }, action.type);
    case UPDATE_AUTHOR:
      return newState(state, {
        authors: state.authors
          .filter(author => author.id !== action.author.id)
          .concat(action.author)
      }, action.type);
    case DELETE_AUTHOR:
      return newState(state, {
        authors: state.authors
          .filter(author => author.id !== action.authorId)
      }, action.type);
    case DELETE_AUTHOR_ERROR:
      return newState(state, { erorr: action.reason }, action.type);
    case CREATING_AUTHOR:
    case UPDATING_AUTHOR:
    case DELETING_AUTHOR:
    case RESET_AUTHOR_EVENT:
      return newState(state, {}, action.type);
    default:
      return state;
  }
};
