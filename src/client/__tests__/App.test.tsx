import * as React from 'react';
import { mount } from 'enzyme';
import App from '../App';

describe('App', () => {
  test('should render', () => {
    const wrapper = mount(<App />);
    expect(wrapper).toHaveLength(1);
  });
});
