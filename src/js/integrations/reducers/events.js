import clarity from 'clarity/dist';
import {
  READ_ALL,
} from '../constants/events';

export default clarity
  .listen([
    READ_ALL,
  ])
  .initial({
    items: {},
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case READ_ALL:
        return {
          items: action.payload.events,
        };

      default:
        return {};
    }
  });
