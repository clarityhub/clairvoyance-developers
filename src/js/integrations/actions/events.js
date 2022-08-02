import {
  READ_ALL,
} from '../constants/events';
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
      .get(`${paths.api}/integrations/events`, {}, READ_ALL);
  };
};
