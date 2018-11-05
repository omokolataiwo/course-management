import message from '../../src/reducers/message';
import { SEND_MESSAGE_TO_SPACE } from '../../src/actions/types';

const state = {
  default: {
    transport: 'shuttle'
  },
  expected: { noteFromEarth: 'Hello, Mr. Green.' },
  sendMessageAction: { type: SEND_MESSAGE_TO_SPACE, message: 'Hello, Mr. Green.' }
};

describe('Message action', () => {
  it('should update message state', () => {
    expect(message(state.default, state.sendMessageAction)).toEqual({ ...state.default, ...state.expected });
  });
  it('should return default state', () => {
    expect(message(state.default, {})).toEqual(state.default);
    expect(message(undefined, {})).toEqual({});
  });
});
