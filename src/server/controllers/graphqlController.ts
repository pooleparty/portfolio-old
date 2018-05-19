import * as graphqlHTTP from 'express-graphql';
import getSchema from '../schema';
import getDatabase from '../db';

const graphqlController = (graphiql: boolean) => {
  return graphqlHTTP(() => {
    const startTime = Date.now();
    return {
      schema: getSchema(),
      graphiql,
      context: {
        db: getDatabase(),
      },
      extensions() {
        return {
          runTime: Date.now() - startTime,
        };
      },
    };
  });
};

export default graphqlController;
