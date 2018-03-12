import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { pxToRem } from '../styles/utils';
import SectionHeader from './SectionHeader';

interface Props {
  className?: string;
  title?: string;
}

const SectionContent = styled.div`
  width: 90%;
  margin: auto;
`;

const Section: React.SFC<Props> = ({ className, title, ...rest }) => (
  <div className={className} {...rest}>
    <SectionHeader title={title} />
    <SectionContent>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore rem
      possimus ut optio quam assumenda totam ducimus repellendus ullam non
      molestias, officiis sunt impedit recusandae cum alias magnam unde
      explicabo.
    </SectionContent>
  </div>
);

Section.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default styled(Section)`
  padding-bottom: ${pxToRem(30)};
`;
