import markDownHTML from './mark-down-html';

test('should return a dangerouslySetInnerHTML object', () => {
  const htmlString = '<div>This happy test.<div>'
  expect(markDownHTML(htmlString)).toMatchObject({
    dangerouslySetInnerHTML: {
      __html: htmlString
    }
  });
});