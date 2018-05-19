import * as graphqlHTTP from 'express-graphql';
import graphqlController from '../graphqlController';

jest.mock('express-graphql');
jest.mock('graphql-tools');
jest.mock('../../schema');
jest.mock('../../db');

(graphqlHTTP as jest.Mock<{}>).mockImplementation(() => {});

describe('graphqlController', () => {
  test('should call graphqlHTTP', () => {
    graphqlController(true);
    expect(graphqlHTTP).toHaveBeenCalled();
  });
});
