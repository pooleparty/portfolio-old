import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import { Arrow, Label, Rect, Tag, Text, Group } from 'react-konva';
import {
  firePacket,
  removePacket,
  markExternalIOBusy,
  markExternalIOPacketIncoming,
} from '../../actions';
import { getPath } from '../../utils/pointUtils';
import MotionPath from './MotionPath';
import ArcLoader from './ArcLoader';
import { PacketDirection } from '../../../enums';
import { Packet } from '../propTypes';

const TEXT_WIDTH = 170;
const ARROW_HEIGHT = 150;
const midPoint = TEXT_WIDTH / 2;
const arrowOffset = 20;
const arrowPointsIncoming = [midPoint - arrowOffset, 0, midPoint - arrowOffset, ARROW_HEIGHT];
const arrowPointsOutgoing = [midPoint + arrowOffset, ARROW_HEIGHT, midPoint + arrowOffset, 0];

class ExternalIO extends React.Component {
  onLoaderComplete = () => {
    this.props.markExternalIOBusy(false);
    this.firePacket(this.props.type, PacketDirection.OUTGOING, getPath(arrowPointsOutgoing));
  };

  packetIncoming = () => {
    const { packets } = this.props;
    return packets.find(({ direction }) => direction === PacketDirection.INCOMING);
  };

  firePacket = (type, direction, path) => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const onPathComplete = (id) => {
      this.props.removePacket(id);
      if (direction === PacketDirection.INCOMING) {
        this.props.markExternalIOBusy(true);
      }
    };
    const packet = {
      id: uuidv4(),
      type,
      direction,
      path,
      onPathComplete,
      color: randomColor,
    };
    this.props.firePacket(packet);
    if (direction === PacketDirection.INCOMING) {
      this.props.markExternalIOPacketIncoming(true);
    }
  };

  renderPackets = () => {
    const { packets } = this.props;

    if (!packets.length) {
      return null;
    }

    return packets.map(packet => (
      <MotionPath
        key={packet.id}
        path={packet.path}
        onMotionEnd={() => {
          packet.onPathComplete(packet.id);
        }}
      >
        {value => (
          <Rect
            x={value.x}
            y={value.y}
            height={25}
            width={25}
            offsetX={25 / 2}
            offsetY={25 / 2}
            fill={packet.color || 'red'}
          />
        )}
      </MotionPath>
    ));
  };

  renderLoader = () => {
    if (this.props.io && this.props.io.busy) {
      return <ArcLoader y={100} duration={2000} onComplete={this.onLoaderComplete} />;
    }
    return null;
  };

  render() {
    const { type, io, ...rest } = this.props;
    return (
      <Group {...rest}>
        <Label
          y={ARROW_HEIGHT}
          onClick={() => {
            if (!(this.packetIncoming() || io.busy)) {
              this.firePacket(type, PacketDirection.INCOMING, getPath(arrowPointsIncoming));
            }
          }}
        >
          <Tag fill="white" stroke="black" />
          <Group>
            <Text text={type} fontSize={24} align="center" padding={10} width={TEXT_WIDTH} />
            {io.busy && (
              <Text y={50} text="(busy)" fontSize={12} align="center" width={TEXT_WIDTH} />
            )}
            {this.packetIncoming() && (
              <Text
                y={50}
                text="(packet incoming)"
                fontSize={12}
                align="center"
                width={TEXT_WIDTH}
              />
            )}
          </Group>
        </Label>
        <Arrow name="arrowIncoming" points={arrowPointsIncoming} stroke="black" fill="black" />
        <Arrow name="arrowOutgoing" points={arrowPointsOutgoing} stroke="black" fill="black" />
        {this.renderPackets()}
        {this.renderLoader()}
      </Group>
    );
  }
}

ExternalIO.propTypes = {
  type: PropTypes.string.isRequired,
  io: PropTypes.shape({
    busy: PropTypes.bool,
    packetIncoming: PropTypes.bool,
  }).isRequired,
  packets: PropTypes.arrayOf(Packet),
  firePacket: PropTypes.func.isRequired,
  removePacket: PropTypes.func.isRequired,
  markExternalIOBusy: PropTypes.func.isRequired,
  markExternalIOPacketIncoming: PropTypes.func.isRequired,
};

ExternalIO.defaultProps = {
  packets: [],
};

function mapStateToProps(state, props) {
  return {
    packets: state.eventLoop.packets.filter(p => p.type === props.type),
    io: state.eventLoop.externalIO[props.type],
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    firePacket: (packet) => {
      dispatch(firePacket(packet));
    },
    removePacket: (packetId) => {
      dispatch(removePacket(packetId));
    },
    markExternalIOBusy: (busy) => {
      dispatch(markExternalIOBusy(props.type, busy));
    },
    markExternalIOPacketIncoming: (packetIncoming) => {
      dispatch(markExternalIOPacketIncoming(props.type, packetIncoming));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExternalIO);
