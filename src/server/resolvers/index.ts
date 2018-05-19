import { find, filter } from 'lodash';
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
    books: (obj, args, context: IContext) => {
      return context.db.books;
    },
    book: (obj, args, context: IContext) => {
      return find(context.db.books, {
        id: args.id,
      });
    },
    authors: (obj, args, context: IContext) => {
      return context.db.authors;
    },
    author: (obj, args, context: IContext) => {
      return find(context.db.authors, {
        id: args.id,
      });
    },
    ratings: (obj, args, context: IContext) => {
      return context.db.ratings;
    },
  },
  Mutation: {
    createRating: (obj, args, context: IContext) => {
      const rating = { bookId: args.bookId, ...args.rating };
      context.db.ratings.push(rating);
      return rating;
    },
  },
  Book: {
    author: (book: DB.IBook, args, context: IContext) => {
      return find(context.db.authors, {
        id: book.authorId,
      });
    },
    ratings: (book: DB.IBook, args, context: IContext) => {
      return filter(context.db.ratings, { bookId: book.id });
    },
    price: (book: DB.IBook, args) => {
      if (args.currency === 'EUR') {
        return book.price * 0.84;
      }
      return book.price;
    },
  },
  Author: {
    books: (author: DB.IAuthor, args, context: IContext) => {
      return filter(context.db.books, { authorId: author.id });
    },
  },
  Rating: {
    book: (rating: DB.IRating, args, context: IContext) => {
      return find(context.db.books, { id: rating.bookId });
    },
  },
  Date: dateScalar,
};

export default resolvers;
