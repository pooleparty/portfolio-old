import React from 'react';
import PropTypes from 'prop-types';
import { Text, Label, Tag } from 'react-konva';

const width = 150;
const height = 60;

const EventLoopPhase = (props) => {
  const { phase, active, ...rest } = props;
  return (
    <Label {...rest}>
      <Tag fill="white" stroke={active ? 'red' : 'black'} />
      <Text
        fontFamily="monospace"
        height={height}
        width={width}
        text={phase}
        padding={10}
        fontSize={18}
        align="center"
      />
    </Label>
  );
};

EventLoopPhase.propTypes = {
  phase: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

EventLoopPhase.defaultProps = {
  active: false,
};

export default EventLoopPhase;
