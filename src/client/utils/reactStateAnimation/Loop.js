/*
 * Loop utility using requestAnimationFrame
 */
let requestAnimationFrame;
let cancelAnimationFrame;

if (typeof window === 'undefined') {
  requestAnimationFrame = (c) => {
    setTimeout(c, 1000 / 60);
    return 1;
  };

  cancelAnimationFrame = global.clearTimeout;
} else {
  requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;

  cancelAnimationFrame =
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.oCancelAnimationFrame;
}

export default class Loop {
  constructor(callback) {
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
