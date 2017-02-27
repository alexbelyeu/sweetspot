import {
  LOGOUT,
} from './types';

export const logOut = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};
