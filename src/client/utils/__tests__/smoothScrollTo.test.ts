import smoothScrollTo from '../smoothScrollTo';

describe('smoothScrollTo', () => {
  beforeAll(() => {
    Object.defineProperty(document, 'querySelector', {
      value: jest.fn(),
    });

    Object.defineProperty(window.history, 'replaceState', {
      value: jest.fn(),
    });
  });

  test('should call document.querySelector with element id', () => {
    const elementId = '#test';
    smoothScrollTo(elementId);
    expect(document.querySelector).toHaveBeenCalled();
  });
  test('should not call scrollIntoView if element does not exist', () => {
    const elementId = '#test';
    (document.querySelector as jest.Mock<{}>).mockReturnValue(undefined);
    smoothScrollTo(elementId);
    expect(window.history.replaceState).not.toHaveBeenCalled();
  });

  test('should call scrollIntoView if element exists', () => {
    const elementId = '#test';
    const element = {
      scrollIntoView: jest.fn(),
    };
    (document.querySelector as jest.Mock<{}>).mockReturnValue(element);
    smoothScrollTo(elementId);
    expect(element.scrollIntoView).toHaveBeenCalled();
  });
});
