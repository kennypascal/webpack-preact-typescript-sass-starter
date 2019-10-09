/**
 *
 *
 * @export
 * @param {string} string
 * @returns {string} Returns a string as hyphen case
 */
function toHyphenCase(string: string): string {
  return string
    .replace(/[^\w\s]/g, '')
    .replace(/[-_]+/g, ' ')
    .replace(/(^[A-Z])/, (first): string => first.toLowerCase())
    .replace(/([A-Z])/g, (letter): string => `-${letter.toLowerCase()}`)
    .replace(/ /g, '');
}

export default toHyphenCase;
