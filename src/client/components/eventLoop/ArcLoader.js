import React from 'react';
import PropTypes from 'prop-types';
import { Arc } from 'react-konva';
import ReactStateAnimation from '../../utils/reactStateAnimation';

class ArcLoader extends React.Component {
  constructor(props) {
    super(props);
    this.animate = new ReactStateAnimation(this);
  }

  state = {
    angle: 0,
  };

  componentDidMount() {
    this.animate.animate('angle', 360, this.props.duration, 'linear').then(() => {
      this.props.onComplete();
    });
  }

  render() {
    return (
      <Arc
        angle={this.state.angle}
        fill="yellow"
        stroke="black"
        innerRadius={20}
        outerRadius={40}
        strokeWidth={4}
      />
    );
  }
}

ArcLoader.propTypes = {
  duration: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default ArcLoader;
