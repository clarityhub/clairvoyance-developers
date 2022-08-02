import {
  READ,
  READ_CREDENTIALS,
  READ_ALL,
  CREATE,
  UPDATE,
  UPDATE_CALLBACKS,
  DELETE,
} from '../constants';
import clarity from 'clarity/dist';

export const getAll = () => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.api}/integrations`, {}, READ_ALL);
  };
};

export const get = (uuid) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.api}/integrations/${uuid}`, {}, READ);
  };
};

export const getCredentials = (uuid) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .get(`${paths.api}/auth/credentials/${uuid}`, {}, READ_CREDENTIALS);
  };
};

export const create = (payload) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .post(`${paths.api}/integrations`, payload, CREATE);
  };
};

export const update = (uuid, payload) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .put(`${paths.api}/integrations/${uuid}`, payload, UPDATE);
  };
};

export const del = (uuid) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .passthrough({ uuid })
      .delete(`${paths.api}/integrations/${uuid}`, {}, DELETE);
  };
};

export const updateCallbacks = (uuid, payload) => {
  return (dispatch, getState, { paths }) => {
    return clarity
      .with({
        dispatch,
        headers: {
          token: getState().auth.token,
        },
      })
      .passthrough({ uuid })
      .put(`${paths.api}/integrations/${uuid}/callbacks`, payload, UPDATE_CALLBACKS);
  };
};
