import * as React from 'react';
import { Group, Rect, Text } from 'react-konva';

const ThreadPool: React.SFC<KonvaNodeConfig> = props => {
  return (
    <Group name="threadPool" {...props}>
      <Rect width={700} height={80} stroke="black" fill="white" />
      <Text text="Thread Pool" fontSize={24} width={100} padding={10} />
    </Group>
  );
};

export default ThreadPool;
