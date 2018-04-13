import * as React from 'react';
import { Group, Rect, Text } from 'react-konva';

const EventLoop: React.SFC<KonvaNodeConfig> = props => {
  return (
    <Group name="eventLoop" {...props}>
      <Rect width={700} height={235} stroke="black" fill="white" />
      <Text text="Event Loop" fontSize={24} width={100} padding={10} />
    </Group>
  );
};

export default EventLoop;
