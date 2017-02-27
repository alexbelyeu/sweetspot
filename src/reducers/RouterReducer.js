import { REHYDRATE } from 'redux-persist/constants';
import {
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  LOGOUT,
} from '../actions/types';

const INITIAL_STATE = { tokenRouter: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { tokenRouter: action.payload };
    case REGISTER_USER_SUCCESS:
      return { tokenRouter: action.payload };
    case LOGOUT:
      return { ...INITIAL_STATE, tokenRouter: 'noToken' };
    case REHYDRATE: {
      const incoming = action.payload.routerReducer;
      if (incoming) {
        return { ...state, ...incoming };
      }
      return { ...state, tokenRouter: 'noToken' };
    }

    default:
      return state;
  }
};
