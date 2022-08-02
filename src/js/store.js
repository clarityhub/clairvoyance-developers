import { createStore, compose } from 'redux';
import { reducers, middleware } from './reducers';
import { persistStore, createTransform } from 'redux-persist';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, /* preloadedState, */ composeEnhancers(middleware));

const authTransform = createTransform(
  (inboundState, key) => {
    return inboundState;
  },
  (outboundState, key) => {
    // Don't passthrough errors or the state
    const { error, state, ...rest } = outboundState;

    return rest;
  },
  {
    whitelist: ['auth', 'me'],
  }
);

const persistor = persistStore(store, {
  transforms: [authTransform],
  // Remember to opt in
  whitelist: [
    'auth',
  ],
});

export { store, persistor };
