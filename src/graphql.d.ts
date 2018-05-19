// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
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
    books: Array<IBook> | null;
    book: IBook | null;
    authors: Array<IAuthor> | null;
    author: IAuthor | null;
    ratings: Array<IRating> | null;
  }

  interface IBookOnQueryArguments {
    id: number;
  }

  interface IAuthorOnQueryArguments {
    id: number;
  }

  interface IRatingsOnQueryArguments {
    bookId: number;
  }

  interface IBook {
    __typename: 'Book';
    id: string;
    title: string;
    price: number;
    author: IAuthor;
    ratings: Array<IRating> | null;
    publishDate: any;
  }

  interface IPriceOnBookArguments {
    /**
     * @default USD
     */
    currency?: Currency | null;
  }

  enum Currency {
    USD = 'USD',
    EUR = 'EUR',
  }

  interface IAuthor {
    __typename: 'Author';
    id: string;
    firstName: string;
    lastName: string;
    books: Array<IBook> | null;
  }

  interface IRating {
    __typename: 'Rating';
    stars: number;
    comment: string | null;
    book: IBook | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    createRating: IRating | null;
  }

  interface ICreateRatingOnMutationArguments {
    bookId: number;
    rating: IRatingInput;
  }

  interface IRatingInput {
    stars: number;
    comment?: string | null;
  }
}

// tslint:enable
