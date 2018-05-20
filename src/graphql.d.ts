// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    skills: Array<ISkill> | null;
    projects: Array<IProject> | null;
    experience: Array<IExperience> | null;
  }

  interface ISkill {
    __typename: 'Skill';
    name: string;
    category: SkillCategory;
    logo: string;
  }

  enum SkillCategory {
    HTML = 'HTML',
    CSS = 'CSS',
    JAVASCRIPT = 'JAVASCRIPT',
    TESTING = 'TESTING',
    BUILD_TOOLS = 'BUILD_TOOLS',
    BACK_END = 'BACK_END',
    OTHER = 'OTHER',
  }

  interface IProject {
    __typename: 'Project';
    name: string;
    description: string;
    link: string;
  }

  interface IExperience {
    __typename: 'Experience';
    title: string;
    description: string;
    company: string;
    location: string;
    startDate: any;
    endDate: any | null;
  }
}

// tslint:enable
