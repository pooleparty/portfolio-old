import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import GraphQLError from '../styledComponents/graphQLError';
import { EmailIcon, GithubIcon, LinkedInIcon } from './Icons';
import { COLORS } from '../styles/vars';
import { darken } from 'polished';

const contactInfoQuery = gql`
  {
    contactInfo {
      email
      github
      linkedin
    }
  }
`;

const LinkContainer = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: 3rem;
  margin-bottom: 5rem;
  align-items: center;
`;

const ContactIcon = styled.div`
  position: relative;
  background-color: ${COLORS.darkBlue};
  width: 5rem;
  height: 5rem;
  border-radius: 50%;

  & > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: ${COLORS.white};
    width: 2rem;
    height: 2rem;
  }
`;

const ContactLink = styled.a`
  &:link,
  &:visited {
    display: block;
    color: ${COLORS.white};
    text-decoration: none;
    font-size: 2rem;
    transition: all 0.2s;
    transform-origin: 0%;
    font-weight: 200;
  }

  &:hover,
  &:active {
    color: ${darken(0.1, COLORS.white)};
    transform: scale(1.025);
  }
`;

class ContactInfoQuery extends Query<GQL.IQuery> {}

const ContactInfo = () => {
  return (
    <ContactInfoQuery query={contactInfoQuery}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <GraphQLError>{JSON.stringify(error, null, 2)}</GraphQLError>;
        }

        if (!data || !data.contactInfo) {
          return null;
        }

        const { email, github, linkedin } = data.contactInfo;

        return (
          <div>
            <LinkContainer>
              <ContactIcon>
                <EmailIcon />
              </ContactIcon>
              <div>
                <ContactLink href={`mailto:`}>{email}</ContactLink>
              </div>
            </LinkContainer>
            <LinkContainer>
              <ContactIcon>
                <GithubIcon />
              </ContactIcon>
              <div>
                <ContactLink href={github} target="_blank">
                  {github}
                </ContactLink>
              </div>
            </LinkContainer>
            <LinkContainer>
              <ContactIcon>
                <LinkedInIcon />
              </ContactIcon>
              <div>
                <ContactLink href={linkedin} target="_blank">
                  {linkedin}
                </ContactLink>
              </div>
            </LinkContainer>
          </div>
        );
      }}
    </ContactInfoQuery>
  );
};

export default ContactInfo;
