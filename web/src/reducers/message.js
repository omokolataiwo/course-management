import { SEND_MESSAGE_TO_SPACE } from '../actions/types';


function message(state = {}, action) {
  switch (action.type) {
    case SEND_MESSAGE_TO_SPACE:
      return { ...state, noteFromEarth: action.message };
    default:
      return state;
  }
}

export default message;
