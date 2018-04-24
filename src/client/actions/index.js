export const FIRE_PACKET = 'FIRE_PACKET';
export const REMOVE_PACKET = 'REMOVE_PACKET';
export const MARK_EXTERNALIO_BUSY = 'MARK_EXTERNALIO_BUSY';
export const ENQUEUE_EVENT = 'ENQUEUE_EVENT';
export const DEQUEUE_EVENT = 'DEQUEUE_EVENT';
export const NEXT_PHASE = 'NEXT_PHASE';

export const firePacket = packet => ({
  type: FIRE_PACKET,
  packet,
});

export const removePacket = packetId => ({
  type: REMOVE_PACKET,
  packetId,
});

export const markExternalIOBusy = (ioType, busy) => ({
  type: MARK_EXTERNALIO_BUSY,
  ioType,
  busy,
});

export const enqueueEvent = event => ({
  type: ENQUEUE_EVENT,
  event,
});

export const dequeueEvent = eventId => ({
  type: DEQUEUE_EVENT,
  eventId,
});

export const nextPhase = () => ({
  type: NEXT_PHASE,
});
