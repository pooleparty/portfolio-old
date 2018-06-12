import * as React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import Skills from '../Skills';

describe('Skills', () => {
  test('should render', () => {
    const wrapper = mount(
      <MockedProvider>
        <Skills />
      </MockedProvider>,
    );
    expect(wrapper).toHaveLength(1);
  });
});
