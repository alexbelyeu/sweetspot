import { REHYDRATE } from 'redux-persist/constants';
import {
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_SUCCESS,
  RESOLVE_USER,
  USER_LOGGED_IN,
} from '../actions/types';

const INITIAL_STATE = {
  isUserResolved: false,
  isUserLoggedIn: false,
  tokenRouter: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        isUserLoggedIn: true,
        isUserResolved: true,
        tokenRouter: action.payload,
      };
    case LOGOUT:
      return {
        isUserLoggedIn: false,
        isUserResolved: true,
        tokenRouter: 'noToken',
      };
    case REGISTER_USER_SUCCESS:
      return {
        isUserLoggedIn: true,
        isUserResolved: true,
        tokenRouter: action.payload,
      };
    case RESOLVE_USER:
      return { ...state, isUserResolved: true };
    case USER_LOGGED_IN:
      return { ...state, isUserLoggedIn: true };
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
