import * as d3 from 'd3-ease';
import { camelCase } from 'lodash';
import Loop from './Loop';

interface Prop {
  state: string;
  target: number;
}

interface WithState {
  [key: string]: any;

  state: {
    [key: string]: any;
  };
}

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

const Easing: any = {};

/**
 * React state animation wrapper
 *  - update state value by requestAnimationFrame loop
 */

export default class Animate implements IAnimate {
  [key: string]: any;
  component: React.Component;
  loop: any;

  constructor(component: React.Component) {
    this.component = component;

    // generate an interface function for each ease.
    eases.forEach((e: string) => {
      // convert to camelCase
      const easeName: string = camelCase(e);

      // add instance methods dynamically
      this[easeName] = (prop: string, end: number, duration: number) => {
        return this.animateSpeed(prop, end, duration, easeName);
      };

      Easing[easeName] = d3.easeLinear;
    });
  }

  animateSpeed(
    prop: string,
    end: number,
    speed: number,
    easeName: string,
  ): Promise<any> {
    if (!Easing[easeName]) {
      throw new Error('Specified easing does not exist: ' + easeName);
    }

    const begin = this.getStateValue(prop);
    // speed = distance / time
    const distance = Math.abs(begin - end);
    const duration = distance / (speed / 100);

    return new Promise((resolve, reject) => {
      this.start(() => {
        return this.anim(prop, begin, end, duration, easeName, resolve);
      });
    });
  }

  animate(
    prop: string,
    end: number,
    duration: number,
    easeName: string,
  ): Promise<any> {
    if (!Easing[easeName]) {
      throw new Error('Specified easing does not exist: ' + easeName);
    }

    const begin = this.getStateValue(prop);
    return new Promise((resolve, reject) => {
      this.start(() => {
        return this.anim(prop, begin, end, duration, easeName, resolve);
      });
    });
  }

  manimate(prop: any, duration: number, easing: string): Promise<any> {
    if (!Easing[easing]) {
      throw new Error('Specified easing does not exist: ' + easing);
    }
    return new Promise((resolve, reject) => {
      // gather array begin States
      const begins: number[] = [];
      const ends: number[] = [];
      for (const i = 0; i < prop.length; i + 1) {
        const b = this.getStateValue(prop[i].state);
        const e = prop[i].target;
        begins.push(b);
        ends.push(e);
      }
      // start multi-anim
      this.start(() => {
        return this.multianim(prop, begins, ends, duration, easing, resolve);
      });
    });
  }

  // for override on each loop
  onProcess(prop: string, value: number, progress: any) {}

  stop(): IAnimate {
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
  private getStateValue(prop: string) {
    const c: WithState = this.component,
      v = c.state && c.state[prop];
    return v === undefined ? c[prop] : v;
  }

  /**
   * Set value to state
   * if the prop is not in state, set value to regular property with force update
   */
  private updateStateValue(prop: string, v: number) {
    return new Promise((resolve, reject) => {
      const c: WithState = this.component;
      if (c.state && c.state[prop] !== undefined) {
        const state: any = {};
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
  private updateStateMap(prop: Prop[], values: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const c = this.component;
      const state: any = {};
      // build up changed state
      for (const i = 0; i < prop.length; i + 1) {
        state[prop[i].state] = values[i];
      }
      c.setState(state, resolve);
    });
  }

  private start(loopCallback: CallbackFunc) {
    this.loop = new Loop(loopCallback);
    this.loop.start();
  }

  private multianim(
    prop: Prop[],
    begins: number[],
    ends: number[],
    duration: number,
    easing: string,
    resolve: Function,
  ) {
    if (!this.loop) {
      resolve();
      return false;
    }
    const progress = Easing[easing](this.loop.timeDiff() / duration),
      newValues = [];

    // step through all states
    for (const i = 0; i < prop.length; i + 1) {
      const begin = begins[i],
        end = ends[i],
        p = prop[i].state,
        distance = Math.abs(begin - end),
        diff = progress * distance,
        operator = begin > end ? -1 : 1,
        value = begin + diff * operator;

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
  private anim(
    prop: string,
    begin: number,
    end: number,
    duration: number,
    easing: string,
    resolve: Function,
  ) {
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
