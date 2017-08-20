import { Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_USERNAME_FAIL,
  LOGIN_USER_PASSWORD_FAIL,
  LOGIN_USER_ERROR,
  LOGIN_USER,
} from './types';
import BASE_URL from '../ENV';

const loginUserSuccess = (dispatch, token) => {
  Keyboard.dismiss();
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: token,
  });
  Actions.drawer({ type: 'reset' });
};

const loginUserFail = (dispatch, response) => {
  if (response.username) {
    dispatch({
      type: LOGIN_USER_USERNAME_FAIL,
      payload: response.username[0],
    });
  }
  if (response.password) {
    dispatch({
      type: LOGIN_USER_PASSWORD_FAIL,
      payload: response.password[0],
    });
  }
  if (response.non_field_errors) {
    dispatch({
      type: LOGIN_USER_ERROR,
      payload: response.non_field_errors[0],
    });
  }
};

// const loginUserError = (dispatch, error) => {
//   dispatch({
//     type: LOGIN_USER_ERROR,
//     payload: error,
//   });
// };

export const usernameChanged = text => ({
  type: USERNAME_CHANGED,
  payload: text,
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text,
});

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    const request = new Request(`${BASE_URL}/auth_my_shit/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    fetch(request)
    .then(response => response.json())
    .catch(() => {
      // On Test
      loginUserSuccess(dispatch, 'token');
      // On Prod
      // loginUserError(dispatch, error.message);
    })
    .then((response) => {
      if (response.token) {
        loginUserSuccess(dispatch, response.token);
      } else {
        loginUserFail(dispatch, response);
      }
    })
    .catch(() => loginUserSuccess(dispatch, 'token'));
  };
};
