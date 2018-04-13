declare module '*.jpg' {
  const value: string;
  export default value;
}

interface AppWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  INITIAL_STATE?: any;
}
interface Point {
  x: number;
  y: number;
}

type CallbackFunc = (...args: any[]) => any;
interface AppState {
  eventLoop: EventLoopState;
}

declare enum ExternalIOType {
  DATABASE = 'DATABASE',
  FILESYSTEM = 'FILESYSTEM',
  NETWORK = 'NETWORK',
  OTHER = 'OTHER',
}

declare enum PacketDirection {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING',
}

interface Packet {
  type: string;
  direction: PacketDirection;
  path: Point[];
  onPathComplete: CallbackFunc;
  id: string;
  color?: string;
}

interface IExternalIO {
  type: string;
  busy: boolean;
}

interface NodeEvent {
  id: string;
  description: string;
}

interface EventLoopState {
  packets: Packet[];
  externalIO: IExternalIO[];
  eventQueue: NodeEvent[];
}
interface Context {
  url?: string;
  notFound?: boolean;
}

interface IAnimate {
  animate(
    prop: string,
    end: number,
    duration: number,
    easeName: string,
  ): Promise<any>;

  manimate(prop: any, duration: number, easing: string): Promise<any>;

  // for override on each loop
  onProcess(prop: string, value: number, progress: any): void;

  stop(): IAnimate;
}

interface Vector2d {
  x: number;
  y: number;
}
interface KonvaNodeConfig {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  visible?: boolean;
  listening?: boolean;
  id?: string;
  type?: string;
  opacity?: Number;
  scale?: Vector2d;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
  rotationDeg?: number;
  offset?: Vector2d;
  offsetX?: number;
  offsetY?: number;
  draggable?: boolean;
  dragDistance?: number;
  dragBoundFunc?: (pos: Vector2d) => Vector2d;
  preventDefault?: boolean;
}
