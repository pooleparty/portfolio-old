import { GraphQLScalarType } from 'graphql';
import resolvers from '../index';

describe('resolvers', () => {
  test('should contain a Query resolver', () => {
    expect(resolvers.Query).toBeDefined();
  });

  describe('Query', () => {
    test('should contain skills resolver', () => {
      expect(resolvers.Query.skills).toBeDefined();
      expect(typeof resolvers.Query.skills).toEqual('function');
    });

    test('should return skills fomr context db', () => {
      const context = {
        db: {
          skills: ['a', 'b', 'c'],
        },
      };
      const skills = resolvers.Query.skills(null, null, context);

      expect(skills).toHaveLength(3);
      expect(skills).toEqual(expect.arrayContaining(context.db.skills));
    });

    test('should contain projects resolver', () => {
      expect(resolvers.Query.projects).toBeDefined();
      expect(typeof resolvers.Query.projects).toEqual('function');
    });

    test('should return projects from context db', () => {
      const context = {
        db: {
          projects: ['a', 'b', 'c'],
        },
      };
      const projects = resolvers.Query.projects(null, null, context);

      expect(projects).toHaveLength(3);
      expect(projects).toEqual(expect.arrayContaining(context.db.projects));
    });

    test('should contain experience resolver', () => {
      expect(resolvers.Query.experience).toBeDefined();
      expect(typeof resolvers.Query.experience).toEqual('function');
    });

    test('should return experience from context db', () => {
      const context = {
        db: {
          experience: ['a', 'b', 'c'],
        },
      };
      const experience = resolvers.Query.experience(null, null, context);

      expect(experience).toHaveLength(3);
      expect(experience).toEqual(expect.arrayContaining(context.db.experience));
    });
  });

  test('should contain a Date type', () => {
    expect(resolvers.Date).toBeDefined();
    expect(resolvers.Date).toBeInstanceOf(GraphQLScalarType);
  });
});
