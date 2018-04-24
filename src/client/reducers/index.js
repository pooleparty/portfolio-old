import { combineReducers } from 'redux';
import eventLoopReducer from './eventLoopReducer';

export default combineReducers({
  eventLoop: eventLoopReducer,
});
