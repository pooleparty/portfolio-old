import * as React from 'react';
import ReactStateAnimation from '../../utils/reactStateAnimation';

interface Props {
  path: Point[];
  onMotionEnd?: (e?: any) => void;
  children: (interpolatedStyle: any) => React.ReactElement<any>;
}

interface State {
  currentPoint?: Point;
  x: number;
  y: number;
  path: Point[];
}

const ANIMATION_SPEED = 60;

class MotionPath extends React.Component<Props> {
  state: State = {
    x: 0,
    y: 0,
    path: [],
  };
  _animateX: IAnimate;
  _animateY: IAnimate;

  constructor(props: Props) {
    super(props);

    const path = [...props.path];
    const currentPoint = path.pop();
    if (currentPoint) {
      this.state.currentPoint = currentPoint;
      this.state.x = currentPoint.x;
      this.state.y = currentPoint.y;
    }
    this.state.path = path;
    this._animateX = new ReactStateAnimation(this);
    this._animateY = new ReactStateAnimation(this);
  }

  componentDidMount() {
    this.start();
  }

  nextPoint = () => {
    if (this.state.path.length > 0) {
      const newPath = [...this.state.path];
      const nextPoint = newPath.pop();
      this.setState({ currentPoint: nextPoint, path: newPath });
      this.start();
    } else {
      if (this.props.onMotionEnd) {
        this.props.onMotionEnd();
      }
    }
  };

  start() {
    if (this.state.currentPoint) {
      const distanceX = Math.abs(this.state.x - this.state.currentPoint.x);
      const durationX = distanceX / (ANIMATION_SPEED / 100);
      const xPromise = this._animateX.animate(
        'x',
        this.state.currentPoint.x,
        durationX,
        'linear',
      );

      const distanceY = Math.abs(this.state.y - this.state.currentPoint.y);
      const durationY = distanceY / (ANIMATION_SPEED / 100);
      const yPromise = this._animateY.animate(
        'y',
        this.state.currentPoint.y,
        durationY,
        'linear',
      );

      Promise.all([xPromise, yPromise]).then(this.nextPoint);
    }
  }

  stop() {
    this._animateX.stop();
  }

  render() {
    return this.props.children({ x: this.state.x, y: this.state.y });
  }
}

export default MotionPath;
