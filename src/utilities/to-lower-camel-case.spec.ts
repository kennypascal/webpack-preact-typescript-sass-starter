import toLowerCamelCase from './to-lower-camel-case'

test('should return a string as lower camel case', () => {
    expect(toLowerCamelCase('This happy test.')).toBe('thisHappyTest')
});

test('should return a string as lower camel case', () => {
    expect(toLowerCamelCase('1234 This happy test. 1234')).toBe('thisHappyTest')
});

test('should return a string as lower camel case', () => {
    expect(toLowerCamelCase('___ This happy test. ___')).toBe('thisHappyTest')
});

test('should return a string as lower camel case', () => {
    expect(toLowerCamelCase('--- This happy test. ---')).toBe('thisHappyTest')
});

test('should return a string as lower camel case', () => {
    expect(toLowerCamelCase('ce-content')).toBe('ceContent')
});
