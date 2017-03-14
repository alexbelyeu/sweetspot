import { REHYDRATE } from 'redux-persist/constants';
import {
  CHANGE_MAIN_TAB,
} from '../actions/types';

const INITIAL_STATE = {
  index: 1,
  routes: [
    { key: '1', icon: 'list' },
    { key: '2', icon: 'logo' },
    { key: '3', icon: 'saved' },
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_MAIN_TAB:
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
