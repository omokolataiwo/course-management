import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import postMessage from '../../src/actions/postMessage';
import { SEND_MESSAGE_TO_SPACE } from '../../src/actions/types';

const mockStore = configureStore([thunk]);

describe('Post message to space', () => {
  it('should post message action', () => {
    const expectedMessageAction = {
      type: SEND_MESSAGE_TO_SPACE
    };
    const store = mockStore();

    expect(store.dispatch(postMessage())).toEqual(expectedMessageAction);
  });
});
