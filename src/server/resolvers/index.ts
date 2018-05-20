import { GraphQLScalarType, StringValueNode } from 'graphql';

// Define implementation for custom date scalar
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom date scalar type',
  serialize(date: Date) {
    // Implement your own behavior here by setting the 'result' variable
    const result = date.toISOString();
    return result;
  },
  parseValue(date: Date) {
    // Implement your own behavior here by setting the 'result' variable
    const result = new Date(date);
    return result;
  },
  parseLiteral(ast: StringValueNode) {
    // Implement your own behavior here by returning what suits your needs
    // depending on ast.kind
    return new Date(ast.value);
  },
});

// Defined query, mutation, and object field resolvers
const resolvers = {
  Query: {
    skills: (obj, args, context: IContext) => {
      console.log('\n\nskills query\n\n');
      return context.db.skills;
    },
    projects: (obj, args, context: IContext) => {
      return context.db.projects;
    },
    experience: (obj, args, context: IContext) => {
      return context.db.experience;
    },
  },
  Date: dateScalar,
};

export default resolvers;
