import {Map, fromJS} from 'immutable';
import { SET_MESSAGE, REMOVE_MESSAGE } from '../actions/messagesActions';
const INIT_STATE = fromJS({});

export default function messages(state = INIT_STATE, action) {
  switch (action.type) {
    case SET_MESSAGE:
      let newStateAfterSet = state.setIn(['message'], action.message);
      return newStateAfterSet.setIn(['messageType'], action.messageType);
    case REMOVE_MESSAGE:
      let newState = state.deleteIn(['message']);
      newState = newState.deleteIn(['messageType']);
      return newState;
  }
  return state;
}