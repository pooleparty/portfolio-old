import boom from 'boom';
import errorMiddleware from '../errorMiddleware';

const next = jest.fn();

describe('errorMiddleware', () => {
  test('should log a boom error code', () => {
    const req = {};
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    errorMiddleware(boom.badRequest('Something bad'), req, res, next);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      error: 'Bad Request',
      message: 'Something bad',
      statusCode: 400,
    });
  });

  test('should log non-boom errors as 500s', () => {
    const req = {};
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    errorMiddleware(new Error('Something bad'), req, res, next);
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({
      name: 'Error',
      message: 'Something bad',
    });
  });
});
