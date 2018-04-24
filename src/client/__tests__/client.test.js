/* eslint-disable global-require */
import ReactDOM from 'react-dom';

jest.mock('react-dom');

let root;

beforeEach(() => {
  root = document.createElement('div');
  root.id = 'root';
  document.querySelector('body').appendChild(root);
});

afterEach(() => {
  document.querySelector('body').removeChild(root);
});

describe('client', () => {
  test('should call hydrate', () => {
    require('../client');
    expect(ReactDOM.hydrate).toBeCalled();
  });
});
