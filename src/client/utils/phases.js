export const PHASES = [
  'poll',
  'check',
  'close callbacks',
  'timers',
  'I/O callbacks',
  'idle, prepare',
];

function poll() {
  console.log('poll');
}

function check() {
  console.log('check');
}

function closeCallbacks() {
  console.log('closeCallbacks');
}

function timers() {
  console.log('timers');
}

function ioCallbacks() {
  console.log('ioCallbacks');
}

function idle() {
  console.log('idle');
}

const functionMap = {
  [PHASES[0]]: poll,
  [PHASES[1]]: check,
  [PHASES[2]]: closeCallbacks,
  [PHASES[3]]: timers,
  [PHASES[4]]: ioCallbacks,
  [PHASES[5]]: idle,
};

export const getPhaseFunction = phase => functionMap[phase];
