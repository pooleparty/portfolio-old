import * as React from 'react';
import * as PropTypes from 'prop-types';
import SectionHeader from '../styledComponents/SectionHeader';
import SectionContent from '../styledComponents/SectionContent';

interface Props {
  id?: string;
  title?: string;
  children?: any;
}

const Section: React.SFC<Props> = ({ title, children, ...rest }) => (
  <div {...rest}>
    <SectionHeader>{title}</SectionHeader>
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
