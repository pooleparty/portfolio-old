import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { transparentize } from 'polished';
import groupBy = require('lodash/groupBy');
import GraphQLError from '../styledComponents/graphQLError';
import { COLORS } from '../styles/vars';

const skillsQuery = gql`
  {
    skills {
      name
      category
      logo
    }
  }
`;

class SkillsQuery extends Query<GQL.IQuery> {}

const SkillCategory = styled.div`
  color: ${transparentize(0.4, COLORS.black)};
  background: ${COLORS.white};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  padding: 2rem;
  margin-bottom: 3rem;
`;

const SkillCategoryHeader = styled.div`
  font-size: 1.625rem;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid ${transparentize(0.4, COLORS.black)};
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Skill = styled.div`
  margin: 1rem 2rem;
`;

const SkillLogo = styled.img`
  width: 128px;
  height: 128px;
  margin-bottom: 4px;
`;

const SkillName = styled.div`
  text-transform: uppercase;
  text-align: center;
  font-size: smaller;
`;

const Skills = () => {
  return (
    <SkillsQuery query={skillsQuery}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <GraphQLError>{JSON.stringify(error, null, 2)}</GraphQLError>;
        }

        if (!data || !data.skills) {
          return null;
        }

        const grouped = groupBy(data.skills, 'category');

        return (
          <div>
            {Object.keys(grouped).map(category => (
              <SkillCategory key={category}>
                <SkillCategoryHeader>{category}</SkillCategoryHeader>
                <SkillList key={category}>
                  {grouped[category].map(({ name, logo }) => (
                    <Skill key={name}>
                      <SkillLogo src={logo} alt={`${name} Logo`} />
                      <SkillName>{name}</SkillName>
                    </Skill>
                  ))}
                </SkillList>
              </SkillCategory>
            ))}
          </div>
        );
      }}
    </SkillsQuery>
  );
};

export default Skills;
