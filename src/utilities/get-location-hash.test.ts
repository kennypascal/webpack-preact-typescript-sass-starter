import getLocationHash from './get-location-hash';

describe('my window location with no hash', () => { 
  test('should return the window location hash', () => {
    expect(getLocationHash()).toBe('')
  });
});

describe('my window location hash', () => {
  beforeEach(() => {
    return window.history.pushState({}, 'Test Title', '/test.html#section-one');
  })
  
  test('should return the window location hash', () => {
    expect(getLocationHash()).toBe('section-one')
  });
});

