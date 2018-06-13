import * as React from 'react';
import { mount } from 'enzyme';
import * as Icons from '../Icons';

describe('Icons', () => {
  describe('EmailIcon', () => {
    test('should render', () => {
      const wrapper = mount(<Icons.EmailIcon />);
      expect(wrapper).toHaveLength(1);
    });
  });

  describe('GithubIcon', () => {
    test('should render', () => {
      const wrapper = mount(<Icons.GithubIcon />);
      expect(wrapper).toHaveLength(1);
    });
  });

  describe('LinkedInIcon', () => {
    test('should render', () => {
      const wrapper = mount(<Icons.LinkedInIcon />);
      expect(wrapper).toHaveLength(1);
    });
  });
});
