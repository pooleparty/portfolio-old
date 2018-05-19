interface IDatabase {
  books: DB.IBook[];
  authors: DB.IAuthor[];
  ratings: DB.IRating[];
}

interface IContext {
  db: IDatabase;
}

declare namespace DB {
  interface IBook {
    id: string | number;
    title: string;
    price: number;
    authorId: string | number;
    publishDate: Date;
  }

  interface IAuthor {
    id: string | number;
    firstName: string;
    lastName: string;
  }

  interface IRating {
    bookId: string | number;
    stars: number;
    comment: string | null;
  }
}
