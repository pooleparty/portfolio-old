import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Group, Arrow } from 'react-konva';
import EventLoopPhase from './EventLoopPhase';
import { PHASES, getPhaseFunction } from '../../utils/phases';

const arrows = [
  [350, 30, 400, 30],
  [475, 60, 475, 110],
  [400, 140, 350, 140],
  [200, 140, 150, 140],
  [75, 110, 75, 60],
  [150, 30, 200, 30],
];

class EventLoopPhases extends React.Component {
  renderPhase = (index, phaseProps) => {
    const { activePhase } = this.props;
    return (
      <Group>
        <EventLoopPhase
          phase={PHASES[index]}
          phaseFunction={getPhaseFunction(PHASES[index])}
          active={activePhase === index}
          {...phaseProps}
        />
        <Arrow stroke="black" fill="black" points={arrows[index]} />
      </Group>
    );
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { activePhase, ...props } = this.props;
    return (
      <Group {...props}>
        {this.renderPhase(0, { x: 200 })}
        {this.renderPhase(1, { x: 400 })}
        {this.renderPhase(2, { x: 400, y: 110 })}
        {this.renderPhase(3, { x: 200, y: 110 })}
        {this.renderPhase(4, { y: 110 })}
        {this.renderPhase(5)}
      </Group>
    );
  }
}

EventLoopPhases.propTypes = {
  activePhase: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  activePhase: state.eventLoop.phase.activePhase,
});

export default connect(mapStateToProps)(EventLoopPhases);
