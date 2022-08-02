import { combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import { REHYDRATE } from 'redux-persist/constants';
import createActionBuffer from 'redux-action-buffer';

import requests from 'clarity/dist/reducers';
import auth from './auth/reducers';
import me from './me/reducers';
import credentials from './integrations/reducers/credentials';
import events from './integrations/reducers/events';
import integrations from './integrations/reducers';
import paths from './paths';

export const reducers = combineReducers({
  auth,
  integrations,
  credentials,
  events,
  me,
  requests,
});

export const middleware = compose(
  applyMiddleware(thunk.withExtraArgument({
    paths,
  })),
  autoRehydrate(),
  applyMiddleware(
    createActionBuffer(REHYDRATE) // make sure to apply this after redux-thunk et al.
  )
);
