import { Request, Response } from 'express';
import uiRootController from '../uiControllers';
import renderer from '../../utils/renderer';

jest.mock('../../utils/renderer');

const rendered = {
  head: 'the head',
  html: '<div>foo bar</div>',
};

(renderer as jest.Mock<{}>).mockReturnValue(rendered);

const req = {} as Request;
req.baseUrl = '/the/path';
req.get = jest.fn();

const res = {} as Response;
res.render = jest.fn();
res.status = jest.fn();

describe('uiController', () => {
  test('should render response', () => {
    uiRootController(req, res);
    expect(res.render).toBeCalledWith('index', rendered);
  });

  test('should render error response', () => {
    (renderer as jest.Mock<{}>).mockImplementation(() => {
      throw 'Something bad';
    });
    uiRootController(req, res);
    expect(res.render).toBeCalledWith('error', {
      html: '',
      error: 'Something bad',
    });
  });
});
