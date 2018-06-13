import * as React from 'react';
import { mount } from 'enzyme';
import App from '../App';

describe('App', () => {
  // TODO: figure out how to mock apollo client
  test.skip('should render', () => {
    const wrapper = mount(<App />);
    expect(wrapper).toHaveLength(1);
  });
});
