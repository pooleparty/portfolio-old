import * as React from 'react';
import { mount } from 'enzyme';
import NavigationMenu from '../NavigationMenu';

describe('NavigationMenu', () => {
  test('should render', () => {
    const wrapper = mount(<NavigationMenu />);
    expect(wrapper).toHaveLength(1);
  });
});
