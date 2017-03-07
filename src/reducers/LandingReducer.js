import { REHYDRATE } from 'redux-persist/constants';
import {
  CHANGE_LANDING_TAB,
} from '../actions/types';

const INITIAL_STATE = {
  index: 0,
  routes: [
    { key: '1', title: 'Login' },
    { key: '2', title: 'SignUp' },
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LANDING_TAB:
      return { ...state, index: action.payload };
    case REHYDRATE: {
      const incoming = action.payload.spots;
      if (incoming) {
        return { ...state, ...incoming };
      }
      return state;
    }
    default:
      return state;
  }
};
