export const FIRE_PACKET = 'FIRE_PACKET';
export const REMOVE_PACKET = 'REMOVE_PACKET';
export const MARK_EXTERNALIO_BUSY = 'MARK_EXTERNALIO_BUSY';
export const ENQUEUE_EVENT = 'ENQUEUE_EVENT';
export const DEQUEUE_EVENT = 'DEQUEUE_EVENT';

type FirePacketAction = {
  type: 'FIRE_PACKET';
  packet: Packet;
};

type RemovePacketAction = {
  type: 'REMOVE_PACKET';
  packetId: string;
};

type MarkExternalIOBusyAction = {
  type: 'MARK_EXTERNALIO_BUSY';
  ioType: string;
  busy: boolean;
};

export const firePacket = (packet: Packet): FirePacketAction => {
  return {
    type: FIRE_PACKET,
    packet,
  };
};

export const removePacket = (packetId: string): RemovePacketAction => {
  return {
    type: REMOVE_PACKET,
    packetId,
  };
};

export const markExternalIOBusy = (
  ioType: string,
  busy: boolean,
): MarkExternalIOBusyAction => {
  return {
    type: MARK_EXTERNALIO_BUSY,
    ioType,
    busy,
  };
};

export const enqueueEvent = (event: NodeEvent) => {
  return {
    type: ENQUEUE_EVENT,
    event,
  };
};

export const dequeueEvent = (eventId: string) => {
  return {
    type: DEQUEUE_EVENT,
    eventId,
  };
};
