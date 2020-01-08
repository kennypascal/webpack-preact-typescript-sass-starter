import toHyphenCase from './to-hyphen-case'

test('should return a string as hyphen case', () => {
    expect(toHyphenCase('This happy test')).toBe('this-happy-test')
});

test('should return a string as hyphen case', () => {
    expect(toHyphenCase('1234 This happy test. 1234')).toBe('1234-this-happy-test-1234')
});

test('should return a string as hyphen case', () => {
    expect(toHyphenCase('ThisHappyTest')).toBe('this-happy-test')
});

test('should return a string as hyphen case', () => {
    expect(toHyphenCase('-_.$ This happy test. )-')).toBe('this-happy-test')
});

test('should return a string as hyphen case', () => {
    expect(toHyphenCase('CEContent')).toBe('ce-content')
});

test('should return a string as hyphen case', () => {
    expect(toHyphenCase('CeContent')).toBe('ce-content')
});
