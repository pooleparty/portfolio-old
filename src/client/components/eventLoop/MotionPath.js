import React from 'react';
import PropTypes from 'prop-types';
import ReactStateAnimation from '../../utils/reactStateAnimation';
import { Path } from '../propTypes';

const ANIMATION_SPEED = 60;

class MotionPath extends React.Component {
  constructor(props) {
    super(props);

    const path = [...props.path];
    const currentPoint = path.pop();
    if (currentPoint) {
      this.state.currentPoint = currentPoint;
      this.state.x = currentPoint.x;
      this.state.y = currentPoint.y;
    }
    this.state.path = path;
    this.animateX = new ReactStateAnimation(this);
    this.animateY = new ReactStateAnimation(this);
  }

  state = {
    x: 0,
    y: 0,
    path: [],
  };

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
      this.props.onMotionEnd();
    }
  };

  start() {
    if (this.state.currentPoint) {
      const distanceX = Math.abs(this.state.x - this.state.currentPoint.x);
      const durationX = distanceX / (ANIMATION_SPEED / 100);
      const xPromise = this.animateX.animate('x', this.state.currentPoint.x, durationX, 'linear');

      const distanceY = Math.abs(this.state.y - this.state.currentPoint.y);
      const durationY = distanceY / (ANIMATION_SPEED / 100);
      const yPromise = this.animateY.animate('y', this.state.currentPoint.y, durationY, 'linear');

      Promise.all([xPromise, yPromise]).then(this.nextPoint);
    }
  }

  stop() {
    this.animateX.stop();
  }

  render() {
    return this.props.children({ x: this.state.x, y: this.state.y });
  }
}

MotionPath.propTypes = {
  path: Path.isRequired,
  onMotionEnd: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default MotionPath;
