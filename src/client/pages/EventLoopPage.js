import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Stage, Layer, Text, Group, Arrow } from 'react-konva';
import ExternalIO from '../components/eventLoop/ExternalIO';
import ThreadPool from '../components/eventLoop/ThreadPool';
import EventLoop from '../components/eventLoop/EventLoop';
import EventQueue from '../components/eventLoop/EventQueue';
import { ExternalIOType } from '../../enums';
import { nextPhase as nextPhaseAction } from '../actions';

function getWidth() {
  if (typeof window !== 'undefined') {
    return window.innerWidth;
  }
  return 1000;
}

class EventLoopPage extends React.Component {
  state = {
    scale: 1,
  };

  renderExternalIO = () => {
    const spacing = 175;
    const io = Object.keys(ExternalIOType);

    return (
      <Group name="ioArrows" y={480}>
        {io.map((ioType, idx) => <ExternalIO key={ioType} type={ioType} x={idx * spacing} />)}
      </Group>
    );
  };

  render() {
    const { nextPhase, ...rest } = this.props;
    return (
      <div {...rest}>
        <h1>NodeJS Event Loop Visualization</h1>
        <button onClick={nextPhase}>Next Phase</button>
        <Stage width={getWidth()} height={850} scale={{ x: this.state.scale, y: this.state.scale }}>
          <Layer x={200}>
            <EventQueue />
            <EventLoop y={80} />
            <ThreadPool y={400} />
            <Group name="operationComplete">
              <Arrow points={[700, 440, 730, 440, 730, 40, 700, 40]} stroke="black" fill="black" />
              <Text text="Operation Complete" fontSize={18} x={760} y={150} rotation={90} />
            </Group>
            {this.renderExternalIO()}
          </Layer>
        </Stage>
      </div>
    );
  }
}

EventLoopPage.propTypes = {
  nextPhase: PropTypes.func.isRequired,
};

const dispatchToProps = dispatch => ({
  nextPhase: () => {
    dispatch(nextPhaseAction());
  },
});

export default styled(connect(null, dispatchToProps)(EventLoopPage))`
  padding: 0 2rem;
`;
