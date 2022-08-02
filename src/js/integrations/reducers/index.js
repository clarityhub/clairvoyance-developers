import clarity from 'clarity/dist';
import {
  READ,
  READ_ALL,
  CREATE,
  UPDATE,
  UPDATE_CALLBACKS,
  DELETE,
} from '../constants';

export default clarity
  .listen([
    READ,
    READ_ALL,
    CREATE,
    UPDATE,
    UPDATE_CALLBACKS,
    DELETE,
  ])
  .initial({
    items: {},
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case READ:
      case CREATE:
      case UPDATE:
        return {
          items: {
            ...state.items,
            [action.payload.uuid]: action.payload,
          },
        };

      case UPDATE_CALLBACKS:
        return {
          items: {
            ...state.items,
            [action.payload.uuid]: {
              ...state.items[action.payload.uuid],
              ...action.payload,
            },
          },
        };

      case READ_ALL:
        return {
          items: {
            ...state.items,
            ...action.payload.integrations.reduce((r, app) => {
              r[app.uuid] = app;
              return r;
            }, {}),
          },
        };

      case DELETE:
        return {
          items: {
            ...state.items,
            [action.uuid]: {
              ...state.items[action.uuid],
              deleted: true,
            },
          },
        };

      default:
        return {};
    }
  });
