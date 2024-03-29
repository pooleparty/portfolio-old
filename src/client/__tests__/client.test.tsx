import * as ReactDOM from 'react-dom';
jest.mock('react-dom');

let root: Element;

beforeEach(() => {
  root = document.createElement('div');
  root.id = 'root';
  document.querySelector('body')!.appendChild(root);
});

afterEach(() => {
  document.querySelector('body')!.removeChild(root);
});

describe('client', () => {
  // TODO: figure out how to mock apollo client
  test.skip('should call hydrate', () => {
    require('../client');
    expect(ReactDOM.hydrate).toBeCalled();
  });
});
