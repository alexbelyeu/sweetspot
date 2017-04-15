import { REHYDRATE } from 'redux-persist/constants';
import {
  USERNAME_CREATED,
  EMAIL_CREATED,
  PASSWORD_CREATED,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_USERNAME_FAIL,
  REGISTER_USER_EMAIL_FAIL,
  REGISTER_USER_PASSWORD_FAIL,
  REGISTER_USER_ERROR,
  REGISTER_USER,
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
  usernameError: '',
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERNAME_CREATED:
      return { ...state, username: action.payload };
    case EMAIL_CREATED:
      return { ...state, email: action.payload };
    case PASSWORD_CREATED:
      return { ...state, password: action.payload };
    case REGISTER_USER:
      return { ...state, loading: true, error: '', usernameError: '', emailError: '' };
    case REGISTER_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, password: '' };
    case REGISTER_USER_USERNAME_FAIL:
      return { ...state, usernameError: action.payload, password: '', passwordError: '', loading: false };
    case REGISTER_USER_EMAIL_FAIL:
      return { ...state, emailError: action.payload, password: '', loading: false };
    case REGISTER_USER_PASSWORD_FAIL:
      return { ...state, passwordError: action.payload, password: '', loading: false };
    case REGISTER_USER_ERROR:
      return { ...state, error: action.payload, password: '', loading: false };
    case REHYDRATE: {
      const incoming = action.payload.register;
      if (incoming) {
        return { ...state, ...incoming };
      }
      return state;
    }
    default:
      return state;
  }
};
