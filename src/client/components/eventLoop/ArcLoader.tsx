import * as React from 'react';
import { Arc } from 'react-konva';
import ReactStateAnimation from '../../utils/reactStateAnimation';

interface Props extends KonvaNodeConfig {
  duration: number;
  onComplete?: CallbackFunc;
}

class ArcLoader extends React.Component<Props> {
  state = {
    angle: 0,
  };

  _animate: IAnimate;

  constructor(props: Props) {
    super(props);
    this._animate = new ReactStateAnimation(this);
  }

  componentDidMount() {
    this._animate
      .animate('angle', 360, this.props.duration, 'linear')
      .then(() => {
        if (this.props.onComplete) {
          this.props.onComplete();
        }
      });
  }

  render() {
    return (
      <Arc
        angle={this.state.angle}
        fill={'yellow'}
        stroke={'black'}
        innerRadius={20}
        outerRadius={40}
        strokeWidth={4}
      />
    );
  }
}

export default ArcLoader;
