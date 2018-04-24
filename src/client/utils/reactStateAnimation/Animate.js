import * as d3 from 'd3-ease';
import { camelCase } from 'lodash';
import Loop from './Loop';

const eases = [
  'linear',
  'linear-in',
  'linear-out',
  'linear-in-out',
  'quad-in',
  'quad-out',
  'quad-in-out',
  'cubic-in',
  'cubic-out',
  'cubic-in-out',
  'poly-in',
  'poly-out',
  'poly-in-out',
  'sin-in',
  'sin-out',
  'sin-in-out',
  'exp-in',
  'exp-out',
  'exp-in-out',
  'circle-in',
  'circle-out',
  'circle-in-out',
  'bounce-in',
  'bounce-out',
  'bounce-in-out',
  'back-in',
  'back-out',
  'back-in-out',
  'elastic-in',
  'elastic-out',
  'elastic-in-out',
];

const Easing = {};

/**
 * React state animation wrapper
 *  - update state value by requestAnimationFrame loop
 */

export default class Animate {
  constructor(component) {
    this.component = component;

    // generate an interface function for each ease.
    eases.forEach((e) => {
      // convert to camelCase
      const easeName = camelCase(e);

      // add instance methods dynamically
      this[easeName] = (prop, end, duration) => this.animateSpeed(prop, end, duration, easeName);

      Easing[easeName] = d3.easeLinear;
    });
  }

  animateSpeed(prop, end, speed, easeName) {
    if (!Easing[easeName]) {
      throw new Error(`Specified easing does not exist: ${easeName}`);
    }

    const begin = this.getStateValue(prop);
    // speed = distance / time
    const distance = Math.abs(begin - end);
    const duration = distance / (speed / 100);

    return new Promise((resolve) => {
      this.start(() => this.anim(prop, begin, end, duration, easeName, resolve));
    });
  }

  animate(prop, end, duration, easeName) {
    if (!Easing[easeName]) {
      throw new Error(`Specified easing does not exist: ${easeName}`);
    }

    const begin = this.getStateValue(prop);
    return new Promise((resolve) => {
      this.start(() => this.anim(prop, begin, end, duration, easeName, resolve));
    });
  }

  manimate(prop, duration, easing) {
    if (!Easing[easing]) {
      throw new Error(`Specified easing does not exist: ${easing}`);
    }
    return new Promise((resolve) => {
      // gather array begin States
      const begins = [];
      const ends = [];
      for (const i = 0; i < prop.length; i + 1) {
        const b = this.getStateValue(prop[i].state);
        const e = prop[i].target;
        begins.push(b);
        ends.push(e);
      }
      // start multi-anim
      this.start(() => this.multianim(prop, begins, ends, duration, easing, resolve));
    });
  }

  // for override on each loop
  // eslint-disable-next-line
  onProcess(prop, value, progress) {}

  stop() {
    if (this.loop) {
      this.loop.end();
      this.loop = null;
    }
    return this;
  }

  /**
   * Get state value
   * if the prop is not in state regular property
   */
  getStateValue(prop) {
    const c = this.component;
    const v = c.state && c.state[prop];
    return v === undefined ? c[prop] : v;
  }

  /**
   * Set value to state
   * if the prop is not in state, set value to regular property with force update
   */
  updateStateValue(prop, v) {
    return new Promise((resolve) => {
      const c = this.component;
      if (c.state && c.state[prop] !== undefined) {
        const state = {};
        state[prop] = v;
        c.setState(state, resolve);
      } else {
        c[prop] = v;
        c.forceUpdate();
        resolve();
      }
    });
  }

  /**
   * Updates multiple properties within
   * @param prop {Array} array of targeted states= {state: {string}, target: {number}}
   * @param values {Array} array of values to be set
   * @returns {Promise}
   */
  updateStateMap(prop, values) {
    return new Promise((resolve) => {
      const c = this.component;
      const state = {};
      // build up changed state
      for (const i = 0; i < prop.length; i + 1) {
        state[prop[i].state] = values[i];
      }
      c.setState(state, resolve);
    });
  }

  start(loopCallback) {
    this.loop = new Loop(loopCallback);
    this.loop.start();
  }

  multianim(prop, begins, ends, duration, easing, resolve) {
    if (!this.loop) {
      resolve();
      return false;
    }
    const progress = Easing[easing](this.loop.timeDiff() / duration);
    const newValues = [];

    // step through all states
    for (const i = 0; i < prop.length; i + 1) {
      const begin = begins[i];
      const end = ends[i];
      const p = prop[i].state;
      const distance = Math.abs(begin - end);
      const diff = progress * distance;
      const operator = begin > end ? -1 : 1;
      const value = begin + diff * operator;

      this.onProcess(p, value, progress);

      newValues.push(value);
    }

    if (progress < 1) {
      return this.updateStateMap(prop, newValues);
    }
    this.stop();
    this.updateStateMap(prop, ends).then(() => {
      resolve();
    });
    return false;
  }

  /**
   * Start animation
   *  - prop is a react state property
   *  - end is a goal value of the state
   */
  anim(prop, begin, end, duration, easing, resolve) {
    if (!this.loop) {
      resolve();
      return false;
    }

    const progress = Easing[easing](this.loop.timeDiff() / duration);
    const distance = Math.abs(begin - end);
    const diff = progress * distance;
    const operator = begin > end ? -1 : 1;
    const value = begin + diff * operator;

    this.onProcess(prop, value, progress);

    if (progress < 1) {
      // return promise to keep loop
      return this.updateStateValue(prop, value);
    }

    this.stop();
    this.updateStateValue(prop, end).then(() => {
      resolve();
    });

    return false;
  }
}
