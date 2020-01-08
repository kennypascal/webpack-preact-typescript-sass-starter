import toUpperCamelCase from './to-upper-camel-case'

test('should return a string as upper camel case', () => {
  expect(toUpperCamelCase('This happy test.')).toBe('ThisHappyTest')
});

test('should return a string as upper camel case', () => {
  expect(toUpperCamelCase('1234 This happy test. 1234')).toBe('ThisHappyTest')
});

test('should return a string as upper camel case', () => {
  expect(toUpperCamelCase('___ This happy test. ___')).toBe('ThisHappyTest')
});

test('should return a string as upper camel case', () => {
  expect(toUpperCamelCase('--- This happy test. ---')).toBe('ThisHappyTest')
});

test('should return a string as lower camel case', () => {
  expect(toUpperCamelCase('ce-content')).toBe('CeContent')
});
