import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Group, Rect, Text, Label, Tag } from 'react-konva';
import * as uuidv4 from 'uuid/v4';
import { enqueueEvent, dequeueEvent } from '../../actions';

const renderEvents = (events: NodeEvent[]) => {
  const spacing = 30;
  const width = 25;
  return events.map((e, i) => {
    return (
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
    );
  });
};

let eventDescription = 0;

const EventQueue: React.SFC<
  KonvaNodeConfig & StateToProps & DispatchToProps
> = props => {
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

interface StateToProps {
  events: NodeEvent[];
}

const mapStateToProps = (state: AppState): StateToProps => {
  return {
    events: state.eventLoop.eventQueue,
  };
};

interface DispatchToProps {
  enqueueEvent: (event: NodeEvent) => void;
  dequeueEvent: (eventId: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => {
  return {
    enqueueEvent: (event: NodeEvent) => {
      dispatch(enqueueEvent(event));
    },
    dequeueEvent: (eventId: string) => {
      dispatch(dequeueEvent(eventId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventQueue);
