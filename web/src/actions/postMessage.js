import { SEND_MESSAGE_TO_SPACE } from './types';

export default message => dispatch => dispatch({ type: SEND_MESSAGE_TO_SPACE, message });
