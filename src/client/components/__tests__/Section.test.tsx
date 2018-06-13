import * as React from 'react';
import { mount } from 'enzyme';
import Section from '../Section';

describe('Section', () => {
  test('should render', () => {
    const wrapper = mount(<Section title="test" />);
    expect(wrapper).toHaveLength(1);
  });
});
