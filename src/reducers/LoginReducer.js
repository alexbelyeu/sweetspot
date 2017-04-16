import { REHYDRATE } from 'redux-persist/constants';
import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_USERNAME_FAIL,
  LOGIN_USER_PASSWORD_FAIL,
  LOGIN_USER_ERROR,
  LOGIN_USER,
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
  password: '',
  error: '',
  usernameError: '',
  passwordError: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '', usernameError: '', passwordError: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, password: '', loading: false };
    case LOGIN_USER_USERNAME_FAIL:
      return { ...state, usernameError: action.payload, password: '', loading: false };
    case LOGIN_USER_PASSWORD_FAIL:
      return { ...state, passwordError: action.payload, password: '', loading: false };
    case LOGIN_USER_ERROR:
      return { ...state, error: action.payload, password: '', loading: false };
    case REGISTER_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };

    case REHYDRATE: {
      const incoming = action.payload.login;
      if (incoming) {
        return { ...state, ...incoming };
      }
      return state;
    }

    default:
      return state;
  }
};
