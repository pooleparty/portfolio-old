/* eslint-disable no-param-reassign */
import { matchRoutes } from 'react-router-config';
import axios from 'axios';
import uiRootController from '../uiControllers';
import renderer from '../../utils/renderer';
import createStore from '../../../utils/createStore';
import Routes from '../../../client/Routes';

jest.mock('react-router-config');
jest.mock('../../utils/renderer');
jest.mock('../../../utils/createStore');
jest.mock('axios');

const matchedRoutesWithLoadData = [
  {
    route: {
      loadData: jest.fn(() =>
        Promise.resolve({
          foo: 'bar',
        })),
    },
    match: {
      params: {},
    },
  },
];

const matchedRoutesWithoutLoadData = [
  {
    route: {},
  },
];

const rendered = {
  head: 'the head',
  html: '<div>foo bar</div>',
  state: 'initialState = []',
};
const store = { the: 'store' };
const mockAxios = {};

renderer.mockImplementation(() => rendered);
createStore.mockImplementation(jest.fn(() => store));
axios.create.mockImplementation(jest.fn(() => mockAxios));

const req = {};
req.baseUrl = '/the/path';
req.get = jest.fn();

const res = {};
res.render = jest.fn();
res.redirect = jest.fn();
res.status = jest.fn();

test('should call createStore with axios instance', () => {
  matchRoutes.mockImplementation(() => matchedRoutesWithLoadData);
  return uiRootController(req, res).then(() => {
    expect(createStore).toBeCalledWith(mockAxios);
  });
});

test('should call matchRoutes', () => {
  matchRoutes.mockImplementation(() => matchedRoutesWithLoadData);
  return uiRootController(req, res).then(() => {
    expect(matchRoutes).toBeCalledWith(Routes, req.baseUrl);
  });
});

describe('send rendered response', () => {
  test('should support routes with custom data to load', () => {
    matchRoutes.mockImplementation(() => matchedRoutesWithLoadData);
    return uiRootController(req, res).then(() => {
      expect(res.render).toBeCalledWith('index', rendered);
      expect(matchedRoutesWithLoadData[0].route.loadData).toBeCalledWith(
        store,
        matchedRoutesWithLoadData[0].match.params,
      );
    });
  });
  test('should support routes without custom data to load', () => {
    matchRoutes.mockImplementation(() => matchedRoutesWithoutLoadData);
    return uiRootController(req, res).then(() => {
      expect(res.render).toBeCalledWith('index', rendered);
    });
  });
});

describe('renderer', () => {
  beforeEach(() => {
    matchRoutes.mockImplementation(() => matchedRoutesWithLoadData);
  });

  test('should redirect when a url is present in context', () => {
    renderer.mockImplementation((r, s, context) => {
      context.url = 'the/url';
      return rendered;
    });
    return uiRootController(req, res).then(() => {
      expect(res.redirect).toBeCalledWith(301, 'the/url');
    });
  });

  test('should set status to 404 when notFound is present on context', () => {
    renderer.mockImplementation((r, s, context) => {
      context.notFound = true;
      return rendered;
    });
    return uiRootController(req, res).then(() => {
      expect(res.status).toBeCalledWith(404);
    });
  });
});
