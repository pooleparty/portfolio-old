import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import renderer from '../renderer';

jest.mock('styled-components');
jest.mock('react-dom/server');
jest.mock('react-helmet', () => {
  const obj: any = { Helmet: {} };
  obj.Helmet.renderStatic = jest.fn(() => ({
    title: { toString: jest.fn(() => '<title>The title</title>') },
    meta: {
      toString: jest.fn(() => '<meta name="meta" description="the meta">'),
    },
  }));
  return obj;
});

(ServerStyleSheet as any).mockImplementation(() => {
  const sheet: any = {};
  sheet.getStyleTags = jest.fn(
    () => '<link rel="stylesheet" href="/link/to/styles.css" />',
  );
  sheet.collectStyles = jest.fn();
  return sheet;
});

(renderToString as jest.Mock<{}>).mockImplementation(jest.fn(() => '<html />'));

describe('renderer', () => {
  test('should render head as string', () => {
    const url = '/';
    const { head } = renderer(url);

    expect(head.trim()).toEqual(
      [
        '<title>The title</title>',
        '<meta name="meta" description="the meta">',
        '<link rel="stylesheet" href="/link/to/styles.css" />',
      ].join('\n'),
    );
  });
});
