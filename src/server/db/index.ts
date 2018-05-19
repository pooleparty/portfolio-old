import books from '../data/books';
import authors from '../data/authors';
import ratings from '../data/ratings';

const db: IDatabase = {
  books,
  authors,
  ratings,
};

const getDatabase = () => db;

export default getDatabase;
