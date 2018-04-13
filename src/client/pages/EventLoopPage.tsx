import * as React from 'react';
import styled from 'styled-components';
import { Stage, Layer, Text, Group, Arrow } from 'react-konva';
import ExternalIO from '../components/eventLoop/ExternalIO';
import ThreadPool from '../components/eventLoop/ThreadPool';
import EventLoop from '../components/eventLoop/EventLoop';
import EventQueue from '../components/eventLoop/EventQueue';
import { ExternalIOType } from '../../enums';

function getWidth() {
  if (typeof window !== 'undefined') {
    return window.innerWidth;
  }
  return 1000;
}

interface Props {
  className?: string;
}

interface State {
  scale: number;
}

class EventLoopPage extends React.Component<Props, State> {
  state: State = {
    scale: 1,
  };

  renderExternalIO = () => {
    const spacing = 175;
    const io = Object.keys(ExternalIOType);

    return (
      <Group name="ioArrows" y={480}>
        {io.map((ioType: string, idx) => {
          return <ExternalIO key={ioType} type={ioType} x={idx * spacing} />;
        })}
      </Group>
    );
  };

  render() {
    return (
      <div className={this.props.className}>
        <h1>NodeJS Event Loop Visualization</h1>
        <Stage
          width={getWidth()}
          height={850}
          scale={{ x: this.state.scale, y: this.state.scale }}
        >
          <Layer x={200}>
            <EventQueue />
            <EventLoop y={120} />
            <ThreadPool y={400} />
            <Group name="operationComplete">
              <Arrow
                points={[700, 440, 730, 440, 730, 40, 700, 40]}
                stroke="black"
                fill="black"
              />
              <Text
                text="Operation Complete"
                fontSize={18}
                x={760}
                y={150}
                rotation={90}
              />
            </Group>
            {this.renderExternalIO()}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default styled(EventLoopPage)`
  padding: 0 2rem;
`;
