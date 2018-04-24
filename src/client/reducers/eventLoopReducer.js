import { combineReducers } from 'redux';
import {
  FIRE_PACKET,
  REMOVE_PACKET,
  MARK_EXTERNALIO_BUSY,
  ENQUEUE_EVENT,
  DEQUEUE_EVENT,
  NEXT_PHASE,
} from '../actions';
import { getPhaseFunction, PHASES } from '../utils/phases';

const packetReducer = (state = [], action) => {
  if (action.type === FIRE_PACKET) {
    return [...state, action.packet];
  }

  if (action.type === REMOVE_PACKET) {
    const filteredPackets = state.filter(packet => packet.id !== action.packetId);
    return filteredPackets;
  }

  return state;
};

const externalIOReducer = (state = {}, action) => {
  if (action.type === MARK_EXTERNALIO_BUSY) {
    const { ioType, busy } = action;
    if (state[ioType]) {
      const newState = { ...state };
      newState[ioType].busy = busy;
      return newState;
    }
  }

  return state;
};

const eventQueueReducer = (state = [], action) => {
  if (action.type === ENQUEUE_EVENT) {
    return [...state, action.event];
  }

  if (action.type === DEQUEUE_EVENT) {
    return state.filter(e => e.id !== action.id);
  }

  return state;
};

const initialPhaseState = {
  tickCount: 0,
  activePhase: 0,
};

const phaseReducer = (state = initialPhaseState, action) => {
  if (action.type === NEXT_PHASE) {
    let { tickCount } = state;
    tickCount += 1;
    const activePhase = tickCount % 6;
    const phaseFunction = getPhaseFunction(PHASES[activePhase]);
    if (phaseFunction) {
      phaseFunction.call(undefined);
    }
    return { tickCount, activePhase };
  }

  return state;
};

export default combineReducers({
  packets: packetReducer,
  externalIO: externalIOReducer,
  eventQueue: eventQueueReducer,
  phase: phaseReducer,
});
