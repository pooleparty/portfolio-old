import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Group, Rect, Text, Label, Tag } from 'react-konva';
import uuidv4 from 'uuid/v4';
import { enqueueEvent, dequeueEvent } from '../../actions';

const renderEvents = (events) => {
  const spacing = 30;
  const width = 25;
  return events.map((e, i) => (
    <Label key={e.id} x={spacing * i}>
      <Tag fill="white" stroke="black" />
      <Text
        fontFamily="monospace"
        width={width}
        text={e.description}
        fontSize={18}
        align="center"
      />
    </Label>
  ));
};

let eventDescription = 0;

const EventQueue = (props) => {
  const groupClick = () => {
    props.enqueueEvent({
      id: uuidv4(),
      description: eventDescription.toString(),
    });
    eventDescription += 1;
  };
  return (
    <Group name="eventQueue" {...props} onClick={groupClick}>
      <Rect width={700} height={80} stroke="black" fill="white" />
      <Text text="Event Queue" fontSize={24} width={100} padding={10} />
      <Group x={100} y={10}>
        {renderEvents(props.events)}
      </Group>
    </Group>
  );
};

EventQueue.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
  enqueueEvent: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  events: state.eventLoop.eventQueue,
});

const mapDispatchToProps = dispatch => ({
  enqueueEvent: (event) => {
    dispatch(enqueueEvent(event));
  },
  dequeueEvent: (eventId) => {
    dispatch(dequeueEvent(eventId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventQueue);
