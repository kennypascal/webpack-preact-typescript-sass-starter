import elementIsInView from './element-is-in-view';

describe('the element is inview', () => {
  beforeEach(() => {
    document.body.innerHTML =
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

  test('should return whether the elemnent is in view', () => {
    const element = document.querySelector('#testElementA')
    expect(elementIsInView(element)).toBeTruthy();
  });

  test('should return whether the elemnent is in view', () => {
    expect(elementIsInView(document.querySelector(undefined))).toBeUndefined();
  });

  test('should return whether the elemnent is in view', () => {
    expect(elementIsInView(document.querySelector(null))).toBeUndefined();
  });
})