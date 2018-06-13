import * as React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import ContactInfo from '../ContactInfo';

describe('ContactInfo', () => {
  test('should render', () => {
    const wrapper = mount(
      <MockedProvider>
        <ContactInfo />
      </MockedProvider>,
    );
    expect(wrapper).toHaveLength(1);
  });
});
