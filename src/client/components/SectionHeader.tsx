import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS } from '../styles/vars';

interface Props {
  className?: string;
  title?: string;
}

const Title = styled.h1`
  font-weight: 200;
  margin-bottom: 60px;
  margin-top: 0;
  padding: 30px 40px;
  text-transform: uppercase;
`;

const SectionHeader: React.SFC<Props> = ({ className, title, ...rest }) => (
  <Title className={className} {...rest}>
    {title}
  </Title>
);

SectionHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default styled(SectionHeader)`
  background-color: ${COLORS.gray1};
`;
