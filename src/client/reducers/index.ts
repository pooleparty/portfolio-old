import { combineReducers, Reducer } from 'redux';
import eventLoopReducer from './eventLoopReducer';

export default <Reducer<AppState>>combineReducers({
  eventLoop: eventLoopReducer,
});
