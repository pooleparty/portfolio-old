import { combineReducers, Reducer } from 'redux';
import {
  FIRE_PACKET,
  REMOVE_PACKET,
  MARK_EXTERNALIO_BUSY,
  ENQUEUE_EVENT,
  DEQUEUE_EVENT,
} from '../actions';
import { ExternalIOType } from '../../enums';

const packetReducer: Reducer<Packet[]> = (state = [], action) => {
  if (action.type === FIRE_PACKET) {
    return [...state, action.packet];
  }

  if (action.type === REMOVE_PACKET) {
    const filteredPackets = state.filter(
      (packet: Packet) => packet.id !== action.packetId,
    );
    return filteredPackets;
  }

  return state;
};

const initialExternalIOState: IExternalIO[] = Object.keys(
  ExternalIOType,
).reduce((memo: IExternalIO[], type) => {
  return [...memo, { type, busy: false, packets: [] }];
}, []);

const externalIOReducer: Reducer<IExternalIO[]> = (
  state = initialExternalIOState,
  action,
) => {
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

const eventQueueReducer: Reducer<NodeEvent[]> = (state = [], action) => {
  if (action.type === ENQUEUE_EVENT) {
    return [...state, action.event];
  }

  if (action.type === DEQUEUE_EVENT) {
    return state.filter(e => e.id !== action.id);
  }

  return state;
};

export default combineReducers({
  packets: packetReducer,
  externalIO: externalIOReducer,
  eventQueue: eventQueueReducer,
});
