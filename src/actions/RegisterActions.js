import { Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  USERNAME_CREATED,
  EMAIL_CREATED,
  PASSWORD_CREATED,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_USERNAME_FAIL,
  REGISTER_USER_EMAIL_FAIL,
  REGISTER_USER_ERROR,
  REGISTER_USER,
} from './types';
import BASE_URL from '../ENV';

const registerUserSuccess = (dispatch, token) => {
  Keyboard.dismiss();
  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: token,
  });
  Actions.drawer({ type: 'reset' });
};

const registerUserFail = (dispatch, response) => {
  if (response.username) {
    dispatch({
      type: REGISTER_USER_USERNAME_FAIL,
      payload: response.username[0] || '',
    });
  }
  if (response.email) {
    dispatch({
      type: REGISTER_USER_EMAIL_FAIL,
      payload: response.email[0] || '',
    });
  }
  if (response.password) {
    dispatch({
      type: REGISTER_USER_ERROR,
      payload: response.password[0] || '',
    });
  }
};

const registerUserError = (dispatch, error) => {
  dispatch({
    type: REGISTER_USER_ERROR,
    payload: error,
  });
};

export const usernameCreated = text => ({
  type: USERNAME_CREATED,
  payload: text,
});

export const emailCreated = text => ({
  type: EMAIL_CREATED,
  payload: text,
});

export const passwordCreated = text => ({
  type: PASSWORD_CREATED,
  payload: text,
});

export const registerUser = ({ username, email, password }) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_USER });

    const request = new Request(`${BASE_URL}/accounts/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    fetch(request)
    .then(response => response.json())
    .catch(error => registerUserError(dispatch, error.message))
    .then((response) => {
      return (response.username === username) ?  // TODO improve check
      registerUserSuccess(dispatch, response.jwt_token)
      : registerUserFail(dispatch, response);
    });
  };
};
