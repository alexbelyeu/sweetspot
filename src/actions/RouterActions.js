import { LOGOUT, RESOLVE_USER, USER_LOGGED_IN } from './types';

export const logOut = () => {
  return dispatch => {
    dispatch({ type: LOGOUT });
  };
};

export const resolveUser = () => {
  return dispatch => {
    dispatch({ type: RESOLVE_USER });
  };
};

export const userLoggedIn = () => {
  return dispatch => {
    dispatch({ type: USER_LOGGED_IN });
  };
};
