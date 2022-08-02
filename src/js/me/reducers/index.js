import {
  ME,
} from '../constants';
import clarity from 'clarity/dist';

export default clarity
  .listen([
    ME,
  ])
  .initial({
    name: '',
    avatarUrl: '',
    status: 'offline',
  })
  .onUpdate((state, action) => {
    switch (action.type) {
      case ME:
        return {
          ...state,
          uuid: action.payload.uuid,
          name: action.payload.name,
          email: action.payload.email,
          status: 'online',
        };
      default:
        return {};
    }
  });
