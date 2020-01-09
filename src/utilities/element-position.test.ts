import elementPosition from './element-position';

describe('the element position', () => {
  // const window = global.windows;
  beforeEach(() => {
    window.document.body.innerHTML =
    '<div>' +
    '  <div id="testElementA" style="display:block;width:100%;height:200px">' +
    '    <span>Header</span>' +
    '  </div>' +
    '  <div id="testElementB" style="display:block;width:100%;height:1000px">' +
    '    <span>Body</span>' +
    '  </div>' +
    '  <div id="testElementC" style="display:block;width:100%;height:100px">' +
    '    <span>Footer</span>' +
    '  </div>' +
    '</div>';
  })
  
  test('should return a {x, y} object', () => {
    const element = document.querySelector('#testElementC')
    expect(elementPosition(element)).toMatchObject({
      x: expect.any(Number),
      y: expect.any(Number)
    });
  });

  test('should return an undefined {x, y} object', () => {
    expect(elementPosition(null)).toStrictEqual({ x: undefined, y: undefined });
  });

  test('should return an undefined {x, y} object', () => {
    expect(elementPosition(undefined)).toStrictEqual({ x: undefined, y: undefined });
  });
})