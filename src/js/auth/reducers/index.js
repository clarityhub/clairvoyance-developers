import clarity from 'clarity/dist';
import {
  LOGIN,
  LOGOUT,
  REFRESH,
} from '../constants';

export default clarity
  .listen([
    LOGIN,
    LOGOUT,
    REFRESH,
    'persist/REHYDRATE',
  ])
  .initial({
    token: null,
    hydrated: false,
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case 'persist/REHYDRATE':
        return {
          hydrated: true,
          token: action.payload.auth ? action.payload.auth.token : null,
        };
      case LOGIN:
        return {
          token: action.payload.token,
        };
      case LOGOUT:
        return {
          token: null,
        };
      case REFRESH:
        return {
          token: action.payload.token,
        };
      default:
        return {};
    }
  });
