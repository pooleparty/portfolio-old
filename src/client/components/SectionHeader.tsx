import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { BREAKPOINTS, COLORS } from '../styles/vars';
import { headerFont } from '../styles/utils';

interface Props {
  title?: string;
}

const SectionHeader: React.SFC<Props> = ({ title, ...rest }) => (
  <div {...rest}>{title}</div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default styled(SectionHeader)`
  background-color: ${COLORS.blue};
  ${headerFont()};
  font-size: 2rem;
  font-weight: 200;
  margin-top: 0;
  padding: 30px 40px;
  text-transform: uppercase;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1.5rem;
    padding: 20px 30px;
  }
`;
