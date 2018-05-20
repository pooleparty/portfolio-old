import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { BREAKPOINTS } from '../styles/vars';
import SectionHeader from './SectionHeader';

interface Props {
  id?: string;
  title?: string;
  children?: any;
}

const SectionContent = styled.div`
  padding: 40px 50px;
  font-size: 1.125rem;
  line-height: 1.75rem;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const Section: React.SFC<Props> = ({ title, children, ...rest }) => (
  <div {...rest}>
    <SectionHeader title={title} />
    <SectionContent>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore rem
      possimus ut optio quam assumenda totam ducimus repellendus ullam non
      molestias, officiis sunt impedit recusandae cum alias magnam unde
      explicabo.
      {children}
    </SectionContent>
  </div>
);

Section.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Section;
