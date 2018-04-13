/*
 * Loop utility using requestAnimationFrame
 */
let requestAnimationFrame: Function;
let cancelAnimationFrame: Function;

if (typeof window === 'undefined') {
  requestAnimationFrame = (c: (...args: any[]) => void) => {
    setTimeout(c, 1000 / 60);
    return 1;
  };

  cancelAnimationFrame = global.clearTimeout;
} else {
  requestAnimationFrame =
    window.requestAnimationFrame || window.webkitRequestAnimationFrame;
  // w['mozRequestAnimationFrame'] ||
  // w['msRequestAnimationFrame'] ||
  // w['oRequestAnimationFrame'];

  cancelAnimationFrame =
    window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
  // w['mozCancelAnimationFrame'] ||
  // w['msCancelAnimationFrame'] ||
  // w['oCancelAnimationFrame'] ||;
}

interface ILoop {
  startTime: Date;
  callback: CallbackFunc;
  timer: any;
}

export default class Loop implements ILoop {
  startTime: any;
  timer: any;
  callback: () => any;

  constructor(callback: CallbackFunc) {
    this.callback = callback;
  }

  start() {
    // keep loop while the callback returns true
    this.startTime = Date.now();
    this.loop();
  }

  loop() {
    if (!this.callback) {
      return;
    }
    const keep = this.callback();
    if (keep) {
      const exec = () => {
        this.timer = requestAnimationFrame(this.loop.bind(this));
      };
      // handle promise
      if (keep.then) {
        keep.then(exec);
      } else {
        exec();
      }
    }
  }

  end() {
    if (this.timer) {
      cancelAnimationFrame(this.timer);
      this.timer = null;
    }
    this.startTime = null;
  }

  timeDiff() {
    return Date.now() - this.startTime;
  }
}
