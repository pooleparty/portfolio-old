import * as React from 'react';
import { mount } from 'enzyme';
import Meta from '../Meta';

describe('Meta', () => {
  test('should render', () => {
    const wrapper = mount(<Meta />);
    expect(wrapper).toHaveLength(1);
  });
});
