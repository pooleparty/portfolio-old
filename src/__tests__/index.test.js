import '../index';
import app from '../server/app';

jest.mock('../server/app');

const mockListen = jest.fn();
app.listen.mockImplementation(mockListen);

test('should start the app', () => {
  expect(app.listen).toBeCalledWith(app.get('port') || 3000, expect.any(Function));
});
