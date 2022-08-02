import {
  LOGIN,
  LOGOUT_RESPONSE,
  LOGOUT,
  REFRESH,
} from '../constants';
import { persistor } from 'js/store';
import clarity from 'clarity/dist';

export const login = (email, password) => {
  return (dispatch, _, { paths }) => {
    const payload = {
      email,
      password,
    };

    return clarity
      .with({ dispatch })
      .post(`${paths.auth}/login`, payload, LOGIN);
  };
};

export const logout = () => {
  return (dispatch, getState, { paths }) => {
    const { token } = getState().auth;

    dispatch({
      type: LOGOUT,
    });

    persistor.purge();

    return clarity
      .with({
        dispatch,
        headers: {
          token,
        },
      })
      .post(`${paths.auth}/logout`, {}, LOGOUT_RESPONSE);
  };
};

export const refresh = () => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .post(`${paths.auth}/refresh`, {}, REFRESH);
  };
};
