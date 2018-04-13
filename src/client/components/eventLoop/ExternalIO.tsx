import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as uuidv4 from 'uuid/v4';
import { Arrow, Label, Rect, Tag, Text, Group } from 'react-konva';
import { firePacket, removePacket, markExternalIOBusy } from '../../actions';
import { getPath } from '../../utils/pointUtils';
import MotionPath from './MotionPath';
import ArcLoader from './ArcLoader';
import { PacketDirection } from '../../../enums';

const TEXT_WIDTH = 170;
const ARROW_HEIGHT = 150;
const midPoint = TEXT_WIDTH / 2;
const arrowOffset = 20;
const arrowPointsIncoming = [
  midPoint - arrowOffset,
  0,
  midPoint - arrowOffset,
  ARROW_HEIGHT,
];
const arrowPointsOutgoing = [
  midPoint + arrowOffset,
  ARROW_HEIGHT,
  midPoint + arrowOffset,
  0,
];

interface ExternalIOProps extends KonvaNodeConfig {
  type: string;
}

interface StateToProps {
  packets: Packet[];
  io?: IExternalIO;
}

interface DispatchToProps {
  firePacket: (packet: Packet) => void;
  removePacket: (packetId: string) => void;
  markExternalIOBusy: (busy: boolean) => void;
}

class ExternalIO extends React.Component<
  ExternalIOProps & StateToProps & DispatchToProps
> {
  firePacket = (type: string, direction: PacketDirection, path: Point[]) => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const onPathComplete = (id: string) => {
      if (this.props.removePacket) {
        this.props.removePacket(id);
      }
    };
    const packet: Packet = {
      id: uuidv4(),
      type,
      direction,
      path,
      onPathComplete,
      color: randomColor,
    };
    if (this.props.firePacket) {
      this.props.firePacket(packet);
    }
  };

  renderPackets = () => {
    const { packets = [] } = this.props;

    if (!packets.length) {
      return null;
    }

    return packets.map((packet: Packet) => (
      <MotionPath
        key={packet.id}
        path={packet.path}
        onMotionEnd={() => {
          packet.onPathComplete(packet.id);
          if (packet.direction === PacketDirection.INCOMING) {
            this.setState({ busy: true });
          }
        }}
      >
        {(value: any) => (
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

  onLoaderComplete = () => {
    const { type } = this.props;
    this.setState({ busy: false });
    this.firePacket(
      type,
      PacketDirection.OUTGOING,
      getPath(arrowPointsOutgoing),
    );
  };

  renderLoader = () => {
    if (this.props.io && this.props.io.busy) {
      return (
        <ArcLoader y={100} duration={2000} onComplete={this.onLoaderComplete} />
      );
    }
  };

  render() {
    const { type, firePacket, packets, ...rest } = this.props;
    return (
      <Group {...rest}>
        <Label
          y={ARROW_HEIGHT}
          onClick={() =>
            this.firePacket(
              type,
              PacketDirection.INCOMING,
              getPath(arrowPointsIncoming),
            )
          }
        >
          <Tag fill="white" stroke="black" />
          <Group>
            <Text
              text={type}
              fontSize={24}
              align="center"
              padding={10}
              width={TEXT_WIDTH}
            />
            {this.props.io &&
              this.props.io.busy && (
                <Text
                  y={50}
                  text="(busy)"
                  fontSize={12}
                  align="center"
                  width={TEXT_WIDTH}
                />
              )}
          </Group>
        </Label>
        <Arrow
          name="arrowIncoming"
          points={arrowPointsIncoming}
          stroke="black"
          fill="black"
        />
        <Arrow
          name="arrowOutgoing"
          points={arrowPointsOutgoing}
          stroke="black"
          fill="black"
        />
        {this.renderPackets()}
        {this.renderLoader()}
      </Group>
    );
  }
}

function mapStateToProps(
  state: AppState,
  props: ExternalIOProps,
): StateToProps {
  return {
    packets: state.eventLoop.packets.filter(p => p.type === props.type),
    io: state.eventLoop.externalIO.find(e => e.type === props.type),
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<any>,
  props: ExternalIOProps,
): DispatchToProps {
  return {
    firePacket: (packet: Packet) => {
      dispatch(firePacket(packet));
    },
    removePacket: (packetId: string) => {
      dispatch(removePacket(packetId));
    },
    markExternalIOBusy: (busy: boolean) => {
      dispatch(markExternalIOBusy(props.type, busy));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExternalIO);
