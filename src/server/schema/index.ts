import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolvers';
import schema = require('../schema/schema.graphql');

const getSchema = () => {
  // Combine schema and resolvers into executable schema
  return makeExecutableSchema({
    typeDefs: [schema],
    resolvers,
  });
};

export default getSchema;
