import clarity from 'clarity/dist';
import {
  READ_CREDENTIALS,
} from '../constants';

export default clarity
  .listen([
    READ_CREDENTIALS,
  ])
  .initial({
    items: {},
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case READ_CREDENTIALS:
        return {
          items: {
            ...state.items,
            [action.payload.integrationUuid]: action.payload,
          },
        };

      default:
        return {};
    }
  });
