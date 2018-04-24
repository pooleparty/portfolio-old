import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';
import { ExternalIOType } from '../enums';

const externalIO = Object.keys(ExternalIOType).reduce(
  (memo, type) => ({
    ...memo,
    [type]: {
      type,
      packetIncoming: false,
      busy: false,
      packets: [],
      currentOperation: {},
    },
  }),
  [],
);

const defaultInitialState = {
  eventLoop: {
    packets: [],
    externalIO,
    eventQueue: [],
    phase: { tickCount: 0, activePhase: 0 },
  },
};

export default (axiosInstance, initialState = defaultInitialState, composeEnhancers = compose) => {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(logger, thunk.withExtraArgument(axiosInstance))),
  );

  return store;
};
