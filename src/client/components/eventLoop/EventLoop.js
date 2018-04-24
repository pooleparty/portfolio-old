import React from 'react';
import { Group, Rect, Text, Arrow } from 'react-konva';
import EventLoopPhases from './EventLoopPhases';

const width = 700;
const height = 240;
const arrowHeight = 40;

const incomingArrowOptions = {
  points: [width / 2, 0, width / 2, arrowHeight],
  stroke: 'black',
  fill: 'black',
};

const outgoingArrowOptions = {
  points: [
    width / 2,
    arrowHeight + height,
    width / 2,
    arrowHeight * 2 + height,
  ],
  stroke: 'black',
  fill: 'black',
};

const EventLoop = props => (
  <Group name="eventLoop" {...props}>
    <Arrow {...incomingArrowOptions} />
    <Group y={arrowHeight}>
      <Rect width={width} height={height} stroke="black" fill="white" />
      <Text text="Event Loop" fontSize={24} width={100} padding={10} />
      <EventLoopPhases x={100} y={20} />
    </Group>
    <Arrow {...outgoingArrowOptions} />
  </Group>
);

export default EventLoop;
